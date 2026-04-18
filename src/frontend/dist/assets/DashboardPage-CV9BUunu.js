import { c as createLucideIcon, j as jsxRuntimeExports, q as cn, i as useAuthStore, u as useActor, a as useQuery, b as Button, s as LogOut, L as Link, U as User, t as apiLogout, v as apiGetMyOrders } from "./index-CQIZzR8Y.js";
import { m as motion, S as Skeleton } from "./proxy-DK3QCxva.js";
import { T as TrendingUp, S as StatusBadge } from "./StatusBadge-BVfXQZa7.js";
import { P as Package } from "./package-CQ77Aq5p.js";
import { S as ShoppingBag } from "./shopping-bag-4SMqiN5U.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function formatNPR(amount) {
  return `Rs ${Number(amount).toLocaleString("en-NP")}`;
}
function formatDate(timestamp) {
  const date = new Date(Number(timestamp / 1000000n));
  return date.toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function OrderCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/40 bg-card/60 p-5 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-28 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mb-3 h-4 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
    ] })
  ] });
}
function OrderCard({ order, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.07 },
      "data-ocid": `orders.item.${index + 1}`,
      className: "group relative overflow-hidden rounded-xl border border-border/40 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-wrap items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-4 w-4 text-primary/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground/90", children: order.orderId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.paymentStatus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(order.timestamp) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 space-y-1.5", children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1 text-foreground/80", children: item.productName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-4 shrink-0 text-accent/90", children: formatNPR(item.priceNPR) })
              ]
            },
            `${String(item.productId)}-${i}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border/30 pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: formatNPR(order.totalNPR) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: order.paymentMethod === "BankTransfer" ? "Bank Transfer" : "eSewa" })
          ] })
        ] })
      ]
    }
  );
}
function DashboardPage() {
  var _a;
  const { user, token, logout: storeLogout } = useAuthStore();
  const { actor, isFetching: actorFetching } = useActor();
  const {
    data: orders = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["my-orders", token],
    queryFn: async () => {
      if (!actor || !token) return [];
      return apiGetMyOrders(actor, token);
    },
    enabled: !!actor && !actorFetching && !!token,
    refetchInterval: 3e4
  });
  async function handleLogout() {
    if (actor && token) {
      try {
        await apiLogout(actor, token);
      } catch (_) {
      }
    }
    storeLogout();
  }
  const totalSpent = orders.reduce((sum, o) => sum + o.totalNPR, 0n);
  const email = (user == null ? void 0 : user.email) ?? "User";
  const avatarChar = ((_a = email[0]) == null ? void 0 : _a.toUpperCase()) ?? "U";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/40 bg-card/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-accent/80 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20", children: avatarChar }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "max-w-[180px] truncate text-sm font-semibold text-foreground sm:max-w-xs",
              "data-ocid": "dashboard.user_email",
              children: email
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleLogout,
          "data-ocid": "dashboard.logout_button",
          className: "gap-2 text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Logout" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-8 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground sm:text-3xl", children: "My Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Track your orders and spending in real-time" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          className: "mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "border-border/40 bg-card/60 backdrop-blur-sm",
                "data-ocid": "dashboard.total_orders_card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Total Orders" }),
                    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-1 h-7 w-16" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: orders.length })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "border-border/40 bg-card/60 backdrop-blur-sm",
                "data-ocid": "dashboard.total_spent_card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-6 w-6 text-accent" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Total Spent" }),
                    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-1 h-7 w-28" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: formatNPR(totalSpent) })
                  ] })
                ] })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/40 bg-card/40 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-border/30 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg font-semibold", children: "My Orders" }),
              !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary", children: orders.length })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "space-y-4",
                  "data-ocid": "dashboard.orders.loading_state",
                  children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCardSkeleton, {}, n))
                }
              ),
              isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-3 py-12 text-center",
                  "data-ocid": "dashboard.orders.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load orders. Please try again." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: () => window.location.reload(),
                        children: "Retry"
                      }
                    )
                  ]
                }
              ),
              !isLoading && !isError && orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-4 py-16 text-center",
                  "data-ocid": "dashboard.orders.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8 text-muted-foreground/60" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No orders yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Explore our store and grab something great!" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "dashboard.shop_now_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Start Shopping!" }) })
                  ]
                }
              ),
              !isLoading && !isError && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "dashboard.orders.list", children: orders.slice().sort((a, b) => Number(b.timestamp - a.timestamp)).map((order, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                OrderCard,
                {
                  order,
                  index
                },
                order.orderId
              )) })
            ] })
          ] })
        }
      ),
      !isLoading && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.6 },
          className: "mt-6 flex items-start gap-2 rounded-lg border border-accent/20 bg-accent/5 p-4",
          "data-ocid": "dashboard.payment_note",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent/90", children: "Payment reminder:" }),
              " ",
              "When making a payment, always include your Order ID in the payment note so our team can confirm it quickly."
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  DashboardPage as default
};
