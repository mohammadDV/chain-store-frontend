import type { ComponentProps } from "react";
import type { Badge } from "@/ui/badge";
import type { PublicOrderStatus } from "../_api/getOrderByCode";

export function getStatusLabel(status: PublicOrderStatus | string | undefined) {
  switch (status) {
    case "pending":
      return "در انتظار پرداخت";
    case "paid":
      return "پرداخت شده";
    case "shipped":
      return "ارسال شده";
    case "delivered":
      return "تحویل شده";
    case "returned":
      return "مرجوع شده";
    case "refunded":
      return "بازپرداخت شده";
    case "failed":
      return "ناموفق";
    case "expired":
      return "منقضی شده";
    case "cancelled":
      return "لغو شده";
    default:
      return status || "نامشخص";
  }
}

export function getStatusVariant(
  status: PublicOrderStatus | string | undefined
): ComponentProps<typeof Badge>["variant"] {
  if (status === "pending") return "warning";
  if (status === "paid" || status === "shipped" || status === "delivered") {
    return "success";
  }
  return "error";
}
