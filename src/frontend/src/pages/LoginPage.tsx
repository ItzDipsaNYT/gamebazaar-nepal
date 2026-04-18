import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import { ChevronRight, Eye, EyeOff, Gamepad2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { apiLogin, useActor } from "../lib/api";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { actor } = useActor();
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await apiLogin(actor, email, password);
      login(token, user);
      toast.success("Welcome back!", {
        description: `Logged in as ${user.email}`,
      });
      router.navigate({ to: "/dashboard" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 hero-gradient">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="floating">
              <img
                src="/assets/generated/gamebazaar-logo-transparent.dim_200x200.png"
                alt="GameBazaar Nepal"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your GameBazaar account
          </p>
        </div>

        <div className="glass-card-strong rounded-2xl p-8 neon-glow-purple">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            data-ocid="login.form"
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
                  placeholder="gamer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-background/50 border-border/60 focus:border-primary/60"
                  data-ocid="login.email.input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 bg-background/50 border-border/60 focus:border-primary/60"
                  data-ocid="login.password.input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                data-ocid="login.error_state"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              data-ocid="login.submit_button"
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold gap-2 mt-1"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Gamepad2 className="w-4 h-4" />
              )}
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 space-y-3 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
                data-ocid="login.signup_link"
              >
                Create one
              </Link>
            </p>
            <div className="border-t border-border/30 pt-3">
              <Link
                to="/staff-login"
                className="inline-flex items-center gap-1 text-accent hover:text-accent/80 font-medium transition-colors text-xs"
                data-ocid="login.staff_link"
              >
                Staff? Login here
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
