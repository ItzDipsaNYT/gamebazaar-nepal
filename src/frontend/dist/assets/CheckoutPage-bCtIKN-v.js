import { c as createLucideIcon, r as reactExports, P as PaymentMethod, u as useActor, f as useCartStore, i as useAuthStore, k as useRouter, j as jsxRuntimeExports, b as Button, B as Badge, d as LoadingSpinner, h as ue, o as apiCreateOrder } from "./index-CQIZzR8Y.js";
import { L as Label, I as Input } from "./label-Cz5yq3VU.js";
import { P as Package } from "./package-CQ77Aq5p.js";
import { L as Lock } from "./lock-Cx35JKJ2.js";
import { C as Clock } from "./clock-BzyUYSHO.js";
import { A as ArrowRight } from "./arrow-right--pA9nO4m.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function formatNPR(amount) {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}
const paymentOptions = [
  {
    value: PaymentMethod.BankTransfer,
    label: "Bank Transfer",
    icon: Building2,
    shortDesc: "Transfer via Nabil Bank",
    color: "text-accent",
    badge: "Recommended"
  },
  {
    value: PaymentMethod.ESewa,
    label: "eSewa",
    icon: Wallet,
    shortDesc: "Coming soon",
    color: "text-muted-foreground"
  }
];
function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = reactExports.useState(
    PaymentMethod.BankTransfer
  );
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const { actor } = useActor();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const clearCart = useCartStore((s) => s.clearCart);
  const { token, user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  if (!isAuthenticated || !token || !user) {
    router.navigate({ to: "/login" });
    return null;
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4 hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center glass-card rounded-2xl p-10 max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-3", children: "No items to checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Your cart is empty. Browse our products to find something you'd like." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => router.navigate({ to: "/products" }),
          className: "bg-primary hover:bg-primary/80 text-primary-foreground",
          children: "Browse Products"
        }
      )
    ] }) });
  }
  const handlePlaceOrder = async () => {
    if (!token || !user) return;
    if (selectedPayment === PaymentMethod.ESewa) {
      ue.info("eSewa coming soon", {
        description: "Please select Bank Transfer to complete your order."
      });
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const order = await apiCreateOrder(actor, token, {
        paymentMethod: selectedPayment,
        userEmail: user.email,
        totalNPR: total,
        items: items.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          priceNPR: i.priceNPR
        }))
      });
      clearCart();
      ue.success("Order placed successfully!", {
        description: `Order ID: ${order.orderId}`
      });
      router.navigate({
        to: "/order-confirmation",
        search: { orderId: order.orderId }
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Please try again.";
      setError(msg);
      ue.error("Failed to place order", { description: msg });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-primary/15 text-primary border-primary/30 font-medium", children: "Secure Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground flex items-center gap-3", children: [
        "Complete Your Order",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-accent opacity-60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Review your order and choose a payment method to proceed." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card rounded-xl p-6",
            "data-ocid": "checkout.email.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent inline-block" }),
                "Account Details"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "checkout-email",
                    className: "text-sm text-muted-foreground",
                    children: "Email Address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "checkout-email",
                    type: "email",
                    value: user.email,
                    readOnly: true,
                    "data-ocid": "checkout.email.input",
                    className: "bg-muted/30 border-border/40 text-foreground cursor-not-allowed opacity-80"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                  "Order confirmation will be linked to this account"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card rounded-xl p-6",
            "data-ocid": "checkout.payment.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary" }),
                "Payment Method"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 mb-5", children: paymentOptions.map((pm) => {
                const isSelected = selectedPayment === pm.value;
                const isDisabled = pm.value === PaymentMethod.ESewa;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => !isDisabled && setSelectedPayment(pm.value),
                    "data-ocid": `checkout.payment_${pm.value.toLowerCase()}.radio`,
                    disabled: isDisabled,
                    className: `flex items-center gap-3 p-4 rounded-xl border text-left transition-smooth w-full ${isSelected ? "border-primary/60 bg-primary/10 neon-glow-purple" : isDisabled ? "border-border/20 opacity-50 cursor-not-allowed" : "border-border/40 hover:border-border/70 hover:bg-muted/20 cursor-pointer"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-primary" : "border-border"}`,
                          children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-primary" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        pm.icon,
                        {
                          className: `w-5 h-5 flex-shrink-0 ${pm.color}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: `font-semibold text-sm ${isDisabled ? "text-muted-foreground" : "text-foreground"}`,
                              children: pm.label
                            }
                          ),
                          pm.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-accent/15 text-accent border-accent/30 py-0", children: pm.badge }),
                          isDisabled && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-muted/40 text-muted-foreground border-border/30 py-0", children: "Coming Soon" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-xs mt-0.5 ${isDisabled ? "text-muted-foreground/60" : "text-muted-foreground"}`,
                            children: pm.shortDesc
                          }
                        )
                      ] })
                    ]
                  },
                  pm.value
                );
              }) }),
              selectedPayment === PaymentMethod.BankTransfer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl bg-accent/5 border border-accent/20 p-4",
                  "data-ocid": "checkout.bank_details.panel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-accent mb-3 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
                      "Bank Transfer Details"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Bank" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Nabil Bank" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Account No." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-accent", children: "XXXX-XXXX" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "Include your",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Order ID" }),
                        " in the payment reference when transferring."
                      ] })
                    ] })
                  ]
                }
              ),
              selectedPayment === PaymentMethod.ESewa && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl bg-muted/20 border border-border/30 p-4",
                  "data-ocid": "checkout.esewa_details.panel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
                      "eSewa Integration"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Coming soon — eSewa integration is in progress. Please use Bank Transfer for now." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 rounded-lg bg-muted/20 border border-border/30 flex gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 flex-shrink-0 mt-0.5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "After placing your order, you'll receive a unique",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Order ID" }),
                  ". Include it in your payment note so staff can match your payment quickly."
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:col-span-2 glass-card-strong rounded-2xl p-6 h-fit sticky top-24 neon-glow-purple",
          "data-ocid": "checkout.summary.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }),
              "Order Summary"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5 mb-5 max-h-52 overflow-y-auto scrollbar-thin", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between gap-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate flex-1 min-w-0 pr-2", children: [
                    item.productName,
                    item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary ml-1", children: [
                      "×",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium flex-shrink-0", children: formatNPR(item.priceNPR * BigInt(item.quantity)) })
                ]
              },
              String(item.productId)
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-4 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: formatNPR(total) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center font-bold text-foreground mt-2 pt-2 border-t border-border/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xl gradient-text", children: formatNPR(total) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 p-3 rounded-lg bg-muted/20 border border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Ordering as" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: user.email })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-2 text-sm text-destructive",
                "data-ocid": "checkout.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handlePlaceOrder,
                disabled: loading || selectedPayment === PaymentMethod.ESewa,
                "data-ocid": "checkout.place_order.primary_button",
                size: "lg",
                className: "w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold gap-2 transition-smooth neon-glow-purple",
                children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                  "Placing Order..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
                  "Place Order · ",
                  formatNPR(total)
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mt-3 leading-relaxed", children: [
              "Status shows as",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-orange-400", children: "Payment Under Review" }),
              " ",
              "until staff manually confirms your payment."
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  CheckoutPage as default
};
