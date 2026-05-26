/**
 * Node modules
 */
import { Client, Account, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

export const getCurrentUserFolder = async () => {
  try {
    const user = await account.get();
    const folderName = user.$id;
    return folderName;
  } catch {
    return null;
  }
};

export { ID, Query, Permission, Role, OAuthProvider } from "appwrite";
