import {
  saveContactUrl,
  getContactQueriesUrl,
  testUrl,
  saveNewPartyDataUrl,
  getCompanyNamesUrl,
  saveDocketDataUrl,
  getDocketsUrl,
  getDataForInvoiceUrl,
} from "./apiName";
import axios from "./axios";

export const saveContactData = async (data) => {
  return await axios.post(saveContactUrl, data);
};
export const getContactQueries = async () => {
  return await axios.get(getContactQueriesUrl);
};

export const getDockets = async () => {
  return await axios.get(getDocketsUrl);
};

export const getTestData = () => {
  return axios.get(testUrl);
};

export const saveNewPartyData = async (data) => {
  return await axios.post(saveNewPartyDataUrl, data);
};

export const getCompanyNames = async () => {
  return await axios.get(getCompanyNamesUrl);
};

export const getDataForInvoice = async (data) => {
  return await axios.get(getDataForInvoiceUrl, { params: data });
};

export const saveDocketData = async (data) => {
  return await axios.post(saveDocketDataUrl, data);
};
