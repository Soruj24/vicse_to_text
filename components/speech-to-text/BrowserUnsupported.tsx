import { AlertCircle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BrowserUnsupported() {
  return (
    <Card className="max-w-2xl mx-auto border-destructive/20 bg-destructive/5 mt-20 mb-20 backdrop-blur-xl shadow-2xl ring-1 ring-destructive/10">
      <CardHeader className="text-center p-6 md:p-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        <CardTitle className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Browser Not Supported</CardTitle>
        <CardDescription className="text-base md:text-xl leading-relaxed max-w-lg mx-auto">
          Your browser doesn&apos;t support the Web Speech API. Please use the latest version of <span className="font-semibold text-foreground">Chrome</span>, <span className="font-semibold text-foreground">Edge</span>, or <span className="font-semibold text-foreground">Safari</span> for the best experience.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
