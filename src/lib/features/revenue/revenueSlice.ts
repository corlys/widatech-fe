import { createAppSlice } from "~/lib/createAppSlice";
import { fetchRevenue } from "./revenueAPI";

export type Revenue = {
  date: string;
  revenue: number;
};

// Define a type for the slice state
export interface RevenueSlice {
  revenues: Revenue[];
  status: "idle" | "loading" | "failed";
}

// Define the initial state using that type
const initialState: RevenueSlice = {
  revenues: [],
  status: "idle",
};

export const revenueSlice = createAppSlice({
  name: "revenue",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: (create) => ({
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    fetchRevenues: create.asyncThunk(
      async (type: string) => {
        const response = await fetchRevenue(type);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.revenues = action.payload.revenues;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectRevenues: (state) => state.revenues,
    selectStatus: (state) => state.status,
  },
});

export const { fetchRevenues } = revenueSlice.actions;
export const { selectStatus, selectRevenues } = revenueSlice.selectors;

export default revenueSlice.reducer;
