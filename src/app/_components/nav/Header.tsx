"use client";

import { useAppStore } from "@/store/AppStore";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/16/solid";
import SignoutButton from "../mixed/auth/SignoutButton";
import Logo from "../mixed/Logo";
import { useSession } from "next-auth/react";
import SigninButton from "../mixed/auth/SigninButton";

export default function Header() {
  const { isNavOpen, toggleNav } = useAppStore();

  const { data: session, status } = useSession();

  return (
    <header className="top-0 z-10 flex h-16 items-center justify-between border-b border-[#282828] bg-[#0d0d0d]">
      <div className="flex h-full w-72 items-center p-5">
        <Logo />
      </div>
      <div className="hidden h-full  items-center p-5 md:flex">
        <h2 className="text-lg">Dashboard</h2>
      </div>
      <div className="p-5 md:hidden">
        {status === "authenticated" && (
          <button onClick={() => toggleNav()}>
            {isNavOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars2Icon className="h-6 w-6" />
            )}
          </button>
        )}
      </div>
      <div className="hidden h-full flex-1 items-center justify-end gap-5 p-5 md:flex">
        {status === "authenticated" && (
          <>
            <span className="text-xs font-semibold text-gray-400">
              Welcome, <span className="text-primary">{session.user.name}</span>
            </span>
            <SignoutButton />
          </>
        )}

        {status === "unauthenticated" && <SigninButton />}
      </div>
    </header>
  );
}
