import React from "react";
import ProductCard from "./ProductCard";
import { client } from "@/lib/Client";
import imageUrlBuilder from "@sanity/image-url";
import { Image } from "sanity";

export const getProductData = async () => {
  const response =
    await client.fetch(`*[_type=='product' ]{
    _id,
    title,
    slug,
    description,
    image,
    discount, 
    price,
    category -> {title} }`);
  return response;
};

const builder = imageUrlBuilder(client);

interface Product {
  _id: string;
  title: string;
  description: string;
  image: Image;
  slug: string; 
  price: number;
  discount: number;
  category: {
    title: string;
  };
}

// Fixed urlFor function
function urlFor(source: Image) {
  return builder.image(source);
}

export default async function LastHome() {
  const data: Product[] = await getProductData();
  return (
    <div className="mt-8">
      <div>
        <h1 className="text-4xl font-semibold">Featured Products</h1>
      </div>
      <div className="flex justify-between flex-col md:flex-row  flex-wrap mt-5">
        {data.map((product) => (
          <ProductCard Item={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
