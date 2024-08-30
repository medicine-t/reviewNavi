"use client";

import React, { useState, useEffect, Suspense } from "react";
import { HotPepperGourmetSearchQuery, Shop } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

async function fetchShops(query: HotPepperGourmetSearchQuery): Promise<Shop[]> {
  try {
    const urlSearchParams = new URLSearchParams(Object.entries(query));
    const res = await fetch(`/api/shops?${urlSearchParams.toString()}`);
    if (!res.ok) {
      console.error(`Failed to fetch shops: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    return [];
  }
}

const GourmetsClient = () => {
  const router = useRouter();
  const [shops, setShops] = useState<Shop[]>([]);
  const params = useSearchParams();
  const searchQuery = params.entries();
  const hotpepperQuery: HotPepperGourmetSearchQuery = {
    ...Object.fromEntries(searchQuery),
  };

  useEffect(() => {
    async function fetchshops(): Promise<void> {
      const data = await fetchShops(hotpepperQuery);
      setShops(data);
    }
    fetchshops();
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const keyword = formData.get("keyword")?.toString().trim() ?? "";
    let query = hotpepperQuery;
    if (keyword) query.keyword = keyword;
    const data = await fetchShops(query);
    setShops(data);
    const urlSearchParams = new URLSearchParams(Object.entries(query));
    router.push(`/search?${urlSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 px-8 md:px-12 lg:px-16">
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-4 mb-8"
      >
        <div className="flex items-center space-x-4">
          <Button type="button">ブックマーク</Button>
          <Input
            type="search"
            name="keyword"
            placeholder="検索..."
            className="max-w-sm w-full"
          />
          <Button type="submit">検索</Button>
        </div>
      </form>
      {/* <div>{JSON.stringify(shops)}</div> */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {shops.map((shop) => (
            <Link href={`/search/shop/${shop.id}`} key={shop.id}>
              <Card className="cursor-pointer">
                <CardHeader className="space-y-4 p-6">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={shop.photo.pc.m} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle>{shop.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{shop.address || "住所情報なし"}</p>
                  <p>{shop.genre?.name || "ジャンル情報なし"}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default GourmetsClient;
