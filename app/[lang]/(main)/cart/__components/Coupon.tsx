"use client";
import { toast } from "react-toastify";
import AppForm from "@/app/components/forms/AppForm";
import TextInput from "@/app/components/forms/inputs/TextInput";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import { FieldValues } from "react-hook-form";
import { useCouponPurchaseMutation } from "@/redux/features/checkout/checkout.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { setApplyCoupon } from "@/redux/features/cart/cart.slice";

export default function Coupon() {
  const dispatch = useAppDispatch();
  const { couponStatus } = useAppSelector((state) => state.cart);

  const [applyCoupon, { isLoading }] = useCouponPurchaseMutation();

  const handleSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await applyCoupon(values).unwrap();
      if (res?.message) {
        toast.success(res.message);
        dispatch(setApplyCoupon(Number(res?.data?.coupon?.value)));
        reset();
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to apply coupon");
    }
  };

  return (
    <div>
      <AppForm onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex-1">
            <TextInput
              required
              disabled={couponStatus}
              name="coupon_code"
              placeholder="Enter your coupon code"
              className="rounded-full"
            />
          </div>
          <div>
            <SubmitButton
              disabled={couponStatus}
              className="h-11 rounded-full px-4"
              isLoading={isLoading}
              title="Apply"
              type="submit"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
