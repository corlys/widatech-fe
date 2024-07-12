"use client";

import { useState, useEffect } from "react";
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

  return (
    <div className="container flex flex-col items-center justify-center gap-4">
      {invoices.map((item) => (
        <div key={item.id}>{item.totalAmount}</div>
      ))}
    </div>
  );
}
