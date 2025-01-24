const apiURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/"
    : "prod";
export const appConfig = {
  apiURL: apiURL,
};
