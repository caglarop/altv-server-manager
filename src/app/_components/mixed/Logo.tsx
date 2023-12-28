import Link from "next/link";
import AltVIcon from "@/app/_components/icons/AltVIcon";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2.5 text-lg font-bold outline-none">
      <AltVIcon />
      <span>
        altV <span className="text-primary-500">S-Manager</span>
      </span>
    </Link>
  );
}
