import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { translations } from "@/lib/translations";
import { Card } from "@/components/ui/card";
import {
  PortableText,
  PortableTextTypeComponentProps,
} from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

type ImageValue = {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

type CodeBlockValue = {
  language?: string;
  code: string;
};

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
      "currentSlug": slug.current,
        title,
        content,
        titleImage,
        _updatedAt,
        seoKeywords,
    }[0]
  `;

  const data = await client.fetch(query);

  return data;
}

const components = {
  types: {
    image: ({ value }: PortableTextTypeComponentProps<ImageValue>) => {
      const imageUrl = urlFor(value).width(800).url();
      return (
        <div style={{ position: "relative", width: "100%", margin: "1rem 0" }}>
          <Image
            src={imageUrl}
            alt={value.alt || "Blog image"}
            width={800}
            height={500}
            layout="responsive"
            objectFit="contain"
          />
        </div>
      );
    },
    code: ({ value }: PortableTextTypeComponentProps<CodeBlockValue>) => (
      <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${value.language || "plaintext"}`}>
          {value.code}
        </code>
      </pre>
    ),
  },
  marks: {
    code: ({ children }: any) => (
      <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
        {children}
      </code>
    ),
  },
};

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data: fullBlog = await getData(params.slug);

  return {
    title: data.title,
    description: data.smallDescription, // Assuming smallDescription exists on fullBlog, checked schema but let's verify interface
    keywords: data.seoKeywords || [],
  }
}

export default async function BlogArticle({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lang: string };
}) {
  const data: fullBlog = await getData(params.slug);
  const lang = searchParams.lang || "en";
  const t = translations[lang as keyof typeof translations];

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString(lang === 'uz' ? 'uz-UZ' : "default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  return (
    <div className="mt-8">
      <h1>
        <span className="mb-3 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl ">
          {data.title}
        </span>
        <span className="block text-base text-gray-500">
          {t.createdAt} {formatDate(data._updatedAt)}
        </span>
        <div className="h-0.5 bg-gray-500 w-16 mt-4"></div>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="title image"
        width={1200}
        height={630}
        priority
        className="rounded-lg mt-8 border w-full h-auto object-cover"
      />

      <div className="mt-6 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary max-w-none">
        <PortableText value={data.content} components={components} />
      </div>
      <Card className="my-5 p-10">
        {t.telegramCtaPart1}
        <a
          className="text-blue-500"
          href="https://t.me/devlogsbyazizkhuja"
          target="_blank"
        >
          @devlogsbyazizkhuja
        </a>{" "}
        {t.telegramCtaPart2}
      </Card>
    </div>
  );
}
