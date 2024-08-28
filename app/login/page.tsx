"use client";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "../components/buttons";

export default function Page() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {user ? <div>Logged in</div> : <div>Not logged in</div>}
      {user ? <LogoutButton /> : <LoginButton />}
    </>
  );
}
