import EarnedPoints from "@/app/components/icons/EarnedPoints";
import FreeCancellation from "@/app/components/icons/FreeCancellation";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import SecurePayment from "@/app/components/icons/SecurePayment";

interface Props {
  totalPrice: number;
}

const trustItems = [
  {
    title: "VOUCHADO GUARANTEE",
    description: "Deals always 20% cheaper or MORE!",
    icon: InstantConfirm,
  },
  {
    title: "Free Cancellation",
    description:
      "within 14 days of purchase - except last minute bookings or specific dates",
    icon: FreeCancellation,
  },
  {
    title: "Secure Payments",
    description: "Your payment information is 100% secure.",
    icon: SecurePayment,
  },
];

export default function TrustSection({ totalPrice }: Props) {
  return (
    <div className="mt-8 space-y-6">
      <div className="overflow-hidden rounded-2xl bg-[#F9FAFB]">
        <div className="space-y-6 p-6">
          {trustItems.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-[#2bb3bb]">
                <Icon />
              </div>

              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900">
                  {title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3  bg-[#F9FAFB] px-6 py-4 rounded-2xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-full">
          <EarnedPoints />
        </div>

        <p className="text-sm font-medium text-gray-700">
          You'll earn{" "}
          <span className="font-semibold text-[#2bb3bb]">
            {Math.floor(totalPrice).toLocaleString()} points
          </span>{" "}
          with this purchase.
        </p>
      </div>
    </div>
  );
}
