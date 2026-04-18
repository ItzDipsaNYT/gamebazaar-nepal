import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Gamepad2,
  LogOut,
  Menu,
  Shield,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { apiLogout, useActor } from "../lib/api";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isStaff, user, token, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const { actor } = useActor();
  const router = useRouter();

  const handleLogout = async () => {
    if (token) {
      try {
        await apiLogout(actor, token);
      } catch {
        /* ignore */
      }
    }
    logout();
    router.navigate({ to: "/" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.logo.link"
        >
          <div className="floating">
            <img
              src="/assets/generated/gamebazaar-logo-transparent.dim_200x200.png"
              alt="GameBazaar Nepal"
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
              GameBazaar
            </span>
            <span className="text-[10px] text-muted-foreground">
              Global Games, Local Payouts
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              activeProps={{
                className:
                  "text-primary bg-primary/10 hover:bg-primary/15 hover:text-primary",
              }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Cart */}
          <Link to="/cart" data-ocid="nav.cart.link">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-muted/50"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-0">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              {isStaff && (
                <Link to="/admin" data-ocid="nav.admin.link">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-primary/40 text-primary hover:bg-primary/10"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link to="/dashboard" data-ocid="nav.dashboard.link">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{user?.email}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                data-ocid="nav.logout.button"
                className="gap-1.5 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" data-ocid="nav.login.link">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup" data-ocid="nav.signup.link">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/80 text-primary-foreground gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          <Link to="/staff-login" data-ocid="nav.staff_login.link">
            <Button
              variant="outline"
              size="sm"
              className="border-accent/40 text-accent hover:bg-accent/10 gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              Staff
            </Button>
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/cart" data-ocid="nav.cart_mobile.link">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-0">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-ocid="nav.mobile_menu.button"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-card border-border/60 p-6"
            >
              <div className="flex flex-col gap-1 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                    activeProps={{ className: "text-primary bg-primary/10" }}
                    activeOptions={{ exact: link.to === "/" }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border/40 my-2" />
                {isAuthenticated ? (
                  <>
                    {isStaff && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center gap-2 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-primary/10"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                <Link
                  to="/staff-login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-accent hover:bg-accent/10 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Staff Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
