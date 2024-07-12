import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { invoiceSlice } from "~/lib/features/invoice/invoiceSlice";
import { revenueSlice } from "./features/revenue/revenueSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(invoiceSlice, revenueSlice);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
