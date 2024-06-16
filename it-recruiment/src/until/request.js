const API_DOMAIN = "http://localhost:3002";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const results = await response.json();
  return results;
};

export const post = async (path, data) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
