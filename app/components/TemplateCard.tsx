import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

import Link from "next/link";

type SeachParams = {
  keyword?: string;
  people?: string;
  budget?: string;
  location?: string;
  acceptCreditCard?: boolean;
};

const query = {
  people: "4",
  budget: "B004", // (5000,7000]
};

export type TemplateCardProps = {
  title: string;
  image: StaticImageData;
  query: SeachParams;
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
      <Link href={{ pathname: "/search", query: query }}>
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
