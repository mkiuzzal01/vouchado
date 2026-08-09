import Container from "@/app/components/shared/Container";
import Aside from "./__components/Aside";
import { GetRecentActivity, getUserProfile } from "@/actions/quires/user.api";
import { getDictionary } from "../../dictionaries";

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  let userProfile = null;
  let recentActivities = null;
  let points = null;
  let needed = null;
  let voucher_euro = null;
  const { lang } = await params;
  const t = await getDictionary(lang);

  try {
    const [profileRes, activitiesRes] = await Promise.all([
      getUserProfile(),
      GetRecentActivity(),
    ]);

    userProfile = profileRes?.data ?? null;
    recentActivities = activitiesRes?.data?.data ?? [];
    points = activitiesRes?.data?.user_points;
    needed = activitiesRes?.data?.points_needed;
    voucher_euro = activitiesRes?.data?.target_voucher_euro;
  } catch (error) {
    console.error("[PROFILE_LAYOUT_ERROR]: Failed to fetch user data", error);
  }

  return (
    <Container className="py-6 sm:py-8 lg:py-10 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row w-full gap-6 lg:gap-8 items-start">
        {/* Aside Sidebar Navigation */}
        <aside className="w-full md:w-80 lg:w-[380px] xl:w-[405px] shrink-0 md:sticky md:top-6 space-y-4">
          <Aside
            data={userProfile}
            recentActivities={recentActivities}
            user_points={points}
            points_needed={needed}
            target_voucher_euro={voucher_euro}
            t={t}
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full min-w-0 space-y-6">{children}</main>
      </div>
    </Container>
  );
}
