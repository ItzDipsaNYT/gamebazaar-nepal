import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit2,
  LogOut,
  Package,
  Plus,
  Search,
  Shield,
  ShoppingBag,
  ToggleLeft,
  ToggleRight,
  Trash2,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { StatusBadge } from "../components/StatusBadge";
import {
  apiCreateProduct,
  apiDeleteProduct,
  apiGetAllOrders,
  apiGetAnalyticsSummary,
  apiGetDailyRevenue,
  apiGetProducts,
  apiGetStatusDistribution,
  apiGetTopProducts,
  apiToggleStock,
  apiUpdateOrderStatus,
  apiUpdateProduct,
  useActor,
} from "../lib/api";
import { Category, PaymentStatus } from "../lib/types";
import type {
  CreateProductInput,
  OrderInfo,
  ProductInfo,
  UpdateProductInput,
} from "../lib/types";
import { useAuthStore } from "../store/authStore";

function formatNPR(amount: bigint): string {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

const PIE_COLORS = ["#9333ea", "#f97316", "#22c55e", "#06b6d4"];

const STATUS_OPTIONS = [
  { value: PaymentStatus.Processing, label: "Processing" },
  { value: PaymentStatus.UnderReview, label: "Under Review" },
  { value: PaymentStatus.Confirmed, label: "Confirmed" },
  { value: PaymentStatus.Delivered, label: "Delivered" },
];

const TOOLTIP_STYLE = {
  background: "oklch(0.14 0.025 265)",
  border: "1px solid oklch(0.26 0.06 307 / 0.5)",
  borderRadius: 8,
  fontSize: 12,
  color: "oklch(0.94 0.01 265)",
};

export default function AdminPage() {
  const { token, user, logout: storeLogout } = useAuthStore();
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();

  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [productDialog, setProductDialog] = useState<{
    open: boolean;
    product?: ProductInfo;
  }>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    productId?: bigint;
  }>({ open: false });

  const enabled = !!actor && !isFetching && !!token;

  // Queries — orders polls every 15s
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["all-orders", token],
    queryFn: () => apiGetAllOrders(actor, token!),
    enabled,
    refetchInterval: 15_000,
  });
  const { data: analytics } = useQuery({
    queryKey: ["analytics", token],
    queryFn: () => apiGetAnalyticsSummary(actor, token!),
    enabled,
    refetchInterval: 30_000,
  });
  const { data: dailyRevenue = [] } = useQuery({
    queryKey: ["daily-revenue", token],
    queryFn: () => apiGetDailyRevenue(actor, token!),
    enabled,
    refetchInterval: 60_000,
  });
  const { data: topProducts = [] } = useQuery({
    queryKey: ["top-products", token],
    queryFn: () => apiGetTopProducts(actor, token!, 5n),
    enabled,
    refetchInterval: 60_000,
  });
  const { data: statusDist } = useQuery({
    queryKey: ["status-distribution", token],
    queryFn: () => apiGetStatusDistribution(actor, token!),
    enabled,
    refetchInterval: 30_000,
  });
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiGetProducts(actor),
    enabled: !!actor && !isFetching,
  });

  // Mutations
  const updateStatusMut = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: { orderId: string; status: PaymentStatus }) =>
      apiUpdateOrderStatus(actor, token!, orderId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-orders"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
      qc.invalidateQueries({ queryKey: ["status-distribution"] });
      toast.success("Order status updated");
    },
    onError: (e) =>
      toast.error("Failed to update", {
        description: e instanceof Error ? e.message : "",
      }),
  });

  const toggleStockMut = useMutation({
    mutationFn: (id: bigint) => apiToggleStock(actor, token!, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Stock status toggled");
    },
    onError: () => toast.error("Failed to toggle stock"),
  });

  const deleteProductMut = useMutation({
    mutationFn: (id: bigint) => apiDeleteProduct(actor, token!, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
      setDeleteDialog({ open: false });
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const filteredOrders = orders.filter((o: OrderInfo) => {
    const q = orderSearch.toLowerCase();
    const matchSearch =
      !q ||
      o.orderId.toLowerCase().includes(q) ||
      o.userEmail.toLowerCase().includes(q) ||
      o.items.some((i) => i.productName.toLowerCase().includes(q));
    const matchStatus =
      statusFilter === "all" || o.paymentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const pieData = statusDist
    ? [
        { name: "Processing", value: Number(statusDist.processing) },
        { name: "Under Review", value: Number(statusDist.underReview) },
        { name: "Confirmed", value: Number(statusDist.confirmed) },
        { name: "Delivered", value: Number(statusDist.delivered) },
      ]
    : [];

  const chartData = dailyRevenue.slice(-30).map((d) => ({
    date: d.date,
    revenue: Number(d.revenueNPR),
    orders: Number(d.orderCount),
  }));

  const confirmPayment = (orderId: string) =>
    updateStatusMut.mutate({ orderId, status: PaymentStatus.Confirmed });

  const markDelivered = (orderId: string) =>
    updateStatusMut.mutate({ orderId, status: PaymentStatus.Delivered });

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 neon-glow-cyan">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl gradient-text">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">
                GameBazaar Nepal — Staff Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 border border-border/40 rounded-lg px-3 py-2">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span className="truncate max-w-[180px]">
                {user?.email ?? "Staff"}
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={storeLogout}
              data-ocid="admin.logout_button"
              className="gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" data-ocid="admin.tabs">
          <TabsList className="bg-card/60 border border-border/40 mb-6 flex-wrap h-auto gap-0.5">
            <TabsTrigger
              value="orders"
              data-ocid="admin.orders.tab"
              className="gap-1.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <ShoppingBag className="w-4 h-4" />
              Orders
              {orders.length > 0 && (
                <Badge className="ml-1 bg-primary/20 text-primary border-primary/40 text-xs px-1.5 py-0">
                  {orders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              data-ocid="admin.analytics.tab"
              className="gap-1.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <BarChart2 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="products"
              data-ocid="admin.products.tab"
              className="gap-1.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
          </TabsList>

          {/* ORDERS TAB */}
          <TabsContent value="orders">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search by order ID, email, or product..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="pl-9 bg-card/50 border-border/60"
                  data-ocid="admin.orders.search_input"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className="w-48 bg-card/50 border-border/60"
                  data-ocid="admin.orders.status.select"
                >
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Showing{" "}
              <span className="text-foreground font-medium">
                {filteredOrders.length}
              </span>{" "}
              of {orders.length} orders
            </p>

            {ordersLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div
                data-ocid="admin.orders.empty_state"
                className="text-center py-16 glass-card rounded-xl text-muted-foreground"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No orders found</p>
                <p className="text-sm mt-1 opacity-70">
                  Orders will appear here as customers place them
                </p>
              </div>
            ) : (
              <div
                className="flex flex-col gap-3"
                data-ocid="admin.orders.list"
              >
                {filteredOrders.map((order: OrderInfo, i: number) => {
                  const isExpanded = expandedOrderId === order.orderId;
                  const isPending =
                    order.paymentStatus === PaymentStatus.Processing ||
                    order.paymentStatus === PaymentStatus.UnderReview;
                  const isConfirmed =
                    order.paymentStatus === PaymentStatus.Confirmed;

                  return (
                    <div
                      key={order.orderId}
                      data-ocid={`admin.order.item.${i + 1}`}
                      className="glass-card rounded-xl overflow-hidden transition-smooth"
                    >
                      {/* Order row */}
                      <div className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Left: ID, email, items */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <code className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                                #{order.orderId.slice(-8).toUpperCase()}
                              </code>
                              <StatusBadge status={order.paymentStatus} />
                            </div>
                            <p className="text-sm text-foreground font-medium truncate">
                              {order.userEmail}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                              <Clock className="w-3 h-3" />
                              {formatDate(order.timestamp)} ·{" "}
                              {order.paymentMethod}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {order.items.slice(0, 3).map((item) => (
                                <Badge
                                  key={String(item.productId)}
                                  variant="outline"
                                  className="text-xs border-border/40 text-muted-foreground"
                                >
                                  {item.productName}
                                </Badge>
                              ))}
                              {order.items.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-border/40 text-muted-foreground"
                                >
                                  +{order.items.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Right: price + actions */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <p className="font-display font-bold text-lg text-primary">
                              {formatNPR(order.totalNPR)}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              {isPending && (
                                <Button
                                  size="sm"
                                  onClick={() => confirmPayment(order.orderId)}
                                  disabled={updateStatusMut.isPending}
                                  data-ocid={`admin.order.confirm_payment.${i + 1}`}
                                  className="h-7 text-xs bg-green-600/20 text-green-300 border border-green-500/40 hover:bg-green-600/40 hover:text-green-200"
                                  variant="ghost"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Confirm Payment
                                </Button>
                              )}
                              {isConfirmed && (
                                <Button
                                  size="sm"
                                  onClick={() => markDelivered(order.orderId)}
                                  disabled={updateStatusMut.isPending}
                                  data-ocid={`admin.order.mark_delivered.${i + 1}`}
                                  className="h-7 text-xs bg-accent/20 text-accent border border-accent/40 hover:bg-accent/30"
                                  variant="ghost"
                                >
                                  <Truck className="w-3 h-3 mr-1" />
                                  Mark Delivered
                                </Button>
                              )}
                              <Select
                                value={order.paymentStatus}
                                onValueChange={(v) =>
                                  updateStatusMut.mutate({
                                    orderId: order.orderId,
                                    status: v as PaymentStatus,
                                  })
                                }
                              >
                                <SelectTrigger
                                  className="w-36 h-7 text-xs bg-card/50 border-border/60"
                                  data-ocid={`admin.order.status_select.${i + 1}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {STATUS_OPTIONS.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                      {s.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  setExpandedOrderId(
                                    isExpanded ? null : order.orderId,
                                  )
                                }
                                data-ocid={`admin.order.expand_button.${i + 1}`}
                                aria-label={
                                  isExpanded ? "Collapse" : "Expand order"
                                }
                                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="border-t border-border/30 bg-muted/20 px-5 py-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Order Details
                          </p>
                          <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Full Order ID
                              </p>
                              <code className="font-mono text-xs text-foreground break-all">
                                {order.orderId}
                              </code>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Payment Method
                              </p>
                              <p className="text-sm text-foreground">
                                {order.paymentMethod}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Placed At
                              </p>
                              <p className="text-sm text-foreground">
                                {new Date(
                                  Number(order.timestamp) / 1_000_000,
                                ).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Customer Email
                              </p>
                              <p className="text-sm text-foreground">
                                {order.userEmail}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Items
                          </p>
                          <div className="flex flex-col gap-2">
                            {order.items.map((item) => (
                              <div
                                key={String(item.productId)}
                                className="flex justify-between items-center text-sm"
                              >
                                <span className="text-foreground">
                                  {item.productName}
                                </span>
                                <span className="text-primary font-semibold">
                                  {formatNPR(item.priceNPR)}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between items-center text-sm pt-2 border-t border-border/30 font-bold">
                              <span className="text-foreground">Total</span>
                              <span className="text-primary">
                                {formatNPR(order.totalNPR)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics">
            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Total Revenue",
                  value: analytics ? formatNPR(analytics.totalRevenueNPR) : "—",
                  icon: TrendingUp,
                  color: "text-primary",
                  glow: "neon-glow-purple",
                },
                {
                  label: "Total Orders",
                  value: analytics ? String(analytics.totalOrders) : "—",
                  icon: Package,
                  color: "text-accent",
                  glow: "neon-glow-cyan",
                },
                {
                  label: "Confirmed",
                  value: analytics ? String(analytics.confirmedOrders) : "—",
                  icon: CheckCircle,
                  color: "text-green-400",
                  glow: "",
                },
                {
                  label: "Delivered",
                  value: analytics ? String(analytics.deliveredOrders) : "—",
                  icon: Truck,
                  color: "text-cyan-400",
                  glow: "",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  data-ocid={`admin.stat.item.${i + 1}`}
                  className={`glass-card rounded-xl p-5 ${stat.glow} transition-smooth hover-lift`}
                >
                  <div className="w-10 h-10 rounded-lg bg-card/80 border border-border/40 flex items-center justify-center mb-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="font-display font-bold text-2xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Revenue LineChart */}
            <div className="glass-card rounded-xl p-5 mb-5">
              <h3 className="font-display font-semibold text-foreground mb-1">
                Revenue Trend
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Last 30 days · NPR
              </p>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.26 0.06 307 / 0.2)"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: "oklch(0.55 0.04 265)" }}
                      tickLine={false}
                      axisLine={{ stroke: "oklch(0.26 0.06 307 / 0.3)" }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "oklch(0.55 0.04 265)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v: number) => [
                        `Rs ${v.toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="oklch(0.62 0.24 307)"
                      strokeWidth={2.5}
                      dot={{ fill: "#06b6d4", r: 4, strokeWidth: 0 }}
                      activeDot={{
                        fill: "#06b6d4",
                        r: 6,
                        stroke: "oklch(0.62 0.24 307)",
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">
                  No revenue data yet
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-5 mb-5">
              {/* Orders BarChart */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Order Volume
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Daily order count
                </p>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.26 0.06 307 / 0.2)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: "oklch(0.55 0.04 265)" }}
                        tickLine={false}
                        axisLine={{ stroke: "oklch(0.26 0.06 307 / 0.3)" }}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "oklch(0.55 0.04 265)" }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={TOOLTIP_STYLE}
                        formatter={(v: number) => [v, "Orders"]}
                      />
                      <Bar
                        dataKey="orders"
                        fill="oklch(0.62 0.24 307 / 0.8)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-44 flex items-center justify-center text-muted-foreground text-sm">
                    No order data yet
                  </div>
                )}
              </div>

              {/* Status PieChart */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Status Distribution
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Breakdown by payment status
                </p>
                {pieData.some((d) => d.value > 0) ? (
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={72}
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {pieData.map((entry, i) => (
                          <Cell
                            key={entry.name}
                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={TOOLTIP_STYLE}
                        formatter={(v: number, name: string) => [v, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                    No data yet
                  </div>
                )}
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  {pieData.map((d, i) => (
                    <div
                      key={d.name}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ background: PIE_COLORS[i] }}
                      />
                      <span>
                        {d.name}: {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-4">
                Top Products by Revenue
              </h3>
              {topProducts.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {topProducts.map((tp, i) => {
                    const maxRevenue = topProducts[0]
                      ? Number(topProducts[0].revenueNPR)
                      : 1;
                    const pct = maxRevenue
                      ? (Number(tp.revenueNPR) / maxRevenue) * 100
                      : 0;
                    return (
                      <div
                        key={String(tp.productId)}
                        className="flex gap-3 items-center"
                      >
                        <span className="text-xs font-bold text-muted-foreground w-5 text-right">
                          #{i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-foreground truncate pr-2">
                              {tp.productName}
                            </span>
                            <div className="text-right flex-shrink-0">
                              <span className="text-sm font-semibold text-primary">
                                {formatNPR(tp.revenueNPR)}
                              </span>
                              <span className="text-xs text-muted-foreground ml-1.5">
                                {String(tp.orderCount)} orders
                              </span>
                            </div>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No sales data yet
                </p>
              )}
            </div>
          </TabsContent>

          {/* PRODUCTS TAB */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">
                  {products.length}
                </span>{" "}
                products in store
              </p>
              <Button
                onClick={() =>
                  setProductDialog({ open: true, product: undefined })
                }
                data-ocid="admin.products.add.button"
                className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground"
                size="sm"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : products.length === 0 ? (
              <div
                data-ocid="admin.products.empty_state"
                className="text-center py-16 glass-card rounded-xl text-muted-foreground"
              >
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No products yet</p>
                <p className="text-sm mt-1 opacity-70">
                  Add your first product to get started
                </p>
              </div>
            ) : (
              <div
                className="flex flex-col gap-3"
                data-ocid="admin.products.list"
              >
                {products.map((product: ProductInfo, i: number) => (
                  <div
                    key={String(product.id)}
                    data-ocid={`admin.product.item.${i + 1}`}
                    className="glass-card rounded-xl p-4 flex items-center gap-4 transition-smooth hover:border-border/70"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <p className="font-medium text-sm text-foreground truncate">
                          {product.name}
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs border-border/40 text-muted-foreground"
                        >
                          {product.category}
                        </Badge>
                        {product.featured && (
                          <Badge className="bg-primary/20 text-primary border-primary/40 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-primary font-semibold text-sm">
                        {formatNPR(product.priceNPR)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleStockMut.mutate(product.id)}
                        data-ocid={`admin.product.toggle_stock.${i + 1}`}
                        className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-smooth ${
                          product.inStock
                            ? "text-green-400 border-green-500/40 hover:bg-green-500/10"
                            : "text-red-400 border-red-500/40 hover:bg-red-500/10"
                        }`}
                        title="Toggle stock"
                      >
                        {product.inStock ? (
                          <ToggleRight className="w-3.5 h-3.5" />
                        ) : (
                          <ToggleLeft className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">
                          {product.inStock ? "In Stock" : "Out"}
                        </span>
                      </button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          setProductDialog({ open: true, product })
                        }
                        data-ocid={`admin.product.edit_button.${i + 1}`}
                        aria-label="Edit product"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          setDeleteDialog({ open: true, productId: product.id })
                        }
                        data-ocid={`admin.product.delete_button.${i + 1}`}
                        aria-label="Delete product"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Product Dialog */}
        <ProductFormDialog
          key={productDialog.product?.id ?? "new"}
          open={productDialog.open}
          product={productDialog.product}
          token={token}
          actor={actor}
          onClose={() => setProductDialog({ open: false })}
          onSuccess={() => {
            qc.invalidateQueries({ queryKey: ["products"] });
            setProductDialog({ open: false });
          }}
        />

        {/* Delete Confirm */}
        <Dialog
          open={deleteDialog.open}
          onOpenChange={(v) => !v && setDeleteDialog({ open: false })}
        >
          <DialogContent
            className="bg-card border-border/60 max-w-sm"
            data-ocid="admin.delete_product.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display">Delete Product</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground text-sm">
              This action cannot be undone. The product will be permanently
              removed from the store.
            </p>
            <DialogFooter className="gap-2">
              <Button
                variant="ghost"
                onClick={() => setDeleteDialog({ open: false })}
                data-ocid="admin.delete_product.cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  deleteDialog.productId &&
                  deleteProductMut.mutate(deleteDialog.productId)
                }
                disabled={deleteProductMut.isPending}
                data-ocid="admin.delete_product.confirm_button"
              >
                {deleteProductMut.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  "Delete Product"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Product Form Dialog
interface ProductFormDialogProps {
  open: boolean;
  product?: ProductInfo;
  token: string | null;
  actor: ReturnType<typeof useActor>["actor"];
  onClose: () => void;
  onSuccess: () => void;
}

function ProductFormDialog({
  open,
  product,
  token,
  actor,
  onClose,
  onSuccess,
}: ProductFormDialogProps) {
  const [form, setForm] = useState<{
    name: string;
    description: string;
    category: Category;
    priceNPR: string;
    imageUrl: string;
    featured: boolean;
    inStock: boolean;
  }>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    category: product?.category ?? Category.Streaming,
    priceNPR: product ? String(product.priceNPR) : "",
    imageUrl: product?.imageUrl ?? "",
    featured: product?.featured ?? false,
    inStock: product?.inStock ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.priceNPR) {
      setError("Name and price are required.");
      return;
    }
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      if (product) {
        const update: UpdateProductInput = {
          name: form.name,
          description: form.description,
          category: form.category as Category,
          priceNPR: BigInt(form.priceNPR),
          imageUrl: form.imageUrl,
          featured: form.featured,
          inStock: form.inStock,
        };
        await apiUpdateProduct(actor, token, product.id, update);
        toast.success("Product updated!");
      } else {
        const input: CreateProductInput = {
          name: form.name,
          description: form.description,
          category: form.category as Category,
          priceNPR: BigInt(form.priceNPR),
          imageUrl: form.imageUrl,
          featured: form.featured,
          inStock: form.inStock,
        };
        await apiCreateProduct(actor, token, input);
        toast.success("Product created!");
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="bg-card border-border/60 max-w-lg"
        data-ocid="admin.product_form.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-xs">Product Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Netflix Account Lifetime"
                className="bg-background/50 border-border/60"
                data-ocid="admin.product_form.name.input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Price (NPR) *</Label>
              <Input
                type="number"
                min="1"
                value={form.priceNPR}
                onChange={(e) => setForm({ ...form, priceNPR: e.target.value })}
                placeholder="350"
                className="bg-background/50 border-border/60"
                data-ocid="admin.product_form.price.input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm({ ...form, category: v as Category })
                }
              >
                <SelectTrigger
                  className="bg-background/50 border-border/60"
                  data-ocid="admin.product_form.category.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-xs">Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Brief product description..."
                className="bg-background/50 border-border/60"
                data-ocid="admin.product_form.description.input"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-xs">Image URL (optional)</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                className="bg-background/50 border-border/60"
                data-ocid="admin.product_form.image_url.input"
              />
            </div>
            <div className="col-span-2 flex gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-primary"
                  data-ocid="admin.product_form.featured.checkbox"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) =>
                    setForm({ ...form, inStock: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-primary"
                  data-ocid="admin.product_form.in_stock.checkbox"
                />
                <span>In Stock</span>
              </label>
            </div>
          </div>
          {error && (
            <p
              className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg"
              data-ocid="admin.product_form.error_state"
            >
              {error}
            </p>
          )}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              data-ocid="admin.product_form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              data-ocid="admin.product_form.save_button"
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : product ? (
                "Save Changes"
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
