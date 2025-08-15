
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Leaf, 
  Loader2, 
  LogOut, 
  User, 
  Bell, 
  AlertTriangle,
  CheckCircle,
  Info,
  Menu
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface MobileDashboardHeaderProps {
  farmData: any;
  alerts: any[];
}

const MobileDashboardHeader = ({ farmData, alerts }: MobileDashboardHeaderProps) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const { user, signOut, isDemoAccount } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/login', { replace: true });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <>
      {/* Demo Account Banner */}
      {isDemoAccount && (
        <div className="bg-green-600 text-white py-2 px-4">
          <div className="text-center text-xs sm:text-sm">
            🧪 <strong>Demo Account</strong> - Urban Roots AI demonstration data
          </div>
        </div>
      )}

      {/* Compact Mobile Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Leaf className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 truncate">Urban Roots AI</h1>
                <p className="text-xs text-gray-600 hidden sm:block">IoT Agricultural Intelligence</p>
              </div>
            </div>
            
            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8">
                    <Bell className="h-4 w-4" />
                    {alerts.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                        {alerts.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Real-Time Alerts</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start gap-2">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{alert.title}</div>
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{alert.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              {/* User Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <User className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Account</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="font-medium">{farmData.ownerName}</div>
                      <div className="text-sm text-muted-foreground">{farmData.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{farmData.location}</div>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="w-full justify-start"
                    >
                      {isSigningOut ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <LogOut className="h-4 w-4 mr-2" />
                      )}
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MobileDashboardHeader;
