"use client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Category } from "@/redux/types/categoris";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export interface FilterWithCategoryProps {
  onCategoryChange?: (id: string | number) => void;
  className?: string;
  categories: Category[];
  t?: Awaited<ReturnType<typeof getDictionary>>;
}

export default function FilterWithCategory({
  onCategoryChange,
  className = "",
  categories = [],
  t,
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
          <span>{t?.deals?.category}</span>
        </button>

        {categories?.length > 0 ? (
          categories?.map((cat) => {
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
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        width={24}
                        height={24}
                        className="object-contain grayscale"
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
          })
        ) : (
          <p className="text-red-500">No Categories</p>
        )}
      </div>
    </div>
  );
}
