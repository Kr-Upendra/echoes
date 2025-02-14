import { allJournals, userStats } from "../../api";
import { getAccessToken } from "../helper";

export const statLoader = async () => {
  const token = getAccessToken();
  if (!token) return null;
  const data = await userStats();
  return data?.data;
};

export const journalsLoader = async () => {
  const data = await allJournals();
  return data?.data;
};
