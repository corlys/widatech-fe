import axios from "axios";
import { type Revenue } from "./revenueSlice";

type FetchRevenueResponse = {
  revenues: Revenue[];
};

export const fetchRevenue = async (type: string) => {
  const res = await axios.get<FetchRevenueResponse>(
    "http://localhost:3001/invoice?type=" + type,
  );
  return res;
};
