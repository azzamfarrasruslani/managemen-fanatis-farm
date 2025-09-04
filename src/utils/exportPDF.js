// utils/exportPDF.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportTelurToPDF(data = []) {
  if (!Array.isArray(data) || data.length === 0) {
    alert("❌ Data kosong atau tidak valid untuk diekspor ke PDF.");
    return;
  }

  const doc = new jsPDF();
  doc.text("Laporan Produksi Telur", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Tanggal", "Kandang", "Jumlah", "Kualitas"]],
    body: data.map((item) => [
      item.tanggal,
      item.kandang,
      `${item.jumlah} Butir`,
      item.kualitas,
    ]),
  });

  doc.save("laporan-telur.pdf");
}
