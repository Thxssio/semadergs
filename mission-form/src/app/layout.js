import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SEMADERGS",
  description: "Censo da Assembleia de Deus no Rio Grande do Sul",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Head>
        {/* Configurando o favicon usando logo.png */}
        <link rel="icon" href="/logo.png" />
        <title>SEMADERGS</title>
        <meta name="description" content="Censo da Assembleia de Deus no Rio Grande do Sul" />
      </Head>
      <body>{children}</body>
    </html>
  );
}