import Container from "@/app/components/shared/Container";
import Aside from "./__components/Aside";
import { getUserProfile } from "@/actions/quires/user.api";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const userProfile = await getUserProfile();
  return (
    <Container className="py-6 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row w-full gap-6 items-start">
        <aside className="w-full md:w-80 lg:w-[405px] shrink-0 space-y-4">
          <Aside data={userProfile?.data} />
        </aside>
        <main className="flex-1 w-full space-y-6">{children}</main>
      </div>
    </Container>
  );
}
