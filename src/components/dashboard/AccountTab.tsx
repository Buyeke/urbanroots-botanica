
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface AccountTabProps {
  translations: any;
  temperatureUnit: 'celsius' | 'fahrenheit';
  setTemperatureUnit: (unit: 'celsius' | 'fahrenheit') => void;
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
}

const AccountTab = ({ 
  translations, 
  temperatureUnit, 
  setTemperatureUnit, 
  language, 
  setLanguage 
}: AccountTabProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{translations.accountSettings}</CardTitle>
          <CardDescription>Customize your dashboard preferences and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4">{translations.profileInfo}</h4>
            <p className="text-sm text-muted-foreground mb-4">Update your personal and farm details</p>
            <Button variant="outline" onClick={() => navigate('/account-settings')}>
              Edit Profile
            </Button>
          </div>
          
          <div className="space-y-4 border-t pt-6">
            <h4 className="font-semibold">Display Preferences</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">{translations.tempUnit}</Label>
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
                <Label className="text-sm font-medium">{translations.languagePref}</Label>
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
    </div>
  );
};

export default AccountTab;
