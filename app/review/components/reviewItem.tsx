"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Shop } from "@/types";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function getStoreName(id: string): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/shops?id=${id}`,
    { cache: "no-cache" },
  );
  const data = (await response.json())[0] as Shop;
  return data?.name ?? null;
}

export default function ReviewItem({
  reviewUserName,
  reviewComment,
  reviewId,
  evaluation,
  storeId,
}: {
  reviewUserName: string;
  reviewComment: string;
  reviewId: string;
  evaluation: number;
  storeId?: string;
}) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);
  const [storeName, setStoreName] = useState("");
  const session = useSession();
  useEffect(() => {
    setComment(reviewComment);
    setRating(evaluation);
    if (storeId) {
      const storeName = async () => {
        await getStoreName(storeId).then((name) => setStoreName(name));
      };
      storeName();
    }
  }, []);

  return (
    <>
      <div className="m-3 w-[40rem]">
        <Card>
          <Link href={`/search/shop/${storeId}`}>
            <CardTitle className="p-3">
              {reviewUserName}さんからのレビュー ★{rating}
            </CardTitle>
            {storeName ? (
              <CardDescription className="p-3">
                {storeName}に対するレビュー
              </CardDescription>
            ) : null}
          </Link>
          <CardContent>
            {comment}
            {reviewUserName === session.data?.user?.name ? (
              <Link href={`/review/${reviewId}/edit/`}>
                <Edit />
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
