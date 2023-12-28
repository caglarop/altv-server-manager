"use client";

import { useEffect, useRef } from "react";
import SignoutButton from "../mixed/auth/SignoutButton";
import { useAppStore } from "@/store/AppStore";
import { useSession } from "next-auth/react";
import SigninButton from "../mixed/auth/SigninButton";
import Link from "next/link";

export default function Sidebar() {
  const { isNavOpen, setNavOpen } = useAppStore();

  const { data: session, status } = useSession();

  const backdropRef = useRef<HTMLElement | null>(null);

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
      className={`fixed flex transform flex-col overflow-y-auto bg-[#0d0d0d] p-5 transition-transform duration-200 ease-in-out md:relative ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      } h-full w-72 border-r border-[#282828] md:fixed md:translate-x-0`}
    >
      <nav className="relative flex h-[calc(100%-64px)] flex-col gap-5">
        <h2 className="text-xs font-semibold text-gray-400">MENU</h2>
        <ul className="flex flex-col gap-2.5">
          <li>
            <Link
              className="cursor-pointer rounded text-white transition"
              href="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="cursor-pointer rounded text-gray-400 transition hover:text-white"
              href="/about"
            >
              Server
            </Link>
          </li>
        </ul>

        <div className="absolute bottom-0 left-0 right-0 md:hidden">
          <div className="flex flex-col gap-2">
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
