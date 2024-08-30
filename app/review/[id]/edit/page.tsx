"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoreName } from "../../components/reviewItem";

const formSchema = z.object({
  body: z.string().min(1).max(2000),
  rating: z.string().refine((value) => {
    const parsedValue = parseInt(value);
    return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5;
  }, "Rating must be a number between 1 and 5"),
});

export default function UpdateReview({ params }: { params: { id: string } }) {
  const router = useRouter();
  const reviewId = params.id;
  const [review, setReviews] = useState<
    | {
        reviewId: string;
        storeId: string;
        reviewComment: string;
        evaluation: number;
        writerId: string;
        writer: {
          name: string;
        };
      }
    | undefined
  >(undefined);
  const [storeName, setStoreName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/reviews/edit?reviewId=${reviewId}`,
          {
            cache: "no-store",
          },
        );
        const reviewResponse = await response.json();
        setReviews(reviewResponse);
        const storeName = await getStoreName(reviewResponse.storeId);
        setStoreName(storeName);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    console.log("reviewId", reviewId);
    fetchReviews();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      rating: "3",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await fetch("/api/reviews/edit", {
      method: "POST",
      body: JSON.stringify({
        body: data.body,
        rating: parseInt(data.rating),
        reviewId: reviewId,
      }),
    });
    if (result.ok) {
      console.info("Review created");
      alert("レビュー更新成功");
      // Routerで戻る
      router.back();
    } else {
      console.warn("Failed to create review");
    }
  }
  return (
    <div className="flex justify-center">
      <Card className="p-5 w-[40rem]">
        <Form {...form}>
          <h1 className="text-2xl font-bold">レビューを更新</h1>
          <h2 className="text-lg font-bold">{storeName}に対するレビュー</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>本文</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="〇〇のお店に行ってきました。"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>評価</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      //   defaultValue={review?.evaluation ?? 3}
                    />
                  </FormControl>
                  <FormDescription>1~5の整数で評価してください</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
