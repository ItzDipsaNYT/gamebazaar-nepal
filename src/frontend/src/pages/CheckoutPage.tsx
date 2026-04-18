import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Clock,
  CreditCard,
  Info,
  Lock,
  Package,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { apiCreateOrder, useActor } from "../lib/api";
import { PaymentMethod } from "../lib/types";
import type { OrderInfo } from "../lib/types";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

function formatNPR(amount: bigint): string {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}

interface PaymentOption {
  value: PaymentMethod;
  label: string;
  icon: React.ElementType;
  shortDesc: string;
  color: string;
  badge?: string;
}

const paymentOptions: PaymentOption[] = [
  {
    value: PaymentMethod.BankTransfer,
    label: "Bank Transfer",
    icon: Building2,
    shortDesc: "Transfer via Nabil Bank",
    color: "text-accent",
    badge: "Recommended",
  },
  {
    value: PaymentMethod.ESewa,
    label: "eSewa",
    icon: Wallet,
    shortDesc: "Coming soon",
    color: "text-muted-foreground",
  },
];

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(
    PaymentMethod.BankTransfer,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { actor } = useActor();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const clearCart = useCartStore((s) => s.clearCart);
  const { token, user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated
  if (!isAuthenticated || !token || !user) {
    router.navigate({ to: "/login" });
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 hero-gradient">
        <div className="text-center glass-card rounded-2xl p-10 max-w-sm">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">
            No items to checkout
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your cart is empty. Browse our products to find something you'd
            like.
          </p>
          <Button
            onClick={() => router.navigate({ to: "/products" })}
            className="bg-primary hover:bg-primary/80 text-primary-foreground"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!token || !user) return;
    if (selectedPayment === PaymentMethod.ESewa) {
      toast.info("eSewa coming soon", {
        description: "Please select Bank Transfer to complete your order.",
      });
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const order: OrderInfo = await apiCreateOrder(actor, token, {
        paymentMethod: selectedPayment,
        userEmail: user.email,
        totalNPR: total,
        items: items.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          priceNPR: i.priceNPR,
        })),
      });
      clearCart();
      toast.success("Order placed successfully!", {
        description: `Order ID: ${order.orderId}`,
      });
      router.navigate({
        to: "/order-confirmation",
        search: { orderId: order.orderId },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Please try again.";
      setError(msg);
      toast.error("Failed to place order", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Badge className="mb-3 bg-primary/15 text-primary border-primary/30 font-medium">
            Secure Checkout
          </Badge>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground flex items-center gap-3">
            Complete Your Order
            <Lock className="w-6 h-6 text-accent opacity-60" />
          </h1>
          <p className="text-muted-foreground mt-2">
            Review your order and choose a payment method to proceed.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left — Payment + Email */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Email (pre-filled, read-only) */}
            <div
              className="glass-card rounded-xl p-6"
              data-ocid="checkout.email.panel"
            >
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                Account Details
              </h3>
              <div className="space-y-2">
                <Label
                  htmlFor="checkout-email"
                  className="text-sm text-muted-foreground"
                >
                  Email Address
                </Label>
                <Input
                  id="checkout-email"
                  type="email"
                  value={user.email}
                  readOnly
                  data-ocid="checkout.email.input"
                  className="bg-muted/30 border-border/40 text-foreground cursor-not-allowed opacity-80"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Order confirmation will be linked to this account
                </p>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div
              className="glass-card rounded-xl p-6"
              data-ocid="checkout.payment.panel"
            >
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </h3>

              <div className="flex flex-col gap-3 mb-5">
                {paymentOptions.map((pm) => {
                  const isSelected = selectedPayment === pm.value;
                  const isDisabled = pm.value === PaymentMethod.ESewa;
                  return (
                    <button
                      key={pm.value}
                      type="button"
                      onClick={() =>
                        !isDisabled && setSelectedPayment(pm.value)
                      }
                      data-ocid={`checkout.payment_${pm.value.toLowerCase()}.radio`}
                      disabled={isDisabled}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-smooth w-full ${
                        isSelected
                          ? "border-primary/60 bg-primary/10 neon-glow-purple"
                          : isDisabled
                            ? "border-border/20 opacity-50 cursor-not-allowed"
                            : "border-border/40 hover:border-border/70 hover:bg-muted/20 cursor-pointer"
                      }`}
                    >
                      {/* Radio indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "border-primary" : "border-border"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>

                      <pm.icon
                        className={`w-5 h-5 flex-shrink-0 ${pm.color}`}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            className={`font-semibold text-sm ${isDisabled ? "text-muted-foreground" : "text-foreground"}`}
                          >
                            {pm.label}
                          </p>
                          {pm.badge && (
                            <Badge className="text-xs bg-accent/15 text-accent border-accent/30 py-0">
                              {pm.badge}
                            </Badge>
                          )}
                          {isDisabled && (
                            <Badge className="text-xs bg-muted/40 text-muted-foreground border-border/30 py-0">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p
                          className={`text-xs mt-0.5 ${isDisabled ? "text-muted-foreground/60" : "text-muted-foreground"}`}
                        >
                          {pm.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Payment Details Panel */}
              {selectedPayment === PaymentMethod.BankTransfer && (
                <div
                  className="rounded-xl bg-accent/5 border border-accent/20 p-4"
                  data-ocid="checkout.bank_details.panel"
                >
                  <p className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Bank Transfer Details
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Bank</span>
                      <span className="font-semibold text-foreground">
                        Nabil Bank
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Account No.</span>
                      <span className="font-mono font-bold text-accent">
                        XXXX-XXXX
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-accent" />
                    <span>
                      Include your{" "}
                      <strong className="text-foreground">Order ID</strong> in
                      the payment reference when transferring.
                    </span>
                  </div>
                </div>
              )}

              {selectedPayment === PaymentMethod.ESewa && (
                <div
                  className="rounded-xl bg-muted/20 border border-border/30 p-4"
                  data-ocid="checkout.esewa_details.panel"
                >
                  <p className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    eSewa Integration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Coming soon — eSewa integration is in progress. Please use
                    Bank Transfer for now.
                  </p>
                </div>
              )}

              {/* Info notice */}
              <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-border/30 flex gap-2 text-xs text-muted-foreground">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>
                  After placing your order, you'll receive a unique{" "}
                  <strong className="text-foreground">Order ID</strong>. Include
                  it in your payment note so staff can match your payment
                  quickly.
                </span>
              </div>
            </div>
          </div>

          {/* Right — Order Summary + Place Order */}
          <div
            className="lg:col-span-2 glass-card-strong rounded-2xl p-6 h-fit sticky top-24 neon-glow-purple"
            data-ocid="checkout.summary.panel"
          >
            <h3 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Order Summary
            </h3>

            {/* Items list */}
            <div className="flex flex-col gap-2.5 mb-5 max-h-52 overflow-y-auto scrollbar-thin">
              {items.map((item) => (
                <div
                  key={String(item.productId)}
                  className="flex justify-between gap-2 text-sm"
                >
                  <span className="text-muted-foreground truncate flex-1 min-w-0 pr-2">
                    {item.productName}
                    {item.quantity > 1 && (
                      <span className="text-xs text-primary ml-1">
                        ×{item.quantity}
                      </span>
                    )}
                  </span>
                  <span className="text-foreground font-medium flex-shrink-0">
                    {formatNPR(item.priceNPR * BigInt(item.quantity))}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-border/40 pt-4 mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm text-foreground">
                  {formatNPR(total)}
                </span>
              </div>
              <div className="flex justify-between items-center font-bold text-foreground mt-2 pt-2 border-t border-border/30">
                <span className="text-base">Total</span>
                <span className="text-primary text-xl gradient-text">
                  {formatNPR(total)}
                </span>
              </div>
            </div>

            {/* Ordering as */}
            <div className="my-4 p-3 rounded-lg bg-muted/20 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Ordering as</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {user.email}
              </p>
            </div>

            {/* Error display */}
            {error && (
              <div
                className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-2 text-sm text-destructive"
                data-ocid="checkout.error_state"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={loading || selectedPayment === PaymentMethod.ESewa}
              data-ocid="checkout.place_order.primary_button"
              size="lg"
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold gap-2 transition-smooth neon-glow-purple"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Placing Order...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Place Order · {formatNPR(total)}
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">
              Status shows as{" "}
              <strong className="text-orange-400">Payment Under Review</strong>{" "}
              until staff manually confirms your payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
