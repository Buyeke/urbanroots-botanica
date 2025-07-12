
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { History, Clock } from "lucide-react";
import { format } from "date-fns";

interface ProfileHistoryItem {
  id: string;
  field_name: string;
  old_value: string | null;
  new_value: string | null;
  changed_at: string;
}

const ProfileHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ProfileHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        console.log('Fetching profile history for user:', user.id);
        const { data, error } = await supabase
          .from('profile_history')
          .select('id, field_name, old_value, new_value, changed_at')
          .eq('changed_by', user.id)
          .order('changed_at', { ascending: false });

        if (error) {
          console.error('Error fetching profile history:', error);
        } else {
          console.log('Profile history data:', data);
          setHistory(data || []);
        }
      } catch (error) {
        console.error('Profile history fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const formatFieldName = (fieldName: string) => {
    return fieldName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatValue = (value: string | null) => {
    return value || '(empty)';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Profile History
          </CardTitle>
          <CardDescription>Loading your profile change history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Profile History
        </CardTitle>
        <CardDescription>
          A complete log of all changes made to your profile information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No profile changes recorded yet.</p>
            <p className="text-sm">Update your profile to see changes logged here.</p>
          </div>
        ) : (
          <ScrollArea className="h-96 w-full">
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 border rounded-lg bg-secondary/20"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {formatFieldName(item.field_name)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(item.changed_at), 'MMM dd, yyyy at HH:mm')}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                          {formatValue(item.old_value)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">To:</span>
                        <span className="font-mono text-xs bg-primary/10 px-2 py-1 rounded">
                          {formatValue(item.new_value)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileHistory;
