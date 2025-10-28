"use client";

import React, { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../../../../packages/hooks/useUser";

interface AuthWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  fallback = <div>Loading...</div>,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useUser();

  // Define route groups
  const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];
  const protectedRoutes = ["/dashboard/*", "/profile", "/settings"]; // add yours

  const isPublic = publicRoutes.includes(pathname);
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    // If user not logged in and accessing protected route → redirect
    if (!isAuthenticated && isProtected) {
      router.replace("/auth/sign-in");
    }

    // If user logged in and accessing a public route → redirect
    if (isAuthenticated && isPublic) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isProtected, isPublic, router]);

  // Show fallback during redirect or auth check
  if ((isProtected && !isAuthenticated) || (isPublic && isAuthenticated)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
