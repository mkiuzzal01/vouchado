import Cloth from "@/app/components/icons/Cloth";
import Mail from "@/app/components/icons/Mail";
import BusinessDescription from "@/app/components/icons/BusinessDescription";
import BuildingIcon from "@/app/components/icons/BuildingIcon";
import Call from "@/app/components/icons/Call";
import Internet from "@/app/components/icons/Internet";
import Location from "@/app/components/icons/Location";
import PaymentIcon from "@/app/components/icons/PaymentIcon";
import ProfileMap from "./ProfileMap";

const PAYMENT_HISTORY = [
  {
    date: "10 / 1 / 2026",
    id: "55700223",
    amount: "$600",
    status: "Pending",
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    date: "10 / 1 / 2026",
    id: "55069827",
    amount: "$600",
    status: "Pending",
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    date: "10 / 1 / 2026",
    id: "34034474",
    amount: "$600",
    status: "Complete",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    date: "10 / 1 / 2026",
    id: "58276066",
    amount: "$600",
    status: "Complete",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    date: "10 / 1 / 2026",
    id: "52936567",
    amount: "$600",
    status: "Declined",
    color: "bg-red-50 text-red-600 border-red-200",
  },
];

interface Props {
  profileData: any;
}

export default function ProfileInfo({ profileData }: Props) {
  const CONTACT_ITEMS = [
    {
      icon: <BuildingIcon size={18} />,
      label: profileData?.business_name || "N/A",
    },
    { icon: <Call size={18} />, label: profileData?.phone || "N/A" },
    { icon: <Internet size={18} />, label: profileData?.website || "N/A" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center flex-wrap gap-3">
          <h1 className="text-3xl md:text-[40px] font-bold text-gray-800 leading-tight">
            {profileData?.business_name}
          </h1>
          <span className="text-xs bg-cyan-50 text-cyan-700 flex items-center gap-1.5 py-1 px-3 rounded-full font-semibold h-fit">
            <Cloth size={12} /> {profileData?.business_category}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-xl w-fit">
          <Mail size={16} />{" "}
          <span className="text-gray-700">{profileData?.email}</span>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CONTACT_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white p-3 px-4 rounded-full border border-gray-100"
          >
            <span className="text-teal-600 bg-teal-50 p-2 rounded-xl flex items-center justify-center">
              {item.icon}
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Description & Address Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Business Description */}
        <div className="md:col-span-3 p-5 rounded-2xl  flex flex-col gap-3">
          <div className="flex items-center gap-2 font-bold text-gray-800 text-xl">
            <BusinessDescription size={18} /> Business Description
          </div>
          <p className="text-gray-600 bg-[#F3F6FA] rounded-xl p-4 text-sm leading-relaxed">
            {profileData?.business_description || "No description available."}
          </p>
        </div>

        {/* Address Map Card */}
        <div className="md:col-span-2 p-5 rounded-2xl  flex flex-col gap-3">
          <div className="flex items-center gap-2 font-bold text-gray-800 text-xl">
            <Location size={18} /> Address
          </div>
          <ProfileMap
            latitude={Number(profileData?.latitude || 0)}
            longitude={Number(profileData?.longitude || 0)}
          />
        </div>
      </div>

      {/* Payment History Table */}
      <div className="rounded-2xloverflow-hidden">
        <div className="p-5 font-bold text-gray-800  flex items-center gap-2 text-xl">
          <PaymentIcon size={18} /> Payment History
        </div>
        <div className="border border-gray-100  overflow-x-auto">
          <table className="w-full text-left text-gray-600 min-w-[500px]">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[11px] tracking-wider font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Transaction Id</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {PAYMENT_HISTORY.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    {row.id}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {row.amount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-block text-xs px-2.5 py-1 rounded-lg border font-semibold ${row.color}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
