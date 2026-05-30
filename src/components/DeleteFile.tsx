/**
 * Node modules
 */
import { useFetcher } from "react-router";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

/**
 * Components
 */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Types
 */
import type { DeleteFileType } from "@/types/all-types";

export const DeleteFile = ({
  open,
  onOpenChange,
  fileId,
  fileUrl,
}: DeleteFileType) => {
  const fetcher = useFetcher();

  const isLoading = fetcher.state !== "idle";

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success("File deleted successfully!");
      onOpenChange(false);
    } else {
      toast.error("Failed to delete file.");
    }
  }, [fetcher.data, onOpenChange]);

  const handleSubmit = useCallback(() => {
    if (!fileId.trim()) {
      toast.error("File ID is not empty");
      return;
    }

    fetcher.submit(
      { fileId, fileUrl },
      {
        method: "DELETE",
        encType: "application/json",
        action: "/drive",
      },
    );
  }, [fileId, fileUrl, fetcher]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={fetcher.state === "submitting"}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Deleting ..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
