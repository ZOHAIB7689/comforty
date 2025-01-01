import { defineType } from "sanity";

const category = defineType({
    name: 'category',
    type: 'document',
    title: 'Category',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        }
    ]
});

export default category;
