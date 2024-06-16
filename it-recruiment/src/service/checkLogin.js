import { get } from "../until/request";

export const checkLogin = async (email, password) => {
  const respone = await get(`/companies?email=${email}&password=${password}`);
  if (respone.length > 0) {
    return true;
  } else {
    return false;
  }
};
