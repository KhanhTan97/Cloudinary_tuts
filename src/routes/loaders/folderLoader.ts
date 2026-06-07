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
import { AppwriteException } from "appwrite";
import type { AxiosRequestConfig } from "axios";
import { redirect, type LoaderFunction } from "react-router";

/**
 * Constants
 */
const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

const getFilesByFolder = async (path: string) => {
  const folderName = await getCurrentUserFolder();

  const options: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    params: {
      path: `/${folderName}/${path}`,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const driveFolderLoader: LoaderFunction = async ({ params }) => {
  try {
    const folderName = params.folderName;

    if (!folderName) {
      throw new Error("Folder name is required!");
    }

    const files = await getFilesByFolder(folderName);

    return files;
  } catch (error) {
    if (error instanceof AppwriteException) {
      return redirect("/auth/login");
    }

    console.error(error);
    throw error;
  }
};
