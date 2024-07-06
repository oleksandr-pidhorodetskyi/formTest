import axios from "axios";

export const NinjasInstance = axios.create({
  baseURL: "https://api.api-ninjas.com",
  headers: {
    "X-Api-Key": "8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx",
  },
});
export const LetsworkoutInstance = axios.create({
  baseURL: "http://letsworkout.pl",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});
