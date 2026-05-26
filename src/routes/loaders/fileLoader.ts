/**
 * Node modules
 */

import { getCurrentUserFolder } from "@/lib/appwrite";

/**
 * Custom modules
 */

/**
 * Types
 */
import { redirect, type LoaderFunction } from "react-router";
import { AppwriteException } from "appwrite";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

/**
 * Constants
 */
const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

const getFiles = async (folderName: string, isRecent?: boolean) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: "application/json", Authorization: `Basic ${API_KEY}` },
    params: {
      path: folderName || "",
      sort: isRecent ? "DESC_CREATED" : "ASC_CREATED",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getFolders = async (folderName: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
    headers: { Accept: "application/json", Authorization: `Basic ${API_KEY}` },
    params: {
      path: folderName || "",
      type: "folder",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const driveFileLoader: LoaderFunction = async () => {
  try {
    const folderName = await getCurrentUserFolder();

    const files = await getFiles(folderName!);
    const recentFiles = await getFiles(folderName!, true);
    const folders = await getFolders(folderName!);

    return { files, recentFiles, folders };
  } catch (error) {
    if (error instanceof AppwriteException) {
      return redirect("/auth/login");
    }
  }
};
