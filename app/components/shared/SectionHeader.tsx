import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  title?: string;
  description?: string;
}
export default function SectionHeader({ icon, title, description }: Props) {
  return (
    <div className="my-8">
      <div className="flex items-center gap-4">
        {icon}
        {title && (
          <h2 className="mb-2 text-xl lg:text-2xl font-bold">{title}</h2>
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
