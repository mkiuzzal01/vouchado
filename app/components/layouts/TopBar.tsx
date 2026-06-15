interface TopBarProps {
  content: {
    desktop: string;
    mobile: string;
  };
}

export default function TopBar({ content }: TopBarProps) {
  return (
    <div className="w-full border-b border-white/10 bg-[#013445] px-4 py-2 text-center text-sm text-white sm:text-base">
      <p className="mx-auto max-w-6xl">{content.desktop}</p>
      <p className="mx-auto max-w-6xl sm:hidden">{content.mobile}</p>
    </div>
  );
}
