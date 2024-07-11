import { type Product } from "~/types/products";
import { useState } from "react";

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
      className="flex flex-col items-start justify-center rounded-xl border border-[#758694] bg-[#FFF8F3] px-4 py-2"
      key={item.id}
    >
      <p>{item.name}</p>
      <p>Price : {item.price}</p>
      <p>Stock : {item.stock}</p>
      <div className="flex items-center justify-between">
        <label>Buy Amount</label>
        <input
          onChange={(e) => {
            if (Number(e.target.value) > 0) setQuantity(Number(e.target.value));
          }}
          type="number"
          value={quantity}
          className="w-1/4 rounded-xl border border-[#758694] px-4 py-2"
        />
        <button
          onClick={() => {
            handleSetAmount(item, quantity);
            setQuantity(0);
          }}
          className="flex items-center justify-center rounded-xl bg-[#758694] px-2 py-2"
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
}
