"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const d = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(d);

  return {
    error: error ? { message: error.message, status: error.status } : null,
  };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

	const firstName = formData.get("first-name") as string;
	const lastName = formData.get("last-name") as string;
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		options: {
			data: {
				full_name: `${firstName + " " + lastName}`,
				email: formData.get("email") as string,
			},
		},
	};
	const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log("Signup error:", error);
    return { error: error.message };
  }

  return { error: null };
}

// Client-side compatible signout
export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Signout error:", error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { error: null };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.log("Google signin error:", error);
    redirect("/error");
  }

  redirect(data.url);
}
