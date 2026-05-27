/**
 * Node modules
 */
import { useLoaderData } from "react-router";

/**
 * Components
 */
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FolderCard } from "@/components/FolderCard";
import { FileCard } from "@/components/FileCard";

/**
 * Assets
 */
import { ChevronDownIcon } from "lucide-react";

/**
 * Types
 */
import type { File } from "@/types/all-types";

export const Home = () => {
  const { files, folders } = useLoaderData();

  return (
    <>
      <h1 className="text-2xl font-medium">Welcome to cloudbin</h1>

      <div className="space-y-6 mt-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer">
            Suggested Folders <ChevronDownIcon />
          </CollapsibleTrigger>

          <CollapsibleContent className="overflow-hidden transition-all duration-300">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ">
              {folders.map((folder, i: number) => (
                <FolderCard key={i} folder={folder} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer">
            Suggested Files ({files.length}) <ChevronDownIcon />
          </CollapsibleTrigger>

          <CollapsibleContent className="overflow-hidden transition-all duration-300">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ">
              {files.map((file: File, i: number) => (
                <FileCard key={i} file={file} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};
