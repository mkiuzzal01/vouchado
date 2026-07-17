import PageHero from "@/app/components/hero/PageHero";
import UsedVoucher from "@/app/components/icons/UsedVoucher";
import Container from "@/app/components/shared/Container";
import Promotions from "@/public/section-headers/Hero Section (3).png";
import { getUnusedVochers } from "@/actions/quires/voucher.api";
import { Voucher } from "@/redux/types/voucher";
import QRCode from "./__components/QRCode";
import NotFoundData from "@/app/components/shared/NotFoundData";
import RefreshSection from "./__components/RefreshSection";

export default async function Page() {
  const unredeemed = await getUnusedVochers();
  const vouchers = unredeemed?.data?.data as Voucher[];

  if (!vouchers?.length)
    return <NotFoundData description="No unused voucher" />;

  return (
    <div>
      <PageHero backgroundImage={Promotions.src} title="Unused Voucher" />
      <Container className="my-20">
        <div className="w-full lg:max-w-7xl mx-auto ">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UsedVoucher />
            Unused Voucher
          </h2>

          {/* Voucher List Container */}
          <div className="space-y-6">
            {vouchers?.map((voucher: Voucher, index: number) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl flex flex-col md:flex-row overflow-hidden"
              >
                {/* Left Content */}
                <div className="flex-1 p-5 md:pt-6 md:pb-6 md:pl-12 md:pr-12 flex flex-col gap-5">
                  {/* Voucher ID & Qty */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div>
                      <span className="block text-sm md:text-lg font-semibold text-slate-600 mb-1">
                        Voucher ID
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 break-all">
                        # {voucher.id}
                      </span>
                    </div>

                    <div className="sm:text-right">
                      <span className="block text-sm md:text-lg font-semibold text-gray-600 mb-1">
                        Qty
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                        {voucher?.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Deal Name */}
                  <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-6">
                    <span className="text-sm md:text-lg font-semibold text-gray-600 shrink-0">
                      Deal Name
                    </span>

                    <p className="text-sm sm:text-base md:text-lg text-gray-800 font-semibold md:text-right md:max-w-md">
                      {voucher?.deal_name}
                    </p>
                  </div>

                  {/* Payment */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <span className="text-sm md:text-lg font-semibold text-gray-600">
                      Payment
                    </span>

                    <span className="text-lg md:text-2xl font-semibold text-gray-950">
                      € {voucher.price}
                    </span>
                  </div>

                  {/* Expire Date */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <span className="text-sm md:text-lg font-semibold text-gray-600">
                      Expire date
                    </span>

                    <span className="text-sm md:text-lg font-medium text-gray-950">
                      {voucher.expire_date}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex items-center justify-center p-5 md:p-6 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/10 shrink-0">
                  <div className="bg-white p-1">
                    <QRCode voucher_code={voucher.voucher_code} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info/Help Banner at bottom */}
          <RefreshSection />
        </div>
      </Container>
    </div>
  );
}
