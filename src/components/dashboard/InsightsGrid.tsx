
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Insight {
  title: string;
  value: string;
  status: string;
  change: string;
  icon: React.ReactNode;
}

interface InsightsGridProps {
  insights: Insight[];
}

const InsightsGrid = ({ insights }: InsightsGridProps) => {
  return (
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
              <span className={`${insight.change.includes('+') ? 'text-success' : 'text-info'}`}>
                {insight.change}
              </span>
              {' '}from last week
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InsightsGrid;
