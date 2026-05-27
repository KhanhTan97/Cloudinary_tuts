/**
 * Node modules
 */
import { useState } from "react";

/**
 * Custom modules
 */

/**
 * Types
 */
import type { File } from "@/types/all-types";

/**
 * Components
 */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Assets
 */
import {
  DownloadIcon,
  EditIcon,
  EllipsisVertical,
  FolderOpenIcon,
} from "lucide-react";

export const FileMenu = ({ file }: { file: File }) => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-45">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setDetailsOpen(true)}
          >
            <FolderOpenIcon size={18} className="text-gray-400" />
            Open File
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
            <DownloadIcon />
            Download
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setRenameOpen(true)}
          >
            <EditIcon />
            Rename
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
