import { c as createLucideIcon, f as useCartStore, j as jsxRuntimeExports, B as Badge, b as Button, g as ShoppingCart, C as Category, h as ue } from "./index-CQIZzR8Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const categoryConfig = {
  [Category.Streaming]: {
    label: "Streaming",
    className: "bg-purple-500/20 text-purple-300 border-purple-500/40"
  },
  [Category.Gaming]: {
    label: "Gaming",
    className: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
  },
  [Category.Software]: {
    label: "Software",
    className: "bg-green-500/20 text-green-300 border-green-500/40"
  }
};
function formatNPR(amount) {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}
function ProductCard({ product, index = 0 }) {
  const addItem = useCartStore((s) => s.addItem);
  const catConfig = categoryConfig[product.category];
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      priceNPR: product.priceNPR
    });
    ue.success(`${product.name} added to cart!`, {
      description: formatNPR(product.priceNPR)
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `product.item.${index + 1}`,
      className: "glass-card rounded-xl p-5 hover-lift neon-glow-purple flex flex-col gap-3 relative overflow-hidden group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-smooth pointer-events-none" }),
        product.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/80 text-primary-foreground border-0 text-xs gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
          "Featured"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight line-clamp-2 pr-16", children: product.name }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `${catConfig.className} text-xs`, children: catConfig.label }),
          product.inStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/15 text-green-400 border-green-500/30 text-xs", children: "In Stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/15 text-red-400 border-red-500/30 text-xs", children: "Out of Stock" })
        ] }),
        product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs line-clamp-2 leading-relaxed", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between pt-2 border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-primary", children: formatNPR(product.priceNPR) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: handleAddToCart,
              disabled: !product.inStock,
              "data-ocid": `product.add_button.${index + 1}`,
              className: "gap-1.5 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/40 hover:border-primary/70 transition-smooth text-xs",
              variant: "outline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5" }),
                "Add to Cart"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProductCard as P,
  Zap as Z
};
