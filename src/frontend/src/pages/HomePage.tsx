import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Gamepad2,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Twitter,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { apiGetProducts, useActor } from "../lib/api";

// ── CSS-only particle dots ──────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 2 + (i % 4),
  top: `${5 + ((i * 13) % 90)}%`,
  left: `${3 + ((i * 17) % 94)}%`,
  delay: `${(i * 0.4) % 6}s`,
  duration: `${4 + (i % 5)}s`,
  opacity: 0.15 + (i % 3) * 0.1,
}));

// ── Why choose us data ──────────────────────────────────────────────────────
const WHY_FEATURES = [
  {
    emoji: "⚡",
    title: "Fast Delivery",
    desc: "Digital products delivered instantly after payment confirmation. No waiting.",
    glow: "neon-glow-purple",
    accent: "text-primary",
  },
  {
    emoji: "🔒",
    title: "Secure Payment",
    desc: "eSewa & bank transfer. Every transaction is encrypted and protected.",
    glow: "neon-glow-cyan",
    accent: "text-accent",
  },
  {
    emoji: "💬",
    title: "24/7 Support",
    desc: "Our team never sleeps. Get help any time, any day of the week.",
    glow: "neon-glow-purple",
    accent: "text-green-400",
  },
  {
    emoji: "💎",
    title: "Best Prices",
    desc: "Premium global products at NPR-friendly prices. Unbeatable deals.",
    glow: "neon-glow-cyan",
    accent: "text-yellow-400",
  },
];

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Login", to: "/login" },
];

const STATS = [
  { value: "500+", label: "Happy Customers" },
  { value: "18+", label: "Products" },
  { value: "24/7", label: "Support" },
  { value: "NPR", label: "Local Pricing" },
];

// ── Fade-in hook using Intersection Observer ───────────────────────────────
function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-fade]");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    for (const el of Array.from(els)) obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

