"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import type { SelectedProduct, Product } from "~/types/products";
import type { InvoiceInput } from "~/types/forms";
import ProductFormCard from "~/components/Products/ProductFormCard";
import ProductDisplayCard from "~/components/Products/ProductDisplayCard";
import Button from "~/components/Button";

const items = [
  {
    id: "1",
    name: "Wortel",
    pictureUrl: "/wortel.png",
    stock: 100,
    price: 29.99,
  },
  {
    id: "2",
    name: "Ubi",
    pictureUrl: "/ubi.png",
    stock: 50,
    price: 59.99,
  },
  {
    id: "3",
    name: "Kentang",
    pictureUrl: "/kentang.jpeg",
    stock: 200,
    price: 19.99,
  },
];

export default function FormPage() {
  const productSchema = z.object({
    salesPersonName: z.string().min(1),
    customerName: z.string().min(1),
    notes: z.string().optional(),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceInput>({
    resolver: zodResolver(productSchema),
  });

  const onSubmitFn: SubmitHandler<InvoiceInput> = async (data) => {
    try {
      await axios.post("http://localhost:3001/invoice", {
        ...data,
        productsSold: JSON.stringify(selectedItems),
        totalAmount: selectedItems
          .reduce((acc, curr) => {
            return curr.quantity * curr.product.price + acc;
          }, 0)
          .toString(),
      });
      reset({ notes: undefined, customerName: "", salesPersonName: "" });
      setSelectedItems([]);
      toast("Success", { type: "success" });
    } catch (error) {
      toast("Failed", { type: "error" });
    }
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
        if (currentSavedItem.quantity + newQuantity > product.stock) {
          toast("Not enough stock", { type: "error" });
          return [...prevItems];
        }
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
    <div className="container flex min-h-screen flex-col items-center justify-between gap-12 px-4 py-16 text-[#405D72] md:flex-row">
      <form
        onSubmit={handleSubmit(onSubmitFn)}
        className="flex w-full flex-col items-center justify-start gap-6 md:w-1/2"
      >
        <div className="w-full space-y-4">
          <div className="flex flex-col items-start justify-between gap-2">
            <label>CUSTOMER NAME </label>
            <input
              className="w-full rounded-xl border border-[#758694] p-2"
              type="text"
              {...register("customerName")}
            />
            {errors?.customerName && (
              <p className="text-red-400">{errors.customerName.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-between gap-2">
            <label>SALES PERSON NAME </label>
            <input
              className="w-full rounded-xl border border-[#758694] p-2"
              type="text"
              {...register("salesPersonName")}
            />
            {errors?.salesPersonName && (
              <p className="text-red-400">{errors.salesPersonName.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-between gap-2">
            <label>NOTES</label>
            <textarea
              className="w-full rounded-xl border border-[#758694] p-2"
              {...register("notes")}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <p>Items Bought</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {selectedItems.map((item) => (
              <ProductDisplayCard
                item={item.product}
                key={item.product.id}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <div className="mt-8 flex w-full flex-col items-center justify-start md:mt-0 md:w-1/2">
        <input
          className="mb-4 w-full rounded-xl border border-[#758694] px-4 py-2"
          type="text"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search products"
        />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
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
  );
}
