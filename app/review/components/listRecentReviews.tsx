import ReviewItem from "./reviewItem";

export default async function ListRecentReviews() {
  const reviewResponse = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/reviews`, {
      cache: "no-store",
    })
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
    <div className="flex flex-col">
      {reviews.map((review, index) => (
        <ReviewItem
          key={index}
          reviewUserName={review.writer.name}
          reviewComment={review.reviewComment}
          evaluation={review.evaluation}
        />
      ))}
    </div>
  );
}
