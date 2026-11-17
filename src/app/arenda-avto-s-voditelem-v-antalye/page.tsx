import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { cityPages } from "@/config/cities";

const city = cityPages[0];

export const metadata: Metadata = {
  title: city.title,
  description: city.description,
  alternates: { canonical: `/${city.slug}/` },
  openGraph: { title: city.title, description: city.description, images: ["/img/hero-van.jpg"], locale: "ru_RU", type: "website" },
};

export default function Page() {
  return <Landing city={city} />;
}
