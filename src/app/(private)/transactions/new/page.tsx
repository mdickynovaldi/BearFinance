import { TransactionForm } from "@/app/(private)/transactions/_components/transaction-form";

export default function NewTransactionPages() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-center mb-10">New Transaction</h1>
      <TransactionForm formType="new" />
    </div>
  );
}
