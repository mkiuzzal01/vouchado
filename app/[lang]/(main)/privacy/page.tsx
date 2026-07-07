import Container from "@/app/components/shared/Container";
import { getPolicy } from "@/actions/quires/policy.api";

export default async function page() {
  const { data } = await getPolicy();

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: data?.page_title }} />
      <div dangerouslySetInnerHTML={{ __html: data?.page_content }} />
    </Container>
  );
}
