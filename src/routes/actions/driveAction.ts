/**
 * Node modules
 */
import axios from "axios";

/**
 * Custom modules
 */
import { getCurrentUserFolder } from "@/lib/appwrite";

/**
 * Types
 */
import type { AxiosRequestConfig } from "axios";
import type { ActionFunction } from "react-router";

/**
 * Constants
 */
const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

interface CreateFolderPayload {
  folderName: string;
  currentFolderName?: string | null;
  parentFolderPath?: string | null;
}

export const createFolder = async (data: CreateFolderPayload) => {
  const parentFolderPath = [data.currentFolderName, data.parentFolderPath]
    .filter(Boolean)
    .join("/");

  const options: AxiosRequestConfig = {
    method: "POST",
    url: "https://api.imagekit.io/v1/folder",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
    data: {
      folderName: data.folderName,
      parentFolderPath,
    },
  };

  try {
    await axios.request(options);
    return { ok: true, message: "Folder created successfully!" };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const driveActions: ActionFunction = async ({ request }) => {
  const currentFolderName = await getCurrentUserFolder();

  const data = (await request.json()) as {
    filePath?: string;
    newName?: string;
    folderName?: string;
    parentFolderPath?: string;
  };

  if (request.method === "POST") {
    if (!data.folderName) {
      return {
        ok: false,
        message: "Folder name is required",
      };
    }

    return await createFolder({
      folderName: data.folderName,
      parentFolderPath: data.parentFolderPath,
      currentFolderName,
    });
  }
};
