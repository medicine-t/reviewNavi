import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ReviewItem({
  reviewUserName,
  reviewComment,
  evaluation,
  storeId,
}: {
  reviewUserName: string;
  reviewComment: string;
  evaluation: number;
  storeId?: string;
}) {
  return (
    <>
      <div className="m-3 w-[40rem]">
        <Link href={`/search/shop/${storeId}`}>
          <Card>
            <CardTitle className="p-3">
              {reviewUserName}さんからのレビュー ★{evaluation}
            </CardTitle>
            <CardContent>{reviewComment}</CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
}
