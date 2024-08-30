import React from "react";
import { Shop } from "@/types";
import ShopDetail from "./shop-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import ListStoreReviews from "@/app/review/components/listStoreReviews";
import SubmitReview from "@/app/review/components/submitReview";

async function fetchShopById(shopid: string): Promise<Shop | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/shops?id=${shopid}`,
    );
    if (!res.ok) {
      console.error(`Failed to fetch shop: ${res.status} ${res.statusText}`);
      return null;
    }
    const shops = await res.json();
    return shops[0];
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    return null;
  }
}

interface Params {
  params: { id: string };
}

const Page = async ({ params: { id } }: Params) => {
  const shop = await fetchShopById(id);
  console.log("shopId", shop?.id);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-2 px-24 md:px-12 lg:px-16">
      {shop ? (
        <>
          <ShopDetail shop={shop} />
          <div id="shop-review">
            レビュー一覧
            <ListStoreReviews shopId={shop.id} />
          </div>
          <SubmitReview shopId={shop.id}/>
        </>
      ) : (
        <p>ショップ情報が見つかりませんでした。</p>
      )}
    </div>
  );
};

export default Page;
