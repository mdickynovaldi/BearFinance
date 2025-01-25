import { Button } from "@/components/ui/button";
import { createClient } from "@/config/supabase-server-config";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import TransactionTable from "./_components/transaction-table";

export default async function TransactionsPages() {
  const supabaseServerConfig = await createClient();
  const userResponse = await supabaseServerConfig.auth.getUser();
  if (userResponse.error) {
    return toast({
      title: "User not found",
      description: "Please login to continue",
    });
  }
  const transactionsResponse = await supabaseServerConfig
    .from("transactions")
    .select("*")
    .eq("user_id", userResponse.data.user?.id);
  if (transactionsResponse.error) {
    return toast({
      title: "Transactions not found",
      description: "Please login to continue",
    });
  }
  const transactions = transactionsResponse.data;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-center">Transactions</h1>
        <Link
          className="no-underline bg-blue-500 text-white px-4 py-2 rounded-md"
          href="/transactions/new"
        >
          New Transaction
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
