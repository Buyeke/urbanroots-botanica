
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

interface OrdersTabProps {
  translations: any;
  recentOrders: any[];
}

const OrdersTab = ({ translations, recentOrders }: OrdersTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{translations.orderHistory}</CardTitle>
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
    </div>
  );
};

export default OrdersTab;
