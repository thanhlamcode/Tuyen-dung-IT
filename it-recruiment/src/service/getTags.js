import { get } from "../until/request";

export const getTags = async () => {
  const result = await get("/tags");
  return result;
};
