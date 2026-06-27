import Container from "../shared/Container";

interface TopBarProps {
  content: {
    desktop: string;
    mobile: string;
  };
}

export default function TopBar({ content }: TopBarProps) {
  return (
    <div className="w-full bg-[#013445]">
      <Container className="py-2 sm:py-2.5 lg:py-3 2xl:py-3.5 text-center text-white sm:text-base">
        <p className="text-xs hidden lg:text-sm xl:text-base lg:block">{content.desktop}</p>
        <p className="text-xs block lg:hidden">{content.mobile}</p>
      </Container>
    </div>
  );
}
