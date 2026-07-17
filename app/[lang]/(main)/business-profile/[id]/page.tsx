import Container from "@/app/components/shared/Container";
import CoverImage from "../../../provider/provider-profile/__components/CoverImage";
import { getBusinessProfileById } from "@/actions/quires/user.api";
import Aside from "../__components/Aside";
import ShopProduct from "../__components/ShopProduct";
import NotFoundData from "@/app/components/shared/NotFoundData";
import ProfileAction from "../__components/ProfileAction";

interface Props {
  params: Promise<{ id: string; lang: string }>;
}

export default async function page({ params }: Props) {
  const { id, lang } = await params;
  console.log(id);
  const profileInfo = await getBusinessProfileById(id);

  if (!profileInfo?.data) {
    return <NotFoundData title="Business profile not found" />;
  }

  return (
    <Container className="py-4">
      <CoverImage
        coverImageUrl={profileInfo?.data?.business_cover_image_full_url}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-6 items-start">
        <div className="lg:col-span-1">
          <Aside business_profile={profileInfo?.data?.business_profile} />
        </div>
        <div className="lg:col-span-3">
          <ProfileAction
            lang={lang}
            business_profile={profileInfo?.data?.business_profile}
          />
          <ShopProduct lang={lang} deals={profileInfo?.data?.deals} />
        </div>
      </div>
    </Container>
  );
}
