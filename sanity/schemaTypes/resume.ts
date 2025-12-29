export default {
    name: "resume",
    type: "document",
    title: "Resume",
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "resumePdf",
            type: "file",
            title: "Resume PDF",
        },
        {
            name: "description",
            type: "array",
            title: "Resume Content",
            of: [{ type: "block" }],
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
    ],
};
