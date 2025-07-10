
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const DemoAccountBanner = () => {
  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50/50">
      <Info className="h-4 w-4 text-blue-700" />
      <AlertDescription className="text-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">You are using a test investor account</p>
            <p className="text-sm mt-1">
              This demo provides read-only access to showcase our platform capabilities. 
              Some features are limited to protect demo data integrity.
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              <Link to="/signup">
                Create Account
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default DemoAccountBanner;
