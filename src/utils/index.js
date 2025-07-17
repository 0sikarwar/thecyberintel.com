import { gstStateCodes } from "./data";
let MESSAGES = {};
export const setMsgJson = async (setIsLoading) => {
  const fetchOptions = {
    cache: "no-cache",
  };
  MESSAGES = await fetch(`${window.FILE_PATH}/msg.json`, fetchOptions).then((resp) => resp.json());
  setIsLoading(false);
};
export const getMsgJson = () => ({ ...MESSAGES });

export const checkMobileDevice = () => {
  let returnFlag = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent)) {
    returnFlag = true;
  }
  return returnFlag;
};

export const isValidMobileNumber = (number) => /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(number.toString());
export const isValidDate = (str) =>
  /^([0-2][0-9]|(3)[0-1]|[0-9])(\/)(((0)[0-9])|((1)[0-2])|[0-9])(\/)((\d{4})|(\d{2}))$/.test(str);
export const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const handlePrint = () => {
  document.body.classList.add("printing");
  window.print();
};

export const getCompanyDetails = (id, list) => {
  const details = list.filter((obj) => obj.id === Number(id))[0];
  return details || {};
};

export const getGstDetails = (gstin) => {
  const stateCode = gstin.slice(0, 2) || "06";
  const stateName = gstStateCodes[stateCode];
  let gstVal = { SGST: 0, CGST: 0, IGST: 0 };
  if (stateCode === "06") {
    gstVal.CGST = 9;
    gstVal.SGST = 9;
  } else {
    gstVal.IGST = 18;
  }
  return { stateCode, stateName, ...gstVal };
};

export const convertNumberToWords = (amount) => {
  let words = new Array();
  words[0] = "";
  words[1] = "One";
  words[2] = "Two";
  words[3] = "Three";
  words[4] = "Four";
  words[5] = "Five";
  words[6] = "Six";
  words[7] = "Seven";
  words[8] = "Eight";
  words[9] = "Nine";
  words[10] = "Ten";
  words[11] = "Eleven";
  words[12] = "Twelve";
  words[13] = "Thirteen";
  words[14] = "Fourteen";
  words[15] = "Fifteen";
  words[16] = "Sixteen";
  words[17] = "Seventeen";
  words[18] = "Eighteen";
  words[19] = "Nineteen";
  words[20] = "Twenty";
  words[30] = "Thirty";
  words[40] = "Forty";
  words[50] = "Fifty";
  words[60] = "Sixty";
  words[70] = "Seventy";
  words[80] = "Eighty";
  words[90] = "Ninety";
  amount = amount.toString();
  let atemp = amount.split(".");
  let number = atemp[0].split(",").join("");
  let n_length = number.length;
  let words_string = "";
  if (n_length <= 9) {
    let n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    let received_n_array = new Array();
    for (let i = 0; i < n_length; i++) {
      received_n_array[i] = number.substr(i, 1);
    }
    for (let i = 9 - n_length, j = 0; i < 9; i++, j++) {
      n_array[i] = received_n_array[j];
    }
    for (let i = 0, j = 1; i < 9; i++, j++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        if (n_array[i] == 1) {
          n_array[j] = 10 + parseInt(n_array[j]);
          n_array[i] = 0;
        }
      }
    }
    let value = "";
    for (let i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        value = n_array[i] * 10;
      } else {
        value = n_array[i];
      }
      if (value != 0) {
        words_string += words[value] + " ";
      }
      if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Crores ";
      }
      if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Lakhs ";
      }
      if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Thousand ";
      }
      if (i == 6 && value != 0) {
        words_string += "Hundred ";
      }
    }
    words_string = words_string.split("  ").join(" ");
  }
  return words_string;
};
