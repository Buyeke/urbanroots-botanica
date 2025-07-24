
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsightsTab from "./InsightsTab";
import OrdersTab from "./OrdersTab";
import SupportTab from "./SupportTab";
import AccountTab from "./AccountTab";

interface DashboardTabsProps {
  translations: any;
  farmData: any;
  alerts: any[];
  recentOrders: any[];
  temperatureUnit: 'celsius' | 'fahrenheit';
  setTemperatureUnit: (unit: 'celsius' | 'fahrenheit') => void;
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
}

const DashboardTabs = ({
  translations,
  farmData,
  alerts,
  recentOrders,
  temperatureUnit,
  setTemperatureUnit,
  language,
  setLanguage
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="insights" className="space-y-6">
      <TabsList className="grid w-full lg:w-fit grid-cols-4">
        <TabsTrigger value="insights">{translations.farmInsights}</TabsTrigger>
        <TabsTrigger value="orders">{translations.orders}</TabsTrigger>
        <TabsTrigger value="support">{translations.support}</TabsTrigger>
        <TabsTrigger value="account">{translations.account}</TabsTrigger>
      </TabsList>

      <TabsContent value="insights">
        <InsightsTab 
          translations={translations}
          farmData={farmData}
          alerts={alerts}
        />
      </TabsContent>

      <TabsContent value="orders">
        <OrdersTab 
          translations={translations}
          recentOrders={recentOrders}
        />
      </TabsContent>

      <TabsContent value="support">
        <SupportTab translations={translations} />
      </TabsContent>

      <TabsContent value="account">
        <AccountTab 
          translations={translations}
          temperatureUnit={temperatureUnit}
          setTemperatureUnit={setTemperatureUnit}
          language={language}
          setLanguage={setLanguage}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
