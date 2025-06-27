"use server";

import { dataProductType } from "./getProducts";
import { createClient } from "@/utils/supabase/server";

export async function updateProduct(
  product: Partial<Omit<dataProductType, "createdAt">> & { id: string }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const id = (await supabase.auth.getSession()).data.session?.user.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id!);

  if (error || !data || data.length === 0 || data[0].admin == null) {
    return { success: false, error: "UNAUTHORIZED" };
  }
  const admin = data[0].admin;
  if (!admin) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  try {
    const { id, ...updates } = product;

    // Explicitly map camelCase to snake_case for Supabase
    const dbUpdates: { [key: string]: any } = { ...updates };
    if (typeof dbUpdates.inStock !== 'undefined') {
      dbUpdates.in_stock = dbUpdates.inStock;
      delete dbUpdates.inStock;
    }
    if (typeof dbUpdates.customPrice !== 'undefined') {
      dbUpdates.custom_price = dbUpdates.customPrice;
      delete dbUpdates.customPrice;
    }
    if (typeof dbUpdates.unstitchPrice !== 'undefined') {
      dbUpdates.unstitch_price = dbUpdates.unstitchPrice;
      delete dbUpdates.unstitchPrice;
    }

    const res = await supabase.from("products").update(dbUpdates).eq("id", id);

    if (res.error) {
      return { success: false, error: res.error.message };
    }

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
}
