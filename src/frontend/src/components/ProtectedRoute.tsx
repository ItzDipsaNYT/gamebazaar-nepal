import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
  requireStaff?: boolean;
}

export function ProtectedRoute({
  children,
  requireStaff = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isStaff } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireStaff && !isStaff) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
