
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Microscope, Leaf, Cloud, TrendingUp, Bug, Droplet } from "lucide-react";
import SoilAnalysisPanel from "./SoilAnalysisPanel";
import CropHealthPanel from "./CropHealthPanel";
import WeatherAnalysisPanel from "./WeatherAnalysisPanel";
import PestDetectionPanel from "./PestDetectionPanel";

const AgricultureAIHub = () => {
  const [activeAnalysis, setActiveAnalysis] = useState("soil");

  const analysisTypes = [
    {
      id: "soil",
      title: "Soil Analysis",
      description: "AI-powered soil composition and health analysis",
      icon: <Microscope className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-800"
    },
    {
      id: "crop",
      title: "Crop Health",
      description: "Disease detection and plant health assessment",
      icon: <Leaf className="h-5 w-5" />,
      color: "bg-green-100 text-green-800"
    },
    {
      id: "weather",
      title: "Weather Intelligence",
      description: "Climate analysis and farming recommendations",
      icon: <Cloud className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "pest",
      title: "Pest Detection",
      description: "Identify and manage agricultural pests",
      icon: <Bug className="h-5 w-5" />,
      color: "bg-red-100 text-red-800"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Agricultural AI Intelligence Hub
          </CardTitle>
          <CardDescription>
            Comprehensive AI-powered analysis tools for modern farming
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {analysisTypes.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  activeAnalysis === type.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveAnalysis(type.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    {type.icon}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{type.title}</h3>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                  <Badge className={`mt-2 text-xs ${type.color}`}>
                    AI Powered
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeAnalysis} onValueChange={setActiveAnalysis} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
          <TabsTrigger value="crop">Crop Health</TabsTrigger>
          <TabsTrigger value="weather">Weather AI</TabsTrigger>
          <TabsTrigger value="pest">Pest Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="soil">
          <SoilAnalysisPanel />
        </TabsContent>

        <TabsContent value="crop">
          <CropHealthPanel />
        </TabsContent>

        <TabsContent value="weather">
          <WeatherAnalysisPanel />
        </TabsContent>

        <TabsContent value="pest">
          <PestDetectionPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgricultureAIHub;
