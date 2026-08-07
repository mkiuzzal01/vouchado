"use client";
import { User, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks/globalhooks";
import {
  logout,
  updateCurrentUserInfo,
  updateLoyaltyPoint,
} from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Dashboard from "../icons/Dasboard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

interface Props {
  lang?: string;
  userInfo?: any;
  ProviderInfo?: any;
}

export default function UserDropdown({
  lang = "en",
  userInfo,
  ProviderInfo,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const userEmail =
    userInfo?.data?.email || ProviderInfo?.data?.email || user?.email;
  const userName =
    userInfo?.data?.name || ProviderInfo?.data?.name || user?.name;
  const role = String(
    user?.role || userInfo?.data?.role || ProviderInfo?.data?.role,
  );
  const avatar =
    userInfo?.data?.avatar || ProviderInfo?.data?.logo || user?.avatar;

  const initials = avatar ? (
    <div className="rounded-full overflow-hidden">
      <Image src={avatar} width={100} height={100} alt="avatar" />
    </div>
  ) : (
    <div className="bg-[#31BFC8] h-full w-full flex items-center justify-center text-white rounded-full">
      {user?.name
        ?.split(" ")
        ?.map((n: string) => n[0])
        ?.join("")
        ?.toUpperCase()
        ?.slice(0, 2) || "U"}
    </div>
  );

  const handleLogout = () => {
    dispatch(logout());
    toast.warning("Logout successfully");
    router.refresh();
  };

  const vouchadoPoint = userInfo?.data?.vouchado_points;
  const provider_blance = ProviderInfo?.data?.balance;

  useEffect(() => {
    if (userName) {
      dispatch(updateCurrentUserInfo({ name: userName }));
    }
    if (vouchadoPoint) {
      dispatch(updateLoyaltyPoint(vouchadoPoint));
    }
  }, [userInfo, dispatch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 p-1 hover:bg-gray-50 transition outline-none focus-visible:ring-2 focus-visible:ring-slate-200 relative">
          {/* Avatar with unread message count badge */}
          <div className="relative shrink-0">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>

          {/* Money Display Panel */}
          <div className="hidden sm:flex items-center ga  p-1.5 pr-2 pl-0.5">
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              {role === "user" ? (
                <> {vouchadoPoint}</>
              ) : (
                <> € {provider_blance || 0}</>
              )}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
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
              {user?.name}
            </p>
            <p className="text-xs text-slate-400 font-medium truncate">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100 my-1" />

        {/* Individualized menu wrappers preventing hydration/node cloning errors */}
        <DropdownMenuItem asChild>
          <Link
            href={`/${lang}/${role}`}
            className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer w-full"
          >
            {role === "user" ? (
              <>
                <User className="w-4 h-4 text-slate-400" />
                My Profile
              </>
            ) : (
              <>
                {" "}
                <Dashboard />
                Dashboard
              </>
            )}
          </Link>
        </DropdownMenuItem>

        {role === "provider" && (
          <DropdownMenuItem asChild>
            <Link
              href={`/${lang}/provider/provider-profile`}
              className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer w-full"
            >
              <User className="w-4 h-4 text-slate-400" />
              My Profile
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-slate-100 my-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-rose-600 rounded-xl focus:bg-rose-50 focus:text-rose-600 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
