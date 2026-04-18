import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "../lib/types";

interface StatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  [PaymentStatus.Processing]: {
    label: "Processing",
    className:
      "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  },
  [PaymentStatus.UnderReview]: {
    label: "Payment Under Review",
    className:
      "bg-orange-500/20 text-orange-300 border-orange-500/40 hover:bg-orange-500/30",
  },
  [PaymentStatus.Confirmed]: {
    label: "Confirmed",
    className:
      "bg-green-500/20 text-green-300 border-green-500/40 hover:bg-green-500/30",
  },
  [PaymentStatus.Delivered]: {
    label: "Delivered",
    className:
      "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={`${config.className} ${className} text-xs font-medium`}
    >
      {config.label}
    </Badge>
  );
}
