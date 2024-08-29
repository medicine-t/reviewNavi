"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "./components/buttons";

import PresetCard from "./components/TemplateCard";
import { TemplateCardProps } from "./components/TemplateCard";
import kaisyoku from "@/public/assets/kaisyoku.webp";
import celebration from "@/public/assets/celebration.webp";
import enkai from "@/public/assets/enkai.webp";

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
  },
  {
    title: "宴会",
    image: enkai,
    query: {
      party_capacity: 20,
      budget: "B002", // (10001,15000]
      card: 1,
      small_area: "X717",
    },
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
    const location =
      formData.get("location")?.toString().trim() === "新都心"
        ? "X717"
        : undefined;

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
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col items-center space-y-4 mb-8"
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
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <span>人数:</span>
            <Input
              type="text"
              name="people"
              placeholder="人数"
              defaultValue="2"
              className="max-w-xs w-10"
            />
          </label>
          <label className="flex items-center space-x-2">
            <span>予算:</span>
            <select
              name="budget"
              className="max-w-xs w-30 border border-gray-300 rounded-md p-2 text-xs"
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
            />
          </label>
        </div>
      </form>
      <div className="p-5 flex">
        {cardsPropertys.map((card, index) => {
          return (
            <PresetCard
              key={index}
              title={card.title}
              image={card.image}
              query={card.query}
              className="flex m-2"
            />
          );
        })}
      </div>
    </div>
  );
}
