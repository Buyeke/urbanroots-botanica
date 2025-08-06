
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, Thermometer, BarChart3, Leaf } from "lucide-react";

interface InsightsTabProps {
  translations: any;
  farmData: any;
  alerts: any[];
}

const InsightsTab = ({ translations, farmData, alerts }: InsightsTabProps) => {
  const insights = [
    {
      title: "Soil Moisture",
      value: "68%",
      status: "optimal",
      change: "+5%",
      icon: <Droplet className="h-4 w-4" />
    },
    {
      title: "Temperature",
      value: "22°C",
      status: "good",
      change: "+1°C",
      icon: <Thermometer className="h-4 w-4" />
    },
    {
      title: "Expected Yield",
      value: "125%",
      status: "excellent",
      change: "+15%",
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      title: "Growth Stage",
      value: "Flowering",
      status: "on-track",
      change: "On schedule",
      icon: <Leaf className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'optimal':
      case 'good':
      case 'on-track':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {insight.title}
              </CardTitle>
              {insight.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className={getStatusColor(insight.status)}>
                  {insight.status}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {insight.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{alert.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{alert.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                </div>
                <Badge variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                  {alert.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsTab;
