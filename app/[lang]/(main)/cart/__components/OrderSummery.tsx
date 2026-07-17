import RedeemForm from "@/app/components/forms/RedeemForm";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { useState } from "react";
import TrustSection from "./TrustSection";
import OrderSummery from "@/app/components/icons/OrderSummery";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import { toast } from "react-toastify";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Coupon from "./Coupon";

interface Props {
  lang: string;
}

export default function OrderSummary({ lang }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { items, subTotal, totalPrice, couponDiscount, vatRate } =
    useAppSelector((state) => state.cart);

  const totalItems = items.reduce(
    (total, item) => total + item.selectedQuantity,
    0,
  );

  const vatAmount = subTotal * vatRate;

  const handleCheckout = async () => {
    const payload = {
      items: items.map((item) => ({
        deal_id: item.id,
        quantity: item.selectedQuantity,
      })),
    };

    try {
      const res = await createOrder(payload).unwrap();
      if (res?.message) {
        toast.success(res.message);
        dispatch(clearCart());
        router.replace(res?.data?.checkout_url);
      }
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.error("Please to login first then checkout");
        router.push(`/${lang}/login?redirect=${window?.location?.pathname}`);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Order Summary Card */}
      <div className="w-full bg-white p-6 rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <OrderSummery />
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Summary
          </h2>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xl font-medium">
              Items ({totalItems})
            </span>

            <span className="font-bold text-xl text-gray-800">
              € {subTotal?.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xl font-medium">
              VAT ({(vatRate * 100)?.toFixed(0)}%)
            </span>

            <span className="font-bold text-xl text-gray-800">
              € {vatAmount?.toFixed(2)}
            </span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xl font-medium">
                Coupon Discount
              </span>

              <span className="font-bold text-xl text-red-500">
                -€ {couponDiscount?.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-400 mb-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-medium text-gray-600">Total</span>

          <span className="text-xl font-extrabold text-gray-800">
            € {totalPrice?.toFixed(2)}
          </span>
        </div>

        {/* Loyalty Banner */}
        <div className="bg-gray-50/70 p-4 rounded-2xl flex items-center justify-between gap-4 mb-6 border border-gray-50">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              Use your points & enjoy even more discount
            </h4>
            <p className="text-sm text-gray-500">
              2000 vouchado points are available. You can add upto €20 discount.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#2bb3bb] hover:bg-[#239aa1] text-white text-xs font-semibold px-3 py-2 rounded-full"
          >
            Redeem Points
          </button>
        </div>

        {/* Coupon */}
        <Coupon />

        {/* Checkout */}
        <button
          onClick={handleCheckout}
          disabled={!items.length}
          className="flex justify-center items-center w-full bg-[#2bb3bb] hover:bg-[#239aa1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full transition-colors"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Proceed to Checkout"
          )}
        </button>
        {/* Trust Section */}
        <TrustSection totalPrice={totalPrice} />
      </div>

      <ModalContainer
        title="Redeem Your Loyalty Points"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <RedeemForm />
      </ModalContainer>
    </div>
  );
}
