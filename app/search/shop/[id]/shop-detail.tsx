"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Shop } from "@/types";

interface Params {
  shop: Shop;
}

const ShopDetail = ({ shop }: Params) => {
  const getParkingInfo = (parking: string) => {
    return parking.includes("なし") ? "なし" : parking.includes("あり") ? "あり" : "情報なし";
  };
  const getPrivateInfo = (private_room: string) => {
    return private_room.includes("なし") ? "なし" : private_room.includes("あり") ? "あり" : "情報なし";
  };

  return (
    <div className="p-6">
      <div className="flex">
        <div className="w-1/2">
          <Image
            className="w-full h-auto object-cover rounded-lg"
            src={shop.photo.pc.l}
            width = {400}
            height = {400}
            alt="Shop Image"
          />
        </div>
        <div className="ml-6 w-1/2">
          <h1 className="text-3xl font-bold mb-4">{shop.name}</h1>
          <p className="text-lg mb-2">ジャンル: {shop.genre?.name || "情報なし"}</p>
          <p className="text-lg mb-2">駐車場: {getParkingInfo(shop.parking)}</p>
          <p className="text-lg mb-2">禁煙: {shop.non_smoking ? shop.non_smoking : "情報なし"}</p>
          <p className="text-lg mb-2">個室: {getPrivateInfo(shop.private_room)}</p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-lg mb-2">住所: {shop.address}</p>
        <p className="text-lg mb-2">営業時間: {shop.open}</p>
        <p className="text-lg">定休日: {shop.close}</p>
      </div>
    </div>
  );
  
};

export default ShopDetail;