import { getNotification } from "@/actions/quires/system_info.api";
import Container from "@/app/components/shared/Container";
import NotFoundData from "@/app/components/shared/NotFoundData";
import NotificationList from "./__components/NotificationList";
import { translateData } from "@/app/components/utils/translateText";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function NotificationPage({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const notificationsData = await getNotification();
  const notifications = await translateData(notificationsData, lang);

  const notificationsList = Array.isArray(notifications?.data?.data)
    ? notifications.data.data
    : Array.isArray(notifications?.data)
      ? notifications.data
      : Array.isArray(notifications)
        ? notifications
        : [];

  return (
    <Container>
      <NotificationList
        t={t}
        lang={lang}
        initialNotifications={notificationsList}
      />
    </Container>
  );
}
