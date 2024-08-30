import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reviewId = searchParams.get("reviewId");
  if (!reviewId) {
    return NextResponse.json(
      { message: "No review ID found" },
      { status: 400 },
    );
  } else {
    //GET Store name
    const reviews = await prisma.reviewItems.findFirst({
      where: {
        reviewId: reviewId,
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
  const { body, rating, reviewId } = (await req.json()) as {
    body: string;
    rating: number;
    reviewId: string;
  };

  if (!reviewId) {
    console.log({ body, rating, reviewId });
    return NextResponse.json(
      { message: "No review ID found" },
      { status: 400 },
    );
  }

  const updateReview = await prisma.reviewItems.update({
    where: {
      reviewId: reviewId,
    },
    data: {
      reviewComment: body,
      evaluation: rating,
    },
  });

  return NextResponse.json({ message: "Review created" }, { status: 201 });
});
