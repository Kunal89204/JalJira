"use client";
import React, { useState } from "react";
import { ChartArea, ArrowBigUp } from "lucide-react";
import NewProject from "@/components/dialogs/NewProject";
import { UserPlus } from "lucide-react";
const Home = () => {
  const [createProjectDialog, setCreateProjectDialog] =
    useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Workspace OverView</h2>
          <p className="text-sm text-gray-600">
            Here&apos;s an overview for this workspace
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <button className="flex gap-2 items-center border px-6 cursor-pointer hover:bg-gray-50 py-2 rounded-lg">
              {" "}
              <UserPlus size={16} />
              Invite
            </button>
          </div>
          <button
            onClick={() => setCreateProjectDialog(true)}
            className="text-white bg-black py-2 px-4 rounded-md cursor-pointer"
          >
            New Project
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="flex mt-8 gap-4">
        <div className="border w-1/3 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="mb-2  flex gap-2 items-center">
              Total Tasks
              <ArrowBigUp size={18} color="green" />
            </p>
            <ChartArea />
          </div>
          <p className="text-2xl font-bold">15</p>
        </div>
        <div className="border w-1/3 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="mb-2  flex gap-2 items-center">
              Overdue Tasks
              <ArrowBigUp size={18} color="green" />
            </p>
            <ChartArea />
          </div>
          <p className="text-2xl font-bold">15</p>
        </div>
        <div className="border w-1/3 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="mb-2  flex gap-2 items-center">
              Completed Tasks
              <ArrowBigUp size={18} color="green" />
            </p>
            <ChartArea />
          </div>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>
      <NewProject
        onOpenChange={setCreateProjectDialog}
        open={createProjectDialog}
      />
    </div>
  );
};

export default Home;
