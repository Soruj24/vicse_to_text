import { AlertCircle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BrowserUnsupported() {
  return (
    <Card className="max-w-lg mx-auto mt-24 mb-24 border-destructive/20 bg-destructive/5 shadow-xs rounded-xl">
      <CardHeader className="text-center p-8 md:p-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight mb-3">Browser Not Supported</CardTitle>
        <CardDescription className="text-base leading-relaxed max-w-md mx-auto">
          Your browser doesn&apos;t support the Web Speech API. Please use the latest version of <span className="font-medium text-foreground">Chrome</span>, <span className="font-medium text-foreground">Edge</span>, or <span className="font-medium text-foreground">Safari</span>.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}