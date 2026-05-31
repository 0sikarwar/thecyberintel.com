import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { convertNumberToWords } from "./index";
import { INVOICE_STRINGS, INVOICE_TABLE_HEADERS } from "./invoiceConstants";
import letterHead from "../assets/letterHead.png";
import logo from "../assets/CiLogo.png";

const getBase64Image = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]); // remove data:image/png;base64,
    reader.readAsDataURL(blob);
  });
};

export const exportInvoiceToExcel = async (props) => {
  const {
    companyData,
    gstDetails,
    total,
    invoiceNumber,
    invoiceDate,
    sgst,
    cgst,
    igst,
    totalWithTax,
    totalAmount,
    invoiceFuelCharge,
    fuelCharge,
    dueDate,
    fromDate,
    toDate,
    invoiceData,
  } = props;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Invoice");

  // Set column widths to roughly match the 21cm width
  worksheet.columns = [
    { width: 15 }, // A
    { width: 15 }, // B
    { width: 18 }, // C
    { width: 15 }, // D
    { width: 15 }, // E
    { width: 15 }, // F
    { width: 15 }, // G
    { width: 20 }, // H
  ];

  // --- Front Page ---
  // Merge 1A to 6H for letterhead
  worksheet.mergeCells("A1:H6");
  try {
    const lhBase64 = await getBase64Image(letterHead);
    const lhImageId = workbook.addImage({
      base64: lhBase64,
      extension: "png",
    });
    worksheet.addImage(lhImageId, {
      tl: { col: 0.5, row: 0.5 },
      ext: { width: 700, height: 100 },
    });
  } catch (e) {
    console.error("Error adding letterhead to Excel", e);
  }

  // Content starts after merged letterhead
  let currentRow = 7;

  // TAX INVOICE Header
  worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
  const taxInvoiceCell = worksheet.getCell(`A${currentRow}`);
  taxInvoiceCell.value = "TAX INVOICE";
  taxInvoiceCell.alignment = { vertical: "middle", horizontal: "center" };
  taxInvoiceCell.font = { bold: true, size: 14 };
  taxInvoiceCell.border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };
  currentRow++;

  // TO Section and Invoice Details
  worksheet.mergeCells(`A${currentRow}:D${currentRow + 14}`);
  const toCell = worksheet.getCell(`A${currentRow}`);
  toCell.value = {
    richText: [
      { font: { bold: true }, text: "TO\n" },
      { text: `${companyData.company_name}\n${companyData.company_address}\n\n` },
      { text: `State Code: ${gstDetails.stateCode}\n` },
      { text: `GSTIN/Unique ID: ${companyData.company_gst}\n` },
      { text: `Place of supply: ${gstDetails.stateName} & ${gstDetails.stateCode}` },
    ],
  };
  toCell.alignment = { vertical: "top", horizontal: "left", wrapText: true };
  toCell.border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  // Invoice Period
  worksheet.mergeCells(`E${currentRow}:G${currentRow}`);
  worksheet.getCell(`E${currentRow}`).value = "Invoice Period";
  worksheet.getCell(`E${currentRow}`).border = {
    top: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
  };
  worksheet.getCell(`H${currentRow}`).value = `${fromDate} to ${toDate}`;
  worksheet.getCell(`H${currentRow}`).alignment = { horizontal: "right", wrapText: true };
  worksheet.getCell(`H${currentRow}`).border = {
    top: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
  };
  currentRow++;

  const billBreakup = [
    { key: "Invoice No", value: invoiceNumber },
    { key: "Invoice Date", value: invoiceDate },
    { key: "Invoice Amount", value: total },
    { key: `Fuel Surcharge @ ${invoiceFuelCharge}%`, value: fuelCharge ? "₹ " + fuelCharge : "" },
    { key: "Insurance", value: "0.00" },
    { key: "Additional Surcharges", value: "0.00" },
    { key: "Taxable Value", value: "₹ " + totalAmount },
    { key: `SGST @ ${gstDetails.SGST}%`, value: sgst ? "₹ " + sgst : "" },
    { key: `CGST @ ${gstDetails.CGST}%`, value: cgst ? "₹ " + cgst : "" },
    { key: `IGST @ ${gstDetails.IGST}%`, value: igst ? "₹ " + igst : "" },
    { key: "", value: "" },
    { key: "Total Invoice Value (INR)", value: "₹ " + totalWithTax, bold: true },
    { key: "SAC No", value: 996812 },
    { key: "Description of Services", value: "Courier Services" },
  ];

  billBreakup.forEach((item) => {
    worksheet.mergeCells(`E${currentRow}:G${currentRow}`);
    const keyCell = worksheet.getCell(`E${currentRow}`);
    keyCell.value = item.key;
    keyCell.border = { top: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } };
    if (item.bold) keyCell.font = { bold: true };

    const valCell = worksheet.getCell(`H${currentRow}`);
    valCell.value = item.value;
    valCell.alignment = { horizontal: "right" };
    valCell.border = { top: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } };
    if (item.bold) valCell.font = { bold: true };
    currentRow++;
  });

  // Amount in Words
  worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
  worksheet.getCell(`A${currentRow}`).value = `Amount in Words (Rounded Off): ${convertNumberToWords(
    totalWithTax,
  )} Rupees only`;
  worksheet.getCell(`A${currentRow}`).font = { size: 11 };
  worksheet.getCell(`A${currentRow}`).border = {
    bottom: { style: "thin" },
    top: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };
  currentRow++;

  // Guidelines and Bank details
  const guidelinesRowStart = currentRow;
  const guidelinesRowEnd = currentRow + 12;
  worksheet.mergeCells(`A${currentRow}:E${guidelinesRowEnd}`);
  const guidelinesCell = worksheet.getCell(`A${currentRow}`);
  guidelinesCell.value = {
    richText: [
      { font: { bold: true }, text: "Statutory Guidelines\n" },
      { text: INVOICE_STRINGS.statutoryGuidelines[0] + "\n" },
      { text: INVOICE_STRINGS.statutoryGuidelines[1] + "\n" },
      { font: { bold: true }, text: INVOICE_STRINGS.statutoryGuidelines[2] + dueDate + "\n" },
      { text: INVOICE_STRINGS.statutoryGuidelines[3] + "\n\n" },
      { font: { bold: true }, text: "General Guidelines\n" },
      ...INVOICE_STRINGS.generalGuidelines.map((text) => ({ text: text + "\n" })),
    ],
  };
  guidelinesCell.alignment = { vertical: "top", wrapText: true };

  worksheet.mergeCells(`F${currentRow}:H${guidelinesRowEnd}`);
  const bankCell = worksheet.getCell(`F${currentRow}`);
  bankCell.value = `Beneficiary Name: ${INVOICE_STRINGS.bankDetails.beneficiaryName}\nBank Name: ${INVOICE_STRINGS.bankDetails.bankName}\nA/c No.: ${INVOICE_STRINGS.bankDetails.accountNo}\nType: ${INVOICE_STRINGS.bankDetails.accountType}\nIFSC: ${INVOICE_STRINGS.bankDetails.ifsc}`;
  bankCell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };

  for (let r = guidelinesRowStart; r <= guidelinesRowEnd; r++) {
    for (let c = 1; c <= 8; c++) {
      const cell = worksheet.getCell(r, c);
      cell.border = {
        top: r === guidelinesRowStart ? { style: "thin" } : cell.border ? cell.border.top : undefined,
        bottom: r === guidelinesRowEnd ? { style: "thin" } : cell.border ? cell.border.bottom : undefined,
        left: c === 1 || c === 6 ? { style: "thin" } : cell.border ? cell.border.left : undefined,
        right: c === 5 || c === 8 ? { style: "thin" } : cell.border ? cell.border.right : undefined,
      };
      if (c === 3) {
        if (r === guidelinesRowStart) cell.border.top = { style: "thin" };
        if (r === guidelinesRowEnd) cell.border.bottom = { style: "thin" };
      }
      if (c === 8) {
        cell.border.right = { style: "thin" };
        if (r === guidelinesRowStart) cell.border.top = { style: "thin" };
        if (r === guidelinesRowEnd) cell.border.bottom = { style: "thin" };
      }
    }
    worksheet.getRow(r).height = 20;
  }

  // --- Start Fixed Row Logic ---
  currentRow = 64;

  // --- Bill Slip Page (Payment Advice) ---
  worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
  const paHeader = worksheet.getCell(`A${currentRow}`);
  paHeader.value = INVOICE_STRINGS.paymentAdviceHeader;
  paHeader.alignment = { horizontal: "center" };
  paHeader.font = { bold: true };
  paHeader.border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };
  currentRow++; // 65

  worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
  worksheet.getCell(`A${currentRow}`).value = `Invoice No.: ${invoiceNumber}`;
  worksheet.getCell(`A${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
  };

  worksheet.mergeCells(`C${currentRow}:E${currentRow}`);
  worksheet.getCell(`C${currentRow}`).value = `Date: ${invoiceDate}`;
  worksheet.getCell(`C${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
  };

  worksheet.mergeCells(`F${currentRow}:H${currentRow}`);
  worksheet.getCell(`F${currentRow}`).value = `Client Code: ${companyData.id}`;
  worksheet.getCell(`F${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
  };
  currentRow++; // 66

  worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
  worksheet.getCell(`A${currentRow}`).value = INVOICE_STRINGS.channelPartnerText;
  worksheet.getCell(`A${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
  };

  worksheet.mergeCells(`E${currentRow}:H${currentRow}`);
  worksheet.getCell(`E${currentRow}`).value = companyData.company_name;
  worksheet.getCell(`E${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
  };
  currentRow++; // 67

  // Headers for Payment Advice
  const paHeaders = INVOICE_TABLE_HEADERS.paymentAdvice;
  worksheet.getCell(`A${currentRow}`).value = paHeaders[0];
  worksheet.getCell(`A${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells(`B${currentRow}:C${currentRow}`);
  worksheet.getCell(`B${currentRow}`).value = paHeaders[1];
  worksheet.getCell(`B${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`D${currentRow}`).value = paHeaders[2];
  worksheet.getCell(`D${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`E${currentRow}`).value = paHeaders[3];
  worksheet.getCell(`E${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`F${currentRow}`).value = paHeaders[4];
  worksheet.getCell(`F${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells(`G${currentRow}:H${currentRow}`);
  worksheet.getCell(`G${currentRow}`).value = paHeaders[5];
  worksheet.getCell(`G${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
  };
  currentRow++; // 68

  worksheet.getCell(`A${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  worksheet.mergeCells(`B${currentRow}:C${currentRow}`);
  worksheet.getCell(`B${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  worksheet.getCell(`D${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  worksheet.getCell(`E${currentRow}`).value = "₹ " + totalWithTax;
  worksheet.getCell(`E${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  worksheet.getCell(`F${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  worksheet.mergeCells(`G${currentRow}:H${currentRow}`);
  worksheet.getCell(`G${currentRow}`).value = "₹ " + totalWithTax;
  worksheet.getCell(`G${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  currentRow++; // 69

  worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
  worksheet.getCell(`A${currentRow}`).value =
    `Amount in Words (Rounded Off): ${convertNumberToWords(totalWithTax)} Rupees only`;
  worksheet.getCell(`A${currentRow}`).border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  currentRow = 77;

  // --- Bill Acknowledgement ---
  worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
  const baHeader = worksheet.getCell(`A${currentRow}`);
  baHeader.value = INVOICE_STRINGS.billAcknowledgementHeader;
  baHeader.alignment = { horizontal: "center" };
  baHeader.font = { bold: true };
  baHeader.border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };
  currentRow++; // 78

  worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
  worksheet.getCell(`A${currentRow}`).value = `Client Code: ${companyData.id}`;
  worksheet.getCell(`A${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    top: { style: "thin" },
    right: { style: "thin" },
  };

  // Split C-F into C-D and E-F, no borders
  worksheet.mergeCells(`C${currentRow}:D${currentRow}`);
  worksheet.getCell(`C${currentRow}`).value = `Invoice No: ${invoiceNumber}\nNet Amount: ₹ ${totalWithTax}`;
  worksheet.getCell(`C${currentRow}`).alignment = { wrapText: true };
  worksheet.getCell(`C${currentRow}`).border = {};

  worksheet.mergeCells(`E${currentRow}:F${currentRow}`);
  worksheet.getCell(`E${currentRow}`).value = `Invoice Date: ${invoiceDate}`;
  worksheet.getCell(`E${currentRow}`).alignment = { vertical: "top", wrapText: true };
  worksheet.getCell(`E${currentRow}`).border = {};

  worksheet.mergeCells(`G${currentRow}:H${currentRow}`);
  worksheet.getCell(`G${currentRow}`).value = `Due Date: ${dueDate}`;
  worksheet.getCell(`G${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
  };
  currentRow++; // 79

  worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
  worksheet.getCell(`A${currentRow}`).value = `Client Name: ${companyData.company_name}`;
  worksheet.getCell(`A${currentRow}`).border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
  };

  currentRow = 123;

  // --- Summary Section ---
  worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
  worksheet.getCell(`A${currentRow}`).value = INVOICE_STRINGS.summaryHeader;
  worksheet.getCell(`A${currentRow}`).alignment = { horizontal: "center" };
  worksheet.getCell(`A${currentRow}`).font = { bold: true };
  currentRow++;

  const summaryHeaders = INVOICE_TABLE_HEADERS.summary;
  const colMappings = [1, 2, 3, 4, 6, 7, 8];
  summaryHeaders.forEach((h, idx) => {
    const col = colMappings[idx];
    const cell = worksheet.getCell(currentRow, col);
    cell.value = h;
    cell.font = { bold: true };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE0E0E0" } };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
    if (h === "Destination") {
      worksheet.mergeCells(currentRow, col, currentRow, col + 1);
      const nextCell = worksheet.getCell(currentRow, col + 1);
      nextCell.border = cell.border;
    }
  });
  currentRow++;

  invoiceData.docketList.forEach((docket, index) => {
    worksheet.getCell(`A${currentRow}`).value = index + 1;
    worksheet.getCell(`B${currentRow}`).value = docket.docket_num;
    worksheet.getCell(`C${currentRow}`).value = docket.docket_date;
    worksheet.mergeCells(`D${currentRow}:E${currentRow}`);
    worksheet.getCell(`D${currentRow}`).value = docket.destination;
    worksheet.getCell(`F${currentRow}`).value = docket.docket_mode;
    worksheet.getCell(`G${currentRow}`).value = docket.weight;
    worksheet.getCell(`H${currentRow}`).value = docket.amount;
    for (let i = 1; i <= 8; i++) {
      worksheet.getCell(currentRow, i).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    }
    currentRow++;
  });

  worksheet.mergeCells(`F${currentRow}:G${currentRow}`);
  worksheet.getCell(`F${currentRow}`).value = "Total Taxable amount:";
  worksheet.getCell(`F${currentRow}`).font = { bold: true };
  worksheet.getCell(`H${currentRow}`).value = total;
  worksheet.getCell(`H${currentRow}`).font = { bold: true };
  worksheet.getCell(`H${currentRow}`).border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${companyData.company_name}_${invoiceNumber}.xlsx`);
};
