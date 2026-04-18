interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizeMap[size]} rounded-full border-primary/30 border-t-primary animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground text-sm animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
