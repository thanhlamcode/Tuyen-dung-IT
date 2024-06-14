import { get } from "../until/request";

export const getJobs = async () => {
  const result = await get("/jobs");
  return result;
};
