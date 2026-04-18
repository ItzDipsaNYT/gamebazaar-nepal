import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

function formatNPR(amount: bigint): string {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.navigate({ to: "/login" });
    } else {
      router.navigate({ to: "/checkout" });
    }
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 hero-gradient"
        data-ocid="cart.empty_state"
      >
        <div className="text-center flex flex-col items-center gap-6 max-w-sm">
          <div className="p-8 rounded-3xl glass-card neon-glow-purple floating">
            <ShoppingCart className="w-16 h-16 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl gradient-text mb-3">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Browse our digital products and add something to your cart to get
              started.
            </p>
          </div>
          <Link to="/products" data-ocid="cart.shop_now.button">
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 transition-smooth neon-glow-purple"
            >
              <ShoppingCart className="w-5 h-5" />
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-3 bg-primary/15 text-primary border-primary/30 font-medium">
            Shopping Cart
          </Badge>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Your Cart{" "}
            <span className="text-muted-foreground text-xl font-normal">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div
            className="lg:col-span-2 flex flex-col gap-3"
            data-ocid="cart.items.list"
          >
            {items.map((item, i) => (
              <div
                key={String(item.productId)}
                data-ocid={`cart.item.${i + 1}`}
                className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift neon-glow-purple transition-smooth group"
              >
                {/* Product icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-smooth">
                  <Package className="w-6 h-6 text-primary" />
                </div>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate leading-tight mb-1">
                    {item.productName}
                  </p>
                  <p className="text-primary font-bold text-sm">
                    {formatNPR(item.priceNPR)}{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      each
                    </span>
                  </p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-border/60 hover:border-primary/50 hover:bg-primary/10 transition-smooth"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    data-ocid={`cart.decrease.${i + 1}`}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 text-center text-sm font-bold text-foreground">
                    {item.quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-border/60 hover:border-primary/50 hover:bg-primary/10 transition-smooth"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    data-ocid={`cart.increase.${i + 1}`}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                {/* Line total */}
                <p className="text-sm font-bold text-accent w-24 text-right flex-shrink-0">
                  {formatNPR(item.priceNPR * BigInt(item.quantity))}
                </p>

                {/* Remove button */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem(item.productId)}
                  data-ocid={`cart.delete_button.${i + 1}`}
                  aria-label={`Remove ${item.productName}`}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 transition-smooth flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div
            className="glass-card-strong rounded-2xl p-6 h-fit sticky top-24 neon-glow-purple"
            data-ocid="cart.summary.panel"
          >
            <h3 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Order Summary
            </h3>

            {/* Item breakdown */}
            <div className="flex flex-col gap-2 mb-5 max-h-52 overflow-y-auto scrollbar-thin">
              {items.map((item) => (
                <div
                  key={String(item.productId)}
                  className="flex justify-between items-start gap-2 text-sm"
                >
                  <span className="text-muted-foreground truncate flex-1 min-w-0 pr-2 leading-relaxed">
                    {item.productName}
                    {item.quantity > 1 && (
                      <span className="text-xs ml-1 text-primary">
                        ×{item.quantity}
                      </span>
                    )}
                  </span>
                  <span className="flex-shrink-0 text-foreground font-medium">
                    {formatNPR(item.priceNPR * BigInt(item.quantity))}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between text-sm text-muted-foreground mb-2 pb-2 border-b border-border/30">
              <span>Subtotal</span>
              <span>{formatNPR(total)}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-foreground py-3 mb-5">
              <span className="text-base">Total</span>
              <span className="text-primary text-lg gradient-text">
                {formatNPR(total)}
              </span>
            </div>

            {/* Checkout CTA */}
            <Button
              onClick={handleCheckout}
              data-ocid="cart.checkout.primary_button"
              size="lg"
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground gap-2 font-bold transition-smooth neon-glow-purple"
            >
              {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Link to="/products" className="block mt-3">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground text-sm transition-smooth"
                data-ocid="cart.continue_shopping.button"
              >
                Continue Shopping
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
              Digital products are delivered after payment verification by
              staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
