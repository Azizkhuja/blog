import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
      "currentSlug": slug.current,
        title,
        content,
        titleImage,
        _createdAt,
    }[0]
  `;

  const data = await client.fetch(query);

  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  console.log(data._createdAt);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  return (
    <div className="mt-8">
      <h1>
        <span className="mb-3 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl ">
          {data.title}
        </span>
        <span className="block text-base text-gray-500">Created on: {formatDate(data._createdAt)}</span>
        <div className="h-0.5 bg-gray-500 w-16 mt-4"></div>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="title image"
        width={600}
        height={600}
        priority
        className="rounded-lg mt-8 border object-cover"
      />

      <div className="mt-6 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
