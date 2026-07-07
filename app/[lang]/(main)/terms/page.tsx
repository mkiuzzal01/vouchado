import Container from "@/app/components/shared/Container";
import { getTerms } from "@/actions/quires/policy.api";

export default async function page() {
  const { data } = await getTerms();

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: data?.page_title }} />
      <div dangerouslySetInnerHTML={{ __html: data?.page_content }} />
    </Container>
  );
}
