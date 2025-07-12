
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, AlertTriangle, Leaf, Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface InsightsTabProps {
  translations: any;
  farmData: any;
  alerts: any[];
}

const InsightsTab = ({ translations, farmData, alerts }: InsightsTabProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success': return <Leaf className="h-4 w-4 text-success" />;
      default: return <Bell className="h-4 w-4 text-info" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      default: return 'border-l-success bg-success/5';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>IoT Sensor Network</CardTitle>
            <CardDescription>Live data from deployed TEROS, ATMOS, and ZL6 systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Real-time sensor dashboard</p>
                <Button asChild size="sm">
                  <Link to="/farm">View Live Data</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{translations.recentAlerts}</CardTitle>
            <CardDescription>AI-powered insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${getPriorityColor(alert.priority)}`}>
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{translations.farmOverview}</CardTitle>
          <CardDescription>Multi-plot testing program spanning {farmData.size}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Testing Location</h4>
              <p className="text-muted-foreground">{farmData.location}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Coverage Area</h4>
              <p className="text-muted-foreground">{farmData.size}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Monitored Crops</h4>
              <div className="flex flex-wrap gap-1">
                {farmData.crops.map((crop: string, index: number) => (
                  <Badge key={index} variant="secondary">{crop}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsTab;
