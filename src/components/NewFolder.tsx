/**
 * Node modules
 */
import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "react-router";

/**
 * Components
 */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

/**
 * Custom modules
 */

/**
 * Types
 */
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewFolder = ({ open, onOpenChange }: Props) => {
  const fetcher = useFetcher();
  const [folderName, setFolderName] = useState("New folder");
  const [parentFolderPath, setParentFolderPath] = useState("/");

  const isLoading = fetcher.state !== "idle";

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success("Folder created successfully!");

      onOpenChange(false);
    } else {
      console.log(fetcher.data.error);
      toast.error(fetcher.data.error ?? "Failed to create folder.");
    }
  }, [fetcher.data, onOpenChange]);

  const handleSubmit = useCallback(() => {
    fetcher.submit(
      {
        folderName,
        parentFolderPath,
      },
      {
        action: "/drive",
        method: "post",
        encType: "application/json",
      },
    );
  }, [folderName, parentFolderPath, fetcher]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">
              Folder name <span className="text-red-500">*</span>
            </Label>

            <Input
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.currentTarget.value)}
              placeholder="Enter new folder name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentFolderPath">Parent folder path</Label>

            <Input
              id="parentFolderPath"
              value={parentFolderPath}
              onChange={(e) => setFolderName(e.currentTarget.value)}
              placeholder="/ (optional)"
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Folder Creating ..." : "Create Folder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
