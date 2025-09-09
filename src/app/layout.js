// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // bisa tambah sesuai kebutuhan
  display: "swap",
});

export const metadata = {
  title: "Fanatis Farm",
  description: "Dashboard Peternakan Bebek Modern",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
