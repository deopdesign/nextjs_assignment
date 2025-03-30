"use server";
import { users } from "@/app/lib/placeholder-data";

export async function authenticate(
  prevState:
    | { error?: string; success?: boolean; redirectTo?: string }
    | undefined,
  formData: FormData
) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const redirectTo = formData.get("redirectTo")?.toString() || "/dashboard";

  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return { error: "Invalid credentials" };
  }

  return { success: true, redirectTo };
}
