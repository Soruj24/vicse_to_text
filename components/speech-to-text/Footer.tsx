import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-border bg-background/50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} VoiceFlow. All rights reserved.</p>
          <p className="text-xs text-muted-foreground/60">Built for seamless voice-to-text productivity.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted transition-colors">
            <Github className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted transition-colors">
            <Twitter className="w-4 h-4" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted transition-colors">
            <Linkedin className="w-4 h-4" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted transition-colors">
            <Mail className="w-4 h-4" />
            <span className="sr-only">Contact</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
