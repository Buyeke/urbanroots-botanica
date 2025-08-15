
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import ProfileEditForm from "@/components/ProfileEditForm";
import ProfileHistory from "@/components/ProfileHistory";
import SecurityWrapper from "@/components/SecurityWrapper";
import { User, History } from "lucide-react";

const AccountSettingsPage = () => {
  const { user, profile } = useAuth();

  return (
    <SecurityWrapper 
      requireAuth={true}
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">Please log in to access account settings.</p>
          </div>
        </div>
      }
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Account Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile information and view your change history.
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full lg:w-fit grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Edit Profile
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Change History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileEditForm />
            </TabsContent>

            <TabsContent value="history">
              <ProfileHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SecurityWrapper>
  );
};

export default AccountSettingsPage;
