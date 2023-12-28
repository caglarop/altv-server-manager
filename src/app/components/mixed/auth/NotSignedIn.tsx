"use client";

import SigninButton from "./SigninButton";

export default function NotSignedIn() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[#0d0d0d] text-white">
      You are not logged in.
      <SigninButton />
    </div>
  );
}
