import { getNotification } from "@/actions/quires/system_info.api";
import Container from "@/app/components/shared/Container";
import NotFoundData from "@/app/components/shared/NotFoundData";
import NotificationList from "./__components/NotificationList";

export default async function NotificationPage() {
  const res = await getNotification();
  const notifications = res?.data || [];

  if (!notifications || notifications.length === 0) {
    return <NotFoundData description="No Notifications Found" />;
  }

  return (
    <Container>
      <NotificationList initialNotifications={notifications} />
    </Container>
  );
}
