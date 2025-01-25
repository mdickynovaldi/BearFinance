"use client";

import { TransactionForm } from "@/app/(private)/transactions/_components/transaction-form";
import { createClient } from "@/config/supabase-browser-config";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTransactionPage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const supabase = createClient();
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          throw error;
        }

        setTransaction(data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch transaction data",
          variant: "destructive",
        });
        router.push("/transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [params.id, router, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Transaction not found</h1>
        <button
          onClick={() => router.push("/transactions")}
          className="text-blue-500 hover:underline"
        >
          Back to Transactions
        </button>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-center mb-10">Edit Transaction</h1>
      <TransactionForm formType="edit" initialValues={transaction} />
    </div>
  );
}
