import ReviewItem from "./reviewItem";

export default async function ListStoreReviews({ shopId }: { shopId: string }) {
  console.log("shopId(Reviews)", shopId);
  const reviewResponse = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/reviews?shopId=${shopId}`,
      { cache: "no-store" },
    )
  ).json();
  const reviews = reviewResponse as {
    reviewId: string;
    storeId: string;
    reviewComment: string;
    evaluation: number;
    writerId: string;
    writer: {
      name: string;
    };
  }[];

  return (
    <>
      {reviews.map((review, index) => (
        <ReviewItem
          key={index}
          reviewUserName={review.writer.name}
          reviewComment={review.reviewComment}
          evaluation={review.evaluation}
        />
      ))}
    </>
  );
}
