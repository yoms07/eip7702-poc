"use client";
import { useState } from "react";
import { Plus, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  tokenAddress: string;
  to: string;
  amount: string;
  value: string;
}

export function BatchTransaction({
  onSent,
  tokenAddress,
  recipientList,
}: {
  onSent: () => void;
  tokenAddress: string[];
  recipientList: string[];
}) {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([
    { tokenAddress: "", to: "", amount: "", value: "0" },
  ]);
  const [isSponsored, setIsSponsored] = useState(false);

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { tokenAddress: "", to: "", amount: "", value: "0" },
    ]);
  };

  const removeTransaction = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const updateTransaction = (
    index: number,
    field: keyof Transaction,
    value: string
  ) => {
    const updatedTransactions = transactions.map((transaction, i) => {
      if (i === index) {
        return { ...transaction, [field]: value };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
  };

  const submitBatchTransaction = async () => {
    console.log("Submitting batch transaction:", transactions);
    // Add your submission logic here
    // onSent();
    const result = await fetch("http://localhost:3000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isSponsored: isSponsored,
        transactions,
      }),
    }).then((d) => d.json());
    toast({
      title: "Transaction success",
      description: result.txHash,
    });

    setTimeout(() => {
      onSent();
    }, 2000);
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Create Batch Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border border-gray-700 rounded-lg"
            >
              <div className="grid gap-2">
                <Label htmlFor={`token-${index}`}>Token:</Label>
                <Select
                  value={transaction.tokenAddress}
                  onValueChange={(value) =>
                    updateTransaction(index, "tokenAddress", value)
                  }
                >
                  <SelectTrigger id={`token-${index}`}>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokenAddress.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`to-${index}`}>To:</Label>
                <Select
                  value={transaction.to}
                  onValueChange={(value: string) =>
                    updateTransaction(index, "to", value)
                  }
                >
                  <SelectTrigger id={`to-${index}`}>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipientList.map((t) => (
                      <SelectItem value={t} key={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`amount-${index}`}>Amount:</Label>
                <Input
                  id={`amount-${index}`}
                  placeholder="Enter amount"
                  value={transaction.amount}
                  onChange={(e) =>
                    updateTransaction(index, "amount", e.target.value)
                  }
                />
              </div>
              {transactions.length > 1 && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeTransaction(index)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <div className="space-y-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={addTransaction}
              className="h-8 w-8 border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={isSponsored}
                onCheckedChange={(checked) =>
                  setIsSponsored(checked as boolean)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sponsor this transaction
              </label>
            </div>
            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={submitBatchTransaction}
            >
              <Send className="h-4 w-4 mr-2" /> Submit Batch Transaction
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
