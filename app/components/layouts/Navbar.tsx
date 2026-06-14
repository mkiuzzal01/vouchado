import MegaMenu from "./MegaMenu";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="font-bold text-xl">Logo</div>

        <MegaMenu />

        <div>{/* Auth buttons */}</div>
      </div>
    </header>
  );
}
