import { getNotification } from "@/actions/quires/system_info.api";
import Container from "@/app/components/shared/Container";
import NotificationActions from "./__components/NotificationActions";
import NotFoundData from "@/app/components/shared/NotFoundData";

export default async function page() {
  const notifications = await getNotification();

  if (!notifications?.data)
    return <NotFoundData title="No Notification Found" />;

  return (
    <Container>
      <NotificationActions notifications={notifications.data} />
    </Container>
  );
}
