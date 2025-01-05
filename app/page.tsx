import Home from "./home/page";
import React from "react";
import { client } from "@/lib/Client";
import { Image } from "sanity";

// Fetch product data from the Sanity API
export const getProductData = async () => {
  const response = await client.fetch(`*[_type=='product' && category->name == 'main']{
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    discount,
    price,
    category -> {title}
  }`);
  return response;
};


// Define the interface for a product
export interface Product {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: Image;
  price: number;
  discount: number;
  category: {
    title: string;
  };
}



export default async function Page() {
  return (
    <div><Home/></div>
);

}
