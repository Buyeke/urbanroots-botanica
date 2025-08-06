
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Phone, Mail, FileText } from "lucide-react";

interface SupportTabProps {
  translations: any;
}

const SupportTab = ({ translations }: SupportTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief description of your issue" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Describe your issue in detail..."
                rows={4}
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

        {/* Quick Help */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              User Guide
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Schedule a Call
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">How do I update my farm information?</h4>
              <p className="text-sm text-muted-foreground">
                Go to the Account tab to update your farm name, location, and other details.
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">How accurate are the soil analysis results?</h4>
              <p className="text-sm text-muted-foreground">
                Our AI analysis provides estimates based on visual inspection. For precise measurements, we recommend professional soil testing.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Can I export my farm data?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can export your data from the Account settings. We support CSV and PDF formats.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTab;
