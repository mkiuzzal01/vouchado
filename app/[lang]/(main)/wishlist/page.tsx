import { getWishlist } from "@/actions/quires/user.api";
import Wishlist from "./__components/Wishlist";
import PrivateRoute from "@/app/components/providers/PrivateRoute";

interface WishlistProps {
  params: Promise<{ lang: string }>;
}
export default async function page({ params }: WishlistProps) {
  const { lang } = await params;
  const wishlist = await getWishlist();

  return (
    <PrivateRoute lang={lang}>
      <Wishlist lang={lang} items={wishlist?.data} />
    </PrivateRoute>
  );
}
