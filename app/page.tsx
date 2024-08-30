"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import MetadataNavi from "@/components/MetadataNavi";

import PresetCard from "./components/TemplateCard";
import { TemplateCardProps } from "./components/TemplateCard";
import kaisyoku from "@/public/assets/kaisyoku.webp";
import celebration from "@/public/assets/celebration.webp";
import enkai from "@/public/assets/enkai.webp";
import ListRecentReviews from "./review/components/listRecentReviews";

const cardsPropertys: TemplateCardProps[] = [
  {
    title: "会食",
    image: kaisyoku,
    query: {
      party_capacity: 4,
      budget: "B003,B002", // (5000,7000]
      card: 1,
      small_area: "X717",
    },
    description: "４人~, 5000～7000円, カード利用可",
  },
  {
    title: "お祝い",
    image: celebration,
    query: {
      party_capacity: 4,
      budget: "B002", // (2000,3000]
      card: 1,
      small_area: "X717",
    },
    description: "４人~, 2000～3000円, カード利用可",
  },
  {
    title: "宴会",
    image: enkai,
    query: {
      party_capacity: 20,
      budget: "B002", // (2000,3000]
      card: 1,
      small_area: "X717",
    },
    description: "20人~, 2000～3000円, カード利用可",
  },
];

export default function GourmetsSearch() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword")?.toString().trim();
    const people = formData.get("people")?.toString().trim();
    const budget = formData.get("budget")?.toString().trim();
    const location = "X717";
    // formData.get("location")?.toString().trim() === "新都心"
    // ? "X717"
    //   : undefined;

    const queryParams = new URLSearchParams();

    if (keyword) queryParams.append("keyword", keyword);
    if (people) queryParams.append("party_capacity", people);
    if (budget) queryParams.append("budget", budget);
    if (location) queryParams.append("small_area", location);

    if (keyword || people || budget || location) {
      setSearchKeyword(keyword || "");
      router.push(`/search?${queryParams.toString()}`);
    } else {
      setSearchKeyword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-36 px-8 md:px-12 lg:px-16">
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col space-y-4 mb-8"
      >
        <div className="flex items-start space-x-4">
          <Button type="button">ブックマーク</Button>
          <Input
            type="search"
            name="keyword"
            placeholder="検索..."
            className="max-w-sm w-full"
          />
          <Button type="submit">検索</Button>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <span>人数:</span>
            <Input
              type="number"
              name="people"
              placeholder="人数"
              defaultValue={2}
              className="max-w-xs w-[4rem]"
            />
          </label>
          <label className="flex items-center space-x-2">
            <span>予算:</span>
            <select
              name="budget"
              className="max-w-xs w-30 border border-gray-300 rounded-md p-2 text-xs"
              defaultValue={"B001"}
            >
              <option value="B009">~500円</option>
              <option value="B010">501～1000円</option>
              <option value="B011">1001～1500円</option>
              <option value="B001">1501～2000円</option>
              <option value="B002">2001～3000円</option>
              <option value="B003">3001～4000円</option>
              <option value="B008">4001～5000円</option>
              <option value="B004">5001～7000円</option>
              <option value="B005">7001～10000円</option>
              <option value="B006">10001～15000円</option>
              <option value="B012">15001～20000円</option>
              <option value="B013">20001～30000円</option>
              <option value="B014">30001円～</option>
            </select>
          </label>
          <label className="flex items-center space-x-2">
            <span>場所:</span>
            <Input
              type="text"
              name="location"
              placeholder="場所"
              defaultValue="新都心"
              className="max-w-xs w-20"
              disabled
            />
          </label>
        </div>
      </form>
      <div className="p-5 pt-10 flex">
        {cardsPropertys.map((card, index) => {
          return (
            <PresetCard
              key={index}
              title={card.title}
              image={card.image}
              query={card.query}
              description={card.description ?? "　"}
              className="flex m-2"
            />
          );
        })}
      </div>
      <div className="p-5 flex flex-col">
        <h2 className="flex text-2xl font-bold mb-4">最近のレビュー</h2>
        <ListRecentReviews />
      </div>
    </div>
  );
}
