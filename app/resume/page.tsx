import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translations";

export const revalidate = 30;

async function getData(language: string) {
    const query = `
  *[_type == "resume" && language == $language][0] {
    title,
    "resumePdf": resumePdf.asset->url,
    description
  }
  `;

    const data = await client.fetch(query, { language });
    return data;
}

export default async function Resume({
    searchParams,
}: {
    searchParams: { lang: string };
}) {
    const lang = searchParams.lang || "en";
    const data = await getData(lang);
    const t = translations[lang as keyof typeof translations];

    if (!data) {
        return (
            <div className="mt-8">
                <h1 className="text-3xl font-bold mb-6">{t.resume}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Information not available yet. Please add &quot;Resume&quot; content in Sanity
                    CMS.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-gray-700">
                <h1 className="text-3xl font-bold">{data.title || t.resume}</h1>
                {data.resumePdf && (
                    <a href={data.resumePdf} download target="_blank">
                        <Button className="font-medium">{t.downloadResume}</Button>
                    </a>
                )}
            </div>

            <div className="mb-20 prose prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary prose-li:my-0 prose-p:my-0 leading-snug max-w-none">
                <PortableText value={data.description} />
            </div>
        </div>
    );
}
