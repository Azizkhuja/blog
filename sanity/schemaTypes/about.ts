export default {
    name: "about",
    type: "document",
    title: "About Page",
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "profileImage",
            type: "image",
            title: "Profile Image",
        },
        {
            name: "description",
            type: "array",
            title: "Description",
            of: [
                {
                    type: "block",
                },
            ],
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
