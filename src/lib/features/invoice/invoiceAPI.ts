import axios from "axios";
import { type Invoice } from "./invoiceSlice";

type FetchInvoiceResponse = {
  invoices: Invoice[];
  hasNextPage: boolean;
};

export const fetchInvoice = async (page?: number) => {
  const res = await axios.get<FetchInvoiceResponse>(
    "http://localhost:3001/invoice?page=" + page,
  );
  return res;
};