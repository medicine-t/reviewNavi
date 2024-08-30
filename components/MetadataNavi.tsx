"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Head from "next/head";

export default function MetadataNavi() {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("検索");

  useEffect(() => {
    if (pathname.includes("/search/shop/")) {
      setPageTitle("店舗詳細");
    } else if (pathname.includes("/search")) {
      setPageTitle("検索結果");
    } else {
      setPageTitle("検索");
    }
  }, [pathname]);
  console.log(pathname);
  console.log(pageTitle);

  return (
    <Head>
      <title>レビューナビ - {pageTitle}</title>
      <meta property="og:title" content={`レビューナビ - ${pageTitle}`} key="title" />
    </Head>
  );
}
