/**
 * Node modules
 */

import { useLoaderData } from "react-router";

/**
 * Components
 */
import { FileCard } from "@/components/FileCard";

/**
 * Types
 */
import type { File } from "@/types/all-types";

export const RecentFiles = () => {
  const { recentFiles } = useLoaderData();

  return (
    <>
      <h1 className="text-2xl font-medium">My Recent Files</h1>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {recentFiles.map((recentFile: File, i: number) => (
          <FileCard file={recentFile} key={i} />
        ))}
      </section>
    </>
  );
};
