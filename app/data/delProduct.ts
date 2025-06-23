"use server";

import supabase from "@/lib/db";
import clerkClient from "@/lib/clerk";
export async function delProduct(id: string, userID: string) {
  console.log(id, userID)
  if ((await clerkClient.users.getUser(userID)).publicMetadata.admin != true) {
    return { error: 404, message: "Unauthorized" };
  }

  const { error } = await supabase
  .from('products')
  .delete()
  .eq('id', id)
  return {success: true}
}
