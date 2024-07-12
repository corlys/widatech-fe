"use client";

import { useState, useEffect } from "react";
import InvoiceCard from "~/components/Invoices/InvoiceCard";
import {
  selectHasNextPage,
  selectInvoices,
  selectStatus,
  nextPageAsync,
} from "~/lib/features/invoice/invoiceSlice";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";

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
          {invoices.map((invoice) => {
            return <InvoiceCard invoice={invoice} key={invoice.id} />;
          })}
        </div>
        <div className="mt-auto flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <p>{page}</p>
          <button
            type="button"
            disabled={!hasNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
