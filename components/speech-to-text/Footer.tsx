import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-medium text-foreground/80">
            © {new Date().getFullYear()} Voice Editor Pro. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for seamless voice-to-text productivity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10 hover:text-primary transition-colors">
            <Github className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors">
            <Twitter className="w-4 h-4" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10 hover:text-blue-600 transition-colors">
            <Linkedin className="w-4 h-4" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10 hover:text-red-400 transition-colors">
            <Mail className="w-4 h-4" />
            <span className="sr-only">Contact</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
