import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface NewProjectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewProject = ({ open, onOpenChange }: NewProjectProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("not-started");
  const [startDate, setStartDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [tags, setTags] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);

  const memberOptions = ["Kunal", "Riya", "Arjun", "Megha"];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: title.trim(),
      description: description.trim(),
      status,
      startDate,
      dueDate,
      tags,
      members,
    };
    console.log("🧱 New Project Data:", payload);

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("not-started");
    setStartDate(undefined);
    setDueDate(undefined);
    setTags([]);
    setMembers([]);
    onOpenChange(false);
  };

  const handleTagInput = (value: string) => {
    const tagArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && !tags.includes(tag));
    if (tagArray.length > 0) setTags((prev) => [...prev, ...tagArray]);
  };

  const handleMemberAdd = (value: string) => {
    if (!members.includes(value)) setMembers((prev) => [...prev, value]);
  };

  const handleRemove = (value: string, type: "tag" | "member") => {
    if (type === "tag") setTags((prev) => prev.filter((t) => t !== value));
    else setMembers((prev) => prev.filter((m) => m !== value));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Add details to organize and manage your project efficiently.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="grid gap-5 mt-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="project-title">Project Title</Label>
            <Input
              id="project-title"
              placeholder="Website Redesign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="project-desc">Description</Label>
            <Textarea
              id="project-desc"
              rows={4}
              placeholder="A redesign project to improve user experience."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status (Full width) */}
          <div className="grid gap-2 w-full">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Tags (comma-separated input) */}
          <div className="grid gap-2 w-full">
            <Label>Tags (comma separated)</Label>
            <Input
              placeholder="e.g. Design, Backend, UI"
              onBlur={(e) => handleTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTagInput((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-secondary px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(tag, "tag")}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Members (Full width) */}
          <div className="grid gap-2 w-full">
            <Label>Members</Label>
            <Select onValueChange={handleMemberAdd}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add a member" />
              </SelectTrigger>
              <SelectContent>
                {memberOptions.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {members.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {members.map((m) => (
                  <span
                    key={m}
                    className="flex items-center bg-secondary px-2 py-1 rounded-full text-sm"
                  >
                    {m}
                    <button
                      type="button"
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(m, "member")}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProject;
