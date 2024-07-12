import { createAppSlice } from "~/lib/createAppSlice";
import { fetchInvoice } from "./invoiceAPI";

export type Invoice = {
  id: number;
  salesPersonName: string;
  customerName: string;
  notes: string | null;
  productsSold: string;
  totalAmount: string;
  createdAt: Date;
  updatedAt: Date;
};

// Define a type for the slice state
export interface InvoiceSlice {
  invoices: Invoice[];
  status: "idle" | "loading" | "failed";
  hasNextPage: boolean;
}

// Define the initial state using that type
const initialState: InvoiceSlice = {
  invoices: [],
  status: "idle",
  hasNextPage: false,
};

export const invoiceSlice = createAppSlice({
  name: "invoice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: (create) => ({
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    nextPageAsync: create.asyncThunk(
      async (page: number) => {
        const response = await fetchInvoice(page);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.hasNextPage = action.payload.hasNextPage;
          state.invoices = action.payload.invoices;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectInvoices: (state) => state.invoices,
    selectHasNextPage: (state) => state.hasNextPage,
    selectStatus: (state) => state.status,
  },
});

export const { nextPageAsync } = invoiceSlice.actions;
export const { selectInvoices, selectHasNextPage, selectStatus } =
  invoiceSlice.selectors;

export default invoiceSlice.reducer;
