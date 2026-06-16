interface Props {
  title?: string;
  description?: string;
}
export default function SeactionHeader({ title, description }: Props) {
  return (
    <div className="mt-8">
      {title && <h2 className="mb-2 text-2xl font-semibold">{title}</h2>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
