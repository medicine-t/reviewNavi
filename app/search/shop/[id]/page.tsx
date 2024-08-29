"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Shop } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

async function fetchShopById(shopid: string): Promise<Shop | null> {
  try {
    const res = await fetch(`/api/shops/${shopid}`);
    if (!res.ok) {
      console.error(`Failed to fetch shop: ${res.status} ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    return null;
  }
}

const ShopDetail = () => {
  const router = useParams();
  const shopid = router.query; 
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    if (shopid) {
      fetchShopById(shopid as string).then(data => {
        if (data) setShop(data);
      });
    }
  }, [shopid]);

  if (!shop) {
    return <p>店舗情報が見つかりません。</p>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-36 px-8 md:px-12 lg:px-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="p-6">
        <div className="flex">
          <div className="w-1/2">
            <img
              className="w-full h-auto object-cover"
              src={shop.photo.pc.l}
              alt="Shop Image"
            />
          </div>
          <div className="ml-6 w-1/2">
            <h1 className="text-3xl font-bold mb-4">{shop.name}</h1>
            <p className="text-lg mb-2">ジャンル: {shop.genre?.name || "情報なし"}</p>
            <p className="text-lg mb-2">駐車場: {shop.parking ? "あり" : "なし"}</p>
            <p className="text-lg mb-2">禁煙: {shop.non_smoking ? "はい" : "いいえ"}</p>
            <p className="text-lg mb-2">個室: {shop.private_room ? "あり" : "なし"}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-lg mb-2">住所: {shop.address}</p>
          <p className="text-lg mb-2">営業時間: {shop.open}</p>
          <p className="text-lg">定休日: {shop.close}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mb-8">
        <Link href={`https://www.hotpepper.jp/str${shop.id}`}>
          <Button type="button">予約</Button>
        </Link>
      </div>
    </div>
  );
};

export default ShopDetail;
