
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ImageUploader from "./ImageUploader";
import AnalysisResults from "./AnalysisResults";
import { Microscope, Send } from "lucide-react";

const SoilAnalysisChatbot = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisTimestamp, setAnalysisTimestamp] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setAnalysis(null); // Clear previous analysis
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
          question: question.trim() || null
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw error;
      }

      if (data?.success) {
        setAnalysis(data.analysis);
        setAnalysisTimestamp(data.timestamp);
        setQuestion(""); // Clear the question after analysis
        
        toast({
          title: "Analysis Complete",
          description: "Your soil sample has been analyzed successfully."
        });
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Soil analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to analyze the soil sample. Please try again.",
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
            AI Soil Analysis
          </CardTitle>
          <CardDescription>
            Upload a soil sample image for comprehensive AI-powered analysis including 
            moisture, pH estimation, composition, and agricultural recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploader 
            onImageUpload={handleImageUpload}
            isAnalyzing={isAnalyzing}
          />

          {uploadedImage && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Additional Questions (Optional)
                </label>
                <Textarea
                  placeholder="Ask specific questions about your soil sample (e.g., 'What crops would grow best in this soil?', 'How can I improve soil health?')"
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
                {isAnalyzing ? "Analyzing..." : "Analyze Soil Sample"}
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

export default SoilAnalysisChatbot;
