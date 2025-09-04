'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

export default function NotaPDFButton({ transaksi }) {
  const handleDownload = async () => {
    const doc = new jsPDF();

    // Load logo sebagai Base64
    const imageUrl = '/images/logofanatis.png';
    const fetchImage = async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };
    const logoData = await fetchImage(imageUrl);

    // Warna Hijau Palet
    const primaryGreen = [34, 139, 34]; // Header & Tabel
    const secondaryGreen = [50, 168, 82]; // Total
    const grayText = 70;

    // Header Logo
    doc.addImage(logoData, 'PNG', 14, 10, 25, 25); // x, y, width, height

    // Header Text
    doc.setFontSize(18);
    doc.setTextColor(...primaryGreen);
    doc.setFont('helvetica', 'bold');
    doc.text("FANATIS FARM", 45, 20);

    doc.setFontSize(12);
    doc.setTextColor(grayText);
    doc.setFont('helvetica', 'normal');
    doc.text("Jl. Bebek Mojosari No.123, Telp: 0812-3456-7890", 45, 34);

    // Garis pemisah
    doc.setDrawColor(...primaryGreen);
    doc.setLineWidth(0.8);
    doc.line(14, 38, 196, 38);

    // Info transaksi
    doc.setFontSize(10);
    doc.setTextColor(grayText);
    doc.text(`Nota No: ${transaksi.id}`, 14, 45);
    doc.text(`Tanggal: ${transaksi.tanggal}`, 150, 45, { align: 'right' });
    doc.text(`Kepada Yth: ${transaksi.pelanggan}`, 14, 51);

    // Tabel Transaksi
    autoTable(doc, {
      startY: 60,
      head: [['Banyaknya', 'Nama Barang', 'Harga', 'Jumlah']],
      body: [
        [
          transaksi.jumlah,
          transaksi.jenis,
          `Rp${transaksi.harga_satuan.toLocaleString()}`,
          `Rp${transaksi.total.toLocaleString()}`
        ]
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: primaryGreen, textColor: 255 },
      alternateRowStyles: { fillColor: [240, 255, 240] }, // hijau muda
    });

    // Total
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.setTextColor(...secondaryGreen);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL: Rp${transaksi.total.toLocaleString()}`, 14, finalY + 12);

    // Catatan
    doc.setFontSize(9);
    doc.setTextColor(grayText);
    doc.setFont('helvetica', 'italic');
    doc.text("Barang yang sudah dibeli tidak dapat ditukar/dikembalikan", 14, finalY + 22);

    // Tanda tangan
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Tanda Terima,", 14, finalY + 40);
    doc.text("Hormat Kami,", 150, finalY + 40, { align: 'right' });

    doc.save(`nota-transaksi-${transaksi.id}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="text-green-700 hover:text-green-900 text-sm flex items-center gap-1"
      title="Unduh Nota PDF"
    >
      <FaFilePdf /> Nota
    </button>
  );
}
