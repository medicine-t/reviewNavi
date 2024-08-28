"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function GourmetsSearch() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword")?.toString().trim();
    if (keyword) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-36 px-8 md:px-12 lg:px-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center space-x-4 mb-8"
      >
        <Input
          type="search"
          name="keyword"
          placeholder="検索..."
          className="max-w-sm w-full"
        />
        <Link href={`/search?keyword=${encodeURIComponent(searchKeyword)}`}>
          <Button type="submit">検索</Button>
        </Link>
      </form>
    </div>
  );
}
