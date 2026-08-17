import { getWishlist } from "@/actions/quires/user.api";
import Wishlist from "./__components/Wishlist";
import { getDictionary } from "../../dictionaries";
import { translateData } from "@/app/components/utils/translateText";

interface WishlistProps {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: WishlistProps) {
  const { lang } = await params;

  const [t, wishlistRes] = await Promise.all([
    getDictionary(lang),
    getWishlist(),
  ]);

  const rawItems = wishlistRes?.data || [];
  const translatedItems = await translateData(rawItems, lang);

  return <Wishlist lang={lang} items={translatedItems} t={t} />;
}
