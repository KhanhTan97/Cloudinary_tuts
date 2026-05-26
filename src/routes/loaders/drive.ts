/**
 * Node modules
 */

/**
 * Custom modules
 */
import { account } from "@/lib/appwrite";
import { createFolder } from "@/routes/actions/driveAction";

/**
 * Types
 */
import { AppwriteException } from "appwrite";
import { redirect, type LoaderFunction } from "react-router";

export const driveLoader: LoaderFunction = async () => {
  try {
    const currentSession = await account.getSession({ sessionId: "current" });
    const user = await account.get();

    const folderName = user.$id;
    await createFolder({ folderName, parentFolderPath: "/" });

    return { currentSession, user };
  } catch (error) {
    if (error instanceof AppwriteException) {
      return redirect("/auth/login");
    }
  }
};
