"use client";
import { User, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import { logout } from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  lang?: string;
  totalMoney?: number;
}

export default function UserDropdown({ lang, totalMoney }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const userName = user?.name || "Guest";
  const userEmail = user?.email || "";
  const role = String(user?.role || "user");

  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    dispatch(logout());
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-full border border-gray-200 bg-white p-1 hover:bg-gray-50 transition">
          {/* Avatar */}
          <Avatar className="h-8 w-8 border border-[#2EC4C6]">
            <AvatarFallback className="bg-[#31BFC8] text-white text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Money */}
          {typeof totalMoney === "number" && (
            <div className="hidden sm:flex items-center gap-2 px-2">
              <span className="text-sm font-semibold text-slate-700">
                ${totalMoney.toLocaleString()}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-white border border-slate-100 shadow-xl rounded-2xl p-1.5 z-50"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal px-2.5 py-2">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-bold text-slate-800 leading-none">
              {userName}
            </p>
            <p className="text-xs text-slate-400 font-medium truncate">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-50 my-1" />

        <DropdownMenuItem asChild>
          <Link
            href={`/${lang}/${role}`}
            className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-50"
          >
            <User className="w-4 h-4 text-slate-400" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-50 my-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-rose-600 rounded-xl hover:bg-rose-50"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
