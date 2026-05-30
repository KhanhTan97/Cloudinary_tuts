/**
 * Node modules
 */
import { useState } from "react";

/**
 * Custom modules
 */
import { copyToClipboard, downloadFile } from "@/lib/utils";

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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameFile } from "@/components/RenameFile";
import { FileInformation } from "@/components/FileInformation";
import { DeleteFile } from "@/components/DeleteFile";

/**
 * Assets
 */
import {
  CopyIcon,
  DownloadIcon,
  EditIcon,
  EllipsisVertical,
  FolderOpenIcon,
  InfoIcon,
  ShareIcon,
  Trash2Icon,
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

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => downloadFile(file.url, file.name)}
          >
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

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShareIcon />
              Share
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={async () => await copyToClipboard(file.url)}
                >
                  <CopyIcon /> Copy link
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setInfoOpen(true)}
          >
            <InfoIcon />
            File Information
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
            Delete File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenameFile
        open={renameOpen}
        onOpenChange={setRenameOpen}
        fileName={file.name}
        filePath={file.filePath}
      />

      <FileInformation open={infoOpen} onOpenChange={setInfoOpen} file={file} />

      <DeleteFile
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        fileId={file.fileId}
        fileUrl={file.url}
      />
    </>
  );
};
