"use client";

import { Button } from "@/components/ui/button";
import { forgotPasswordSchema } from "@/schemas/auth-schema";
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
import { useState } from "react";
import { supabaseDBConfig } from "@/config/supabase-db-config";
import { toast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setLoading(true);
      const { data, error } = await supabaseDBConfig.auth.resetPasswordForEmail(
        values.email
      );
      if (error) {
        throw error;
      } else {
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification",
        });
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
          Forgot Password
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

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
