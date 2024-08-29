"use client";

import React from "react";
import Image from "next/image";
import { Shop } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Params {
  shop: Shop;
}

const ShopDetail = ({ shop }: Params) => {
  const pathname = usePathname(); // 現在のパスを取得

  const getParkingInfo = (parking: string) => {
    if (parking.includes("なし")) return { text: "駐車場なし", variant: "secondary" };
    if (parking.includes("あり")) return { text: "駐車場あり", variant: "default" };
    return { text: "情報なし", variant: "outline" };
  };

  const getPrivateInfo = (private_room: string) => {
    if (private_room.includes("なし")) return { text: "個室なし", variant: "secondary" };
    if (private_room.includes("あり")) return { text: "個室あり", variant: "default" };
    return { text: "情報なし", variant: "outline" };
  };

  const getSmokingInfo = (non_smoking: string) => {
    if (non_smoking === "全面禁煙") return { text: "全面禁煙", variant: "default" };
    if (non_smoking === "一部禁煙") return { text: "一部禁煙", variant: "secondary" };
    if (non_smoking === "禁煙席なし") return { text: "禁煙席なし", variant: "destructive" };
    return { text: "情報なし", variant: "outline" };
  };

  const parkingStatus = getParkingInfo(shop.parking);
  const privateRoomStatus = getPrivateInfo(shop.private_room);
  const smokingStatus = getSmokingInfo(shop.non_smoking);

  return (
    <div className="p-2">
      <div className="flex">
        <div className="w-1/2">
          <Image
            className="w-full h-auto object-cover rounded-lg"
            src={shop.photo.pc.l}
            width={600}
            height={600}
            alt="Shop Image"
          />
        </div>
        <div className="ml-6 w-1/2">
          <h1 className="text-3xl font-bold mb-4">{shop.name}</h1>
          <p className="text-lg mb-3">ジャンル: {shop.genre?.name ?? "情報なし"}</p>
          <div className="flex space-x-2 mb-3">
            <Badge className="px-4 py-2 text-lg" variant={parkingStatus.variant}>
              {parkingStatus.text}
            </Badge>
            <Badge className="px-4 py-2 text-lg" variant={smokingStatus.variant}>
              {smokingStatus.text}
            </Badge>
            <Badge className="px-4 py-2 text-lg" variant={privateRoomStatus.variant}>
              {privateRoomStatus.text}
            </Badge>
          </div>

          <p className="text-lg mb-2">住所: {shop.address}</p>
          <div className="flex space-x-2 mb-3">
            <Link href={`https://www.hotpepper.jp/str${shop.id}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" className="px-12 py-8 text-lg font-bold">予約・もっと詳しく!</Button>
            </Link>

            <Link href={`${pathname}#shop-review`} scroll={false} rel="noopener noreferrer">
              <Button type="button" className="px-12 py-8 text-lg font-bold">レビュー</Button>
            </Link>
          </div>

        </div>
      </div>
      <div className="mt-8 space-y-4">
        <Alert variant="default">
          <AlertTitle>営業日</AlertTitle>
          <AlertDescription>{shop.open}</AlertDescription>
        </Alert>

        <Alert variant="default">
          <AlertTitle>定休日</AlertTitle>
          <AlertDescription>{shop.close}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ShopDetail;
