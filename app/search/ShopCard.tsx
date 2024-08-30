import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shop } from "@/types";
import Link from "next/link";

export default function ShopCard({ shop }: { shop: Shop }) {
  return (
    <div>
      <Link href={`/search/shop/${shop.id}`} key={shop.id}>
        <Card className="cursor-pointer">
          <CardHeader className="space-y-4 p-6">
            <Avatar className="w-12 h-12">
              <AvatarImage src={shop.photo.pc.m} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>{shop.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{shop.address || "住所情報なし"}</p>
            <p>{shop.genre?.name || "ジャンル情報なし"}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
