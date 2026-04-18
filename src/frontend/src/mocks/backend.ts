import type { backendInterface } from "../backend";
import { Category, PaymentMethod, PaymentStatus, UserRole } from "../backend";

export const mockBackend: backendInterface = {
  getProducts: async () => [
    {
      id: BigInt(1),
      name: "Netflix Account Lifetime",
      description: "Full Netflix premium account with lifetime access",
      priceNPR: BigInt(350),
      category: Category.Streaming,
      imageUrl: "",
      inStock: true,
      featured: true,
    },
    {
      id: BigInt(2),
      name: "Disney+ Account Lifetime",
      description: "Disney+ premium account with lifetime access",
      priceNPR: BigInt(300),
      category: Category.Streaming,
      imageUrl: "",
      inStock: true,
      featured: true,
    },
    {
      id: BigInt(3),
      name: "Spotify Premium 3 Months",
      description: "Spotify Premium subscription for 3 months",
      priceNPR: BigInt(400),
      category: Category.Streaming,
      imageUrl: "",
      inStock: true,
      featured: false,
    },
    {
      id: BigInt(4),
      name: "Minecraft Full Access (Lifetime Warranty)",
      description: "Minecraft Java + Bedrock full account with lifetime warranty",
      priceNPR: BigInt(1150),
      category: Category.Gaming,
      imageUrl: "",
      inStock: true,
      featured: true,
    },
    {
      id: BigInt(5),
      name: "Robux 1000–2500",
      description: "Roblox in-game currency 1000 to 2500 Robux",
      priceNPR: BigInt(500),
      category: Category.Gaming,
      imageUrl: "",
      inStock: true,
      featured: false,
    },
    {
      id: BigInt(6),
      name: "ChatGPT+ Full Access",
      description: "ChatGPT Plus full account access",
      priceNPR: BigInt(300),
      category: Category.Software,
      imageUrl: "",
      inStock: true,
      featured: true,
    },
    {
      id: BigInt(7),
      name: "CapCut Pro",
      description: "CapCut Pro lifetime access for video editing",
      priceNPR: BigInt(350),
      category: Category.Software,
      imageUrl: "",
      inStock: false,
      featured: false,
    },
    {
      id: BigInt(8),
      name: "YouTube Premium Family (1 Month Owner)",
      description: "YouTube Premium Family plan owner slot for 1 month",
      priceNPR: BigInt(500),
      category: Category.Streaming,
      imageUrl: "",
      inStock: true,
      featured: false,
    },
  ],

  getProduct: async (id: bigint) => {
    return null;
  },

  login: async (email: string, _password: string) => ({
    __kind__: "ok" as const,
    ok: {
      token: "mock-token-user",
      user: {
        email,
        role: UserRole.user,
        createdAt: BigInt(Date.now()),
      },
    },
  }),

  signUp: async (email: string, _password: string) => ({
    __kind__: "ok" as const,
    ok: {
      token: "mock-token-user",
      user: {
        email,
        role: UserRole.user,
        createdAt: BigInt(Date.now()),
      },
    },
  }),

  staffLogin: async (email: string, _staffCode: string) => ({
    __kind__: "ok" as const,
    ok: {
      token: "mock-token-staff",
      user: {
        email,
        role: UserRole.staff,
        createdAt: BigInt(Date.now()),
      },
    },
  }),

  logout: async (_token: string) => undefined,

  getMe: async (_token: string) => ({
    email: "user@example.com",
    role: UserRole.user,
    createdAt: BigInt(Date.now()),
  }),

  createOrder: async (_token, _input) => ({
    __kind__: "ok" as const,
    ok: {
      orderId: "ORD-MOCK-001",
      userEmail: "user@example.com",
      items: [
        {
          productId: BigInt(1),
          productName: "Netflix Account Lifetime",
          priceNPR: BigInt(350),
        },
      ],
      totalNPR: BigInt(350),
      paymentMethod: PaymentMethod.ESewa,
      paymentStatus: PaymentStatus.Processing,
      timestamp: BigInt(Date.now()),
    },
  }),

  getMyOrders: async (_token) => ({
    __kind__: "ok" as const,
    ok: [
      {
        orderId: "ORD-MOCK-001",
        userEmail: "user@example.com",
        items: [
          {
            productId: BigInt(1),
            productName: "Netflix Account Lifetime",
            priceNPR: BigInt(350),
          },
        ],
        totalNPR: BigInt(350),
        paymentMethod: PaymentMethod.ESewa,
        paymentStatus: PaymentStatus.Processing,
        timestamp: BigInt(Date.now() - 86400000),
      },
      {
        orderId: "ORD-MOCK-002",
        userEmail: "user@example.com",
        items: [
          {
            productId: BigInt(4),
            productName: "Minecraft Full Access (Lifetime Warranty)",
            priceNPR: BigInt(1150),
          },
        ],
        totalNPR: BigInt(1150),
        paymentMethod: PaymentMethod.BankTransfer,
        paymentStatus: PaymentStatus.Delivered,
        timestamp: BigInt(Date.now() - 172800000),
      },
    ],
  }),

  getAllOrders: async (_token) => ({
    __kind__: "ok" as const,
    ok: [
      {
        orderId: "ORD-001",
        userEmail: "customer1@example.com",
        items: [
          {
            productId: BigInt(1),
            productName: "Netflix Account Lifetime",
            priceNPR: BigInt(350),
          },
        ],
        totalNPR: BigInt(350),
        paymentMethod: PaymentMethod.ESewa,
        paymentStatus: PaymentStatus.Processing,
        timestamp: BigInt(Date.now() - 3600000),
      },
      {
        orderId: "ORD-002",
        userEmail: "customer2@example.com",
        items: [
          {
            productId: BigInt(6),
            productName: "ChatGPT+ Full Access",
            priceNPR: BigInt(300),
          },
        ],
        totalNPR: BigInt(300),
        paymentMethod: PaymentMethod.BankTransfer,
        paymentStatus: PaymentStatus.UnderReview,
        timestamp: BigInt(Date.now() - 7200000),
      },
      {
        orderId: "ORD-003",
        userEmail: "customer3@example.com",
        items: [
          {
            productId: BigInt(4),
            productName: "Minecraft Full Access (Lifetime Warranty)",
            priceNPR: BigInt(1150),
          },
        ],
        totalNPR: BigInt(1150),
        paymentMethod: PaymentMethod.ESewa,
        paymentStatus: PaymentStatus.Confirmed,
        timestamp: BigInt(Date.now() - 86400000),
      },
      {
        orderId: "ORD-004",
        userEmail: "customer4@example.com",
        items: [
          {
            productId: BigInt(2),
            productName: "Disney+ Account Lifetime",
            priceNPR: BigInt(300),
          },
        ],
        totalNPR: BigInt(300),
        paymentMethod: PaymentMethod.ESewa,
        paymentStatus: PaymentStatus.Delivered,
        timestamp: BigInt(Date.now() - 172800000),
      },
    ],
  }),

  searchOrders: async (_token, _filter) => ({
    __kind__: "ok" as const,
    ok: [],
  }),

  updateOrderStatus: async (_token, orderId, newStatus) => ({
    __kind__: "ok" as const,
    ok: {
      orderId,
      userEmail: "customer@example.com",
      items: [],
      totalNPR: BigInt(0),
      paymentMethod: PaymentMethod.ESewa,
      paymentStatus: newStatus,
      timestamp: BigInt(Date.now()),
    },
  }),

  getAnalyticsSummary: async (_token) => ({
    __kind__: "ok" as const,
    ok: {
      totalOrders: BigInt(47),
      totalRevenueNPR: BigInt(28450),
      pendingOrders: BigInt(5),
      confirmedOrders: BigInt(12),
      deliveredOrders: BigInt(30),
    },
  }),

  getDailyRevenue: async (_token) => ({
    __kind__: "ok" as const,
    ok: [
      { date: "2026-04-12", revenueNPR: BigInt(3200), orderCount: BigInt(8) },
      { date: "2026-04-13", revenueNPR: BigInt(4500), orderCount: BigInt(11) },
      { date: "2026-04-14", revenueNPR: BigInt(2800), orderCount: BigInt(6) },
      { date: "2026-04-15", revenueNPR: BigInt(5100), orderCount: BigInt(13) },
      { date: "2026-04-16", revenueNPR: BigInt(3900), orderCount: BigInt(9) },
      { date: "2026-04-17", revenueNPR: BigInt(4700), orderCount: BigInt(12) },
      { date: "2026-04-18", revenueNPR: BigInt(4250), orderCount: BigInt(10) },
    ],
  }),

  getStatusDistribution: async (_token) => ({
    __kind__: "ok" as const,
    ok: {
      processing: BigInt(5),
      underReview: BigInt(8),
      confirmed: BigInt(12),
      delivered: BigInt(22),
    },
  }),

  getTopProducts: async (_token, _limit) => ({
    __kind__: "ok" as const,
    ok: [
      {
        productId: BigInt(1),
        productName: "Netflix Account Lifetime",
        orderCount: BigInt(15),
        revenueNPR: BigInt(5250),
      },
      {
        productId: BigInt(6),
        productName: "ChatGPT+ Full Access",
        orderCount: BigInt(12),
        revenueNPR: BigInt(3600),
      },
      {
        productId: BigInt(4),
        productName: "Minecraft Full Access (Lifetime Warranty)",
        orderCount: BigInt(8),
        revenueNPR: BigInt(9200),
      },
      {
        productId: BigInt(3),
        productName: "Spotify Premium 3 Months",
        orderCount: BigInt(7),
        revenueNPR: BigInt(2800),
      },
      {
        productId: BigInt(5),
        productName: "Robux 1000–2500",
        orderCount: BigInt(5),
        revenueNPR: BigInt(2500),
      },
    ],
  }),

  createProduct: async (_token, input) => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(99),
      ...input,
    },
  }),

  updateProduct: async (_token, id, input) => ({
    __kind__: "ok" as const,
    ok: {
      id,
      name: input.name ?? "Updated Product",
      description: input.description ?? "",
      priceNPR: input.priceNPR ?? BigInt(0),
      category: input.category ?? Category.Software,
      imageUrl: input.imageUrl ?? "",
      inStock: input.inStock ?? true,
      featured: input.featured ?? false,
    },
  }),

  deleteProduct: async (_token, _id) => ({
    __kind__: "ok" as const,
    ok: null,
  }),

  toggleStock: async (_token, id) => ({
    __kind__: "ok" as const,
    ok: {
      id,
      name: "Product",
      description: "",
      priceNPR: BigInt(0),
      category: Category.Software,
      imageUrl: "",
      inStock: false,
      featured: false,
    },
  }),
};
