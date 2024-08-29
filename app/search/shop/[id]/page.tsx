import React from "react";
import { Shop } from "@/types";
import ShopDetail from "./shop-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

async function fetchShopById(shopid: string): Promise<Shop | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/shops?id=${shopid}`);
    if (!res.ok) {
      console.error(`Failed to fetch shop: ${res.status} ${res.statusText}`);
      return null;
    }
    const shops = await res.json()
    return shops[0];
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    return null;
  }
}

interface Params {
  params: { id: string };
}

const Page = async ({ params: { id } }: Params) => {
  const shop = await fetchShopById(id);


  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-36 px-8 md:px-12 lg:px-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {shop ? (
        <>
          <ShopDetail shop={shop} />
          <div className="flex items-center space-x-4 mb-8">
          <Link href={`https://www.hotpepper.jp/str${shop.id}`} target="_blank" rel="noopener noreferrer">
              <Button type="button">予約</Button>
            </Link>
          </div>
        </>
      ) : (
        <p>ショップ情報が見つかりませんでした。</p>
      )}
    </div>
  );
};

export default Page;