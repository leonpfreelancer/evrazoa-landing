import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/cyrillic-500.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/cyrillic-500-italic.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/jost/cyrillic-400.css";
import "@fontsource/jost/latin-400.css";
import "@fontsource/jost/cyrillic-500.css";
import "@fontsource/jost/latin-500.css";
import "@fontsource/jost/cyrillic-600.css";
import "@fontsource/jost/latin-600.css";
import "./globals.css";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — трансфер по Стамбулу и всей Турции`,
  description:
    "Трансфер из аэропортов IST и SAW, автомобиль с водителем, туры по Турции. Mercedes-Benz VIP, поддержка на русском 24/7.",
  openGraph: {
    title: `${site.name} — трансфер по Стамбулу`,
    description: "Встреча в аэропорту с табличкой, Mercedes VIP, поддержка на русском 24/7.",
    images: ["/img/hero-van.jpg"],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0f1a2b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
