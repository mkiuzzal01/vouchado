import PromoContact from "@/app/components/hero/PromoContact";
import ContactUs from "./__components/ContactUs";

interface props {
  params: Promise<{
    lang: string;
  }>;
}

export default async function page({ params }: props) {
  const { lang } = await params;
  return (
    <div>
      <ContactUs lang={lang} />
      <PromoContact lang={lang} />
    </div>
  );
}
