import { Button } from "@/components/ui/button";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { FaTelegram, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function Home({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const lang = searchParams.lang || "en";
  const t = translations[lang as keyof typeof translations];
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-[85vh]">
      <div className="flex flex-1 flex-col justify-center items-start text-left">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
            <Image
              src="/me.jpg" // User to provide me.jpg in public folder
              alt="Azizkhuja Khujaev"
              fill
              className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-800"
            />
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Azizkhuja Khujaev</h1>
            <h2 className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-4">
              {t.androidEngineer}
            </h2>

            <div className="flex space-x-6">
              <a
                href="https://github.com/Azizkhuja"
                target="_blank"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/azizkhujakhujaev/"
                target="_blank"
                className="hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://t.me/devlogsbyazizkhuja"
                target="_blank"
                className="hover:text-blue-500 transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram size={28} />
              </a>
            </div>
          </div>
        </div>

        <p className="text-lg md:text-xl max-w-2xl text-gray-700 dark:text-gray-300 mb-10 italic">
          {t.introText}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="text-lg px-8 py-6 text-white">
            <Link href={`/blog?lang=${lang}`}>{t.readMyBlog}</Link>
          </Button>
          <Button asChild variant="outline" className="text-lg px-8 py-6">
            <Link href={`/about?lang=${lang}`}>{t.aboutMe}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
