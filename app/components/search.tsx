"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Cross, Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CurrencySelector from "./currencySelector";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useRouter} from "next/navigation";

export default function SearchBar() {
  const router = useRouter()

  const formSchema = z.object({
    filter: z
      .string()
      .min(1, "The search must at least be 1 letter")
      .max(100, "The search can not be longer than 100 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filter: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    router.push(`/search?search=${encodeURIComponent(values.filter as string)}`);
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Search className="flex justify-start"></Search>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetTitle className="ml-4 mt-4">Search</SheetTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("Validation Errors", errors);
            })}
            className="space-y-2 m-2"
          >
            <FormField
              control={form.control}
              name="filter"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-center">
                  <div className="flex w-full items-center justify-around">
                    <Button variant="secondary" className="bg-white">
                      <Search className="w-10"></Search>
                    </Button>
                    <FormControl>
                      <Input autoFocus placeholder="  " {...field}></Input>
                    </FormControl>
                    <Button
                      type="button"
                      className="m-2"
                      onClick={() => form.setValue("filter", "")}
                    >
                      <X></X>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
