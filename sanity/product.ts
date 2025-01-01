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
      title: "Product  Description",
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
      title: " Before Discount",
      type: "number",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
});



export default product;