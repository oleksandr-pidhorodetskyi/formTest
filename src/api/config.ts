import axios from "axios";

export const NinjasInstance = axios.create({
  baseURL: process.env.REACT_APP_NINJAS_API,
  headers: {
    "X-Api-Key": "8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx",
  },
});
export const LetsworkoutInstance = axios.create({
  baseURL: process.env.REACT_APP_LETS_WORKOUT,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});
