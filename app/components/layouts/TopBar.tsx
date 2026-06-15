export default function TopBar() {
  return (
    <div className="w-full border-b border-white/10 bg-[#013445] px-4 py-2 text-center text-sm text-white sm:text-base">
      <p className="mx-auto max-w-6xl">
        🔥 Up to <span className="font-semibold">70% off</span> on crazy
        wellness deals —{" "}
        <span className="hidden sm:inline">spoil yourself now!</span>
        <span className="sm:hidden">don’t miss out!</span>
      </p>
    </div>
  );
}
