const apiURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/"
    : "https://api.sudandigitalarchive.com/api/v1/";

const appURLFrontend =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173/"
    : "https://sudandigitalarchive.com/";
export const appConfig = {
  apiURL: apiURL,
  appURLFrontend: appURLFrontend,
};
