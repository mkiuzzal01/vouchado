import { getWishlist } from "@/actions/quires/user.api";
import Wishlist from "./__components/Wishlist";
import { getDictionary } from "../../dictionaries";

interface WishlistProps {
  params: Promise<{ lang: string }>;
}
export default async function page({ params }: WishlistProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const wishlist = await getWishlist();

  return <Wishlist lang={lang} items={wishlist?.data} t={t} />;
}
