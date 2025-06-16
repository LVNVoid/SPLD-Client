import { cn } from "@/lib/utils";

export const StatusBadge = ({ status, className }) => {
  const config = {
    PUBLISHED: {
      dot: "bg-green-500 animate-pulse",
      text: "text-green-800 dark:text-green-200",
      bg: "bg-green-50 dark:bg-green-900/30",
      border: "border-green-200 dark:border-green-800",
    },
    DRAFT: {
      dot: "bg-yellow-500",
      text: "text-yellow-800 dark:text-yellow-200",
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
      border: "border-yellow-200 dark:border-yellow-800",
    },
  };

  const { dot, text, bg, border } = config[status];
  const label = status === "PUBLISHED" ? "Published" : "Draft";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        bg,
        border,
        text,
        className
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", dot)} />
      {label}
    </span>
  );
};
