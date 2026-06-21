import Container from "@/app/components/shared/Container";
import Inbox from "./__components/Inbox";
import PrivateRoute from "@/app/components/providers/PrivateRoute";

export default function page() {
  return (
    <PrivateRoute>
      <Container>
        <Inbox />
      </Container>
    </PrivateRoute>
  );
}
