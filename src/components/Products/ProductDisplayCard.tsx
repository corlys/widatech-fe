import { type Product } from "~/types/products";

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
      className="flex flex-col items-start justify-center rounded-xl border border-[#758694] bg-[#FFF8F3] px-4 py-2"
      key={item.id}
    >
      <p>{item.name}</p>
      <p className="tabular-nums">Price : {item.price}</p>
      <p className="tabular-nums">Quantity : {quantity}</p>
    </div>
  );
}
