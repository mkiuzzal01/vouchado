"use client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Info, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function RefreshSection({ t }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleRefresh = () => {
    router.push(pathname);
  };

  return (
    <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-teal-50 rounded-xl text-teal-600 mt-0.5 sm:mt-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm lg:text-2xl">
            {t?.vouchers?.bottom?.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {t?.vouchers?.bottom?.description}
          </p>
        </div>
      </div>
      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 px-4 py-2 border border-teal-500 rounded-full text-teal-600 font-medium text-sm lg:text-lg hover:bg-teal-50/50 transition bg-white shadow-sm self-end sm:self-auto"
      >
        <RotateCw className="w-5 h-5" />
        {t?.vouchers?.bottom?.cta}
      </button>
    </div>
  );
}
