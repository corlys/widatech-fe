import axios from "axios";
import { type Revenue } from "./revenueSlice";

type FetchRevenueResponse = {
  revenues: Revenue[];
};

export const fetchRevenue = async (type: string) => {
  const res = await axios.get<FetchRevenueResponse>(
    `http://localhost:${process.env.NEXT_PUBLIC_BE_PORT}/revenue?type=` + type,
  );
  return res;
};
