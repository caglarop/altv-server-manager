"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/AppStore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ServerList } from "../server/ServerList";
import { CreateServer } from "../server/CreateServer";
import UserPanel from "../nav/UserPanel";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();

  const { isNavOpen, setNavOpen } = useAppStore();

  const { data: session } = useSession();

  const backdropRef = useRef<HTMLElement | null>(null);

  // get servers with trpc

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        backdropRef.current &&
        !backdropRef.current.contains(e.target as Node) &&
        (e.target as HTMLElement).closest("main")
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
      className={`fixed flex transform flex-col bg-[#0d0d0d]/50 backdrop-blur transition-transform duration-200 ease-in-out md:relative ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      } h-full w-72 border-r border-[#282828] md:fixed md:translate-x-0`}
    >
      <nav className="relative flex h-[calc(100%-64px)] flex-col gap-5 overflow-y-auto p-5 md:h-full">
        <div className="flex-grow">
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-semibold text-gray-500">ACCOUNT</h2>
              <div className="flex flex-col gap-2.5">
                <UserPanel />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-semibold text-gray-500">MENU</h2>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    className={clsx(
                      "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-gray-400 transition hover:bg-white/10 hover:text-white",
                      pathName === "/" && "bg-white/10 text-white",
                    )}
                    href="/"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <ServerList />
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="">
            <CreateServer />
          </div>
        </div>
      </nav>
    </aside>
  );
}
