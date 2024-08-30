import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopCardSkeleton() {
  return (
    <div>
      <Card className="cursor-pointer">
        <CardHeader className="space-y-4 p-6">
          <Skeleton className="w-12 h-12 rounded-full" />
          <CardTitle>
            <Skeleton className="h-4 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-8 w-80" />
          <Skeleton className="h-4 w-40" />
        </CardContent>
      </Card>
    </div>
  );
}
