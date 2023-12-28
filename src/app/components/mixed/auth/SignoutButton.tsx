import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { signOut } from "next-auth/react";

export default function SignoutButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className={clsx(
        "flex items-center justify-center gap-2 rounded bg-red-500/10 px-2.5 py-1 text-red-500 transition hover:bg-red-500 hover:text-white",
        className,
      )}
    >
      <span className="text-xs">Sign out</span>

      <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
    </button>
  );
}
