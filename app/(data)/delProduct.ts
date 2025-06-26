"use server";

import { createClient } from "@/utils/supabase/server";
export async function delProduct(delId: string) {
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

  await supabase.from("products").delete().eq("id", delId);
  return { success: true };
}
