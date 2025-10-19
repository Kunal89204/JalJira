"use client";
import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Home,
  User,
  Settings,
  Menu,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: <User className="w-5 h-5" />,
  },
  {
    name: "Members",
    href: "/dashboard/members",
    icon: <Settings className="w-5 h-5" />,
  },
];

const workspaces = [
  { name: "Engineering Core" },
  { name: "Design Team" },
  { name: "Marketing Hub" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(true);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-50 border-r transition-all">
        {/* Logo Section */}
        <div className="flex items-center justify-start px-4 h-20 gap-2">
          <div className="px-3 py-1 bg-black rounded-lg">
            <p className="bg-gradient-to-r from-blue-700 via-red-700 to-orange-500 bg-clip-text text-transparent text-2xl font-bold">
              U
            </p>
          </div>
          <span className="text-xl font-bold text-gray-700">Unweb</span>
        </div>

        {/* Workspaces Section */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-500 font-semibold">Workspaces</p>
            <div className="border h-5 w-5 flex justify-center items-center rounded-full cursor-pointer text-gray-600 font-semibold hover:bg-gray-100 transition">
              <Plus className="w-3 h-3" />
            </div>
          </div>
          <DropdownMenu>
            <div
              className="flex justify-between items-center py-2 px-2 cursor-pointer hover:bg-gray-200 rounded-md transition"
            
            >
              <DropdownMenuTrigger  onClick={() => setShowDialog(!showDialog)} className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                <p  onClick={() => setShowDialog(!showDialog)} className="bg-black text-white rounded-lg aspect-square px-4 py-2 font-semibold">
                  E
                </p>
                <span  onClick={() => setShowDialog(!showDialog)} className="text-base font-semibold text-black">
                  Engineering Core
                </span>

                {showDialog ? (
                  <ChevronDown  onClick={() => setShowDialog(!showDialog)} className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent
              side="right"
              align="start"
              className="translate-x-8 min-w-56"
            >
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="border-b pb-1">
                {workspaces.map((item, index) => (
                  <DropdownMenuItem className="py-2 hover:bg-gray-200 cursor-pointer duration-500 transition-all justify-between">
                    <div className="flex gap-2 items-center justify-between">
                      <div className="border aspect-square  text-sm  h-5 flex items-center justify-center rounded border-gray-300">
                        {item.name.split("")[0]}
                      </div>
                      {item.name}
                    </div>
                    <Checkbox />
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="flex px-2 gap-1 my-1 hover:bg-gray-100 py-2 rounded cursor-pointer duration-300 transition-all">
                <div className="border rounded-sm p-1">
                  <Plus size={14} />
                </div>
                <p className="text-sm text-gray-700 ">Add workspace</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 ">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar for small screens */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        {/* Adjusted Dialog Position */}
        <SheetContent
          side="left"
          className="p-0 w-64 translate-x-6 shadow-lg rounded-r-xl"
        >
          <div className="flex flex-col h-full bg-white shadow-md rounded-r-xl">
            <div className="flex items-center justify-center h-20 border-b">
              <span className="text-xl font-bold">Unweb</span>
            </div>
            <nav className="flex-1 px-4 py-6 ">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto max-w-[1440px] mx-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
