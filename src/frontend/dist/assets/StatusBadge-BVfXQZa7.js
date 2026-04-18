import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, a6 as PaymentStatus } from "./index-CQIZzR8Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const statusConfig = {
  [PaymentStatus.Processing]: {
    label: "Processing",
    className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30"
  },
  [PaymentStatus.UnderReview]: {
    label: "Payment Under Review",
    className: "bg-orange-500/20 text-orange-300 border-orange-500/40 hover:bg-orange-500/30"
  },
  [PaymentStatus.Confirmed]: {
    label: "Confirmed",
    className: "bg-green-500/20 text-green-300 border-green-500/40 hover:bg-green-500/30"
  },
  [PaymentStatus.Delivered]: {
    label: "Delivered",
    className: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30"
  }
};
function StatusBadge({ status, className = "" }) {
  const config = statusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `${config.className} ${className} text-xs font-medium`,
      children: config.label
    }
  );
}
export {
  StatusBadge as S,
  TrendingUp as T
};
