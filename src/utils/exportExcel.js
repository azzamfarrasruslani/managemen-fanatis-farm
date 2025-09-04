// utils/exportExcel.js
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportTelurToExcel(data = []) {
  if (!Array.isArray(data) || data.length === 0) {
    alert("❌ Data kosong atau tidak valid untuk diekspor ke Excel.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Telur");

  worksheet.columns = [
    { header: "Tanggal", key: "tanggal", width: 15 },
    { header: "Kandang", key: "kandang", width: 12 },
    { header: "Jumlah (Butir)", key: "jumlah", width: 18 },
    { header: "Kualitas", key: "kualitas", width: 15 },
  ];

  data.forEach((item) => {
    worksheet.addRow({
      tanggal: item.tanggal,
      kandang: item.kandang,
      jumlah: item.jumlah,
      kualitas: item.kualitas,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "laporan-telur.xlsx");
}
