
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ImageUploader from "../chatbot/ImageUploader";
import AnalysisResults from "../chatbot/AnalysisResults";
import { Bug, Send, AlertCircle, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const PestDetectionPanel = () => {
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
      console.log('Starting pest detection analysis...');
      
      const { data, error } = await supabase.functions.invoke('soil-analysis', {
        body: {
          image: uploadedImage,
          question: question.trim() || "Please identify any pests, insects, or pest damage visible in this image and provide treatment recommendations.",
          analysisType: 'general'
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
          description: "Pest detection analysis is ready."
        });
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Pest analysis error:', error);
      let errorMessage = "Unable to analyze the image for pests. Please try again.";
      
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

  const commonPests = [
    { name: "Aphids", severity: "Medium", treatment: "Neem oil spray" },
    { name: "Spider Mites", severity: "High", treatment: "Miticide application" },
    { name: "Caterpillars", severity: "High", treatment: "Bt spray or handpicking" },
    { name: "Thrips", severity: "Medium", treatment: "Blue sticky traps" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-6 w-6 text-red-600" />
            AI Pest Detection & Management
          </CardTitle>
          <CardDescription>
            Upload images to identify pests, assess damage levels, and get 
            targeted treatment recommendations for effective pest management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Take close-up photos of affected areas, insects, or damage patterns. 
              Multiple angles help improve identification accuracy.
            </AlertDescription>
          </Alert>

          {/* Common Pests Quick Reference */}
          <div>
            <h3 className="font-medium mb-3">Common Agricultural Pests</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {commonPests.map((pest, index) => (
                <Card key={index} className="p-3">
                  <div className="text-center">
                    <p className="font-medium text-sm">{pest.name}</p>
                    <Badge 
                      variant={pest.severity === 'High' ? 'destructive' : 'secondary'}
                      className="text-xs mt-1"
                    >
                      {pest.severity}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{pest.treatment}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <ImageUploader 
            onImageUpload={handleImageUpload}
            isAnalyzing={isAnalyzing}
          />

          {uploadedImage && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Additional Details (Optional)
                </label>
                <Textarea
                  placeholder="Describe what you've noticed (e.g., 'Small holes in leaves', 'Insects visible on stems', 'Yellowing and wilting')"
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
                {isAnalyzing ? "Detecting Pests..." : "Start AI Pest Detection"}
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

export default PestDetectionPanel;
