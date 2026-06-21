export default function AsideAction() {
  const actions = [
    { label: "Change Password", icon: "🔑" },
    { label: "Log Out", icon: "🚪", isDanger: true },
    { label: "Delete Account", icon: "🗑️", isDanger: true },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm divide-y divide-gray-50">
      {actions.map((action, idx) => (
        <button
          key={idx}
          className="w-full flex items-center justify-between p-3 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">{action.icon}</span>
            <span
              className={action.isDanger ? "text-rose-600" : "text-gray-700"}
            >
              {action.label}
            </span>
          </div>
          <svg
            className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      ))}
    </div>
  );
}
