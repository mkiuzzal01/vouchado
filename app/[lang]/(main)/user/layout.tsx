import Container from "@/app/components/shared/Container";
import Aside from "./__components/Aside";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Container className="py-6 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row w-full gap-6 items-start">
        <aside className="w-full md:w-80 lg:w-[405px] shrink-0 space-y-4">
          <Aside />
        </aside>
        <main className="flex-1 w-full space-y-6">{children}</main>
      </div>
    </Container>
  );
}
