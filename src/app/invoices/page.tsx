"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import {
  selectHasNextPage,
  selectInvoices,
  selectStatus,
  nextPageAsync,
} from "~/lib/features/invoice/invoiceSlice";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import Button from "~/components/Button";

const InvoiceCard = dynamic(
  () => import("../../components/Invoices/InvoiceCard"),
);

export default function Invoices() {
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(selectInvoices);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const invoiceStatus = useAppSelector(selectStatus);

  const [page, setPage] = useState(1);

  useEffect(() => {
    void dispatch(nextPageAsync(page));
  }, [dispatch, page]);

  useEffect(() => {
    console.log("hasNextPage", hasNextPage);
  }, [hasNextPage]);

  return (
    <div className="container flex min-h-screen flex-col items-center justify-between gap-4 py-8 text-[#405D72]">
      <div className="flex w-full flex-grow flex-col items-center justify-between gap-y-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-y-6">
          {invoiceStatus === "idle" &&
            invoices.length > 0 &&
            invoices.map((invoice) => {
              return <InvoiceCard invoice={invoice} key={invoice.id} />;
            })}
        </div>
        <div className="mt-auto flex items-center justify-center gap-4">
          <Button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <p>{page}</p>
          <Button
            type="button"
            disabled={!hasNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
