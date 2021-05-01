export const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://data.thecyberintel.com/tciserver";

export const saveContactUrl = `${baseUrl}/savecontact`;
export const getContactQueriesUrl = `${baseUrl}/getcontactqueries`;
export const testUrl = `${baseUrl}/testdata`;
export const saveNewPartyDataUrl = `${baseUrl}/savenewpartydata`;
export const getCompanyNamesUrl = `${baseUrl}/getcompanynames`;
export const saveDocketDataUrl = `${baseUrl}/savedocketdata`;
export const getDocketsUrl = `${baseUrl}/getdockets`;
export const getDataForInvoiceUrl = `${baseUrl}/getdataforinvoice`;
