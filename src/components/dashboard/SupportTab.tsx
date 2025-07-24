
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface SupportTabProps {
  translations: any;
}

const SupportTab = ({ translations }: SupportTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{translations.getSupport}</CardTitle>
          <CardDescription>Expert assistance for your agricultural technology deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-6 flex flex-col items-start gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold">{translations.liveChat}</div>
                <div className="text-sm text-muted-foreground">{translations.chatDesc}</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-6 flex flex-col items-start gap-2" asChild>
              <Link to="/contact">
                <Users className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">{translations.contactExpert}</div>
                  <div className="text-sm text-muted-foreground">{translations.expertDesc}</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTab;
