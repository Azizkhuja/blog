"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";

export function LanguageSwitcher() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentLang = searchParams.get("lang") || "en";

    const handleLanguageChange = (lang: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("lang", lang);
        router.push(`?${newSearchParams.toString()}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2">
                    <span className="text-xl">{currentLang === "uz" ? "🇺🇿" : "🇺🇸"}</span>
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                    🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("uz")}>
                    🇺🇿 Uzbek
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
