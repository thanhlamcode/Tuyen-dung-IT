import { getJobs } from "../service/getJobs";

export const searchFuntion = async (inputSearch) => {
  console.log(inputSearch);
  const response = await getJobs();
  console.log(response);

  const filter1 = response.filter((element) =>
    element.tags.some((tag) => inputSearch.language.includes(tag))
  );
  const filter2 = filter1.filter((element) =>
    element.city.includes(inputSearch.city)
  );
  console.log(filter1);
  console.log(filter2);

  return filter2;
};

export const filterLanguage = async (inputSearch) => {
  const respone = await getJobs();
  const filter = respone.filter((element) =>
    element.tags.some((tag) => inputSearch.language.includes(tag))
  );
  console.log(filter);
  return filter;
};
