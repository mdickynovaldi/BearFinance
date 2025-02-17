"use client";

import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { supabaseDBConfig } from "@/config/supabase-db-config";
import { toast } from "@/hooks/use-toast";
import { AuthService } from "@/services/auth/auth.service";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      const { data, error } = await AuthService.signUp(
        values.email,
        values.password
      );
      if (error) {
        throw error;
      } else {
        const response = await supabaseDBConfig.from("user_profiles").insert({
          id: data.user?.id,
          name: values.fullName,
          profile_pic: "",
        });
        console.log(response);
        if (response.error) {
          throw response.error;
        }
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification",
        });
        form.reset();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-slate-100 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-center mb-4 text-primary dark:text-primary">
          Sign Up
        </h1>
        <hr className="w-full border-slate-300 dark:border-slate-700 mb-8   " />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Please enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Please enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <p className="text-sm text-center">
              Already have an account? <Link href="/auth/sign-in">Sign In</Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
