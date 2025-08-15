
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ImageUploader from "../chatbot/ImageUploader";
import AnalysisResults from "../chatbot/AnalysisResults";
import { Microscope, Send, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SoilAnalysisPanel = () => {
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
      console.log('Starting soil analysis...');
      
      const { data, error } = await supabase.functions.invoke('soil-analysis', {
        body: {
          image: uploadedImage,
          question: question.trim() || null,
          analysisType: 'soil'
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
          description: "Your soil sample has been analyzed successfully."
        });
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Soil analysis error:', error);
      let errorMessage = "Unable to analyze the soil sample. Please try again.";
      
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
            <Microscope className="h-6 w-6" />
            Advanced Soil Analysis
          </CardTitle>
          <CardDescription>
            Upload soil sample images for comprehensive AI-powered analysis including 
            moisture, pH estimation, composition, and agricultural recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For best results, take photos in natural lighting with the soil sample clearly visible. 
              Include a reference object (like a coin) for scale if possible.
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
                  Specific Questions (Optional)
                </label>
                <Textarea
                  placeholder="Ask specific questions about your soil sample (e.g., 'What crops would grow best in this soil?', 'How can I improve soil drainage?', 'What fertilizers do you recommend?')"
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
                {isAnalyzing ? "Analyzing Soil Sample..." : "Start AI Soil Analysis"}
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

export default SoilAnalysisPanel;
