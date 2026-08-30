import Container from "@/app/components/shared/Container";
import { getPolicy } from "@/actions/quires/policy.api";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const { data } = await getPolicy();

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: data?.page_title }} />
      <div dangerouslySetInnerHTML={{ __html: data?.page_content }} />
    </Container>
  );
}
