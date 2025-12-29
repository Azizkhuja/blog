"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FaLinkedin } from "react-icons/fa";

const handleTelegramClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "click", {
      event_category: "Social Media",
      event_label: "Telegram Icon",
      value: "Telegram Click",
    });
  }
};

import { useSearchParams } from "next/navigation";
import { translations } from "@/lib/translations";

export default function Navbar() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const t = translations[lang as keyof typeof translations];

  return (
    <nav className="w-full relative flex items-center justify-between max-w-3xl mx-auto px-4 py-5">
      <Link href="/" className="hover:text-blue-500 font-medium">
        Azizkhuja's Blog
      </Link>
      <div className="flex justify-center items-center gap-4">
        <Link href={`/blog?lang=${lang}`} className="hover:text-blue-500 font-medium">
          {t.blog}
        </Link>
        <a href="https://t.me/devlogsbyazizkhuja" target="_blank" className="hover:text-blue-500 font-medium mr-2">
          {t.channel}
        </a>
        <Link href={`/resume?lang=${lang}`} className="hover:text-blue-500 font-medium mr-2">
          {t.resume}
        </Link>
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </nav>
  );
}