export default function HomePage() {
  const { actor, isFetching } = useActor();
  useFadeIn();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiGetProducts(actor),
    enabled: !!actor && !isFetching,
  });

  const featuredProducts = (
    products.filter((p) => p.featured).length >= 4
      ? products.filter((p) => p.featured)
      : products
  ).slice(0, 4);

  const scrollToProducts = () => {
    document
      .getElementById("featured-products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        data-ocid="home.hero.section"
        className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden"
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.62 0.24 307 / 0.25) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Radial gradient layers */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-background/50" />

        {/* CSS particle dots */}
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              background:
                p.id % 2 === 0
                  ? "oklch(0.62 0.24 307)"
                  : "oklch(0.72 0.18 196)",
              opacity: p.opacity,
              animation: `floating ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        {/* Large ambient orbs */}
        <div className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-primary/8 blur-3xl animate-pulse-slow pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-[15%] w-56 h-56 rounded-full bg-accent/8 blur-3xl animate-pulse-slow pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Floating logo */}
          <div className="flex justify-center mb-8">
            <div className="floating">
              <img
                src="/assets/generated/gamebazaar-logo-transparent.dim_200x200.png"
                alt="GameBazaar Nepal"
                className="w-24 h-24 object-contain drop-shadow-[0_0_20px_oklch(0.62_0.24_307/0.6)]"
              />
            </div>
          </div>

          <Badge className="mb-5 bg-primary/20 text-primary border-primary/40 gap-1.5 px-4 py-1 text-sm">
            <Gamepad2 className="w-3.5 h-3.5" />
            Nepal's #1 Digital Products Store
          </Badge>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-none mb-5 tracking-tight">
            <span className="gradient-text text-glow-purple block">
              Global Games,
            </span>
            <span className="text-foreground block mt-1">Local Payouts</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium digital subscriptions, game credits &amp; software at
            Nepal-friendly NPR prices. Instant delivery, secure payments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products" data-ocid="home.shop_now.primary_button">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 neon-glow-purple transition-smooth"
              >
                <Gamepad2 className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToProducts}
              data-ocid="home.view_products.secondary_button"
              className="gap-2 border-accent/50 text-accent hover:bg-accent/10 font-semibold px-8 transition-smooth"
            >
              View Products
            </Button>
          </div>

          {/* Scroll indicator */}
          <button
            type="button"
            onClick={scrollToProducts}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-80 transition-smooth cursor-pointer bg-transparent border-0"
            aria-label="Scroll to products"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-card/80 border-y border-border/40 py-6 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl gradient-text">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section
        id="featured-products"
        data-ocid="home.featured.section"
        className="py-20 px-4 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-12"
            data-fade
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <Badge className="mb-3 bg-primary/15 text-primary border-primary/30 gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Featured Products
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Top Picks for You
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hand-selected digital products at unbeatable NPR prices.
              Subscriptions, game credits, software and more.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map((product, i) => (
                <div
                  key={String(product.id)}
                  data-fade
                  style={{
                    opacity: 0,
                    transform: "translateY(24px)",
                    transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                  }}
                >
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 glass-card rounded-xl"
              data-ocid="home.featured.empty_state"
            >
              <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                Products coming soon. Check back!
              </p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" data-ocid="home.view_all.button">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-border/60 hover:border-primary/50 hover:text-primary transition-smooth"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section
        id="why-us"
        data-ocid="home.why_us.section"
        className="py-20 px-4 bg-muted/20"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.02 265) 0%, oklch(0.1 0.02 265) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-12"
            data-fade
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <Badge className="mb-3 bg-accent/15 text-accent border-accent/30 gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Why GameBazaar Nepal
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Built for Nepali Gamers
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine global products with local payment methods and support
              you trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                data-ocid={`home.why_us.item.${i + 1}`}
                data-fade
                style={{
                  opacity: 0,
                  transform: "translateY(28px)",
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                }}
                className={`glass-card rounded-xl p-7 flex flex-col gap-4 hover-lift ${feat.glow} text-center cursor-default`}
              >
                <div className="text-4xl">{feat.emoji}</div>
                <h3 className={`font-display font-bold text-lg ${feat.accent}`}>
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section
        data-ocid="home.cta.section"
        className="py-20 px-4 bg-background"
      >
        <div
          className="max-w-3xl mx-auto text-center glass-card-strong rounded-2xl p-12 neon-glow-purple relative overflow-hidden"
          data-fade
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
          <div className="relative z-10">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40 gap-1.5">
              <Star className="w-3.5 h-3.5" />
              Join 500+ Customers
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-5xl gradient-text mb-4">
              Ready to Level Up?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Hundreds of Nepali gamers already enjoy the best deals on digital
              products. It's your turn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" data-ocid="home.cta.signup_button">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/80 text-primary-foreground gap-2 font-semibold px-8 neon-glow-purple transition-smooth"
                >
                  <Gamepad2 className="w-5 h-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/products" data-ocid="home.cta.shop_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-accent/50 text-accent hover:bg-accent/10 px-8 transition-smooth"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        id="footer"
        data-ocid="home.footer.section"
        className="bg-card border-t border-border/50 pt-14 pb-6 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
            {/* Brand column */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/generated/gamebazaar-logo-transparent.dim_200x200.png"
                  alt="GameBazaar Nepal"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <div className="font-display font-bold text-lg gradient-text leading-none">
                    GameBazaar
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Global Games, Local Payouts
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nepal's premier digital products store. Premium subscriptions
                and game credits at prices you'll love.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      data-ocid={`home.footer.${link.label.toLowerCase()}.link`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-3 h-3 opacity-50" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
                Contact
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href="mailto:support@gamebazaar.np"
                    className="hover:text-primary transition-colors break-all"
                  >
                    support@gamebazaar.np
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>+977 9800000000</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Kathmandu, Nepal 🇳🇵</span>
                </li>
              </ul>

              {/* Social links */}
              <div className="mt-5">
                <h4 className="font-display font-semibold text-foreground mb-3 text-xs uppercase tracking-widest">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {[
                    {
                      Icon: Facebook,
                      href: "https://facebook.com",
                      label: "Facebook",
                      color: "hover:text-blue-400",
                    },
                    {
                      Icon: Instagram,
                      href: "https://instagram.com",
                      label: "Instagram",
                      color: "hover:text-pink-400",
                    },
                    {
                      Icon: Twitter,
                      href: "https://twitter.com",
                      label: "Twitter",
                      color: "hover:text-sky-400",
                    },
                    {
                      Icon: MessageCircle,
                      href: "https://discord.com",
                      label: "Discord",
                      color: "hover:text-indigo-400",
                    },
                  ].map(({ Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      data-ocid={`home.footer.${label.toLowerCase()}.link`}
                      className={`glass-card w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground ${color} transition-smooth hover-lift`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} GameBazaar Nepal. All rights
              reserved.
            </span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
