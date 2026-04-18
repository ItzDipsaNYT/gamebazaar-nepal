export type {
  ProductInfo,
  OrderInfo,
  OrderItem,
  UserInfo,
  AnalyticsSummary,
  DailyRevenue,
  TopProduct,
  StatusDistribution,
  CreateOrderInput,
  CreateProductInput,
  UpdateProductInput,
  OrderFilter,
  SessionToken,
  OrderId,
  Timestamp,
} from "../backend";

export {
  Category,
  PaymentMethod,
  PaymentStatus,
  UserRole,
} from "../backend";

export interface CartItem {
  productId: bigint;
  productName: string;
  priceNPR: bigint;
  quantity: number;
}

export interface AuthState {
  token: string | null;
  user: import("../backend").UserInfo | null;
  isAuthenticated: boolean;
  isStaff: boolean;
}
