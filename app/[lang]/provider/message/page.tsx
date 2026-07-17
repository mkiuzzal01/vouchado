import Container from "@/app/components/shared/Container";
import NotFoundData from "@/app/components/shared/NotFoundData";
import {
  getConversation,
  getMessages,
} from "@/actions/quires/conversation.api";
import Inbox from "../../(main)/chat/__components/Inbox";

interface Props {
  searchParams: Promise<{ search?: string; id?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { search, id } = await searchParams;

  const query = new URLSearchParams();
  if (search) query.set("search", search);

  const [listResult, messagesResult] = await Promise.allSettled([
    getConversation(query.toString()),
    id ? getMessages(id) : Promise.resolve(null),
  ]);

  const list = listResult.status === "fulfilled" ? listResult?.value : null;
  if (listResult.status === "rejected") {
    console.error("Failed to fetch conversations:", listResult?.reason);
  }

  const messages =
    messagesResult.status === "fulfilled" ? messagesResult?.value : null;
  if (messagesResult.status === "rejected") {
    console.error(
      `Failed to fetch messages for ID ${id}:`,
      messagesResult?.reason,
    );
  }

  if (!list || (Array?.isArray(list) && list?.length === 0)) {
    return <NotFoundData description="No Conversation found." />;
  }

  return (
    <Container>
      <Inbox list={list} message={messages} />
    </Container>
  );
}
