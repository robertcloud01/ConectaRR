import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConectaRR | Oportunidades profissionais em Roraima",
  description: "Uma plataforma em construção para aproximar pessoas e oportunidades profissionais em Roraima.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
