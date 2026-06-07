/**
 * Node modules
 */

import { useLoaderData, useParams } from "react-router";

/**
 * Components
 */
import { FileCard } from "@/components/FileCard";

/**
 * Types
 */
import type { File } from "@/types/all-types";

export const FolderPreview = () => {
  const files = useLoaderData();
  const { folderName } = useParams();

  console.log(files);

  return (
    <>
      <h1 className="text-2xl font-medium">{folderName}</h1>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {files?.length > 0 ? (
          files?.map((file: File, i: number) => (
            <FileCard file={file} key={i} />
          ))
        ) : (
          <h3>No Items</h3>
        )}
      </section>
    </>
  );
};
