import { saveContact } from "./apiName";
import axios from "./axios";

export const saveContactData = async (data) => {
  return await axios.post(saveContact, data);
};
