import Container from "@/app/components/shared/Container";
import NotFoundData from "@/app/components/shared/NotFoundData";
import {
  getConversation,
  getMessages,
} from "@/actions/quires/conversation.api";
import Inbox from "./__components/Inbox";
import { translateData } from "@/app/components/utils/translateText";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ search?: string; id?: string }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { lang } = await params;
  const { search, id } = await searchParams;

  const query = new URLSearchParams();
  if (search) query.set("search", search);

  const [listResult, messagesResult] = await Promise.allSettled([
    getConversation(query.toString()),
    id ? getMessages(id) : Promise.resolve(null),
  ]);

  const rawList = listResult.status === "fulfilled" ? listResult?.value : null;
  if (listResult.status === "rejected") {
    console.error("Failed to fetch conversations:", listResult?.reason);
  }

  const rawMessages =
    messagesResult.status === "fulfilled" ? messagesResult?.value : null;
  if (messagesResult.status === "rejected") {
    console.error(
      `Failed to fetch messages for ID ${id}:`,
      messagesResult?.reason,
    );
  }

  if (!rawList || (Array.isArray(rawList) && rawList.length === 0)) {
    return <NotFoundData description="No Conversation found." />;
  }

  const [list, messages] = await Promise.all([
    translateData(rawList, lang),
    rawMessages ? translateData(rawMessages, lang) : null,
  ]);

  return (
    <Container>
      <Inbox list={list} message={messages} />
    </Container>
  );
}
