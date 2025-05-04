"use client";

import { z } from "zod";
import { Review } from "@/modules/reviews/types";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarPicker } from "@/components/star-picker";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { set } from "date-fns";
import { toast } from "sonner";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }).max(5),
  description: z.string().min(1, { message: "Description is required" }),
});

interface ReviewFormProps {
  initialData?: Review | null;
  productId: string;
}

export const ReviewForm = ({ initialData, productId }: ReviewFormProps) => {
  const [isPreview, setIsPreview] = useState(!!initialData);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const createReview = useMutation(
    trpc.review.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.review.getOne.queryOptions({ productId })
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error("Error creating review");
      },
    })
  );

  const updateReview = useMutation(
    trpc.review.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.review.getOne.queryOptions({ productId })
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error("Error updating review");
      },
    })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: values.rating,
        description: values.description,
      });
    } else {
      createReview.mutate({
        productId,
        rating: values.rating,
        description: values.description,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <p className="font-medium">
          {isPreview ? "Your rating" : "Like it? Give it a rating"}
        </p>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker {...field} disabled={isPreview} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write your review here"
                  {...field}
                  disabled={isPreview}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {!isPreview && (
          <Button
            type="submit"
            variant={"elevated"}
            size={"lg"}
            className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
          >
            {initialData ? "Update review" : "Post review"}
          </Button>
        )}
        {isPreview && (
          <Button
            onClick={() => setIsPreview(false)}
            type="button"
            variant={"elevated"}
            size={"lg"}
            className="w-fit"
          >
            Edit
          </Button>
        )}
      </form>
    </Form>
  );
};
