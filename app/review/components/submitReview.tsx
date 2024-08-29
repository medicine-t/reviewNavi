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

const formSchema = z.object({
  body: z.string().min(1).max(2000),
  rating: z.string().refine((value) => {
    const parsedValue = parseInt(value);
    return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5;
  }, "Rating must be a number between 1 and 5"),
});

export default function SubmitReview({ shopId }: { shopId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      rating: "3",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        body: data.body,
        rating: parseInt(data.rating),
        shopId: shopId,
      }),
    });
    if (result.ok) {
      console.info("Review created");
    } else {
      console.warn("Failed to create review");
    }
  }
  return (
    <div className="w-[40rem]">
      <Card className="p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>本文</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="〇〇のお店に行ってきました。"
                      {...field}
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
                    <Input type="number" {...field} />
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
