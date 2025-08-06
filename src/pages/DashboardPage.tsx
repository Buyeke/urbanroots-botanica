
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
  Info
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

const DashboardPage = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  
  const { user, loading, signOut, isDemoAccount } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

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

  // Convert temperature
  const convertTemp = (fahrenheit: number) => {
    if (temperatureUnit === 'celsius') {
      return `${Math.round((fahrenheit - 32) * 5/9)}°C`;
    }
    return `${fahrenheit}°F`;
  };

  // Farm data
  const farmData = {
    name: user?.user_metadata?.farm_name || "Test Farm Network",
    location: user?.user_metadata?.location || "Multi-Site Testing Program",
    size: "40 acres across multiple smallholder plots",
    ownerName: `${user?.user_metadata?.first_name || 'Farm'} ${user?.user_metadata?.last_name || 'Manager'}`.trim(),
  };

  const alerts = [
    {
      id: 1,
      type: "warning" as const,
      title: "Irrigation Alert - Plot 2",
      message: "Soil moisture detected at 35% in maize section. Irrigation recommended within 4 hours.",
      time: "12 minutes ago",
      priority: "high" as const
    },
    {
      id: 2,
      type: "info" as const,
      title: "Weather Intelligence",
      message: "Forecasted rainfall (15mm) in next 18 hours. Delay scheduled irrigation for plots 3-5.",
      time: "45 minutes ago",
      priority: "medium" as const
    },
    {
      id: 3,
      type: "success" as const,
      title: "Growth Milestone",
      message: "Tomato crop in Plot 1 showing 18% above-average growth rate.",
      time: "2 hours ago",
      priority: "low" as const
    }
  ];

  const recentOrders = [
    {
      id: 1,
      product: "Organic Fertilizer",
      quantity: "50kg",
      status: "delivered",
      date: "2024-01-15"
    },
    {
      id: 2,
      product: "Seeds - Tomato",
      quantity: "2kg",
      status: "shipped",
      date: "2024-01-20"
    }
  ];

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

  // Translations object
  const translations = {
    farmInsights: "Farm Insights",
    orders: "Orders",
    support: "Support",
    account: "Account"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Demo Account Banner */}
      {isDemoAccount && (
        <div className="bg-green-600 text-white py-2 px-4">
          <div className="container mx-auto text-center text-sm">
            🧪 <strong>Demo Account</strong> - You're viewing Urban Roots AI investor demonstration data
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Urban Roots AI</h1>
                <p className="text-sm text-gray-600">IoT-Powered Agricultural Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  {alerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {alerts.length}
                    </span>
                  )}
                </Button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Real-Time Alerts</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="p-3 border-b hover:bg-gray-50">
                          <div className="flex items-start gap-2">
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                              <div className="font-medium text-sm">{alert.title}</div>
                              <div className="text-xs text-gray-600 mt-1">{alert.message}</div>
                              <div className="text-xs text-gray-400 mt-1">{alert.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Welcome, {farmData.ownerName}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <LogOut className="h-4 w-4 mr-2" />
                )}
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Farm Overview */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{farmData.name}</h2>
                <p className="text-gray-600">{farmData.location}</p>
                <p className="text-sm text-gray-500">{farmData.size}</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Last Updated: 2 minutes ago
              </Badge>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <DashboardTabs
          translations={translations}
          farmData={farmData}
          alerts={alerts}
          recentOrders={recentOrders}
          temperatureUnit={temperatureUnit}
          setTemperatureUnit={setTemperatureUnit}
          language={language}
          setLanguage={setLanguage}
        />
      </main>
    </div>
  );
};

export default DashboardPage;
