import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Hash,
  LogOut,
  Package,
  ShoppingBag,
  TrendingUp,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { StatusBadge } from "../components/StatusBadge";
import { apiGetMyOrders, apiLogout, useActor } from "../lib/api";
import type { OrderInfo } from "../lib/types";
import { useAuthStore } from "../store/authStore";

function formatNPR(amount: bigint) {
  return `Rs ${Number(amount).toLocaleString("en-NP")}`;
}

function formatDate(timestamp: bigint) {
  const date = new Date(Number(timestamp / 1_000_000n));
  return date.toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
      <Skeleton className="mb-3 h-4 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

function OrderCard({ order, index }: { order: OrderInfo; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      data-ocid={`orders.item.${index + 1}`}
      className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Hover gradient accent */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        {/* Header row */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-primary/70" />
            <span className="font-mono text-sm font-semibold text-foreground/90">
              {order.orderId}
            </span>
          </div>
          <StatusBadge status={order.paymentStatus} />
        </div>

        {/* Date */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(order.timestamp)}</span>
        </div>

        {/* Items list */}
        <div className="mb-4 space-y-1.5">
          {order.items.map((item, i) => (
            <div
              key={`${String(item.productId)}-${i}`}
              className="flex items-center justify-between text-sm"
            >
              <span className="line-clamp-1 text-foreground/80">
                {item.productName}
              </span>
              <span className="ml-4 shrink-0 text-accent/90">
                {formatNPR(item.priceNPR)}
              </span>
            </div>
          ))}
        </div>

        {/* Total + payment method */}
        <div className="flex items-center justify-between border-t border-border/30 pt-3">
          <span className="font-semibold text-primary">
            {formatNPR(order.totalNPR)}
          </span>
          <span className="text-xs text-muted-foreground">
            {order.paymentMethod === "BankTransfer" ? "Bank Transfer" : "eSewa"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user, token, logout: storeLogout } = useAuthStore();
  const { actor, isFetching: actorFetching } = useActor();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<OrderInfo[]>({
    queryKey: ["my-orders", token],
    queryFn: async () => {
      if (!actor || !token) return [];
      return apiGetMyOrders(actor, token);
    },
    enabled: !!actor && !actorFetching && !!token,
    refetchInterval: 30_000,
  });

  async function handleLogout() {
    if (actor && token) {
      try {
        await apiLogout(actor, token);
      } catch (_) {
        // best-effort logout
      }
    }
    storeLogout();
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.totalNPR, 0n);
  const email = user?.email ?? "User";
  const avatarChar = email[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-background" data-ocid="dashboard.page">
      {/* Dashboard header */}
      <div className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-accent/80 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
              {avatarChar}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Welcome back</p>
              <p
                className="max-w-[180px] truncate text-sm font-semibold text-foreground sm:max-w-xs"
                data-ocid="dashboard.user_email"
              >
                {email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            data-ocid="dashboard.logout_button"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            My Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your orders and spending in real-time
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Card
            className="border-border/40 bg-card/60 backdrop-blur-sm"
            data-ocid="dashboard.total_orders_card"
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 shadow-inner">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Orders
                </p>
                {isLoading ? (
                  <Skeleton className="mt-1 h-7 w-16" />
                ) : (
                  <p className="text-2xl font-bold text-foreground">
                    {orders.length}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-border/40 bg-card/60 backdrop-blur-sm"
            data-ocid="dashboard.total_spent_card"
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 shadow-inner">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Spent
                </p>
                {isLoading ? (
                  <Skeleton className="mt-1 h-7 w-28" />
                ) : (
                  <p className="text-2xl font-bold text-foreground">
                    {formatNPR(totalSpent)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-border/40 bg-card/40 backdrop-blur-sm">
            <CardHeader className="border-b border-border/30 pb-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <CardTitle className="font-display text-lg font-semibold">
                  My Orders
                </CardTitle>
                {!isLoading && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                    {orders.length}
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-5">
              {/* Loading skeleton */}
              {isLoading && (
                <div
                  className="space-y-4"
                  data-ocid="dashboard.orders.loading_state"
                >
                  {[1, 2, 3].map((n) => (
                    <OrderCardSkeleton key={n} />
                  ))}
                </div>
              )}

              {/* Error state */}
              {isError && !isLoading && (
                <div
                  className="flex flex-col items-center gap-3 py-12 text-center"
                  data-ocid="dashboard.orders.error_state"
                >
                  <p className="text-sm text-muted-foreground">
                    Failed to load orders. Please try again.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && !isError && orders.length === 0 && (
                <div
                  className="flex flex-col items-center gap-4 py-16 text-center"
                  data-ocid="dashboard.orders.empty_state"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      No orders yet
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Explore our store and grab something great!
                    </p>
                  </div>
                  <Button asChild data-ocid="dashboard.shop_now_button">
                    <Link to="/products">Start Shopping!</Link>
                  </Button>
                </div>
              )}

              {/* Orders list */}
              {!isLoading && !isError && orders.length > 0 && (
                <div className="space-y-4" data-ocid="dashboard.orders.list">
                  {orders
                    .slice()
                    .sort((a, b) => Number(b.timestamp - a.timestamp))
                    .map((order, index) => (
                      <OrderCard
                        key={order.orderId}
                        order={order}
                        index={index}
                      />
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment reminder */}
        {!isLoading && orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-start gap-2 rounded-lg border border-accent/20 bg-accent/5 p-4"
            data-ocid="dashboard.payment_note"
          >
            <User className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-accent/90">
                Payment reminder:
              </span>{" "}
              When making a payment, always include your Order ID in the payment
              note so our team can confirm it quickly.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
