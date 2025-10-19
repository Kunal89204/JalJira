import React from "react";
import { ChartArea, ArrowBigUp } from "lucide-react";
const Home = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Workspace OverView</h2>
          <p className="text-sm text-gray-600">
            Here's an overview for this workspace
          </p>
        </div>

        <div>
          <button className="text-white bg-black py-2 px-4 rounded-md cursor-pointer">
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
    </div>
  );
};

export default Home;
