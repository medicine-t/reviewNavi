import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function ReviewItem({
  reviewUserName,
  reviewComment,
  evaluation,
}: {
  reviewUserName: string;
  reviewComment: string;
  evaluation: number;
}) {
  return (
    <>
      <div className="m-3 w-[40rem]">
        <Card>
          <CardTitle className="p-3">
            {reviewUserName}さんからのレビュー ★{evaluation}
          </CardTitle>
          <CardContent>{reviewComment}</CardContent>
        </Card>
      </div>
    </>
  );
}
