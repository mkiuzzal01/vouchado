import PromoContact from "@/app/components/hero/PromoContact";
import ContactUs from "./__components/ContactUs";
import { getSystemInfo } from "@/actions/quires/system_info.api";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface props {
  params: Promise<{
    lang: string;
  }>;
}

export default async function page({ params }: props) {
  const { lang } = await params;
  const systemInfo = await getSystemInfo();

  if (!systemInfo) {
    return <NotFoundData title="No Contact Info Found" />;
  }

  return (
    <div>
      <ContactUs lang={lang} systemInfo={systemInfo?.data} />
      <PromoContact lang={lang} />
    </div>
  );
}
