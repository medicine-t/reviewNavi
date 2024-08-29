"use client";

import React, { useState, useEffect } from "react";
import { Shop } from "@/types";

interface Params{
    // TODO: 後で
    shop:Shop;
}
const ShopDetail = ({ shop }: Params) => {
    console.log(shop);
    return (
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
    );
  };
  
  export default ShopDetail;
