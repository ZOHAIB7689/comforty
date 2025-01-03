import { defineType } from "sanity";

const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "discription",
      type: "string",
      title: "Product Description",
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "discount",
      title: "Before Discount",
      type: "number",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "discription",
        maxLength: 200, // Optional: Limit slug length
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
      },
    },
  ],
});

export default product;
