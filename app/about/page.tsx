import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

async function getData(language: string) {
    const query = `
  *[_type == "about" && language == $language][0] {
    title,
    description,
    profileImage
  }
  `;

    const data = await client.fetch(query, { language });
    return data;
}

export default async function About({
    searchParams,
}: {
    searchParams: { lang: string };
}) {
    const lang = searchParams.lang || "en";
    const data = await getData(lang);

    if (!data) {
        return (
            <div className="mt-8">
                <h1 className="text-3xl font-bold mb-6">About me</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Information not available yet. Please add &quot;About&quot; content in Sanity CMS.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
            {data.profileImage && (
                <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(data.profileImage).url()}
                        alt={data.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}
            <div className="prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary max-w-none">
                <PortableText value={data.description} />
            </div>
        </div>
    );
}
