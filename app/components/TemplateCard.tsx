import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HotPepperGourmetSearchQuery } from "@/types";
import Image, { StaticImageData } from "next/image";

import Link from "next/link";

export type TemplateCardProps = {
  title: string;
  image: StaticImageData;
  query: HotPepperGourmetSearchQuery;
  className?: string;
};

export default function PresetCard({
  title,
  image,
  query,
  className,
}: TemplateCardProps) {
  return (
    <div className={`w-[350px] ${className}`}>
      <Link
        href={{
          pathname: "/search",
          query: new URLSearchParams(Object.entries(query)).toString(),
        }}
      >
        <Card className="">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <Image src={image} alt={"placeholder"} width={300} height={200} />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
