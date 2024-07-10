"use client";

import { useState } from "react";
import type { SelectedProduct, Product } from "~/types/products";
import ProductFormCard from "~/components/Products/ProductFormCard";
import ProductDisplayCard from "~/components/Products/ProductDisplayCard";

const items = [
  {
    id: "1",
    name: "Product 1",
    pictureUrl: "https://example.com/product1.jpg",
    stock: 100,
    price: 29.99,
  },
  {
    id: "2",
    name: "Product 2",
    pictureUrl: "https://example.com/product2.jpg",
    stock: 50,
    price: 59.99,
  },
  {
    id: "3",
    name: "Product 3",
    pictureUrl: "https://example.com/product3.jpg",
    stock: 200,
    price: 19.99,
  },
];

export default function HomePage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<SelectedProduct[]>([]);

  const filteredProduct = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery),
  );

  const handleAddProduct = (product: Product, newQuantity: number) => {
    setSelectedItems((prevItems) => {
      const currentSavedItem = prevItems.find(
        (i) => i.product.id === product.id,
      );
      if (currentSavedItem) {
        if (currentSavedItem.quantity + newQuantity > product.stock)
          throw Error("Not Enough Stock");
        return prevItems.map((i) => {
          return i.product.id === product.id
            ? {
                product: product,
                quantity: i.quantity + newQuantity,
              }
            : i;
        });
      } else {
        return [
          ...prevItems,
          {
            product: product,
            quantity: newQuantity,
          },
        ];
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#F7E7DC] to-[#FFF8F3] text-white">
      <div className="container flex flex-row items-center justify-center gap-12 px-4 py-16 text-[#405D72]">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="flex flex-col items-start justify-between gap-2">
            <label>CUSTOMER NAME </label>
            <input type="text" name="customerName" />
          </div>
          <div className="flex flex-col items-start justify-between gap-2">
            <label>SALES PERSON NAME </label>
            <input type="text" name="salesPersonName" />
          </div>
          <div className="flex flex-col items-start justify-between gap-2">
            <label>NOTES</label>
            <textarea name="notes" />
          </div>
          <div className="flex w-full flex-col">
            <p>Items Bought</p>
            <div>
              {selectedItems.map((item) => (
                <ProductDisplayCard
                  item={item.product}
                  key={item.product.id}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-[#758694] px-2 py-2"
          >
            Submit
          </button>
        </form>
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">
            {filteredProduct.map((item) => (
              <ProductFormCard
                key={item.id}
                handleSetAmount={handleAddProduct}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
