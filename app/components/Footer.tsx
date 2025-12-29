"use client";

import { useSearchParams } from "next/navigation";
import { translations } from "@/lib/translations";

export default function Footer() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "en";
    const t = translations[lang as keyof typeof translations];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full max-w-3xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
            {t.copyright.replace("2025", String(currentYear))}
        </footer>
    );
}
