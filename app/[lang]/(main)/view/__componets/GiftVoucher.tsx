import { Button } from "@/components/ui/button";

export default function GiftVoucher() {
  return (
    <div className="bg-white rounded-3xl flex items-center p-6 md:p-8 justify-between">
      <div>
        <h1 className="text-xl font-medium text-gray-800">
          Buy gift voucher for your favourite person
        </h1>
      </div>
      <div>
        <Button className="text-white p-7 font-medium rounded-full">
          Buy Gift
        </Button>
      </div>
    </div>
  );
}
