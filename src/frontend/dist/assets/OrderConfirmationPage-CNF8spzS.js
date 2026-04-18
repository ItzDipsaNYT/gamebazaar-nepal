import { c as createLucideIcon, k as useRouter, p as useSearch, r as reactExports, j as jsxRuntimeExports, B as Badge, b as Button, h as ue } from "./index-CQIZzR8Y.js";
import { A as ArrowRight } from "./arrow-right--pA9nO4m.js";
import { S as ShoppingBag } from "./shopping-bag-4SMqiN5U.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function OrderConfirmationPage() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const orderId = search.orderId ?? "N/A";
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);
  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    ue.success("Order ID copied!", {
      description: "Paste it in your payment note."
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4 py-12 hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `w-full max-w-lg text-center transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-5 rounded-3xl bg-green-500/10 border border-green-500/30 neon-glow-cyan transition-all duration-1000 ${visible ? "scale-100 opacity-100" : "scale-75 opacity-0"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-16 h-16 text-green-400" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-orange-500/15 text-orange-400 border-orange-500/30 font-semibold px-4 py-1 text-sm", children: "Payment Under Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl sm:text-5xl gradient-text mb-3", children: "Order Placed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-8 leading-relaxed max-w-sm mx-auto", children: "Your order has been received. Complete payment using the details below to get your digital product delivered." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 mb-5 bg-card/70 backdrop-blur-2xl border border-accent/50 shadow-[0_0_30px_oklch(0.72_0.18_196_/_0.18),0_8px_32px_oklch(0_0_0_/_0.35)]",
            "data-ocid": "order_confirmation.order_id.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium", children: "Your Order ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "code",
                  {
                    className: "font-mono text-lg sm:text-xl font-bold px-5 py-2.5 rounded-xl border",
                    style: {
                      background: "oklch(0.72 0.18 196 / 0.08)",
                      borderColor: "oklch(0.72 0.18 196 / 0.35)",
                      color: "oklch(0.78 0.18 196)"
                    },
                    children: orderId
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "outline",
                    onClick: copyOrderId,
                    "data-ocid": "order_confirmation.copy_order_id.button",
                    "aria-label": "Copy Order ID",
                    className: "border-accent/40 hover:bg-accent/10 text-accent transition-smooth h-10 w-10",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-2xl p-5 mb-6 text-left",
            style: {
              background: "linear-gradient(135deg, oklch(0.65 0.18 55 / 0.12), oklch(0.72 0.22 70 / 0.08))",
              border: "1.5px solid oklch(0.72 0.18 55 / 0.45)",
              boxShadow: "0 0 16px oklch(0.72 0.18 55 / 0.1)"
            },
            "data-ocid": "order_confirmation.important_notice.panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "p-1.5 rounded-lg flex-shrink-0",
                  style: { background: "oklch(0.72 0.18 55 / 0.15)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TriangleAlert,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.78 0.18 55)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-sm mb-1.5 uppercase tracking-wide",
                    style: { color: "oklch(0.82 0.16 60)" },
                    children: "⚠ Important Notice"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm leading-relaxed",
                    style: { color: "oklch(0.75 0.1 55)" },
                    children: [
                      "Please include your",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "oklch(0.85 0.18 60)" }, children: "Order ID" }),
                      " ",
                      "in the payment note when transferring payment. This helps us identify your payment quickly and process your order without delay."
                    ]
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card rounded-2xl p-6 mb-8 text-left",
            "data-ocid": "order_confirmation.payment_instructions.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    style: {
                      background: "oklch(var(--primary) / 0.15)",
                      color: "oklch(var(--primary))"
                    },
                    children: "!"
                  }
                ),
                "Next Steps"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex flex-col gap-3", children: [
                {
                  step: "1",
                  text: "Complete your payment via Bank Transfer to Nabil Bank (Account: XXXX-XXXX)."
                },
                {
                  step: "2",
                  text: "Include your Order ID in the payment remarks/note."
                },
                {
                  step: "3",
                  text: 'Order status will show "Payment Under Review" until verified.'
                },
                {
                  step: "4",
                  text: "Staff will verify your payment within 24 hours."
                },
                {
                  step: "5",
                  text: "Once confirmed, your digital product will be delivered to your account."
                }
              ].map(({ step, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-3 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center",
                        style: {
                          background: "oklch(var(--primary) / 0.12)",
                          color: "oklch(var(--primary))"
                        },
                        children: step
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: text })
                  ]
                },
                step
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => router.navigate({ to: "/dashboard" }),
              "data-ocid": "order_confirmation.view_orders.primary_button",
              size: "lg",
              className: "gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold transition-smooth neon-glow-purple",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4" }),
                "View My Orders",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "lg",
              onClick: () => router.navigate({ to: "/products" }),
              "data-ocid": "order_confirmation.continue_shopping.button",
              className: "gap-2 border-border/60 hover:border-accent/40 hover:bg-accent/5 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                "Continue Shopping"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-6", children: [
          "Need help?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary cursor-pointer hover:underline", children: "Contact support" })
        ] })
      ]
    }
  ) });
}
export {
  OrderConfirmationPage as default
};
