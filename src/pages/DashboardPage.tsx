
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Leaf, Users, TrendingUp, Bell, Settings, LogOut, Package, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  // User-specific farm data
  const farmData = {
    name: user?.user_metadata?.farm_name || "Your Farm",
    location: user?.user_metadata?.location || "Your Location",
    size: "15 acres",
    crops: ["Tomatoes", "Lettuce", "Carrots"],
    lastUpdate: "2 hours ago",
    ownerName: `${user?.user_metadata?.first_name || 'Farmer'} ${user?.user_metadata?.last_name || ''}`.trim()
  };

  const insights = [
    {
      title: "Soil Moisture",
      value: "68%",
      status: "optimal",
      change: "+5%",
      icon: <Leaf className="h-4 w-4" />
    },
    {
      title: "Temperature",
      value: "72°F",
      status: "good",
      change: "+2°F",
      icon: <TrendingUp className="h-4 w-4" />
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

  const recentOrders = [
    { id: "ORD-001", item: "IoT Soil Sensors (5-pack)", status: "Shipped", date: "Jun 10, 2025" },
    { id: "ORD-002", item: "Weather Station Kit", status: "Processing", date: "Jun 8, 2025" },
    { id: "ORD-003", item: "Premium Subscription", status: "Active", date: "Jun 1, 2025" }
  ];

  const notifications = [
    { type: "alert", message: "Soil moisture in Field A is below optimal levels", time: "2 hours ago" },
    { type: "info", message: "Weather forecast shows rain expected tomorrow", time: "5 hours ago" },
    { type: "success", message: "Your tomato crop growth is 15% above average", time: "1 day ago" }
  ];

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Header */}
      <div className="bg-background border-b px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Welcome back, {farmData.ownerName}!</h1>
            <p className="text-muted-foreground">{farmData.name} • {farmData.location}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
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
        {/* Farm Overview */}
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
                  <span className={`${insight.change.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
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
            <TabsTrigger value="insights">Farm Insights</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real-Time Monitoring</CardTitle>
                  <CardDescription>Live data from your IoT sensors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive charts and graphs coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Important notifications about your farm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                        <Bell className="h-4 w-4 text-primary mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Farm Details</CardTitle>
                <CardDescription>Overview of your farming operation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-muted-foreground">{farmData.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Farm Size</h4>
                    <p className="text-muted-foreground">{farmData.size}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Current Crops</h4>
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
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track your equipment and subscription orders</CardDescription>
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
                        order.status === 'Shipped' ? 'default' : 
                        order.status === 'Processing' ? 'secondary' : 'outline'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Support</CardTitle>
                <CardDescription>We're here to help you succeed with your farming goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-start gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Live Chat</div>
                      <div className="text-sm text-muted-foreground">Get instant help from our support team</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-start gap-2" asChild>
                    <Link to="/contact">
                      <Users className="h-6 w-6 text-primary" />
                      <div className="text-left">
                        <div className="font-semibold">Contact Expert</div>
                        <div className="text-sm text-muted-foreground">Schedule a call with an agronomist</div>
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
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Profile Information</h4>
                    <p className="text-sm text-muted-foreground mb-4">Update your personal and farm details</p>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Subscription</h4>
                    <p className="text-sm text-muted-foreground mb-4">Premium Plan - Active until July 1, 2025</p>
                    <Button variant="outline">Manage Subscription</Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Notifications</h4>
                    <p className="text-sm text-muted-foreground mb-4">Configure how you receive updates and alerts</p>
                    <Button variant="outline">Notification Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
