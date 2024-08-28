"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

// ログインボタン
export const LoginButton = () => {
  return <Button onClick={() => signIn()}>ログイン</Button>;
};

// ログアウトボタン
export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>ログアウト</Button>;
};
