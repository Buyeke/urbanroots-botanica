import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplet, Sun, Cloud, Bell } from "lucide-react";

interface SensorData {
  plotId: number;
  soilMoisture: number;
  soilTemp: number;
  ambientTemp: number;
  humidity: number;
  lastReading: Date;
}

interface SensorDataPanelProps {
  language: string;
}

const generateSensorData = (): SensorData[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    plotId: i + 1,
    soilMoisture: Math.random() * 100,
    soilTemp: 18 + Math.random() * 15,
    ambientTemp: 20 + Math.random() * 20,
    humidity: 40 + Math.random() * 50,
    lastReading: new Date(Date.now() - Math.random() * 300000), // Within last 5 minutes
  }));
};

const getHealthStatus = (moisture: number) => {
  if (moisture > 70) return { status: "optimal", color: "bg-success" };
  if (moisture > 40) return { status: "moderate", color: "bg-warning" };
  return { status: "low", color: "bg-destructive" };
};

export default function SensorDataPanel({ language }: SensorDataPanelProps) {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setSensorData(generateSensorData());
    
    const interval = setInterval(() => {
      setSensorData(generateSensorData());
    }, 5000); // Update every 5 seconds for simulation

    return () => clearInterval(interval);
  }, []);

  const texts = {
    en: {
      title: "Live Sensor Readings",
      plot: "Plot",
      soilMoisture: "Soil Moisture",
      soilTemp: "Soil Temp",
      ambientTemp: "Air Temp",
      humidity: "Humidity",
      lastReading: "Last reading",
      ago: "ago",
      optimal: "Optimal",
      moderate: "Moderate",
      low: "Low"
    },
    sw: {
      title: "Vipimo vya Hivi Sasa",
      plot: "Shamba",
      soilMoisture: "Unyevu wa Udongo",
      soilTemp: "Joto la Udongo",
      ambientTemp: "Joto la Hewa",
      humidity: "Unyevu",
      lastReading: "Kipimo cha mwisho",
      ago: "zilizopita",
      optimal: "Bora",
      moderate: "Wastani",
      low: "Chini"
    },
    fr: {
      title: "Lectures des Capteurs en Direct",
      plot: "Parcelle",
      soilMoisture: "Humidité du Sol",
      soilTemp: "Temp du Sol",
      ambientTemp: "Temp de l'Air",
      humidity: "Humidité",
      lastReading: "Dernière lecture",
      ago: "il y a",
      optimal: "Optimal",
      moderate: "Modéré",
      low: "Faible"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    return `${minutes}m ${t.ago}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
      
      {sensorData.map((plot) => {
        const moistureStatus = getHealthStatus(plot.soilMoisture);
        
        return (
          <Card key={plot.plotId} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${moistureStatus.color}`} />
                  {t.plot} {plot.plotId}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {formatTimeAgo(plot.lastReading)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Soil Moisture */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Droplet className="h-4 w-4 text-primary" />
                    {t.soilMoisture}
                  </div>
                  <span className="text-sm font-medium">
                    {plot.soilMoisture.toFixed(1)}%
                  </span>
                </div>
                <Progress value={plot.soilMoisture} className="h-2" />
              </div>

              {/* Temperature and Humidity Grid */}
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Sun className="h-3 w-3 text-warning" />
                    <span className="text-xs text-muted-foreground">{t.soilTemp}</span>
                  </div>
                  <div className="font-medium">{plot.soilTemp.toFixed(1)}°C</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Sun className="h-3 w-3 text-secondary" />
                    <span className="text-xs text-muted-foreground">{t.ambientTemp}</span>
                  </div>
                  <div className="font-medium">{plot.ambientTemp.toFixed(1)}°C</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Cloud className="h-3 w-3 text-accent" />
                    <span className="text-xs text-muted-foreground">{t.humidity}</span>
                  </div>
                  <div className="font-medium">{plot.humidity.toFixed(1)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}