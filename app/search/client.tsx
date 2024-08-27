"use client";
 
import React, { useState } from "react";
import { Shop } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
 
async function fetchShops(keyword?: string): Promise<Shop[]> {
  const query = new URLSearchParams();
  if (keyword) query.set("keyword", keyword);
 
  try {
    const res = await fetch(`/api/shops?${query.toString()}`);
    if (!res.ok) {
      console.error(`Failed to fetch shops: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    return [];
  }
}
 
const GourmetsClient = ({ initialShops }: { initialShops: Shop[] }) => {
  const [keyword, setKeyword] = useState("");
  const [shops, setShops] = useState<Shop[]>(initialShops);
 
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await fetchShops(keyword);
    setShops(data);
  };
 
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-36 px-8 md:px-12 lg:px-16">
      <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-8">
        <Input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索..."
          className="max-w-sm w-full"
        />
        <Button type="submit">
          検索
        </Button>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full"> 
      {shops.length > 0 ? (
        shops.map((shop) => (
          <Card key={shop.id}> 
            <CardHeader className="space-y-2 p-4">
              <Avatar className="w-full h-48">
                <AvatarImage src={shop.photo.pc.m} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{shop.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{shop.mobile_access || "アクセス情報なし"}</p>
              <div className="flex space-x-2">
                <span >駐車場:{shop.parking}</span>
                <span className={`text-red-500 ${shop.card ? "" : "hidden"}`}>カードok</span>
                <span className={`text-red-500 ${shop.non_smoking ? "" : "hidden"}`}>一部禁煙</span>
              </div>
            </CardContent>
            <CardFooter>
              <p>定休日: {shop.close}</p>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>店舗が見つかりません</p>
      )}
      </div>
    </div>
  );
};
 
export default GourmetsClient;