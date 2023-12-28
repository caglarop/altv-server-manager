"use client";

import { useEffect, useRef } from "react";
import SignoutButton from "../mixed/auth/SignoutButton";
import { useAppStore } from "@/store/AppStore";
import { useSession } from "next-auth/react";
import SigninButton from "../mixed/auth/SigninButton";
import Link from "next/link";
import { ServerList } from "../server/ServerList";
import { CreateServer } from "../server/CreateServer";

export default function Sidebar() {
  const { isNavOpen, setNavOpen } = useAppStore();

  const { data: session, status } = useSession();

  const backdropRef = useRef<HTMLElement | null>(null);

  // get servers with trpc

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        backdropRef.current &&
        !backdropRef.current.contains(e.target as Node)
      ) {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setNavOpen]);

  if (!session) {
    return null;
  }

  return (
    <aside
      ref={backdropRef}
      className={`fixed flex transform flex-col overflow-y-auto bg-[#0d0d0d] transition-transform duration-200 ease-in-out md:relative ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      } h-full w-72 border-r border-[#282828] md:fixed md:translate-x-0`}
    >
      <nav className="relative flex h-[calc(100%-64px)] flex-col gap-5 p-5 md:h-full">
        <div className="flex-grow">
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-semibold text-gray-500">MENU</h2>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    className="cursor-pointer rounded text-white transition"
                    href="/"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <ServerList />
            <CreateServer />
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="flex flex-1 flex-col gap-2">
            {status === "authenticated" && (
              <>
                <span className="text-xs font-semibold text-gray-400">
                  Welcome,{" "}
                  <span className="text-primary">{session.user.name}</span>
                </span>

                <SignoutButton className="w-full" />
              </>
            )}

            {status !== "authenticated" && <SigninButton />}
          </div>
        </div>
      </nav>
    </aside>
  );
}
