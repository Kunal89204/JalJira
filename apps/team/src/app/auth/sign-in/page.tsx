"use client";
import React, { useState } from "react";
import { APIError } from "../../../../../../packages/types/Error";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../../../../../../packages/api/auth";
import { useUser } from "../../../../../../packages/hooks/useUser";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const { setUser, token, user } = useUser();

  const handleSignInMutation = useMutation({
    mutationFn: () => AuthApi.signin({ email, password }),
    onSuccess(data) {
      setUser(data.data?.user, data.data.session.access_token, data?.hasWorkspace);
      console.log("i am ", user);


      if (data?.message) {
        toast.success(data?.message);

        if(data?.hasWorkspace){
          router.push(`/dashboard/${data?.worskpaceId}`)
        }
      }
    },
    onError(error: APIError) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    handleSignInMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              disabled={handleSignInMutation.isPending}
              type="submit"
              className="w-full mt-2"
            >
              {handleSignInMutation.isPending ? "Signing In...." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <div className="text-center py-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
