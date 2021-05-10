export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "https://data.thecyberintel.com/tciserver"
    : "https://data.thecyberintel.com/tciserver";

export const saveContactUrl = `${baseUrl}/savecontact`;
export const getContactQueriesUrl = `${baseUrl}/getcontactqueries`;
export const testUrl = `${baseUrl}/testdata`;
export const saveNewPartyDataUrl = `${baseUrl}/savenewpartydata`;
export const getCompanyNamesUrl = `${baseUrl}/getcompanynames`;
export const saveDocketDataUrl = `${baseUrl}/savedocketdata`;
export const getDocketsUrl = `${baseUrl}/getdockets`;
export const getDataForInvoiceUrl = `${baseUrl}/getdataforinvoice`;
export const getDataToUpadateUrl = `${baseUrl}/getdatatoupadate`;
export const updateDocketDataUrl = `${baseUrl}/updatedocketdata`;
export const updateRateListUrl = `${baseUrl}/updateratelist`;
export const getInvoiceNumUrl = `${baseUrl}/getinvoicenum`;
