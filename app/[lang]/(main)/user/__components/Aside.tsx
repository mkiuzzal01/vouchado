import AsidePoint from "./AsidePoint";
import AsideActivity from "./AsideActivity";
import AsideAction from "./AsideAction";

export default function Aside() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <AsidePoint />
      <AsideActivity />
      <AsideAction />
    </div>
  );
}
