import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { Category } from "../lib/types";
import type { ProductInfo } from "../lib/types";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: ProductInfo;
  index?: number;
}

const categoryConfig: Record<Category, { label: string; className: string }> = {
  [Category.Streaming]: {
    label: "Streaming",
    className: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  },
  [Category.Gaming]: {
    label: "Gaming",
    className: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  },
  [Category.Software]: {
    label: "Software",
    className: "bg-green-500/20 text-green-300 border-green-500/40",
  },
};

function formatNPR(amount: bigint): string {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const catConfig = categoryConfig[product.category];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      priceNPR: product.priceNPR,
    });
    toast.success(`${product.name} added to cart!`, {
      description: formatNPR(product.priceNPR),
    });
  };

  return (
    <div
      data-ocid={`product.item.${index + 1}`}
      className="glass-card rounded-xl p-5 hover-lift neon-glow-purple flex flex-col gap-3 relative overflow-hidden group"
    >
      {/* Subtle glow orb */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-smooth pointer-events-none" />

      {product.featured && (
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/80 text-primary-foreground border-0 text-xs gap-1">
            <Zap className="w-3 h-3" />
            Featured
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground text-sm leading-tight line-clamp-2 pr-16">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className={`${catConfig.className} text-xs`}>
          {catConfig.label}
        </Badge>
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

      {product.description && (
        <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/40">
        <span className="font-display font-bold text-lg text-primary">
          {formatNPR(product.priceNPR)}
        </span>
        <Button
          size="sm"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          data-ocid={`product.add_button.${index + 1}`}
          className="gap-1.5 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/40 hover:border-primary/70 transition-smooth text-xs"
          variant="outline"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
