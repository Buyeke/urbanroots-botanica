
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock } from "lucide-react";

interface AnalysisResultsProps {
  analysis: string | null;
  isAnalyzing: boolean;
  timestamp?: string;
}

const AnalysisResults = ({ analysis, isAnalyzing, timestamp }: AnalysisResultsProps) => {
  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 animate-spin" />
            Analyzing Soil Sample...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-muted-foreground">
                Our AI is analyzing your soil sample image...
              </p>
              <p className="text-sm text-muted-foreground">
                This may take a few moments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  // Parse the analysis into sections for better display
  const sections = analysis.split(/\n\s*\n/).filter(section => section.trim());
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Soil Analysis Results
          </CardTitle>
          {timestamp && (
            <Badge variant="outline">
              {new Date(timestamp).toLocaleTimeString()}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96 w-full">
          <div className="space-y-4">
            {sections.map((section, index) => {
              const lines = section.split('\n');
              const title = lines[0];
              const content = lines.slice(1).join('\n');

              // Check if this looks like a section header
              const isSection = title.includes('**') || title.includes(':') || title.match(/^\d+\./);

              return (
                <div key={index} className="space-y-2">
                  {isSection ? (
                    <>
                      <h4 className="font-semibold text-foreground">
                        {title.replace(/\*\*/g, '').replace(/^\d+\.\s*/, '')}
                      </h4>
                      {content.trim() && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {content.trim()}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section}
                    </p>
                  )}
                  {index < sections.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
