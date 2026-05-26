/**
 * Node modules
 */
import { redirect } from "react-router";

/**
 * Custom modules
 */
import { account, ID } from "@/lib/appwrite";

/**
 * Types
 */
import type { ActionFunction } from "react-router";
import { AppwriteException } from "appwrite";

export const signupAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as SignupForm;

  try {
    await account.create({
      userId: ID.unique(),
      ...data,
    });

    return redirect("/auth/login");
  } catch (error) {
    if (error instanceof AppwriteException) {
      return { ok: false, error: error };
    }
  }
};
