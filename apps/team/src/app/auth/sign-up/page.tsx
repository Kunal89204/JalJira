"use client";
import React, { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../../../../../../packages/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpMutation = useMutation({
    mutationFn: async () => {
      return await AuthApi.signup({ name, email, password });
    },
    onSuccess: (response) => {
      if (response?.success) {
        toast.success(response.message || "Registered successfully!");
        // optional: redirect to login
        setTimeout(() => router.push("/auth/sign-in"), 1500);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    handleSignUpMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Enter your details to register a new account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              type="submit"
              className="w-full mt-2"
              disabled={handleSignUpMutation.isPending}
            >
              {handleSignUpMutation.isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <div className="text-center py-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
