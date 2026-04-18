import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingCart, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { FullPageLoader } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { apiGetProducts, useActor } from "../lib/api";
import { Category } from "../lib/types";
import type { ProductInfo } from "../lib/types";
import { useCartStore } from "../store/cartStore";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryFilter = "all" | Category;

interface FilterTab {
  id: CategoryFilter;
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "All" },
  { id: Category.Streaming, label: "Streaming" },
  { id: Category.Gaming, label: "Gaming" },
  { id: Category.Software, label: "Software" },
];

const CATEGORY_COLOR: Record<Category, string> = {
  [Category.Streaming]: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  [Category.Gaming]: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  [Category.Software]: "bg-green-500/20 text-green-300 border-green-500/40",
};

const CATEGORY_LABEL: Record<Category, string> = {
  [Category.Streaming]: "Streaming",
  [Category.Gaming]: "Gaming",
  [Category.Software]: "Software",
};

function formatNPR(amount: bigint): string {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}

// ─── Product Detail Modal ─────────────────────────────────────────────────────

interface ProductModalProps {
  product: ProductInfo | null;
  onClose: () => void;
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return null;

  const catColor = CATEGORY_COLOR[product.category];
  const catLabel = CATEGORY_LABEL[product.category];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      priceNPR: product.priceNPR,
    });
    toast.success(`${product.name} added to cart!`, {
      description: formatNPR(product.priceNPR),
    });
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="product.dialog"
        className="glass-card-strong border-border/50 max-w-md w-full bg-card/90"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground leading-tight pr-6">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Decorative glow strip */}
          <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-primary/60 via-accent/60 to-transparent" />

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={`${catColor} text-xs`}>
              {catLabel}
            </Badge>
            {product.featured && (
              <Badge className="bg-primary/80 text-primary-foreground border-0 text-xs gap-1">
                <Zap className="w-3 h-3" />
                Featured
              </Badge>
            )}
            {product.inStock ? (
              <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-xs">
                In Stock
              </Badge>
            ) : (
              <Badge className="bg-red-500/15 text-red-400 border-red-500/30 text-xs">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Description */}
          {product.description ? (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed italic">
              No description available for this product.
            </p>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Price</p>
              <span className="font-display font-bold text-2xl text-primary text-glow-purple">
                {formatNPR(product.priceNPR)}
              </span>
            </div>
            <Button
              data-ocid="product.confirm_button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground border-0 transition-smooth"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Skeleton Grid ─────────────────────────────────────────────────────────────

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items have no stable id
          key={i}
          className="glass-card rounded-xl p-5 flex flex-col gap-3"
        >
          <Skeleton className="h-4 w-3/4 bg-muted/50" />
          <Skeleton className="h-3 w-1/2 bg-muted/40" />
          <Skeleton className="h-3 w-full bg-muted/30" />
          <Skeleton className="h-3 w-5/6 bg-muted/30" />
          <div className="mt-auto flex items-center justify-between pt-2">
            <Skeleton className="h-6 w-20 bg-muted/50" />
            <Skeleton className="h-8 w-24 bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

interface EmptyStateProps {
  category: CategoryFilter;
  onReset: () => void;
}

function EmptyState({ category, onReset }: EmptyStateProps) {
  const label =
    category === "all" ? "products" : `${CATEGORY_LABEL[category]} products`;

  return (
    <motion.div
      data-ocid="products.empty_state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-5"
    >
      <div className="w-20 h-20 rounded-full glass-card neon-glow-purple flex items-center justify-center">
        <Package className="w-10 h-10 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No {label} found
        </h3>
        <p className="text-muted-foreground text-sm">
          Check back soon — new products are added regularly.
        </p>
      </div>
      {category !== "all" && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          data-ocid="products.reset_filter_button"
          className="border-border/60 hover:border-primary/40 hover:text-primary transition-smooth"
        >
          View All Products
        </Button>
      )}
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const { actor, isFetching } = useActor();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(
    null,
  );

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<ProductInfo[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetProducts(actor);
    },
    enabled: !!actor && !isFetching,
  });

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (isLoading && !products.length) {
    return <FullPageLoader />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero Header */}
      <section className="relative bg-card border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-3"
          >
            <h1 className="font-display text-3xl md:text-5xl font-bold">
              <span className="gradient-text">Digital Products</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl">
              Premium digital accounts and subscriptions — delivered instantly,
              priced for Nepal.
            </p>
            {!isLoading && (
              <Badge className="mt-1 bg-primary/15 text-primary border-primary/30">
                {products.length} products available
              </Badge>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-1 mb-8 flex-wrap"
          data-ocid="products.filter.tab"
          role="tablist"
          aria-label="Filter products by category"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            const count =
              tab.id === "all"
                ? products.length
                : products.filter((p) => p.category === tab.id).length;

            return (
              <button
                key={String(tab.id)}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-ocid={`products.filter_tab.${String(tab.id)}`}
                onClick={() => setActiveCategory(tab.id)}
                className={[
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                ].join(" ")}
              >
                {tab.label}
                <span
                  className={[
                    "text-xs px-1.5 py-0.5 rounded-full font-mono",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/50 text-muted-foreground",
                  ].join(" ")}
                >
                  {count}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Error state */}
        {isError && (
          <div
            data-ocid="products.error_state"
            className="glass-card rounded-xl p-8 text-center border border-destructive/30"
          >
            <p className="text-destructive font-medium">
              Failed to load products. Please try again.
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && !products.length && <ProductGridSkeleton />}

        {/* Product Grid */}
        {!isLoading && !isError && (
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <EmptyState
                key="empty"
                category={activeCategory}
                onReset={() => setActiveCategory("all")}
              />
            ) : (
              <motion.div
                key={String(activeCategory)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                data-ocid="products.list"
              >
                {filtered.map((product, index) => (
                  <motion.div
                    key={String(product.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer"
                    data-ocid={`products.item.${index + 1}`}
                  >
                    <ProductCard product={product} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
