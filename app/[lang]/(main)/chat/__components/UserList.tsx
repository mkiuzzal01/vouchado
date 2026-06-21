interface UserType {
  id: number;
  name: string;
  status: string;
  time: string;
  unread: number;
  active: boolean;
  avatar: string;
}

interface Props {
  users: UserType[];
  selectedId: number;
  onSelectUser: (id: number) => void;
}
export default function UserList({ users, selectedId, onSelectUser }: Props) {
  return (
    <>
      {/* Search Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Users Scroll Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
        {users.map((user) => {
          const isSelected = user.id === selectedId;
          return (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${isSelected ? "bg-teal-50/50 border-l-4 border-teal-500 pl-3" : "hover:bg-gray-50"}`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover border border-gray-100 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm truncate text-gray-900">
                    {user.name}
                  </h4>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {user.time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user.status}
                </p>
              </div>

              {user.unread > 0 && (
                <span className="bg-teal-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center mt-1">
                  {user.unread}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
