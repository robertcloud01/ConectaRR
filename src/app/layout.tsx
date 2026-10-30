import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://conectarr.vercel.app"),
  title: {
    default: "ConectaRR — Talento do Norte. Futuro em movimento.",
    template: "%s | ConectaRR",
  },
  description: "Encontre oportunidades profissionais por área, município e modalidade em Roraima. Um projeto feito para aproximar talentos e organizações.",
  applicationName: "ConectaRR",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ConectaRR",
    title: "ConectaRR — Talento do Norte. Futuro em movimento.",
    description: "Um lugar para descobrir caminhos profissionais e encontrar oportunidades em Roraima.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConectaRR — Talento do Norte. Futuro em movimento.",
    description: "Um lugar para descobrir caminhos profissionais e encontrar oportunidades em Roraima.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e7",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
