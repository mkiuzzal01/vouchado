"use client";
import { Category } from "@/redux/types/categoris";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export interface FilterWithCategoryProps {
  onCategoryChange?: (id: string | number) => void;
  className?: string;
  categories: Category[];
}

export default function FilterWithCategory({
  onCategoryChange,
  className = "",
  categories = [],
}: FilterWithCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedId = searchParams.get("category_id") || "all";

  const handleSelect = (id: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id === "all") {
      params.delete("category_id");
    } else {
      params.set("category_id", id.toString());
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    onCategoryChange?.(id);
  };

  const getButtonClass = (isActive: boolean) => `
    flex items-center gap-2 px-5 h-[46px]
    rounded-xl text-sm font-medium
    whitespace-nowrap shrink-0
    border transition-all duration-200 snap-start
    active:scale-97 outline-none
    ${
      isActive
        ? "bg-[#2BBCC2] border-[#2BBCC2] text-white"
        : "bg-white border-[#E2E8F0] text-[#1F2E3D] hover:border-slate-300"
    }
  `;

  return (
    <div className={`w-full py-2 ${className}`}>
      <div
        className="
          flex items-center gap-3
          overflow-x-auto
          scroll-smooth
          px-2 py-1
          [-ms-overflow-style:none]
          scrollbar-none
          &::-webkit-scrollbar:hidden
          snap-x snap-mandatory
        "
      >
        <button
          onClick={() => handleSelect("all")}
          className={getButtonClass(selectedId === "all")}
        >
          <span>All</span>
        </button>

        {/* 2. Dynamic Categories List */}
        {categories?.map((cat) => {
          const isActive = selectedId === cat.id.toString();

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={getButtonClass(isActive)}
            >
              {cat.icon && (
                <span className="flex items-center justify-center shrink-0">
                  {cat.icon.startsWith("http") || cat.icon.includes("/") ? (
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <span
                      className="text-lg"
                      style={{ color: isActive ? "#ffffff" : "#292D32" }}
                    >
                      •
                    </span>
                  )}
                </span>
              )}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
