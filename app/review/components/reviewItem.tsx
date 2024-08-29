"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    setComment(reviewComment);
    setRating(evaluation);
  }, []);

  return (
    <>
      <div className="m-3 w-[40rem]">
        <Card>
          <Link href={`/search/shop/${storeId}`}>
            <CardTitle className="p-3">
              {reviewUserName}さんからのレビュー ★{rating}
            </CardTitle>
          </Link>
          <CardContent>
            {comment}
            <Link href={`/review/${reviewId}/edit/`}>
              <Edit />
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
