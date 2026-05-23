/**
 * Node modules
 */

/**
 * Custom modules
 */
import { redirect } from "react-router";

/**
 * Assets
 */
import { account } from "@/lib/appwrite";

/**
 * Types
 */
import type { ActionFunction } from "react-router";
import { AppwriteException } from "appwrite";

export const resetPasswordAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as {
    userId: string;
    secret: string;
    password: string;
  };

  try {
    await account.updateRecovery(data);

    return redirect("/auth/login");
  } catch (error) {
    if (error instanceof AppwriteException) {
      return { ok: false, error: error };
    }
  }
};
