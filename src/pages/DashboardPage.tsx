
import { useState } from "react";
import { Droplet, Thermometer, BarChart3, Leaf } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DemoAccountBanner from "@/components/DemoAccountBanner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightsGrid from "@/components/dashboard/InsightsGrid";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

const DashboardPage = () => {
  const { user, isDemoAccount } = useAuth();
  
  // Settings state
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {isDemoAccount && <DemoAccountBanner />}
        
        <DashboardHeader 
          farmData={farmData}
          alerts={alerts}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          translations={t}
        />

        <div className="container mx-auto p-6">
          <InsightsGrid insights={insights} />
          
          <DashboardTabs 
            translations={t}
            farmData={farmData}
            alerts={alerts}
            recentOrders={recentOrders}
            temperatureUnit={temperatureUnit}
            setTemperatureUnit={setTemperatureUnit}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
