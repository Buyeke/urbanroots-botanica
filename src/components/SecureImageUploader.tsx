
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { validateImageFile, rateLimit } from '@/utils/security';
import { Upload, X } from 'lucide-react';

interface SecureImageUploaderProps {
  onImageSelect: (file: File) => void;
  maxFiles?: number;
}

const SecureImageUploader = ({ onImageSelect, maxFiles = 1 }: SecureImageUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Rate limiting check
    if (!rateLimit('image-upload', 5, 60000)) {
      toast({
        title: "Too Many Uploads",
        description: "Please wait before uploading more images.",
        variant: "destructive"
      });
      return;
    }

    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: "Too Many Files",
        description: `Maximum ${maxFiles} file(s) allowed.`,
        variant: "destructive"
      });
      return;
    }

    const validFiles: File[] = [];
    
    for (const file of files) {
      const validation = validateImageFile(file);
      
      if (!validation.isValid) {
        toast({
          title: "Invalid File",
          description: validation.error,
          variant: "destructive"
        });
        continue;
      }
      
      validFiles.push(file);
    }

    const newFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newFiles);
    
    // Call callback for first valid file
    if (validFiles.length > 0) {
      onImageSelect(validFiles[0]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          multiple={maxFiles > 1}
          className="hidden"
          id="secure-image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('secure-image-upload')?.click()}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Image
        </Button>
        <span className="text-sm text-muted-foreground">
          Max {maxFiles} file(s), 10MB each
        </span>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-secondary rounded-lg"
            >
              <span className="text-sm truncate">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecureImageUploader;
