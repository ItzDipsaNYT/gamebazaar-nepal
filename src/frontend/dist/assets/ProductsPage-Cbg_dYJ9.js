import { r as reactExports, j as jsxRuntimeExports, u as useActor, a as useQuery, F as FullPageLoader, B as Badge, C as Category, b as Button, f as useCartStore, g as ShoppingCart, h as ue, e as apiGetProducts } from "./index-CQIZzR8Y.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BnT_e4LQ.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion, S as Skeleton } from "./proxy-DK3QCxva.js";
import { P as ProductCard, Z as Zap } from "./ProductCard-BqzPqEz5.js";
import { P as Package } from "./package-CQ77Aq5p.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: Category.Streaming, label: "Streaming" },
  { id: Category.Gaming, label: "Gaming" },
  { id: Category.Software, label: "Software" }
];
const CATEGORY_COLOR = {
  [Category.Streaming]: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  [Category.Gaming]: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  [Category.Software]: "bg-green-500/20 text-green-300 border-green-500/40"
};
const CATEGORY_LABEL = {
  [Category.Streaming]: "Streaming",
  [Category.Gaming]: "Gaming",
  [Category.Software]: "Software"
};
function formatNPR(amount) {
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}
function ProductModal({ product, onClose }) {
  const addItem = useCartStore((s) => s.addItem);
  if (!product) return null;
  const catColor = CATEGORY_COLOR[product.category];
  const catLabel = CATEGORY_LABEL[product.category];
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      priceNPR: product.priceNPR
    });
    ue.success(`${product.name} added to cart!`, {
      description: formatNPR(product.priceNPR)
    });
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!product, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "product.dialog",
      className: "glass-card-strong border-border/50 max-w-md w-full bg-card/90",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl text-foreground leading-tight pr-6", children: product.name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-full rounded-full bg-gradient-to-r from-primary/60 via-accent/60 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `${catColor} text-xs`, children: catLabel }),
            product.featured && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/80 text-primary-foreground border-0 text-xs gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
              "Featured"
            ] }),
            product.inStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/15 text-green-400 border-green-500/30 text-xs", children: "In Stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/15 text-red-400 border-red-500/30 text-xs", children: "Out of Stock" })
          ] }),
          product.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: product.description }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed italic", children: "No description available for this product." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-primary text-glow-purple", children: formatNPR(product.priceNPR) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "product.confirm_button",
                onClick: handleAddToCart,
                disabled: !product.inStock,
                className: "gap-2 bg-primary hover:bg-primary/80 text-primary-foreground border-0 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                  "Add to Cart"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function ProductGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-5 flex flex-col gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 bg-muted/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 bg-muted/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full bg-muted/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6 bg-muted/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 bg-muted/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 bg-muted/40" })
        ] })
      ]
    },
    i
  )) });
}
function EmptyState({ category, onReset }) {
  const label = category === "all" ? "products" : `${CATEGORY_LABEL[category]} products`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "products.empty_state",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "flex flex-col items-center justify-center py-24 gap-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-card neon-glow-purple flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: [
            "No ",
            label,
            " found"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Check back soon — new products are added regularly." })
        ] }),
        category !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onReset,
            "data-ocid": "products.reset_filter_button",
            className: "border-border/60 hover:border-primary/40 hover:text-primary transition-smooth",
            children: "View All Products"
          }
        )
      ]
    }
  );
}
function ProductsPage() {
  const { actor, isFetching } = useActor();
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [selectedProduct, setSelectedProduct] = reactExports.useState(
    null
  );
  const {
    data: products = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetProducts(actor);
    },
    enabled: !!actor && !isFetching
  });
  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
  if (isLoading && !products.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-card border-b border-border/40 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hero-gradient pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "flex flex-col items-center text-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Digital Products" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base md:text-lg max-w-xl", children: "Premium digital accounts and subscriptions — delivered instantly, priced for Nepal." }),
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mt-1 bg-primary/15 text-primary border-primary/30", children: [
              products.length,
              " products available"
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "flex items-center gap-1 mb-8 flex-wrap",
          "data-ocid": "products.filter.tab",
          role: "tablist",
          "aria-label": "Filter products by category",
          children: FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            const count = tab.id === "all" ? products.length : products.filter((p) => p.category === tab.id).length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": isActive,
                "data-ocid": `products.filter_tab.${String(tab.id)}`,
                onClick: () => setActiveCategory(tab.id),
                className: [
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                ].join(" "),
                children: [
                  tab.label,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: [
                        "text-xs px-1.5 py-0.5 rounded-full font-mono",
                        isActive ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"
                      ].join(" "),
                      children: count
                    }
                  ),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      layoutId: "active-tab-indicator",
                      className: "absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    }
                  )
                ]
              },
              String(tab.id)
            );
          })
        }
      ),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "products.error_state",
          className: "glass-card rounded-xl p-8 text-center border border-destructive/30",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: "Failed to load products. Please try again." })
        }
      ),
      isLoading && !products.length && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, {}),
      !isLoading && !isError && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          category: activeCategory,
          onReset: () => setActiveCategory("all")
        },
        "empty"
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
          "data-ocid": "products.list",
          children: filtered.map((product, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: index * 0.04, duration: 0.3 },
              onClick: () => setSelectedProduct(product),
              className: "cursor-pointer",
              "data-ocid": `products.item.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index })
            },
            String(product.id)
          ))
        },
        String(activeCategory)
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductModal,
      {
        product: selectedProduct,
        onClose: () => setSelectedProduct(null)
      }
    )
  ] });
}
export {
  ProductsPage as default
};
