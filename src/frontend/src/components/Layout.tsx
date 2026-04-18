import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <footer className="bg-card border-t border-border/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-foreground">
              GameBazaar
            </span>
            <span>·</span>
            <span>Global Games, Local Payouts</span>
          </div>
          <div className="text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              caffeine.ai
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:support@gamebazaar.np"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <span>Nepal 🇳🇵</span>
          </div>
        </div>
      </footer>
      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}
