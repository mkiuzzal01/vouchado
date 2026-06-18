import ItemCard from "./ItemCard";

interface Props {
  items: any[];
}

export default function YourItems({ items }: Props) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
