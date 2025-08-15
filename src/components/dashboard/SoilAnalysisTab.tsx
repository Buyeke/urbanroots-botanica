
import AgricultureAIHub from "../ai/AgricultureAIHub";

interface SoilAnalysisTabProps {
  translations: any;
}

const SoilAnalysisTab = ({ translations }: SoilAnalysisTabProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Agricultural AI Intelligence</h2>
        <p className="text-muted-foreground">
          Comprehensive AI-powered analysis for soil, crops, weather, and pest management
        </p>
      </div>
      
      <AgricultureAIHub />
    </div>
  );
};

export default SoilAnalysisTab;
