import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { DropdownMenu } from "@radix-ui/themes";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";

export default function UserPanel() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="">
            <div className="flex cursor-pointer items-center gap-4 rounded p-2.5 transition hover:bg-white/10">
              <Image
                src={session?.user.image || "https://via.placeholder.com/32"}
                alt=""
                className="rounded-full"
                width={32}
                height={32}
              />
              <span>{session?.user.name}</span>
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="min-w-[200px] rounded border border-white/10 bg-[#0d0d0d]">
            <DropdownMenu.Item
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex cursor-pointer items-center justify-start gap-2 font-medium text-red-400 !outline-none !ring-0 hover:bg-white/10"
            >
              <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
              <span>Sign out</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </>
  );
}
