import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[1744px] mx-auto px-3.5 sm:px-6 lg:px-8 w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}
