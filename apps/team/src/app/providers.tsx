"use client"
import React, { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {Toaster} from "@/components/ui/sonner"


const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}
    <Toaster /></QueryClientProvider>
  );
};

export default Providers;
