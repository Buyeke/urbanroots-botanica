import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplet, Sun, Cloud, Bell } from "lucide-react";

interface PlotStatus {
  plotId: number;
  name: string;
  crop: string;
  position: { x: number; y: number };
  status: 'healthy' | 'warning' | 'critical';
  sensors: {
    moisture: number;
    temp: number;
    alerts: number;
  };
}

interface FarmMapViewProps {
  language: string;
}

const generatePlotData = (): PlotStatus[] => {
  const crops = ['Maize', 'Cassava', 'Beans', 'Tomatoes', 'Spinach'];
  const positions = [
    { x: 20, y: 30 },
    { x: 60, y: 25 },
    { x: 35, y: 60 },
    { x: 75, y: 65 },
    { x: 50, y: 45 }
  ];

  return positions.map((pos, i) => {
    const moisture = Math.random() * 100;
    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    let alerts = 0;

    if (moisture < 30) {
      status = 'critical';
      alerts = 2;
    } else if (moisture < 60) {
      status = 'warning';
      alerts = 1;
    }

    return {
      plotId: i + 1,
      name: `Plot ${i + 1}`,
      crop: crops[i],
      position: pos,
      status,
      sensors: {
        moisture: Math.round(moisture),
        temp: Math.round(20 + Math.random() * 15),
        alerts
      }
    };
  });
};

export default function FarmMapView({ language }: FarmMapViewProps) {
  const [plotData, setPlotData] = useState<PlotStatus[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<PlotStatus | null>(null);

  useEffect(() => {
    setPlotData(generatePlotData());
    
    const interval = setInterval(() => {
      setPlotData(generatePlotData());
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const texts = {
    en: {
      title: "Farm Layout",
      selectPlot: "Tap a plot to view details",
      moisture: "Moisture",
      temperature: "Temperature",
      alerts: "Alerts",
      healthy: "Healthy",
      warning: "Warning",
      critical: "Critical"
    },
    sw: {
      title: "Mpangilio wa Shamba",
      selectPlot: "Gusa shamba kuona maelezo",
      moisture: "Unyevu",
      temperature: "Joto",
      alerts: "Onyo",
      healthy: "Nzuri",
      warning: "Onyo",
      critical: "Hatari"
    },
    fr: {
      title: "Disposition de la Ferme",
      selectPlot: "Appuyez sur une parcelle pour voir les détails",
      moisture: "Humidité",
      temperature: "Température",
      alerts: "Alertes",
      healthy: "Sain",
      warning: "Attention",
      critical: "Critique"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-success border-success';
      case 'warning': return 'bg-warning border-warning';
      case 'critical': return 'bg-destructive border-destructive';
      default: return 'bg-muted border-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <Droplet className="h-3 w-3 text-success-foreground" />;
      case 'warning': return <Sun className="h-3 w-3 text-warning-foreground" />;
      case 'critical': return <Bell className="h-3 w-3 text-destructive-foreground" />;
      default: return <Cloud className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
      
      {/* Farm Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            {t.selectPlot}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg h-64 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-primary/10" />
                ))}
              </div>
            </div>

            {/* Plot markers */}
            {plotData.map((plot) => (
              <Button
                key={plot.plotId}
                variant="outline"
                size="sm"
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 ${getStatusColor(plot.status)} hover:scale-110 transition-transform`}
                style={{
                  left: `${plot.position.x}%`,
                  top: `${plot.position.y}%`
                }}
                onClick={() => setSelectedPlot(plot)}
              >
                <div className="flex flex-col items-center">
                  {getStatusIcon(plot.status)}
                  <span className="text-xs font-medium">{plot.plotId}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Plot Details */}
      {selectedPlot && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                {selectedPlot.name} - {selectedPlot.crop}
              </CardTitle>
              <Badge className={getStatusColor(selectedPlot.status)}>
                {t[selectedPlot.status as keyof typeof t]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Droplet className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">{t.moisture}</p>
                <p className="font-semibold">{selectedPlot.sensors.moisture}%</p>
              </div>
              <div className="text-center">
                <Sun className="h-5 w-5 mx-auto mb-1 text-secondary" />
                <p className="text-xs text-muted-foreground">{t.temperature}</p>
                <p className="font-semibold">{selectedPlot.sensors.temp}°C</p>
              </div>
              <div className="text-center">
                <Bell className="h-5 w-5 mx-auto mb-1 text-destructive" />
                <p className="text-xs text-muted-foreground">{t.alerts}</p>
                <p className="font-semibold">{selectedPlot.sensors.alerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}