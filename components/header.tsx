"use client";
import { LoginButton, LogoutButton } from "@/app/components/buttons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">レビューナビ</h1>
        <div className="flex items-center space-x-4">
          {!user ? <LoginButton /> : <LogoutButton />}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
