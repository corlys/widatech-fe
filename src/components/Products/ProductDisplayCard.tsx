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
      className="flex h-[150px] flex-row items-center justify-center rounded-xl border border-[#758694] bg-[#FFF8F3] px-4 py-2"
      key={item.id}
    >
      <div className="flex flex-col flex-wrap items-center justify-center gap-2">
        <Image src={item.pictureUrl} alt={item.name} width={100} height={100} />
        <p>{item.name}</p>
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <p className="tabular-nums">Price : {item.price}</p>
        <p className="tabular-nums">Quantity : {quantity}</p>
        <p className="tabular-nums">
          Total: {Math.floor(quantity * item.price)}
        </p>
      </div>
    </div>
  );
}
