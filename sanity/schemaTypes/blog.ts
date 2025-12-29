export default {
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title of blog article",
    },
    {
      name: "slug",
      type: "slug",
      title: "Title of slug",
      options: {
        source: "title",
      },
    },
    {
      name: "language",
      type: "string",
      title: "Language",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Uzbek", value: "uz" },
        ],
        layout: "radio",
      },
      initialValue: "en",
    },
    {
      name: "titleImage",
      type: "image",
      title: "Title image",
    },
    {
      name: "smallDescription",
      type: "text",
      title: "Small Description",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
        {
          type: "code",
        },
      ],
    },
    {
      name: "seoKeywords",
      type: "array",
      title: "SEO Keywords",
      description: "Keywords for SEO (not visible on page)",
      of: [{ type: "string" }],
    },
    {
      name: "createdAt",
      type: "datetime",
      title: "Created At",
    },
  ],
};
