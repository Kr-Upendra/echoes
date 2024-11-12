import { allJournals, userStats } from "../../api";

export const statLoader = async () => {
  const data = await userStats();
  return data?.data;
};

export const journalsLoader = async () => {
  const data = await allJournals();
  return data?.data;
};
