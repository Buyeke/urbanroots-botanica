import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Droplet, Sun, Cloud, Bell } from "lucide-react";
import SensorDataPanel from "@/components/farm/SensorDataPanel";
import FarmHealthOverview from "@/components/farm/FarmHealthOverview";
import FarmMapView from "@/components/farm/FarmMapView";
import RecommendationsPanel from "@/components/farm/RecommendationsPanel";
import WeatherForecast from "@/components/farm/WeatherForecast";

export default function FarmDashboard() {
  const [language, setLanguage] = useState("en");
  const [refreshing, setRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastSync(new Date());
    }, 2000);
  };

  const languages = {
    en: "English",
    sw: "Kiswahili", 
    fr: "Français"
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Urban Roots AI</h1>
            <p className="text-muted-foreground text-sm">Farm Dashboard</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([code, name]) => (
                  <SelectItem key={code} value={code} className="text-xs">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-8 px-3 text-xs"
            >
              {refreshing ? (
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-primary border-t-transparent" />
              ) : (
                "↻"
              )}
            </Button>
          </div>
        </div>

        {/* Sync Status */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>Last synced: {formatTime(lastSync)}</span>
          <Badge variant="secondary" className="text-xs py-0 px-2">
            Simulated
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-9">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="sensors" className="text-xs">Sensors</TabsTrigger>
          <TabsTrigger value="map" className="text-xs">Map</TabsTrigger>
          <TabsTrigger value="tips" className="text-xs">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <FarmHealthOverview language={language} />
          <WeatherForecast language={language} />
        </TabsContent>

        <TabsContent value="sensors" className="space-y-4">
          <SensorDataPanel language={language} />
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <FarmMapView language={language} />
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <RecommendationsPanel language={language} />
        </TabsContent>
      </Tabs>
    </div>
  );
}