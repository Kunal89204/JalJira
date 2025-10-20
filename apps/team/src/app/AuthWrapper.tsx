"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../../../../packages/hooks/useUser";

interface AuthWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string; // where to go if unauthenticated
  allowPublic?: boolean; // allow unauthenticated users on public pages
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  fallback = <div>Loading...</div>,
  redirectTo = "/auth/sign-in",
  allowPublic = false,
}) => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const publicPages = ["/auth/sign-in", "/auth/sign-up"];

  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    if (!isAuthenticated && !isPublicPage) {
      // Redirect only if trying to access a protected page
      router.replace(redirectTo);
    }
    if (isAuthenticated && isPublicPage) {
      // Redirect logged-in user away from login/signup
      router.replace("/dashboard"); // or your dashboard/home
    }
  }, [isAuthenticated, isPublicPage, router, redirectTo]);

  // Show fallback while auth is initializing or redirecting
  if (
    (!isAuthenticated && !isPublicPage) ||
    (isAuthenticated && isPublicPage)
  ) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
