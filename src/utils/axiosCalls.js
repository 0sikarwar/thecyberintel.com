import { saveContactUrl, getContactQueriesUrl } from "./apiName";
import axios from "./axios";

export const saveContactData = async (data) => {
  return await axios.post(saveContactUrl, data);
};
export const getContactQueries = async (data) => {
  return await axios.get(getContactQueriesUrl);
};
