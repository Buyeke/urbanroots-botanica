import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, Droplet, Sun, Cloud } from "lucide-react";

interface PlotHealth {
  plotId: number;
  cropType: string;
  healthScore: number;
  status: 'healthy' | 'warning' | 'critical';
  alerts: string[];
}

interface FarmHealthOverviewProps {
  language: string;
}

const generatePlotHealth = (): PlotHealth[] => {
  const crops = ['Maize', 'Cassava', 'Beans', 'Tomatoes', 'Spinach'];
  
  return Array.from({ length: 5 }, (_, i) => {
    const healthScore = Math.random() * 100;
    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    const alerts: string[] = [];
    
    if (healthScore < 30) {
      status = 'critical';
      alerts.push('Low soil moisture detected');
      alerts.push('Immediate irrigation needed');
    } else if (healthScore < 60) {
      status = 'warning';
      alerts.push('Monitor moisture levels');
    }
    
    return {
      plotId: i + 1,
      cropType: crops[i],
      healthScore: Math.round(healthScore),
      status,
      alerts
    };
  });
};

export default function FarmHealthOverview({ language }: FarmHealthOverviewProps) {
  const [plotsHealth, setPlotsHealth] = useState<PlotHealth[]>([]);

  useEffect(() => {
    setPlotsHealth(generatePlotHealth());
    
    const interval = setInterval(() => {
      setPlotsHealth(generatePlotHealth());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const texts = {
    en: {
      title: "Farm Health Overview",
      healthScore: "Health Score",
      alerts: "Active Alerts",
      noAlerts: "All systems normal",
      healthy: "Healthy",
      warning: "Attention",
      critical: "Critical"
    },
    sw: {
      title: "Muhtasari wa Afya ya Shamba",
      healthScore: "Kiwango cha Afya",
      alerts: "Onyo la Haraka",
      noAlerts: "Kila kitu ni sawa",
      healthy: "Nzuri",
      warning: "Angalia",
      critical: "Hatari"
    },
    fr: {
      title: "Aperçu de la Santé de la Ferme",
      healthScore: "Score de Santé",
      alerts: "Alertes Actives",
      noAlerts: "Tous les systèmes normaux",
      healthy: "Sain",
      warning: "Attention",
      critical: "Critique"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const overallScore = Math.round(plotsHealth.reduce((sum, plot) => sum + plot.healthScore, 0) / plotsHealth.length);
  const totalAlerts = plotsHealth.reduce((sum, plot) => sum + plot.alerts.length, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
      
      {/* Overall Score Card */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t.healthScore}</p>
              <p className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}/100
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t.alerts}</span>
              </div>
              <Badge variant={totalAlerts > 0 ? "destructive" : "secondary"}>
                {totalAlerts} {totalAlerts === 0 ? t.noAlerts.split(' ')[0] : ''}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Plots */}
      <div className="space-y-3">
        {plotsHealth.map((plot) => (
          <Card key={plot.plotId} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">
                  Plot {plot.plotId} - {plot.cropType}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getScoreColor(plot.healthScore)}`}>
                    {plot.healthScore}
                  </span>
                  <Badge className={getStatusColor(plot.status)}>
                    {t[plot.status as keyof typeof t]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            {plot.alerts.length > 0 && (
              <CardContent className="pt-0">
                {plot.alerts.map((alert, index) => (
                  <Alert key={index} className="mb-2 last:mb-0">
                    <Bell className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {alert}
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}