import Container from "@/app/components/shared/Container";
import CoverImage from "./__components/CoverImage";
import ProviderAside from "./__components/ProviderAside";
import ProfileInfo from "./__components/ProfileInfo";
import ProviderProfileAction from "./__components/ProviderProfileAction";
import { getBusniessProfile } from "@/actions/quires/user.api";

export default async function Page() {
  const profileInfo = await getBusniessProfile();

  return (
    <Container>
      <ProviderProfileAction profileInfo={profileInfo} />
      <CoverImage
        coverImageUrl={profileInfo?.data?.business_cover_image_full_url}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-6 items-start">
        <div className="lg:col-span-1">
          <ProviderAside
            withdrawn_amount={profileInfo?.data?.withdrawn_amount}
            openingHours={profileInfo?.data?.business_hours}
            business_logo={profileInfo?.data?.business_logo_full_url}
          />
        </div>
        <div className="lg:col-span-3">
          <ProfileInfo profileData={profileInfo?.data} />
        </div>
      </div>
    </Container>
  );
}
