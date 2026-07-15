import Container from "@/app/components/shared/Container";
import Inbox from "./__components/Inbox";
import {
  getConversation,
  getMessages,
} from "@/actions/quires/conversation.api";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface Props {
  searchParams: Promise<{ page?: string; limit?: string; id?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.id;

  const list = await getConversation();

  let messages = null;

  if (id) {
    try {
      messages = await getMessages(id);
    } catch (error) {
      console.error("Failed to fetch messages for ID:", id, error);
    }
  }

  // Handle case where API didn't return list safely
  if (!list || (Array.isArray(list) && list.length === 0)) {
    return <NotFoundData description="No Conversation found." />;
  }

  return (
    <Container>
      <Inbox list={list} message={messages} />
    </Container>
  );
}
