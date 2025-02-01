const apiURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/"
    : "http://localhost:5000/api/v1/";
export const appConfig = {
  apiURL: apiURL,
};
