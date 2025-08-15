
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplet } from "lucide-react";

const WeatherAnalysisPanel = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate weather data loading
    setTimeout(() => {
      setWeatherData({
        current: {
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          condition: "Partly Cloudy",
          icon: "partly-cloudy"
        },
        forecast: [
          { day: "Today", high: 30, low: 22, condition: "Sunny", rainfall: 0 },
          { day: "Tomorrow", high: 28, low: 20, condition: "Cloudy", rainfall: 5 },
          { day: "Day 3", high: 25, low: 18, condition: "Rainy", rainfall: 15 },
          { day: "Day 4", high: 27, low: 19, condition: "Partly Cloudy", rainfall: 2 },
          { day: "Day 5", high: 29, low: 21, condition: "Sunny", rainfall: 0 }
        ],
        recommendations: [
          "Optimal conditions for irrigation in the morning hours",
          "Expected rainfall tomorrow - delay watering for outdoor crops",
          "High humidity may increase fungal disease risk - monitor closely",
          "Wind conditions favorable for pesticide application"
        ]
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'cloudy': return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'partly cloudy': return <Cloud className="h-6 w-6 text-gray-400" />;
      default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading weather intelligence...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-blue-600" />
            Weather Intelligence
          </CardTitle>
          <CardDescription>
            AI-powered weather analysis with agricultural recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Weather */}
          <div>
            <h3 className="font-semibold mb-4">Current Conditions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-500" />
                  <p className="text-2xl font-bold">{weatherData.current.temperature}°C</p>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Droplet className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Wind className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                  <p className="text-2xl font-bold">{weatherData.current.windSpeed}</p>
                  <p className="text-sm text-muted-foreground">km/h Wind</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  {getWeatherIcon(weatherData.current.condition)}
                  <p className="text-sm font-medium mt-2">{weatherData.current.condition}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <h3 className="font-semibold mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weatherData.forecast.map((day, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <p className="font-medium mb-2">{day.day}</p>
                    {getWeatherIcon(day.condition)}
                    <p className="text-sm mt-2">{day.condition}</p>
                    <p className="text-sm font-bold">{day.high}°/{day.low}°</p>
                    <p className="text-xs text-blue-600">{day.rainfall}mm rain</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <h3 className="font-semibold mb-4">AI Agricultural Recommendations</h3>
            <div className="space-y-3">
              {weatherData.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5">AI</Badge>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherAnalysisPanel;
