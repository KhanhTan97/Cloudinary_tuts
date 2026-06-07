/**
 * Node modules
 */
import { useCallback, useState } from "react";

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
import { FilePreview } from "@/components/FilePreview";
import { ImgPreviewSidebar } from "@/components/ImgPreviewSidebar";
import { Separator } from "@/components/ui/separator";
import { FileInfo } from "@/components/FileInfo";

/**
 * Types
 */
import type { FileDetailsType } from "@/types/all-types";

export const FileDetails = ({ open, onOpenChange, file }: FileDetailsType) => {
  const isVideo = file.mime.startsWith("video/");
  const isImage = file.mime.startsWith("image/");
  const thumbnail = isImage ? file.url : file.thumbnail;

  const [loading, setLoading] = useState(false);
  const [selectedTransforms, setSelectedTransforms] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<{ [key: string]: string }>({});

  const transformQuery =
    selectedTransforms.length > 0 ? `tr=${selectedTransforms.join(":")}` : "";

  const handleToggle = useCallback((id: string, promptText?: string) => {
    setLoading(true);

    const transformId = promptText
      ? `${id}-prompt-${promptText.trim().replace(/\s+/g, "_")}`
      : id;

    setSelectedTransforms((prev) =>
      prev.includes(transformId)
        ? prev.filter((item) => item !== transformId)
        : [...prev, transformId],
    );

    if (promptText) {
      setPrompts((prev) => ({ ...prev, [id]: "" })); //reset prompt after use
    }
  }, []);

  const handlePromptChange = useCallback((id: string, value: string) => {
    setPrompts((prev) => ({ ...prev, [id]: value }));
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen h-screen max-w-none rounded-none sm:rounded-lg sm:max-w-6xl overflow-auto">
        <DialogHeader className="border-b pb-2">
          <DialogTitle>File Details</DialogTitle>

          <DialogDescription>
            <strong>{file.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="flex">
          <FilePreview
            file={file}
            isVideo={isVideo}
            thumbnail={thumbnail}
            transformQuery={transformQuery}
            loading={loading}
            setLoading={setLoading}
            isImage={isImage}
          />

          <div className="w-80 border-l bg-background p-4 flex flex-col">
            {isImage ? (
              <ImgPreviewSidebar
                file={file}
                selectedTransforms={selectedTransforms}
                prompts={prompts}
                handleToggle={handleToggle}
                handlePromptChange={handlePromptChange}
              />
            ) : (
              <div className="border rounded-lg p-5 bg-muted/40">
                <h3 className="font-semibold text-foreground mb-2">
                  File Information
                </h3>

                <Separator className="mt-2 mb-4" />

                <FileInfo file={file} />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t pt-2"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
