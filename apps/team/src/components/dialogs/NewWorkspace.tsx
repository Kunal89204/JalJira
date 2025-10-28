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
import { useState } from "react";
import { toast } from "sonner"; // Optional if you use Sonner/Toast for notifications

interface DialogDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewWorkspace({ open, onOpenChange }: DialogDemoProps) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSaving) return;

    const isValid = validateForm();
    if (!isValid) return;

    setIsSaving(true);

    try {
      // Simulated async API request (replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Workspace saved:", {
        workspaceName: workspaceName.trim(),
        workspaceDescription: workspaceDescription.trim(),
      });

      toast?.success?.("Workspace created successfully!");

      // Reset and close dialog
      setWorkspaceName("");
      setWorkspaceDescription("");
      onOpenChange(false);
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
              Provide a name and description for your workspace.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
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
                <span className="text-sm text-red-500">{errors.description}</span>
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
