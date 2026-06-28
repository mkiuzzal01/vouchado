import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  title?: string;
  description?: string;
}
export default function SectionHeader({ icon, title, description }: Props) {
  return (
    <div className="mt-[80px] mb-[20px]">
      <div className="flex items-center gap-4">
        {icon}
        {title && (
          <h2 className="mb-2 text-xl lg:text-2xl xl:text-[32px] font-semibold">
            {title}
          </h2>
        )}
      </div>
      {description && (
        <p className="text-xs sm:text-sm lg:text-base text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
