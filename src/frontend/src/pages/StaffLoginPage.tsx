import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, KeyRound, Mail, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { apiStaffLogin, useActor } from "../lib/api";
import { useAuthStore } from "../store/authStore";

export default function StaffLoginPage() {
  const [email, setEmail] = useState("");
  const [staffCode, setStaffCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { actor } = useActor();
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !staffCode) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await apiStaffLogin(actor, email, staffCode);
      login(token, user);
      toast.success("Staff access granted!", {
        description: "Welcome to the admin panel.",
      });
      router.navigate({ to: "/admin" });
    } catch {
      // Generic error only — never reveal which credential was wrong or expose backend messages
      setError("Invalid credentials. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 hero-gradient">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/30 neon-glow-cyan">
              <Shield className="w-12 h-12 text-accent" />
            </div>
          </div>
          <Badge className="mb-3 bg-accent/15 text-accent border-accent/30 gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Staff Only
          </Badge>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            Staff Login
          </h1>
          <p className="text-muted-foreground text-sm">
            Authorized personnel only. All access attempts are logged.
          </p>
        </div>

        <div className="glass-card-strong rounded-2xl p-8 neon-glow-cyan">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            data-ocid="staff_login.form"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="staff@gamebazaar.np"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-background/50 border-border/60 focus:border-accent/60"
                  data-ocid="staff_login.email.input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="staffCode" className="text-sm font-medium">
                Staff Code
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="staffCode"
                  type={showCode ? "text" : "password"}
                  placeholder="Enter your staff code"
                  value={staffCode}
                  onChange={(e) => setStaffCode(e.target.value)}
                  className="pl-9 pr-10 bg-background/50 border-border/60 focus:border-accent/60"
                  data-ocid="staff_login.staff_code.input"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle code visibility"
                >
                  {showCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Code is verified securely on the backend — never exposed in the
                browser.
              </p>
            </div>

            {error && (
              <div
                data-ocid="staff_login.error_state"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              data-ocid="staff_login.submit_button"
              className="bg-accent hover:bg-accent/80 text-accent-foreground font-semibold gap-2 mt-1"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              {loading ? "Verifying..." : "Access Admin Panel"}
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="staff_login.back_link"
          >
            ← Back to regular login
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          This page is for authorized staff only. Unauthorized access attempts
          will be rejected.
        </p>
      </div>
    </div>
  );
}
