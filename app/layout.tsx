import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vertral Tasks — Make space for what matters",
  description: "A calm, focused personal task manager."
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
