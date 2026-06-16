import Container from "@/app/components/shared/Container";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <Container>
        <h1>{slug}</h1>
      </Container>
    </div>
  );
}
