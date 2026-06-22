import Wishlist from "./__components/Wishlist";

interface WishlistProps {
  params: Promise<{ lang: string }>;
}
export default async function page({ params }: WishlistProps) {
  const lang = await params;

  return <Wishlist lang={lang.lang} />;
}
