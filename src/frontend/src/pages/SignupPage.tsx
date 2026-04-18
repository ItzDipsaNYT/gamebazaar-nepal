import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, Gamepad2, Lock, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { apiSignUp, useActor } from "../lib/api";
import { useAuthStore } from "../store/authStore";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { actor } = useActor();
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await apiSignUp(actor, email, password);
      login(token, user);
      toast.success("Account created!", {
        description: "Welcome to GameBazaar Nepal 🎮",
      });
      router.navigate({ to: "/dashboard" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign up failed. Please try again.",
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
            Create Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Join GameBazaar Nepal — free forever
          </p>
        </div>

        <div className="glass-card-strong rounded-2xl p-8 neon-glow-purple">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            data-ocid="signup.form"
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
                  data-ocid="signup.email.input"
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
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 bg-background/50 border-border/60 focus:border-primary/60"
                  data-ocid="signup.password.input"
                  autoComplete="new-password"
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="pl-9 bg-background/50 border-border/60 focus:border-primary/60"
                  data-ocid="signup.confirm_password.input"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {error && (
              <div
                data-ocid="signup.error_state"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              data-ocid="signup.submit_button"
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold gap-2 mt-1"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
              data-ocid="signup.login.link"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
