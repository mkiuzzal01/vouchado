import { getWishlist } from "@/actions/quires/user.api";
import Wishlist from "./__components/Wishlist";

interface WishlistProps {
  params: Promise<{ lang: string }>;
}
export default async function page({ params }: WishlistProps) {
  const { lang } = await params;
  const wishlist = await getWishlist();

  return <Wishlist lang={lang} items={wishlist?.data} />;
}
