"use client";

import React, { useState, useEffect } from "react";
import { HotPepperGourmetSearchQuery, Shop } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import queryKeys, { KeyConvert } from "./keys";
import { Checkbox } from "@/components/ui/checkbox";
import ShopCard from "./ShopCard";
import ShopCardSkeleton from "./ShopCardSkeleton";

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

// function SideCheckboxes() {
//   const params = useSearchParams();

//   return (

//   );
// }

const GourmetsClient = () => {
  const router = useRouter();
  const [shops, setShops] = useState<Shop[]>(Array(10).fill(undefined));
  const params = useSearchParams();
  const searchQuery = params.entries();
  const hotpepperQuery: HotPepperGourmetSearchQuery = {
    ...Object.fromEntries(searchQuery),
  };
  let urlParams = new URLSearchParams(params);

  useEffect(() => {
    async function fetchshops(): Promise<void> {
      const data = await fetchShops(hotpepperQuery);
      setShops(data);
    }
    fetchshops();
  }, [params]);

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
      <div className="flex">
        <>
          <div className=" m-2 flex flex-col">
            <h2 className="text-lg flex ">検索条件 </h2>
            {queryKeys.map((key) => {
              return (
                <div className="flex flex-row mb-2" key={key}>
                  <Checkbox
                    id={key}
                    checked={urlParams.get(key) !== null}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        urlParams = new URLSearchParams(
                          urlParams.toString() + `&${key}=1`,
                        );
                      } else {
                        urlParams = new URLSearchParams(
                          urlParams.toString().replace(`&${key}=1`, ""),
                        );
                      }
                      router.replace(`/search?${urlParams.toString()}`);
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2"
                    >
                      {KeyConvert(key)}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {shops.length > 0 ? (
            shops.map((shop: Shop | undefined, index) => {
              return shop != undefined ? (
                <ShopCard key={shop.id} shop={shop} />
              ) : (
                <ShopCardSkeleton key={`${index}`} />
                // <div key={index}>loading...</div>
              );
            })
          ) : (
            <div className="w-80">No Stores found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GourmetsClient;
