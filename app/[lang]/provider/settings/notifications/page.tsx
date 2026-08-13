import { getNotificationOptins } from "@/actions/quires/system_info.api";
import Container from "@/app/components/shared/Container";
import NotificationActions from "./__components/NotificationActions";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  const notifications = await getNotificationOptins();

  if (!notifications?.data) {
    return (
      <NotFoundData
        title={t.shared.utility.no_data}
        description={t.shared.utility.no_data_desc}
      />
    );
  }

  return (
    <Container>
      <NotificationActions notifications={notifications.data} t={t} />
    </Container>
  );
}
