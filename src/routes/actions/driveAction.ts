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
import { data, type ActionFunction } from "react-router";
import { DeleteFile } from "@/components/DeleteFile";
import { file } from "zod";

/**
 * Constants
 */
const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

interface CreateFolderPayload {
  folderName: string;
  currentFolderName?: string | null;
  parentFolderPath?: string | null;
}

interface RenameFilePayload {
  filePath: string;
  newFileName: string;
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

export const renameFile = async ({
  filePath,
  newFileName,
}: RenameFilePayload) => {
  const options: AxiosRequestConfig = {
    method: "PUT",
    url: `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/rename`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
    data: {
      filePath,
      newFileName,
      purgeCache: true,
    },
  };

  try {
    await axios.request(options);
    return { ok: true, message: "Folder renamed successfully!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message:
          error.response?.data?.message ??
          error.response?.data?.help ??
          error.message,
      };
    }

    return { ok: false, error: error };
  }
};

export const deleteFile = async (data) => {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    url: `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/${data.fileId}`,
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
  };

  try {
    await axios.request(options);
    return { ok: true, message: "Folder deleted successfully!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message:
          error.response?.data?.message ??
          error.response?.data?.help ??
          error.message,
      };
    }

    return { ok: false, error: error };
  }
};

export const driveActions: ActionFunction = async ({ request }) => {
  const currentFolderName = await getCurrentUserFolder();

  const data = (await request.json()) as {
    filePath: string;
    newFileName: string;
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

  if (request.method === "PUT") {
    if (!data.filePath || !data.newFileName) {
      return {
        ok: false,
        message: "filePath and newName are required",
      };
    }

    return await renameFile({
      filePath: data.filePath,
      newFileName: data.newFileName,
    });
  }

  if (request.method === "DELETE") {
    return await deleteFile({ ...data, currentFolderName });
  }
};
