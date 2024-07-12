import { type Invoice } from "~/lib/features/invoice/invoiceSlice";

type InvoiceProps = {
  invoice: Invoice;
};

export default function InvoiceCard({ invoice }: InvoiceProps) {
  return (
    <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Invoice Summary</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Customer:</span> {invoice.customerName}
        </p>
        <p>
          <span className="font-medium">Salesperson:</span>{" "}
          {invoice.salesPersonName}
        </p>
        <p>
          <span className="font-medium">Total Paid:</span> $
          {Number(invoice.totalAmount).toFixed(2)}
        </p>
        <div>
          <p className="font-medium">Notes:</p>
          <p className="text-sm text-gray-600">{invoice.notes}</p>
        </div>
      </div>
    </div>
  );
}
