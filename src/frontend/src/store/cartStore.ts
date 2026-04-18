import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../lib/types";

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
  total: () => bigint;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === newItem.productId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId ? { ...i, quantity } : i,
                ),
        })),
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.priceNPR * BigInt(item.quantity),
          0n,
        ),
      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "gamebazaar-cart",
      // BigInt serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str, (_, value) => {
            if (typeof value === "string" && /^\d+n$/.test(value)) {
              return BigInt(value.slice(0, -1));
            }
            return value;
          });
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify(value, (_, v) =>
              typeof v === "bigint" ? `${v}n` : v,
            ),
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
