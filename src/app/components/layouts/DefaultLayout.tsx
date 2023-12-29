"use client";

import { useSession } from "next-auth/react";
import Header from "../nav/Header";
import Sidebar from "../sidebar/Sidebar";
import { useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[#0d0d0d] text-white">
        <h2 className="text-lg">Loading...</h2>
      </div>
    );
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0d0d0d] text-white">
      <Header />

      <div className="flex h-[calc(100%-64px)] flex-grow">
        <Sidebar />

        <main className="h-full flex-grow overflow-auto overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
