import { AlertCircle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BrowserUnsupported() {
  return (
    <Card className="max-w-2xl mx-auto border-destructive/50 bg-destructive/5 mt-20 mb-20">
      <CardHeader className="text-center p-6 md:p-10">
        <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-destructive mx-auto mb-4 md:mb-6" />
        <CardTitle className="text-xl md:text-3xl">Browser Not Supported</CardTitle>
        <CardDescription className="text-sm md:text-lg mt-2">
          Your browser doesn&apos;t support the Web Speech API. Please use Chrome, Edge, or Safari for the best experience.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
