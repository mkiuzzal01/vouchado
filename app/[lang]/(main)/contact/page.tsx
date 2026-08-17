import PromoContact from "@/app/components/hero/PromoContact";
import ContactUs from "./__components/ContactUs";
import { getSystemInfo } from "@/actions/quires/system_info.api";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { getDictionary } from "../../dictionaries";
import { translateData } from "@/app/components/utils/translateText";

interface props {
  params: Promise<{
    lang: string;
  }>;
}

export default async function page({ params }: props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const systemInfoData = await getSystemInfo();
  const systemInfo = await translateData(systemInfoData, lang);

  if (!systemInfo) {
    return (
      <NotFoundData
        title={t.shared.utility.no_data}
        description={t.shared.utility.no_data_desc}
      />
    );
  }

  return (
    <div>
      <ContactUs lang={lang} systemInfo={systemInfo?.data} t={t} />
      <PromoContact lang={lang} t={t} />
    </div>
  );
}
