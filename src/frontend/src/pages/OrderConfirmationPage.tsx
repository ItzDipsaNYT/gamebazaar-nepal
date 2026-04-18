import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Copy,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const search = useSearch({ strict: false }) as { orderId?: string };
  const orderId = search.orderId ?? "N/A";
  const [visible, setVisible] = useState(false);

  // Entrance animation trigger
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("Order ID copied!", {
      description: "Paste it in your payment note.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 hero-gradient">
      <div
        className={`w-full max-w-lg text-center transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`p-5 rounded-3xl bg-green-500/10 border border-green-500/30 neon-glow-cyan transition-all duration-1000 ${
              visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <CheckCircle2 className="w-16 h-16 text-green-400" />
          </div>
        </div>

        {/* Status badge */}
        <Badge className="mb-4 bg-orange-500/15 text-orange-400 border-orange-500/30 font-semibold px-4 py-1 text-sm">
          Payment Under Review
        </Badge>

        {/* Heading */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-3">
          Order Placed!
        </h1>
        <p className="text-muted-foreground text-base mb-8 leading-relaxed max-w-sm mx-auto">
          Your order has been received. Complete payment using the details below
          to get your digital product delivered.
        </p>

        {/* Order ID box — cyan border */}
        <div
          className="rounded-2xl p-6 mb-5 bg-card/70 backdrop-blur-2xl border border-accent/50 shadow-[0_0_30px_oklch(0.72_0.18_196_/_0.18),0_8px_32px_oklch(0_0_0_/_0.35)]"
          data-ocid="order_confirmation.order_id.panel"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
            Your Order ID
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <code
              className="font-mono text-lg sm:text-xl font-bold px-5 py-2.5 rounded-xl border"
              style={{
                background: "oklch(0.72 0.18 196 / 0.08)",
                borderColor: "oklch(0.72 0.18 196 / 0.35)",
                color: "oklch(0.78 0.18 196)",
              }}
            >
              {orderId}
            </code>
            <Button
              size="icon"
              variant="outline"
              onClick={copyOrderId}
              data-ocid="order_confirmation.copy_order_id.button"
              aria-label="Copy Order ID"
              className="border-accent/40 hover:bg-accent/10 text-accent transition-smooth h-10 w-10"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* IMPORTANT NOTICE — orange/yellow warning */}
        <div
          className="rounded-2xl p-5 mb-6 text-left"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.18 55 / 0.12), oklch(0.72 0.22 70 / 0.08))",
            border: "1.5px solid oklch(0.72 0.18 55 / 0.45)",
            boxShadow: "0 0 16px oklch(0.72 0.18 55 / 0.1)",
          }}
          data-ocid="order_confirmation.important_notice.panel"
        >
          <div className="flex items-start gap-3">
            <div
              className="p-1.5 rounded-lg flex-shrink-0"
              style={{ background: "oklch(0.72 0.18 55 / 0.15)" }}
            >
              <AlertTriangle
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.18 55)" }}
              />
            </div>
            <div>
              <p
                className="font-bold text-sm mb-1.5 uppercase tracking-wide"
                style={{ color: "oklch(0.82 0.16 60)" }}
              >
                ⚠ Important Notice
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.75 0.1 55)" }}
              >
                Please include your{" "}
                <strong style={{ color: "oklch(0.85 0.18 60)" }}>
                  Order ID
                </strong>{" "}
                in the payment note when transferring payment. This helps us
                identify your payment quickly and process your order without
                delay.
              </p>
            </div>
          </div>
        </div>

        {/* Payment instructions */}
        <div
          className="glass-card rounded-2xl p-6 mb-8 text-left"
          data-ocid="order_confirmation.payment_instructions.panel"
        >
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: "oklch(var(--primary) / 0.15)",
                color: "oklch(var(--primary))",
              }}
            >
              !
            </span>
            Next Steps
          </h3>
          <ol className="flex flex-col gap-3">
            {[
              {
                step: "1",
                text: "Complete your payment via Bank Transfer to Nabil Bank (Account: XXXX-XXXX).",
              },
              {
                step: "2",
                text: "Include your Order ID in the payment remarks/note.",
              },
              {
                step: "3",
                text: 'Order status will show "Payment Under Review" until verified.',
              },
              {
                step: "4",
                text: "Staff will verify your payment within 24 hours.",
              },
              {
                step: "5",
                text: "Once confirmed, your digital product will be delivered to your account.",
              },
            ].map(({ step, text }) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{
                    background: "oklch(var(--primary) / 0.12)",
                    color: "oklch(var(--primary))",
                  }}
                >
                  {step}
                </span>
                <span className="leading-relaxed">{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.navigate({ to: "/dashboard" })}
            data-ocid="order_confirmation.view_orders.primary_button"
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold transition-smooth neon-glow-purple"
          >
            <LayoutDashboard className="w-4 h-4" />
            View My Orders
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.navigate({ to: "/products" })}
            data-ocid="order_confirmation.continue_shopping.button"
            className="gap-2 border-border/60 hover:border-accent/40 hover:bg-accent/5 transition-smooth"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Need help?{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Contact support
          </span>
        </p>
      </div>
    </div>
  );
}
