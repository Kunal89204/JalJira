import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectTable = () => {
  const projects = [
    { name: "Olkhan App", status: "Active", updated: "2 days ago" },
    { name: "Insanity Platform", status: "In Progress", updated: "1 week ago" },
    { name: "API Docs Portal", status: "Completed", updated: "1 month ago" },
  ];

  const tasks = [
    { title: "Setup authentication flow", status: "Done", due: "Oct 25" },
    { title: "Implement family tree UI", status: "Pending", due: "Nov 2" },
    { title: "Integrate Cloudinary API", status: "In Progress", due: "Nov 5" },
  ];

  const members = [
    { name: "Kunal Khandelwal", role: "Lead Developer" },
    { name: "Riya Sharma", role: "UI/UX Designer" },
    { name: "Amit Verma", role: "Backend Engineer" },
  ];

  return (
    <div className="border rounded-lg my-4 p-4 bg-white dark:bg-neutral-900">
      {/* Tabs */}
      <Tabs defaultValue="account" className="">
        <TabsList className="flex justify-start w-fit">
          <TabsTrigger value="account">Recent Projects</TabsTrigger>
          <TabsTrigger value="tasks">Recent Tasks</TabsTrigger>
          <TabsTrigger value="members">Recent Members</TabsTrigger>
        </TabsList>

        {/* --- Projects Tab --- */}
        <TabsContent value="account" className="mt-4 space-y-3">
          {projects.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-md p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
            >
              <div>
                <h3 className="text-sm font-medium">{p.name}</h3>
                <p className="text-xs text-muted-foreground">Updated {p.updated}</p>
              </div>
              <Badge
                variant={
                  p.status === "Active"
                    ? "default"
                    : p.status === "In Progress"
                    ? "secondary"
                    : "outline"
                }
              >
                {p.status}
              </Badge>
            </div>
          ))}
        </TabsContent>

        {/* --- Tasks Tab --- */}
        <TabsContent value="tasks" className="mt-4 space-y-3">
          {tasks.map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-md p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
            >
              <div>
                <h3 className="text-sm font-medium">{t.title}</h3>
                <p className="text-xs text-muted-foreground">Due {t.due}</p>
              </div>
              <Badge
                variant={
                  t.status === "Done"
                    ? "default"
                    : t.status === "In Progress"
                    ? "secondary"
                    : "outline"
                }
              >
                {t.status}
              </Badge>
            </div>
          ))}
        </TabsContent>

        {/* --- Members Tab --- */}
        <TabsContent value="members" className="mt-4 space-y-3">
          {members.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-md p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
            >
              <div>
                <h3 className="text-sm font-medium">{m.name}</h3>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View
              </Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTable;
