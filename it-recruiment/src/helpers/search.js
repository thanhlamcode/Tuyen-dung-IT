import { getJobs } from "../service/getJobs";

export const searchFuntion = async (inputSearch) => {
  console.log(inputSearch);
  const response = await getJobs();
  console.log(response);

  //   const filter1 = [];

  //   response.forEach((element) => {
  //     element.city.forEach((item) => {
  //       if (item === inputSearch.city) {
  //         filter1.push(element);
  //       }
  //     });
  //   });

  //   const filter2 = [];

  //   filter1.forEach((element) => {
  //     element.tags.forEach((item) => {
  //       inputSearch.language.forEach((language) => {
  //         if (item === language) {
  //           filter2.push(element);
  //         }
  //       });
  //     });
  //   });

  const filter1 = response.filter((element) =>
    element.city.includes(inputSearch.city)
  );

  const filter2 = filter1.filter((element) =>
    element.tags.some((tag) => inputSearch.language.includes(tag))
  );

  console.log(filter1);
  console.log(filter2);
};
