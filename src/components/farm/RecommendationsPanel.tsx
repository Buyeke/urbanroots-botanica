import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Droplet, Sun, Cloud, Bell } from "lucide-react";

interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'irrigation' | 'fertilizer' | 'pest' | 'weather' | 'harvest';
  title: string;
  description: string;
  action: string;
  timeframe: string;
  plotIds: number[];
}

interface RecommendationsPanelProps {
  language: string;
}

const generateRecommendations = (): Recommendation[] => {
  const recommendations = [
    {
      id: '1',
      priority: 'high' as const,
      category: 'irrigation' as const,
      title: 'Water Maize Plot',
      description: 'Soil moisture is critically low in Plot 1',
      action: 'Apply 50L water per plant immediately',
      timeframe: 'Within 2 hours',
      plotIds: [1]
    },
    {
      id: '2',
      priority: 'medium' as const,
      category: 'fertilizer' as const,
      title: 'Apply Organic Fertilizer',
      description: 'Cassava plants showing nutrient deficiency signs',
      action: 'Mix compost with soil around base',
      timeframe: 'Next 3 days',
      plotIds: [2]
    },
    {
      id: '3',
      priority: 'medium' as const,
      category: 'weather' as const,
      title: 'Rain Expected Tomorrow',
      description: 'Heavy rainfall predicted for next 24 hours',
      action: 'Delay irrigation and secure loose materials',
      timeframe: 'Before evening',
      plotIds: [1, 2, 3, 4, 5]
    },
    {
      id: '4',
      priority: 'low' as const,
      category: 'pest' as const,
      title: 'Monitor for Aphids',
      description: 'Weather conditions favorable for aphid growth',
      action: 'Check leaves daily, prepare neem spray',
      timeframe: 'This week',
      plotIds: [3, 4]
    },
    {
      id: '5',
      priority: 'low' as const,
      category: 'harvest' as const,
      title: 'Harvest Ready Soon',
      description: 'Spinach in Plot 5 approaching maturity',
      action: 'Monitor daily, harvest when leaves full',
      timeframe: 'Next 5-7 days',
      plotIds: [5]
    }
  ];

  // Randomly return 3-4 recommendations
  return recommendations
    .sort(() => Math.random() - 0.5)
    .slice(0, 3 + Math.floor(Math.random() * 2));
};

export default function RecommendationsPanel({ language }: RecommendationsPanelProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  useEffect(() => {
    setRecommendations(generateRecommendations());
    
    const interval = setInterval(() => {
      setRecommendations(generateRecommendations());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const texts = {
    en: {
      title: "Smart Farming Tips",
      aiGenerated: "AI-Generated",
      markDone: "Mark Done",
      sendSMS: "Send SMS",
      sendWhatsApp: "Send WhatsApp",
      high: "High",
      medium: "Medium", 
      low: "Low",
      irrigation: "Irrigation",
      fertilizer: "Fertilizer",
      pest: "Pest Control",
      weather: "Weather",
      harvest: "Harvest",
      plots: "Plots"
    },
    sw: {
      title: "Mapendekezo ya Kilimo",
      aiGenerated: "Kutoka AI",
      markDone: "Imekamilika",
      sendSMS: "Tuma SMS",
      sendWhatsApp: "Tuma WhatsApp",
      high: "Haraka",
      medium: "Wastani",
      low: "Taratibu",
      irrigation: "Umwagiliaji",
      fertilizer: "Mbolea",
      pest: "Wadudu",
      weather: "Hali ya Hewa",
      harvest: "Mavuno",
      plots: "Mashamba"
    },
    fr: {
      title: "Conseils Agricoles Intelligents",
      aiGenerated: "Généré par IA",
      markDone: "Marquer Terminé",
      sendSMS: "Envoyer SMS",
      sendWhatsApp: "Envoyer WhatsApp",
      high: "Élevé",
      medium: "Moyen",
      low: "Faible",
      irrigation: "Irrigation",
      fertilizer: "Engrais",
      pest: "Lutte Antiparasitaire",
      weather: "Météo",
      harvest: "Récolte",
      plots: "Parcelles"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation': return <Droplet className="h-4 w-4" />;
      case 'weather': return <Cloud className="h-4 w-4" />;
      case 'fertilizer': return <Sun className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const markCompleted = (id: string) => {
    setCompletedActions(prev => new Set([...prev, id]));
  };

  const generateSMSPreview = (rec: Recommendation) => {
    return `${rec.title}: ${rec.action} - ${rec.timeframe}. Urban Roots AI`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
        <Badge variant="outline" className="text-xs">
          {t.aiGenerated}
        </Badge>
      </div>
      
      {recommendations.map((rec) => {
        const isCompleted = completedActions.has(rec.id);
        
        return (
          <Card key={rec.id} className={`relative ${isCompleted ? 'opacity-50' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(rec.category)}
                  <CardTitle className="text-sm">{rec.title}</CardTitle>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getPriorityColor(rec.priority)}>
                    {t[rec.priority as keyof typeof t]}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {t[rec.category as keyof typeof t]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              
              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Action:</strong> {rec.action}
                  <br />
                  <strong>Timeframe:</strong> {rec.timeframe}
                  <br />
                  <strong>{t.plots}:</strong> {rec.plotIds.join(', ')}
                </AlertDescription>
              </Alert>

              {/* SMS/WhatsApp Preview */}
              <div className="bg-muted/50 p-3 rounded text-xs">
                <p className="font-medium mb-1">Message Preview:</p>
                <p className="text-muted-foreground italic">
                  "{generateSMSPreview(rec)}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={isCompleted ? "outline" : "default"}
                  onClick={() => markCompleted(rec.id)}
                  disabled={isCompleted}
                  className="flex-1 text-xs"
                >
                  {isCompleted ? "✓ Done" : t.markDone}
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  {t.sendSMS}
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  {t.sendWhatsApp}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}