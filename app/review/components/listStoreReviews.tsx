"use client";
import React, { useEffect, useState } from "react";
import ReviewItem from "./reviewItem";

export default function ListStoreReviews({ shopId }: { shopId: string }) {
  const [reviews, setReviews] = useState<
    {
      reviewId: string;
      storeId: string;
      reviewComment: string;
      evaluation: number;
      writerId: string;
      writer: {
        name: string;
      };
    }[]
  >([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/reviews?shopId=${shopId}`,
          { cache: "reload" },
        );
        const reviewResponse = await response.json();
        setReviews(reviewResponse);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, [shopId]);

  return (
    <>
      {reviews.map((review, index) => (
        <ReviewItem
          key={index}
          reviewUserName={review.writer.name}
          reviewComment={review.reviewComment}
          reviewId={review.reviewId}
          evaluation={review.evaluation}
          storeId={review.storeId}
        />
      ))}
    </>
  );
}
