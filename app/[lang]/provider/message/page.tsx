import Container from "@/app/components/shared/Container";
import Inbox from "../../(main)/chat/__components/Inbox";

export default function MessagePage() {
  return (
    <Container className="py-5">
      <h1 className="text-xl font-bold text-gray-900 tracking-tight">
        Messages
      </h1>
      <Inbox />
    </Container>
  );
}
