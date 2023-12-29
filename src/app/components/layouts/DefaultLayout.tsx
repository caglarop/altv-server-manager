"use client";

import { useSession } from "next-auth/react";
import Header from "../nav/Header";
import Sidebar from "../sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NotSignedIn from "../mixed/auth/NotSignedIn";
import Loading from "@/app/loading";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "unauthenticated") {
    return <NotSignedIn />;
  }

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
