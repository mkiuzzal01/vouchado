import Container from "@/app/components/shared/Container";
import CoverImage from "./__components/CoverImage";
import ProviderAside from "./__components/ProviderAside";
import ProfileInfo from "./__components/ProfileInfo";

export default function Page() {
  return (
    <Container>
      <CoverImage />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-6 items-start">
        <div className="lg:col-span-1">
          <ProviderAside />
        </div>
        <div className="lg:col-span-3">
          <ProfileInfo />
        </div>
      </div>
    </Container>
  );
}
