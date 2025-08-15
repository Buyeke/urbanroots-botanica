
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ImageUploader from "../chatbot/ImageUploader";
import AnalysisResults from "../chatbot/AnalysisResults";
import { Leaf, Send, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CropHealthPanel = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisTimestamp, setAnalysisTimestamp] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setAnalysis(null);
    setAnalysisTimestamp(null);
  };

  const analyzeImage = async () => {
    if (!uploadedImage || !session) {
      toast({
        title: "Error",
        description: "Please upload an image and make sure you're logged in.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      console.log('Starting crop health analysis...');
      
      const { data, error } = await supabase.functions.invoke('soil-analysis', {
        body: {
          image: uploadedImage,
          question: question.trim() || null,
          analysisType: 'crop'
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw error;
      }

      if (data?.success) {
        setAnalysis(data.analysis);
        setAnalysisTimestamp(data.timestamp);
        setQuestion("");
        
        toast({
          title: "Analysis Complete",
          description: "Your crop health analysis is ready."
        });
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Crop analysis error:', error);
      let errorMessage = "Unable to analyze the crop image. Please try again.";
      
      if (error.message?.includes('quota')) {
        errorMessage = "OpenAI API quota exceeded. Please check your billing and add credits to your OpenAI account.";
      }
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Crop Health Analysis
          </CardTitle>
          <CardDescription>
            Upload crop images to detect diseases, pest damage, nutrient deficiencies, 
            and get treatment recommendations from our AI agricultural expert.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For accurate disease detection, photograph affected leaves or plants clearly. 
              Include multiple angles if symptoms are present on different parts of the plant.
            </AlertDescription>
          </Alert>

          <ImageUploader 
            onImageUpload={handleImageUpload}
            isAnalyzing={isAnalyzing}
          />

          {uploadedImage && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Specific Concerns (Optional)
                </label>
                <Textarea
                  placeholder="Describe any specific symptoms or concerns (e.g., 'Leaves are turning yellow', 'Strange spots on fruit', 'Plant growth seems stunted')"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isAnalyzing}
                  rows={3}
                />
              </div>

              <Button 
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="w-full"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                {isAnalyzing ? "Analyzing Crop Health..." : "Start AI Crop Analysis"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AnalysisResults 
        analysis={analysis}
        isAnalyzing={isAnalyzing}
        timestamp={analysisTimestamp}
      />
    </div>
  );
};

export default CropHealthPanel;
