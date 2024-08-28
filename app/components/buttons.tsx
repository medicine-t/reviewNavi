"use client";

import { signIn, signOut } from "next-auth/react";

// ログインボタン
export const LoginButton = () => {
  return (
    <button
      className="bg-gray-700 text-gray-100 p-2 rounded-md"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

// ログアウトボタン
export const LogoutButton = () => {
  return (
    <button
      className="bg-gray-700 text-gray-100 p-2 rounded-md"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};
