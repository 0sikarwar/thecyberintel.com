export const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://data.thecyberintel.com/tciserver";

export const saveContactUrl = `${baseUrl}/savecontact`;
export const getContactQueriesUrl = `${baseUrl}/getcontactqueries`;
