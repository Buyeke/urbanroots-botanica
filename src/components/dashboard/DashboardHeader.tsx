
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, Settings, LogOut, AlertTriangle, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  priority: string;
}

interface DashboardHeaderProps {
  farmData: {
    ownerName: string;
    program: string;
    location: string;
  };
  alerts: Alert[];
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  translations: {
    recentAlerts: string;
  };
}

const DashboardHeader = ({ 
  farmData, 
  alerts, 
  notificationsOpen, 
  setNotificationsOpen,
  translations 
}: DashboardHeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of Urban Roots AI.",
    });
    navigate('/');
  };

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
    <div className="bg-background border-b px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">{translations.recentAlerts.includes('Welcome') ? `Welcome back, ${farmData.ownerName}!` : `Welcome back, ${farmData.ownerName}!`}</h1>
          <p className="text-muted-foreground">{farmData.program} • {farmData.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
                  {alerts.filter(a => a.priority === 'high').length}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
              <div className="border-b p-4">
                <h3 className="font-semibold text-sm">{translations.recentAlerts}</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border-l-4 ${getPriorityColor(alert.priority)} border-b last:border-b-0`}>
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">{alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-3">
                <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                  <Link to="/farm">View All Sensor Data</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
