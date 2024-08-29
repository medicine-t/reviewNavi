import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../lib/prisma";

/**
 *
 * @param request { shopId: string }
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shopId = searchParams.get("shopId");
  if (!shopId) {
    // shopIdがなかったら、Recentを返す
    const recentReviews = await prisma.reviewItems.findMany({
      take: 5,
      orderBy: {
        reviewId: "desc",
      },
      include: {
        writer: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(recentReviews);
  } else {
    const reviews = await prisma.reviewItems.findMany({
      where: {
        storeId: shopId,
      },
      include: {
        writer: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(reviews);
  }
}

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const id = req.auth.user?.id;
  if (!id) {
    return NextResponse.json({ message: "No user ID found" }, { status: 400 });
  }
  const { title, body, rating, shopId } = (await req.json()) as {
    title: string;
    body: string;
    rating: number;
    shopId: string;
  };

  const createReview = await prisma.reviewItems.create({
    data: {
      storeId: shopId,
      reviewComment: body,
      evaluation: rating,
      writerId: id,
    },
  });

  return NextResponse.json({ message: "Review created" }, { status: 201 });
});
