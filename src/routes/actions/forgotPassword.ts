/**
 * Node modules
 */

/**
 * Custom modules
 */
import { account } from "@/lib/appwrite";

/**
 * Types
 */
import type { ActionFunction } from "react-router";
import { AppwriteException } from "appwrite";

export const forgotPasswordAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as { email: string };

  try {
    await account.createRecovery({
      email: data.email,
      url: `${new URL(request.url).origin}/auth/reset-password`,
    });

    return { ok: true, message: "Password reset email sent successfully" };
  } catch (error) {
    if (error instanceof AppwriteException) {
      return { ok: false, error: error };
    }
  }
};
