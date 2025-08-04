
import SoilAnalysisChatbot from "../chatbot/SoilAnalysisChatbot";

interface SoilAnalysisTabProps {
  translations: any;
}

const SoilAnalysisTab = ({ translations }: SoilAnalysisTabProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Soil Analysis</h2>
        <p className="text-muted-foreground">
          Upload soil images for AI-powered analysis and recommendations
        </p>
      </div>
      
      <SoilAnalysisChatbot />
    </div>
  );
};

export default SoilAnalysisTab;
