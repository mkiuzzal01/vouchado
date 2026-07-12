import ProductCard from "@/app/components/cards/ProductCard";

interface Props {
  deals: any[];
  lang: string;
}

export default function ShopProduct({ deals, lang }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals?.map((item) => (
        <>
          <ProductCard product={item} lang={lang} />
        </>
      ))}
    </div>
  );
}
