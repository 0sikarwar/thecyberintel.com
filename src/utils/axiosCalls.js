import {
  saveContactUrl,
  getContactQueriesUrl,
  testUrl,
  saveNewPartyDataUrl,
  getCompanyNamesUrl,
  saveDocketDataUrl,
  getDocketsUrl,
  getDataForInvoiceUrl,
  getDataToUpadateUrl,
  updateDocketDataUrl,
  updateRateListUrl,
  getInvoiceNumUrl,
  registerUserUrl,
  signinUserUrl,
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

export const getDataForInvoice = async (data, isInvoiceNumber) => {
  return await axios.get(getDataForInvoiceUrl, { params: { ...data, isInvoiceNumber } });
};

export const getDataToUpadate = async (data) => {
  return await axios.get(getDataToUpadateUrl, { params: data });
};

export const saveDocketData = async (data) => {
  return await axios.post(saveDocketDataUrl, data);
};
export const updateDocketData = async (data) => {
  return await axios.post(updateDocketDataUrl, data);
};
export const updateRateList = async (data) => {
  return await axios.post(updateRateListUrl, data);
};

export const getInvoiceNum = async (data) => {
  return await axios.get(getInvoiceNumUrl, { params: data });
};
export const registerUser = async (data) => {
  return await axios.post(registerUserUrl, data);
};
export const signinUser = async (data) => {
  return await axios.post(signinUserUrl, data);
};
