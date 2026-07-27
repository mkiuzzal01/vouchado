import Container from "@/app/components/shared/Container";
import { getCancellationPolicy } from "@/actions/quires/policy.api";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const cancellationPolicy = await getCancellationPolicy();

  if (!cancellationPolicy) {
    return <NotFoundData title="Cancellation policy not found!" />;
  }

  return (
    <Container>
      <div className="py-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          {cancellationPolicy?.data?.page_title}
        </h2>
        <div
          className="mt-4 prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: cancellationPolicy?.data?.page_content,
          }}
        />
      </div>
    </Container>
  );
}
