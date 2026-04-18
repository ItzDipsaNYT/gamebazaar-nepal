import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInfo {
    id: bigint;
    featured: boolean;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    priceNPR: bigint;
}
export type Timestamp = bigint;
export interface AnalyticsSummary {
    totalRevenueNPR: bigint;
    totalOrders: bigint;
    pendingOrders: bigint;
    confirmedOrders: bigint;
    deliveredOrders: bigint;
}
export interface OrderItem {
    productId: bigint;
    productName: string;
    priceNPR: bigint;
}
export interface UserInfo {
    createdAt: Timestamp;
    role: UserRole;
    email: string;
}
export interface UpdateProductInput {
    featured?: boolean;
    inStock?: boolean;
    name?: string;
    description?: string;
    imageUrl?: string;
    category?: Category;
    priceNPR?: bigint;
}
export interface DailyRevenue {
    revenueNPR: bigint;
    date: string;
    orderCount: bigint;
}
export interface CreateProductInput {
    featured: boolean;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    priceNPR: bigint;
}
export interface TopProduct {
    revenueNPR: bigint;
    productId: bigint;
    productName: string;
    orderCount: bigint;
}
export interface OrderInfo {
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    userEmail: string;
    orderId: OrderId;
    totalNPR: bigint;
    timestamp: Timestamp;
    items: Array<OrderItem>;
}
export type SessionToken = string;
export interface StatusDistribution {
    underReview: bigint;
    delivered: bigint;
    confirmed: bigint;
    processing: bigint;
}
export interface CreateOrderInput {
    paymentMethod: PaymentMethod;
    userEmail: string;
    totalNPR: bigint;
    items: Array<OrderItem>;
}
export interface OrderFilter {
    status?: PaymentStatus;
    productName?: string;
    email?: string;
}
export type LoginResult = {
    __kind__: "ok";
    ok: {
        token: SessionToken;
        user: UserInfo;
    };
} | {
    __kind__: "err";
    err: string;
};
export type OrderId = string;
export enum Category {
    Streaming = "Streaming",
    Software = "Software",
    Gaming = "Gaming"
}
export enum PaymentMethod {
    BankTransfer = "BankTransfer",
    ESewa = "ESewa"
}
export enum PaymentStatus {
    UnderReview = "UnderReview",
    Delivered = "Delivered",
    Confirmed = "Confirmed",
    Processing = "Processing"
}
export enum UserRole {
    user = "user",
    staff = "staff"
}
export interface backendInterface {
    createOrder(token: SessionToken, input: CreateOrderInput): Promise<{
        __kind__: "ok";
        ok: OrderInfo;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createProduct(token: SessionToken, input: CreateProductInput): Promise<{
        __kind__: "ok";
        ok: ProductInfo;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProduct(token: SessionToken, id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAllOrders(token: SessionToken): Promise<{
        __kind__: "ok";
        ok: Array<OrderInfo>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAnalyticsSummary(token: SessionToken): Promise<{
        __kind__: "ok";
        ok: AnalyticsSummary;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDailyRevenue(token: SessionToken): Promise<{
        __kind__: "ok";
        ok: Array<DailyRevenue>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMe(token: SessionToken): Promise<UserInfo | null>;
    getMyOrders(token: SessionToken): Promise<{
        __kind__: "ok";
        ok: Array<OrderInfo>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getProduct(id: bigint): Promise<ProductInfo | null>;
    getProducts(): Promise<Array<ProductInfo>>;
    getStatusDistribution(token: SessionToken): Promise<{
        __kind__: "ok";
        ok: StatusDistribution;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getTopProducts(token: SessionToken, limit: bigint): Promise<{
        __kind__: "ok";
        ok: Array<TopProduct>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    login(email: string, password: string): Promise<LoginResult>;
    logout(token: SessionToken): Promise<void>;
    searchOrders(token: SessionToken, filter: OrderFilter): Promise<{
        __kind__: "ok";
        ok: Array<OrderInfo>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    signUp(email: string, password: string): Promise<LoginResult>;
    staffLogin(email: string, staffCode: string): Promise<LoginResult>;
    toggleStock(token: SessionToken, id: bigint): Promise<{
        __kind__: "ok";
        ok: ProductInfo;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateOrderStatus(token: SessionToken, orderId: OrderId, newStatus: PaymentStatus): Promise<{
        __kind__: "ok";
        ok: OrderInfo;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProduct(token: SessionToken, id: bigint, input: UpdateProductInput): Promise<{
        __kind__: "ok";
        ok: ProductInfo;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
