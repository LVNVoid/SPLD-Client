import { cn } from "@/lib/utils";

export const PolsekBadge = ({ name }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        "bg-blue-50 text-blue-800 border-blue-200",
        "dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800"
      )}
    >
      {name || "-"}
    </span>
  );
};
