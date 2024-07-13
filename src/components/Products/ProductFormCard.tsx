import { type Product } from "~/types/products";
import Button from "~/components/Button";
import { useState } from "react";
import Image from "next/image";

type ProductFormCardProps = {
  item: Product;
  handleSetAmount: (product: Product, quantity: number) => void;
};

export default function ProductFormCard({
  item,
  handleSetAmount,
}: ProductFormCardProps) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div
      className="flex w-full flex-col items-center justify-between gap-4 rounded-xl border border-[#758694] bg-[#FFF8F3] p-4 sm:flex-row"
      key={item.id}
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src={item.pictureUrl}
          alt={item.name}
          width={80}
          height={80}
          className="object-cover"
        />
        <p className="mt-2 max-w-[80px] truncate text-sm font-medium">
          {item.name}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-1 sm:items-start">
        <p className="text-sm tabular-nums">Price: ${item.price.toFixed(2)}</p>
        <p className="text-sm tabular-nums">Stock: {item.stock}</p>
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-between gap-2 md:w-auto md:flex-row">
        <label className="text-sm">Buy Amount</label>
        <input
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0 && value <= item.stock) setQuantity(value);
          }}
          type="number"
          value={quantity}
          min="1"
          max={item.stock}
          className="w-20 rounded-xl border border-[#758694] px-2 py-1 text-sm"
        />
        <Button
          onClick={() => {
            handleSetAmount(item, quantity);
            setQuantity(0);
          }}
          type="button"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
