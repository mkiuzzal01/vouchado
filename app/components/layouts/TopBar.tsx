import Container from "../shared/Container";

interface TopBarProps {
  content: {
    desktop: string;
    mobile: string;
  };
}

export default function TopBar({ content }: TopBarProps) {
  return (
    <div className="w-full border-b border-white/10 bg-[#013445]">
      <Container className="px-4 py-2 text-center text-white sm:text-base">
        <p className="text-xs hidden lg:text-sm lg:block">{content.desktop}</p>
        <p className="text-xs block lg:hidden">{content.mobile}</p>
      </Container>
    </div>
  );
}
