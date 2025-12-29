import { Card } from "@/components/ui/card";
import { simpleBlogCard } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { translations } from "@/lib/translations";

export const revalidate = 30;

async function getData(language: string) {
    const query = `
    *[_type == "blog" && language == $language] | order(createdAt desc) {
      title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
        _updatedAt,
        createdAt
    }
  `;

    const data = await client.fetch(query, { language });

    return data;
}

export default async function BlogHome({
    searchParams,
}: {
    searchParams: { lang: string };
}) {
    const lang = searchParams.lang || "en";
    const data: simpleBlogCard[] = await getData(lang);

    // Group posts by year
    const postsByYear = data.reduce((acc, post) => {
        const date = new Date(post.createdAt || post._updatedAt); // Fallback to updated if created missing
        const year = date.getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {} as Record<number, simpleBlogCard[]>);

    // Sort years descending
    const sortedYears = Object.keys(postsByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div className="flex flex-col gap-8 mt-8">
            {sortedYears.map((year) => (
                <div key={year}>
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-800">
                        {year}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {postsByYear[year].map((post, idx) => (
                            <Card
                                key={idx}
                                className="group overflow-hidden hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors border-transparent hover:border-gray-200 dark:hover:border-gray-800 shadow-none"
                            >
                                <Link
                                    href={`/blog/${post.currentSlug}?lang=${lang}`}
                                    className="block"
                                >
                                    <div className="flex flex-row items-center p-4">
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                                            <Image
                                                src={urlFor(post.titleImage).url()}
                                                alt="image"
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex-1 ml-6 flex flex-col justify-center">
                                            <h3 className="text-xl font-bold line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                {post.smallDescription}
                                            </p>
                                            <div className="mt-2 text-xs text-gray-400 font-medium">
                                                {
                                                    translations[lang as keyof typeof translations]
                                                        .readMore
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
