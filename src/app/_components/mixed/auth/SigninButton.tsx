import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { signIn } from "next-auth/react";

export default function SigninButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      onClick={async () => {
        await signIn("discord", {
          callbackUrl: "/",
        });
      }}
      className={clsx(
        "text-primary-500 hover:bg-primary-500 bg-primary-500/10 flex items-center justify-center gap-2 rounded px-2.5 py-1 transition hover:text-white",
        className,
      )}
    >
      <span className="text-xs">Sign in</span>

      <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
    </button>
  );
}
