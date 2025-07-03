import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, Droplet } from "lucide-react";

interface WeatherDay {
  day: string;
  temp: { high: number; low: number };
  condition: 'sunny' | 'cloudy' | 'rainy';
  rainfall: number;
  humidity: number;
}

interface WeatherForecastProps {
  language: string;
}

const generateWeatherData = (): WeatherDay[] => {
  const days = ['Today', 'Tomorrow', 'Day 3'];
  const conditions = ['sunny', 'cloudy', 'rainy'] as const;
  
  return days.map((day, i) => ({
    day,
    temp: {
      high: 22 + Math.random() * 12,
      low: 15 + Math.random() * 8
    },
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    rainfall: Math.random() * 20,
    humidity: 40 + Math.random() * 40
  }));
};

export default function WeatherForecast({ language }: WeatherForecastProps) {
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);

  useEffect(() => {
    setWeatherData(generateWeatherData());
    const interval = setInterval(() => setWeatherData(generateWeatherData()), 12000);
    return () => clearInterval(interval);
  }, []);

  const texts = {
    en: { title: "3-Day Weather", temp: "Temp", rainfall: "Rain", humidity: "Humidity" },
    sw: { title: "Hali ya Hewa Siku 3", temp: "Joto", rainfall: "Mvua", humidity: "Unyevu" },
    fr: { title: "Météo 3 Jours", temp: "Temp", rainfall: "Pluie", humidity: "Humidité" }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-5 w-5 text-warning" />;
      case 'rainy': return <Droplet className="h-5 w-5 text-primary" />;
      default: return <Cloud className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
      
      <div className="grid grid-cols-3 gap-2">
        {weatherData.map((day, index) => (
          <Card key={index} className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs">{day.day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {getWeatherIcon(day.condition)}
              <div className="text-xs">
                <div className="font-medium">{Math.round(day.temp.high)}°/{Math.round(day.temp.low)}°</div>
                <div className="text-muted-foreground">{Math.round(day.rainfall)}mm</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}