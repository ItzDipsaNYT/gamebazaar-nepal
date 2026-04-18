import { useActor as _useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type {
  AnalyticsSummary,
  CreateOrderInput,
  CreateProductInput,
  DailyRevenue,
  OrderFilter,
  OrderId,
  OrderInfo,
  ProductInfo,
  SessionToken,
  StatusDistribution,
  TopProduct,
  UpdateProductInput,
  UserInfo,
} from "../backend";
import { PaymentStatus } from "../backend";

export { PaymentStatus };

// Typed actor
type ActorType = ReturnType<
  typeof _useActor<ReturnType<typeof createActor>>
>["actor"];

function handleResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

export function useActor() {
  return _useActor(createActor);
}

// Auth functions
export async function apiSignUp(
  actor: ActorType,
  email: string,
  password: string,
): Promise<{ token: SessionToken; user: UserInfo }> {
  if (!actor) throw new Error("Actor not ready");
  const result = await actor.signUp(email, password);
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

export async function apiLogin(
  actor: ActorType,
  email: string,
  password: string,
): Promise<{ token: SessionToken; user: UserInfo }> {
  if (!actor) throw new Error("Actor not ready");
  const result = await actor.login(email, password);
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

export async function apiStaffLogin(
  actor: ActorType,
  email: string,
  staffCode: string,
): Promise<{ token: SessionToken; user: UserInfo }> {
  if (!actor) throw new Error("Actor not ready");
  const result = await actor.staffLogin(email, staffCode);
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

export async function apiLogout(
  actor: ActorType,
  token: SessionToken,
): Promise<void> {
  if (!actor) return;
  await actor.logout(token);
}

export async function apiGetMe(
  actor: ActorType,
  token: SessionToken,
): Promise<UserInfo | null> {
  if (!actor) return null;
  return actor.getMe(token);
}

// Product functions
export async function apiGetProducts(actor: ActorType): Promise<ProductInfo[]> {
  if (!actor) return [];
  return actor.getProducts();
}

export async function apiGetProduct(
  actor: ActorType,
  id: bigint,
): Promise<ProductInfo | null> {
  if (!actor) return null;
  return actor.getProduct(id);
}

export async function apiCreateProduct(
  actor: ActorType,
  token: SessionToken,
  input: CreateProductInput,
): Promise<ProductInfo> {
  if (!actor) throw new Error("Actor not ready");
  return handleResult(await actor.createProduct(token, input));
}

export async function apiUpdateProduct(
  actor: ActorType,
  token: SessionToken,
  id: bigint,
  input: UpdateProductInput,
): Promise<ProductInfo> {
  if (!actor) throw new Error("Actor not ready");
  return handleResult(await actor.updateProduct(token, id, input));
}

export async function apiDeleteProduct(
  actor: ActorType,
  token: SessionToken,
  id: bigint,
): Promise<void> {
  if (!actor) throw new Error("Actor not ready");
  handleResult(await actor.deleteProduct(token, id));
}

export async function apiToggleStock(
  actor: ActorType,
  token: SessionToken,
  id: bigint,
): Promise<ProductInfo> {
  if (!actor) throw new Error("Actor not ready");
  return handleResult(await actor.toggleStock(token, id));
}

// Order functions
export async function apiCreateOrder(
  actor: ActorType,
  token: SessionToken,
  input: CreateOrderInput,
): Promise<OrderInfo> {
  if (!actor) throw new Error("Actor not ready");
  return handleResult(await actor.createOrder(token, input));
}

export async function apiGetMyOrders(
  actor: ActorType,
  token: SessionToken,
): Promise<OrderInfo[]> {
  if (!actor) return [];
  return handleResult(await actor.getMyOrders(token));
}

export async function apiGetAllOrders(
  actor: ActorType,
  token: SessionToken,
): Promise<OrderInfo[]> {
  if (!actor) return [];
  return handleResult(await actor.getAllOrders(token));
}

export async function apiUpdateOrderStatus(
  actor: ActorType,
  token: SessionToken,
  orderId: OrderId,
  newStatus: PaymentStatus,
): Promise<OrderInfo> {
  if (!actor) throw new Error("Actor not ready");
  return handleResult(await actor.updateOrderStatus(token, orderId, newStatus));
}

export async function apiSearchOrders(
  actor: ActorType,
  token: SessionToken,
  filter: OrderFilter,
): Promise<OrderInfo[]> {
  if (!actor) return [];
  return handleResult(await actor.searchOrders(token, filter));
}

// Analytics functions
export async function apiGetAnalyticsSummary(
  actor: ActorType,
  token: SessionToken,
): Promise<AnalyticsSummary> {
  if (!actor) throw new Error("Actor not ready");
  return handleResult(await actor.getAnalyticsSummary(token));
}

export async function apiGetDailyRevenue(
  actor: ActorType,
  token: SessionToken,
): Promise<DailyRevenue[]> {
  if (!actor) return [];
  return handleResult(await actor.getDailyRevenue(token));
}

export async function apiGetTopProducts(
  actor: ActorType,
  token: SessionToken,
  limit: bigint,
): Promise<TopProduct[]> {
  if (!actor) return [];
  return handleResult(await actor.getTopProducts(token, limit));
}

export async function apiGetStatusDistribution(
  actor: ActorType,
  token: SessionToken,
): Promise<StatusDistribution> {
  if (!actor) throw new Error("Actor not ready");
  return handleResult(await actor.getStatusDistribution(token));
}
