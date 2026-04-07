import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { supabase } from '../supabaseClient';

export async function exportSKFundReport() {
  // 1. Fetch data from Supabase
  const { data: utilizations, error } = await supabase
    .from('fund_utilization')
    .select(`
      *,
      fund_expenses (
        category,
        amount
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching fund utilization:', error.message);
    alert('Failed to fetch data from database.');
    return;
  }

  if (!utilizations || utilizations.length === 0) {
    alert('No fund utilization records found.');
    return;
  }

  // Use the first record (or you can modify later to export all)
  const record = utilizations[0];

  const dataForExport = {
    year: record.year,
    province: record.province,
    city: record.city,
    barangay: record.barangay,
    totalSKFunds: record.total_sk_funds || 0,
    expenses: record.fund_expenses.map(exp => ({
      category: exp.category,
      amount: exp.amount || 0
    }))
  };

  // 2. Generate Excel using your existing logic
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('SK Fund Utilization');

  const expenses = dataForExport.expenses;
  const EXP_START = 7;
  const N = expenses.length;
  const TOTAL_C = EXP_START + N;
  const UNUT_C = TOTAL_C + 1;
  const LAST_C = UNUT_C;

  const thin = { style: 'thin' };
  const allBorders = { top: thin, left: thin, bottom: thin, right: thin };
  const php = '₱#,##0.00;(₱#,##0.00);"-"';

  function C(row, col) { return ws.getCell(row, col); }

  function set(row, col, value, opts = {}) {
    const c = C(row, col);
    c.value = value;
    c.font = { 
      name: opts.fontName ?? 'Arial', 
      size: opts.size ?? 8, 
      bold: opts.bold ?? false,
      italic: opts.italic ?? false, 
      color: { argb: 'FF000000' } 
    };
    c.alignment = { 
      horizontal: opts.halign ?? 'center', 
      vertical: 'middle', 
      wrapText: true,
      textRotation: opts.rotate ?? 0 
    };
    if (opts.bg) c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + opts.bg } };
    if (opts.numFmt) c.numFmt = opts.numFmt;
    if (opts.border !== false) c.border = allBorders;
    return c;
  }

  // --- TITLE SECTION ---
  ws.mergeCells(1, 1, 1, LAST_C);
  set(1, 1, `REGIONAL CONSOLIDATED REPORT ON THE UTILIZATION OF SK FUNDS FOR FY ${dataForExport.year}`, { 
    bold: true, size: 12, border: false, fontName: 'Cambria' 
  });

  // Subtitle with current date
  ws.mergeCells(2, 1, 2, LAST_C);
  set(2, 1, `(as of ${new Date().toLocaleDateString('en-US', { 
      month: 'long', day: 'numeric', year: 'numeric' 
  })})`, { size: 11, border: false, fontName: 'Calibri' });

  ws.mergeCells(3, 1, 3, LAST_C);
  set(3, 1, '(Pursuant to RA 10952 and its IRR, RA 10742, Advisory dated 6 September 2018, DILG-DBM-NYC JMC No.1, Series of 2019)', { 
    size: 8, italic: true, border: false, fontName: 'Calibri' 
  });

  // --- BANNERS ---
  ws.mergeCells(5, 1, 5, 5);
  set(5, 1, `RO-VIII UTILIZATION OF FY ${dataForExport.year} SK FUNDS`, { 
    bold: true, size: 14, bg: 'FFFF00', fontName: 'Calibri' 
  });

  ws.mergeCells(5, EXP_START + 3, 5, EXP_START + 5);
  set(5, EXP_START + 3, 'REGION 8', { bold: true, size: 12, bg: '92D050', fontName: 'Calibri' });

  ws.mergeCells(6, 7, 6, UNUT_C);
  set(6, 7, 'TOTAL AMOUNT UTILIZED/SPENT ON YOUTH DEVELOPMENT AND EMPOWERMENT PROGRAMS AND PROJECTS', { 
    bold: true, size: 16, bg: 'FFFF00', fontName: 'Calibri' 
  });

  // --- COLUMN HEADERS (Rows 6-8) ---
  const leftHdrs = [
    { text: 'REGION', width: 10 },
    { text: 'PROVINCE', width: 10 },
    { text: 'CITY/\nMUNICIPALITY', width: 12 },
    { text: 'BARANGAY', width: 12 },
    { text: `SKs That Utilized\nThe FY ${dataForExport.year} SK Funds\n[put '1' if 'YES']`, width: 15 }
  ];

  leftHdrs.forEach((h, i) => {
    ws.mergeCells(6, i + 1, 8, i + 1);
    set(6, i + 1, h.text, { bold: true, size: 8 });
    ws.getColumn(i + 1).width = h.width;
  });

  // Total Amount Header (NO yellow background)
  ws.mergeCells(6, 6, 8, 6);
  set(6, 6, `Total Amount of\nFY ${dataForExport.year} SK Funds`, { 
    bold: true, size: 10, fontName: 'Calibri' 
  });
  ws.getColumn(6).width = 18;

  // Expense Headers
  const expHdrs = [
    'GAP - PS', 'GAP - MOOE and CO', 'GOVERNANCE', 'ACTIVE CITIZENSHIP',
    'ECONOMIC\nEMPOWERMENT\nAND GLOBAL\nMOBILITY', 'AGRICULTURE', 'ENVIRONMENT',
    'PEACE-BUILDING\nAND SECURITY', 'SOCIAL INCLUSION\nAND EQUITY',
    'HEALTH', 'SPORTS\nDEVELOPMENT', 'EDUCATION',
  ];

  expHdrs.forEach((h, i) => {
    const col = EXP_START + i;
    ws.mergeCells(7, col, 8, col);
    set(7, col, h, { bold: true, size: 8 });
    ws.getColumn(col).width = 15;
  });

  ws.mergeCells(7, TOTAL_C, 8, TOTAL_C);
  set(7, TOTAL_C, 'TOTAL', { bold: true, size: 9 });
  ws.getColumn(TOTAL_C).width = 15;

  ws.mergeCells(7, UNUT_C, 8, UNUT_C);
  set(7, UNUT_C, 'UNUTILIZED FUND', { bold: true, size: 9 });
  ws.getColumn(UNUT_C).width = 18;

  // --- DATA ROW ---
  const DR = 9;
  set(DR, 1, 'REGION VIII\n(EASTERN VISAYAS)', { size: 8 });
  set(DR, 2, dataForExport.province?.toUpperCase() || 'NORTHERN SAMAR', { size: 9 });
  set(DR, 3, `${dataForExport.city?.toUpperCase() || 'CATARMAN'}\n(Capital)`, { size: 9 });
  set(DR, 4, dataForExport.barangay?.toUpperCase() || 'OLD RIZAL', { size: 9 });
  set(DR, 5, 1, { size: 10 });
  set(DR, 6, dataForExport.totalSKFunds, { size: 10, numFmt: php });

  expenses.forEach((exp, i) => {
    set(DR, EXP_START + i, exp.amount ?? 0, { size: 9, numFmt: php });
  });

  // Formulas
  const startExpLet = ws.getColumn(EXP_START).letter;
  const endExpLet = ws.getColumn(EXP_START + N - 1).letter;
  const totalLet = ws.getColumn(TOTAL_C).letter;
  const fundLet = ws.getColumn(6).letter;

  const totalCell = C(DR, TOTAL_C);
  totalCell.value = { formula: `SUM(${startExpLet}${DR}:${endExpLet}${DR})` };
  totalCell.numFmt = php;
  totalCell.font = { name: 'Arial', bold: true, size: 10 };
  totalCell.alignment = { horizontal: 'center', vertical: 'middle' };
  totalCell.border = allBorders;

  const unutCell = C(DR, UNUT_C);
  unutCell.value = { formula: `${fundLet}${DR}-${totalLet}${DR}` };
  unutCell.numFmt = php;
  unutCell.font = { name: 'Arial', bold: true, size: 10, color: { argb: 'FF00B050' } };
  unutCell.alignment = { horizontal: 'center', vertical: 'middle' };
  unutCell.border = allBorders;

  // Heights
  ws.getRow(5).height = 30;
  ws.getRow(6).height = 50;
  ws.getRow(7).height = 65;
  ws.getRow(DR).height = 35;

  // Save file
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `SK_Fund_Utilization_${dataForExport.barangay || 'Report'}_FY${dataForExport.year}.xlsx`);
}