import { c as createLucideIcon, f as useCartStore, i as useAuthStore, k as useRouter, j as jsxRuntimeExports, g as ShoppingCart, L as Link, b as Button, B as Badge } from "./index-CQIZzR8Y.js";
import { P as Package } from "./package-CQ77Aq5p.js";
import { P as Plus, T as Trash2 } from "./trash-2-TCXIk0HY.js";
import { A as ArrowRight } from "./arrow-right--pA9nO4m.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function formatNPR(amount) {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}
function CartPage() {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center px-4 hero-gradient",
        "data-ocid": "cart.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center flex flex-col items-center gap-6 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 rounded-3xl glass-card neon-glow-purple floating", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-16 h-16 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl gradient-text mb-3", children: "Your cart is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: "Browse our digital products and add something to your cart to get started." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "cart.shop_now.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 transition-smooth neon-glow-purple",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5" }),
                "Shop Now"
              ]
            }
          ) })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-primary/15 text-primary border-primary/30 font-medium", children: "Shopping Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground", children: [
        "Your Cart",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xl font-normal", children: [
          "(",
          items.length,
          " ",
          items.length === 1 ? "item" : "items",
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "lg:col-span-2 flex flex-col gap-3",
          "data-ocid": "cart.items.list",
          children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `cart.item.${i + 1}`,
              className: "glass-card rounded-xl p-4 flex items-center gap-4 hover-lift neon-glow-purple transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate leading-tight mb-1", children: item.productName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-bold text-sm", children: [
                    formatNPR(item.priceNPR),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "each" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "outline",
                      className: "h-7 w-7 border-border/60 hover:border-primary/50 hover:bg-primary/10 transition-smooth",
                      onClick: () => updateQuantity(item.productId, item.quantity - 1),
                      "data-ocid": `cart.decrease.${i + 1}`,
                      "aria-label": "Decrease quantity",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm font-bold text-foreground", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "outline",
                      className: "h-7 w-7 border-border/60 hover:border-primary/50 hover:bg-primary/10 transition-smooth",
                      onClick: () => updateQuantity(item.productId, item.quantity + 1),
                      "data-ocid": `cart.increase.${i + 1}`,
                      "aria-label": "Increase quantity",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-accent w-24 text-right flex-shrink-0", children: formatNPR(item.priceNPR * BigInt(item.quantity)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    onClick: () => removeItem(item.productId),
                    "data-ocid": `cart.delete_button.${i + 1}`,
                    "aria-label": `Remove ${item.productName}`,
                    className: "text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 transition-smooth flex-shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ]
            },
            String(item.productId)
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card-strong rounded-2xl p-6 h-fit sticky top-24 neon-glow-purple",
          "data-ocid": "cart.summary.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary inline-block" }),
              "Order Summary"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-5 max-h-52 overflow-y-auto scrollbar-thin", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between items-start gap-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate flex-1 min-w-0 pr-2 leading-relaxed", children: [
                    item.productName,
                    item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs ml-1 text-primary", children: [
                      "×",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 text-foreground font-medium", children: formatNPR(item.priceNPR * BigInt(item.quantity)) })
                ]
              },
              String(item.productId)
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground mb-2 pb-2 border-b border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatNPR(total) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground py-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-lg gradient-text", children: formatNPR(total) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleCheckout,
                "data-ocid": "cart.checkout.primary_button",
                size: "lg",
                className: "w-full bg-primary hover:bg-primary/80 text-primary-foreground gap-2 font-bold transition-smooth neon-glow-purple",
                children: [
                  isAuthenticated ? "Proceed to Checkout" : "Login to Checkout",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "block mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                className: "w-full text-muted-foreground hover:text-foreground text-sm transition-smooth",
                "data-ocid": "cart.continue_shopping.button",
                children: "Continue Shopping"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-4 leading-relaxed", children: "Digital products are delivered after payment verification by staff." })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  CartPage as default
};
