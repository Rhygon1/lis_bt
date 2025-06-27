"use server";

import supabase from "@/lib/db";
import { dataProductType } from "./getProducts";

export default async function getProductById(id: string) {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  if (data) {
    return {
      title: data.title,
      description: data.description,
      media: data.media,
      price: data.price,
      customPrice: data.custom_price,
      unstitchPrice: data.unstitch_price,
      dispatch: data.dispatch,
      sizes: data.sizes,
      inStock: data.in_stock,
      type: data.type,
      id: data.id,
      createdAt: data.created_at,
    } as dataProductType;
  }

  return null;
}
