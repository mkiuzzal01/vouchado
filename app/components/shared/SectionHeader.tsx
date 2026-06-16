interface Props {
  title?: string;
  description?: string;
}
export default function SectionHeader({ title, description }: Props) {
  return (
    <div className="mt-8">
      {title && (
        <h2 className="mb-2 text-xl lg:text-2xl font-semibold">{title}</h2>
      )}
      {description && (
        <p className="text-xs sm:text-sm lg:text-base text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
