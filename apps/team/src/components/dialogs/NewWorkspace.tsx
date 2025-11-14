import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "sonner"; // Optional notifications

interface DialogDemoProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NewWorkspace({ open, onOpenChange }: DialogDemoProps) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [workspaceImage, setWorkspaceImage] = useState<string | null>(null);
  const [workspaceFile, setWorkspaceFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form validation
  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {};
    if (!workspaceName.trim()) {
      newErrors.name = "Workspace name is required.";
    } else if (workspaceName.trim().length < 3) {
      newErrors.name = "Workspace name must be at least 3 characters.";
    }

    if (!workspaceDescription.trim()) {
      newErrors.description = "Description is required.";
    } else if (workspaceDescription.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file upload + preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWorkspaceFile(file);

      const previewUrl = URL.createObjectURL(file);
      setWorkspaceImage(previewUrl);
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSaving) return;

    const isValid = validateForm();
    if (!isValid) return;

    setIsSaving(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("workspaceName", workspaceName.trim());
      formData.append("workspaceDescription", workspaceDescription.trim());
      if (workspaceFile) formData.append("workspaceImage", workspaceFile);

      // Debug log for all data (simulating API call)
      console.log("Form data before upload:");
      console.log({
        workspaceName,
        workspaceDescription,
        workspaceFile,
      });

      // Simulate async upload
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast?.success?.("Workspace created successfully!");

      // Reset everything
      setWorkspaceName("");
      setWorkspaceDescription("");
      setWorkspaceImage(null);
      setWorkspaceFile(null);
      onOpenChange?.(false);
    } catch (error) {
      console.error("Error saving workspace:", error);
      toast?.error?.("Failed to create workspace. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>
              Provide a name, description, and optional image for your
              workspace.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Image Upload Section */}
            <div className="grid gap-2">
              <Label>Workspace Image</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-32 mx-auto h-32 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50"
              >
                {workspaceImage ? (
                  <Image
                    src={workspaceImage}
                    alt="Workspace Preview"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 text-sm text-center">
                    Click to upload image
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>

            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="workspace-name">Name</Label>
              <Input
                id="workspace-name"
                name="name"
                placeholder="e.g. Marketing Team"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                disabled={isSaving}
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>

            {/* Description Field */}
            <div className="grid gap-2">
              <Label htmlFor="workspace-description">Description</Label>
              <Input
                id="workspace-description"
                name="description"
                placeholder="Brief description of this workspace"
                value={workspaceDescription}
                onChange={(e) => setWorkspaceDescription(e.target.value)}
                disabled={isSaving}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description}
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
