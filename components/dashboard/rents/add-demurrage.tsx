"use client";
import { Input } from "@/components/ui/input";
import { useRentStore } from "@/store/rentStore";
import { useEffect, useState } from "react";

const AddDemurrage = ({
  demurrageAmount,
  index,
}: {
  demurrageAmount: string;
  index: number;
}) => {
  const { setDemurrageAmount } = useRentStore();
  const [amount, setAmount] = useState<string>(demurrageAmount ?? "");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    setDemurrageAmount(amount, index);
  }, [amount]);

  return (
    <div className="w-[100px]">
      <Input onChange={handleOnChange} value={amount} />
    </div>
  );
};

export default AddDemurrage;
