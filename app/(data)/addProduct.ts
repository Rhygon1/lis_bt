"use server";

import { dataProductType } from "./getProducts";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

export async function addProduct(
  product: Omit<dataProductType, "id" | "createdAt">,
  userID: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = await createClient();
  const id = (await supabase.auth.getSession()).data.session?.user.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id!);
  if (error || data[0].admin == null) {
    return { success: false, error: "UNAUTHORIZED" };
  }
  const admin = data[0].admin;
  if (!admin) {
    return { success: false, error: "UNAUTHORIZED" };
  }
  try {
    const res = await supabase.from("products").insert({
      title: product.title,
      description: product.description,
      media: product.media,
      price: product.price,
      custom_price: product.customPrice,
      unstitch_price: product.unstitchPrice,
      dispatch: product.dispatch,
      sizes: product.sizes,
      in_stock: product.inStock,
      type: product.type,
    });

    if (res.error) {
      return { success: false, error: res.error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
