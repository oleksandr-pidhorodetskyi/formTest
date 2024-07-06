import { NinjasInstance } from "./config";

export const NinjasApi = {
  getHolidays: async () => {
    return await NinjasInstance.get("/v1/holidays?country=PL&year=2024");
  },
};
