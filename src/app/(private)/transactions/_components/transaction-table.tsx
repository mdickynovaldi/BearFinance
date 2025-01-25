"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { ITransaction } from "@/interfaces";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TransactionTable({
  transactions,
}: {
  transactions: ITransaction[];
}) {
  const router = useRouter();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleEdit = async (id: string) => {
    try {
      // Implementasi logika edit
      console.log("Editing transaction:", id);
      router.push(`/transactions/edit/${id}`);
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Implementasi logika delete
      console.log("Deleting transaction:", id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        Tidak ada transaksi yang tersedia
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.date).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </TableCell>
              <TableCell>{formatAmount(transaction.amount)}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.notes}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(transaction.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
