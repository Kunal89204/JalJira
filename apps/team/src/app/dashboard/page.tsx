"use client";
import React, { useEffect, useState } from "react";
import { ChartArea, ArrowBigUp } from "lucide-react";
import NewProject from "@/components/dialogs/NewProject";
import { UserPlus } from "lucide-react";
import ProjectTable from "@/components/dashboard/ProjectTable";
import { useStore } from "../../../../../packages/store/store";
import { NewWorkspace } from "@/components/dialogs/NewWorkspace";

const Home = () => {
  const [createProjectDialog, setCreateProjectDialog] =
    useState<boolean>(false);
  const { hasWorkspace } = useStore();
  const [workspaceComponent, setWorkspaceComponent] = useState(false);

  // ⬇️ FIX: Only set once when hasWorkspace changes
  useEffect(() => {
    if (!hasWorkspace) {
      setWorkspaceComponent(true);
    }
  }, [hasWorkspace]);

  // If no workspace → show dialog
  if (!hasWorkspace) {
    return (
      <div>
        no workspace you have
        <NewWorkspace open={workspaceComponent} />
      </div>
    );
  }
  return (
    <div>
     
    </div>
  );
};

export default Home;
