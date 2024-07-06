import { LetsworkoutInstance } from "./config";
import { FormType } from "../types/App.types";

export const LetsworkoutApi = {
  submitForm: async (body: FormType) => {
    return await LetsworkoutInstance.post("/submit", body);
  },
};
