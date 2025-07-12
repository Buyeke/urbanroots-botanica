import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, Leaf, Users, TrendingUp, Bell, Settings, LogOut, Package, MessageCircle, Thermometer, Globe, AlertTriangle, Droplet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import DemoAccountBanner from "@/components/DemoAccountBanner";

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDemoAccount } = useAuth();
  
  // Settings state
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of Urban Roots AI.",
    });
    navigate('/');
  };

  // Translations
  const translations = {
    en: {
      welcome: "Welcome back",
      farmOverview: "Farm Technology Overview",
      subtitle: "IoT-Powered Agricultural Intelligence Platform",
      soilMoisture: "Soil Moisture",
      temperature: "Temperature", 
      expectedYield: "Expected Yield",
      growthStage: "Growth Stage",
      farmInsights: "Farm Analytics",
      orders: "Equipment Orders",
      support: "Technical Support", 
      account: "Account Settings",
      recentAlerts: "Real-Time Alerts",
      orderHistory: "Order History",
      getSupport: "Get Technical Support",
      liveChat: "Live Chat Support",
      contactExpert: "Contact Agricultural Expert",
      chatDesc: "Get instant help from our technical support team",
      expertDesc: "Schedule a consultation with an agricultural specialist",
      accountSettings: "Account Preferences",
      profileInfo: "Profile Information",
      subscription: "Technology Subscription",
      notifications: "Alert Preferences",
      tempUnit: "Temperature Unit",
      languagePref: "Language Preference"
    },
    fr: {
      welcome: "Bon retour",
      farmOverview: "Aperçu de la Technologie Agricole", 
      subtitle: "Plateforme d'Intelligence Agricole IoT",
      soilMoisture: "Humidité du Sol",
      temperature: "Température",
      expectedYield: "Rendement Attendu", 
      growthStage: "Stade de Croissance",
      farmInsights: "Analyses Agricoles",
      orders: "Commandes d'Équipement",
      support: "Support Technique",
      account: "Paramètres du Compte",
      recentAlerts: "Alertes en Temps Réel",
      orderHistory: "Historique des Commandes", 
      getSupport: "Obtenir un Support Technique",
      liveChat: "Support Chat en Direct",
      contactExpert: "Contacter un Expert Agricole",
      chatDesc: "Obtenez une aide instantanée de notre équipe de support technique",
      expertDesc: "Planifiez une consultation avec un spécialiste agricole",
      accountSettings: "Préférences du Compte",
      profileInfo: "Informations de Profil",
      subscription: "Abonnement Technologique", 
      notifications: "Préférences d'Alerte",
      tempUnit: "Unité de Température",
      languagePref: "Préférence de Langue"
    }
  };

  const t = translations[language];

  // Convert temperature based on unit preference
  const convertTemp = (fahrenheit: number) => {
    if (temperatureUnit === 'celsius') {
      return `${Math.round((fahrenheit - 32) * 5/9)}°C`;
    }
    return `${fahrenheit}°F`;
  };

  // User-specific farm data for 40-acre testing operation
  const farmData = {
    name: user?.user_metadata?.farm_name || "Test Farm Network",
    location: user?.user_metadata?.location || "Multi-Site Testing Program",
    size: "40 acres across multiple smallholder plots",
    crops: ["Maize", "Tomatoes", "Beans", "Leafy Greens"],
    lastUpdate: "2 minutes ago",
    ownerName: `${user?.user_metadata?.first_name || 'Farm'} ${user?.user_metadata?.last_name || 'Manager'}`.trim(),
    program: "Urban Roots AI Pilot Program"
  };

  const insights = [
    {
      title: t.soilMoisture,
      value: "68%",
      status: "optimal",
      change: "+5%",
      icon: <Droplet className="h-4 w-4" />
    },
    {
      title: t.temperature,
      value: convertTemp(72),
      status: "good", 
      change: temperatureUnit === 'celsius' ? "+1°C" : "+2°F",
      icon: <Thermometer className="h-4 w-4" />
    },
    {
      title: t.expectedYield,
      value: "125%",
      status: "excellent",
      change: "+15%",
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      title: t.growthStage,
      value: "Flowering",
      status: "on-track", 
      change: "On schedule",
      icon: <Leaf className="h-4 w-4" />
    }
  ];

  const recentOrders = [
    { id: "ORD-001", item: "TEROS 12 Soil Sensors (5-pack)", status: "Deployed", date: "Jun 10, 2025" },
    { id: "ORD-002", item: "ATMOS 41 Weather Station", status: "Active", date: "Jun 8, 2025" },
    { id: "ORD-003", item: "ZL6 Data Logger + Cellular", status: "Monitoring", date: "Jun 1, 2025" }
  ];

  // Real-time alerts for investor demo
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Irrigation Alert - Plot 2", 
      message: "Soil moisture detected at 35% in maize section. Irrigation recommended within 4 hours.",
      time: "12 minutes ago",
      priority: "high"
    },
    {
      id: 2,
      type: "info",
      title: "Weather Intelligence",
      message: "Forecasted rainfall (15mm) in next 18 hours. Delay scheduled irrigation for plots 3-5.",
      time: "45 minutes ago", 
      priority: "medium"
    },
    {
      id: 3,
      type: "success",
      title: "Growth Milestone",
      message: "Tomato crop in Plot 1 showing 18% above-average growth rate. AI recommends maintaining current nutrition protocol.",
      time: "2 hours ago",
      priority: "low"
    },
    {
      id: 4,
      type: "warning", 
      title: "Sensor Connectivity",
      message: "TEROS sensor #3 offline for 15 minutes. Backup readings from adjacent sensors active.",
      time: "3 hours ago",
      priority: "medium"
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {isDemoAccount && <DemoAccountBanner />}
        
        {/* Header */}
        <div className="bg-background border-b px-6 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">{t.welcome}, {farmData.ownerName}!</h1>
              <p className="text-muted-foreground">{farmData.program} • {farmData.location}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications Dropdown */}
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
                    <h3 className="font-semibold text-sm">{t.recentAlerts}</h3>
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

        <div className="container mx-auto p-6">
          {/* Technology Overview Stats */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                  {insight.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insight.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={`${insight.change.includes('+') ? 'text-success' : 'text-info'}`}>
                      {insight.change}
                    </span>
                    {' '}from last week
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full lg:w-fit grid-cols-4">
              <TabsTrigger value="insights">{t.farmInsights}</TabsTrigger>
              <TabsTrigger value="orders">{t.orders}</TabsTrigger>
              <TabsTrigger value="support">{t.support}</TabsTrigger>
              <TabsTrigger value="account">{t.account}</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-6">
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
                    <CardTitle>{t.recentAlerts}</CardTitle>
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
                  <CardTitle>{t.farmOverview}</CardTitle>
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
                        {farmData.crops.map((crop, index) => (
                          <Badge key={index} variant="secondary">{crop}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.orderHistory}</CardTitle>
                  <CardDescription>IoT equipment deployment and technology subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{order.item}</p>
                            <p className="text-sm text-muted-foreground">Order {order.id} • {order.date}</p>
                          </div>
                        </div>
                        <Badge variant={
                          order.status === 'Deployed' ? 'default' : 
                          order.status === 'Active' ? 'secondary' : 'outline'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/products">Browse Equipment Catalog</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.getSupport}</CardTitle>
                  <CardDescription>Expert assistance for your agricultural technology deployment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto p-6 flex flex-col items-start gap-2">
                      <MessageCircle className="h-6 w-6 text-primary" />
                      <div className="text-left">
                        <div className="font-semibold">{t.liveChat}</div>
                        <div className="text-sm text-muted-foreground">{t.chatDesc}</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-6 flex flex-col items-start gap-2" asChild>
                      <Link to="/contact">
                        <Users className="h-6 w-6 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold">{t.contactExpert}</div>
                          <div className="text-sm text-muted-foreground">{t.expertDesc}</div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.accountSettings}</CardTitle>
                  <CardDescription>Customize your dashboard preferences and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">{t.profileInfo}</h4>
                    <p className="text-sm text-muted-foreground mb-4">Update your personal and farm details</p>
                    <Button variant="outline" onClick={() => navigate('/account-settings')}>
                      Edit Profile
                    </Button>
                  </div>
                  
                  <div className="space-y-4 border-t pt-6">
                    <h4 className="font-semibold">Display Preferences</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">{t.tempUnit}</Label>
                        <p className="text-xs text-muted-foreground">Choose temperature display format</p>
                      </div>
                      <Select value={temperatureUnit} onValueChange={(value: 'celsius' | 'fahrenheit') => setTemperatureUnit(value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celsius">Celsius (°C)</SelectItem>
                          <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">{t.languagePref}</Label>
                        <p className="text-xs text-muted-foreground">Select your preferred language</p>
                      </div>
                      <Select value={language} onValueChange={(value: 'en' | 'fr') => setLanguage(value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-2">Technology Subscription</h4>
                    <p className="text-sm text-muted-foreground mb-4">Premium IoT Analytics Plan - Active until July 1, 2025</p>
                    <Button variant="outline">Manage Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
