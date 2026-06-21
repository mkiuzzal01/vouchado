import PersonalInfo from "./__components/PersonalInfo";
import MyPurchases from "./__components/MyPurchases";

export default function page() {
  return (
    <div className="space-y-4">
      <PersonalInfo />
      <MyPurchases />
    </div>
  );
}
