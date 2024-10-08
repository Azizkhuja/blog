import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  const query = `
    *[_type == "blog"] | order(_updatedAt desc) {
      title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
    }
  `;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />
          <Link href={`blog/${post.currentSlug}`}>
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <Button className="w-full mt-7 text-white">O&apos;qish</Button>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
