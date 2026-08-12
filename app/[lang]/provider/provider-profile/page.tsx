import Container from "@/app/components/shared/Container";
import CoverImage from "./__components/CoverImage";
import ProviderAside from "./__components/ProviderAside";
import ProfileInfo from "./__components/ProfileInfo";
import ProviderProfileAction from "./__components/ProviderProfileAction";
import { getBusniessProfile } from "@/actions/quires/user.api";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const profileInfo = await getBusniessProfile();

  return (
    <Container>
      <ProviderProfileAction profileInfo={profileInfo} t={t} />
      <CoverImage
        coverImageUrl={profileInfo?.data?.business_cover_image_full_url}
        t={t}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-6 items-start">
        <div className="lg:col-span-1">
          <ProviderAside
            balance={profileInfo?.data?.payout_available_balance}
            openingHours={profileInfo?.data?.business_hours}
            business_logo={profileInfo?.data?.business_logo_full_url}
            t={t}
          />
        </div>
        <div className="lg:col-span-3">
          <ProfileInfo profileData={profileInfo?.data} t={t} />
        </div>
      </div>
    </Container>
  );
}
