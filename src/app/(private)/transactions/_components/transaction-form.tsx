"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/config/supabase-browser-config";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  type: z.string().min(1, "Type is required"),
  date: z.string().min(1, "Date is required"),
  amount: z.string().min(1, "Amount is required"),
  category: z.string().min(1, "Category is required"),
  notes: z.string().min(1, "Note is required"),
});

type FormValues = z.infer<typeof formSchema> & { id?: string };

interface TransactionFormProps {
  formType: "new" | "edit";
  initialValues?: FormValues | null;
}

export function TransactionForm({
  formType,
  initialValues,
}: TransactionFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      type: "",
      date: "",
      amount: "",
      category: "",
      notes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const supabase = createClient();
      const { data: user, error: userError } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (formType === "edit" && initialValues?.id) {
        const { error } = await supabase
          .from("transactions")
          .update(values)
          .eq("id", initialValues.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Transaction updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("transactions")
          .insert([{ ...values, user_id: user.user?.id }]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Transaction created successfully",
        });
      }

      router.push("/transactions");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/transactions")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {formType === "edit" ? "Update" : "Create"} Transaction
          </Button>
        </div>
      </form>
    </Form>
  );
}
