import { auth, signIn, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import SignOut from "./sign-out";
import SignIn from "./sign-in";

type Props = {
  callback?: string;
};

export default async function SignInOutButton({ callback }: Props) {
  const isSignedIn = (await auth()) != null;
  return isSignedIn ? <SignOut /> : <SignIn callback={"/"} />;
}
