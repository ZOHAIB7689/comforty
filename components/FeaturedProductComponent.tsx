import React from "react";
import ProductCard from "./ProductCard";  // Import your ProductCard component
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
interface Product {
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

// FeaturedProductComponent to render the list of featured products
const FeaturedProductComponent: React.FC = async () => {
  const data: Product[] = await getProductData();

  return (
    <div className="mt-8">
      <div>
        <h1 className="text-4xl font-semibold">Featured Products</h1>
      </div>
      <div className="flex justify-between flex-col md:flex-row flex-wrap mt-5">
        {data.map((product) => (
          <ProductCard Item={product} key={product._id} />  // Pass product data to ProductCard
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductComponent;
