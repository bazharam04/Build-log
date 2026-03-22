"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function submitBuildLog(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const project_link = (formData.get("project_link") as string)?.trim() || null;

  if (!name || !description) {
    throw new Error("Name and description are required.");
  }

  const { error } = await supabase.from("build_logs").insert({
    name,
    description,
    project_link: project_link || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
}
