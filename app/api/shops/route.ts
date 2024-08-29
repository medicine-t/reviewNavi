import { HotPepperGourmetSearchQuery } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import APIError from "../lib/apiError";

async function fetchHotpepperData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new APIError(
      response.status,
      `API request failed: ${response.statusText}`,
    );
  }
  const data = await response.json();
  if (!data.results?.shop) {
    throw new APIError(404, "No shops found");
  }
  return data.results.shop;
}

function handleError(error: unknown): NextResponse {
  console.error("Error:", error);
  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }
  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 },
  );
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = process.env.HOTPEPPER_API_KEY;
    if (!key) {
      throw new APIError(500, "API key is not set");
    }

    const searchQuery = searchParams.entries();
    let hotpepperQuery: HotPepperGourmetSearchQuery & { key: string } = {
      key: key,
      ...Object.fromEntries(searchQuery),
      format: "json",
    };

    const query = new URLSearchParams(Object.entries(hotpepperQuery));

    const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query.toString()}`;
    const data = await fetchHotpepperData(url);
    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
