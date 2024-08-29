import React, { useState, useEffect } from "react";
import ReviewItem from "./reviewItem";

export default function ListRecentReviews() {
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
          `${process.env.NEXT_PUBLIC_API_HOST}/api/reviews`,
          {
            cache: "no-store",
          },
        );
        const reviewResponse = await response.json();
        setReviews(reviewResponse);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col">
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
    </div>
  );
}
