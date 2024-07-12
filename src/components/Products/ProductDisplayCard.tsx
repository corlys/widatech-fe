import { type Product } from "~/types/products";
import Image from "next/image";

type ProductDisplayCardProps = {
  item: Product;
  quantity: number;
};

export default function ProductDisplayCard({
  item,
  quantity,
}: ProductDisplayCardProps) {
  return (
    <div
      className="flex h-[150px] w-full flex-row items-center justify-between rounded-xl border border-[#758694] bg-[#FFF8F3] p-4"
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
      <div className="flex flex-col items-end justify-center space-y-1">
        <p className="text-sm tabular-nums">Price: ${item.price.toFixed(2)}</p>
        <p className="text-sm tabular-nums">Qty: {quantity}</p>
        <p className="text-sm font-semibold tabular-nums">
          Total: ${(quantity * item.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
