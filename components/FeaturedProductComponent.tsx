"use client"

import React, { useEffect, useState } from "react";
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
const FeaturedProductComponent: React.FC = () => {
  // Local state to store the fetched products
  const [data, setData] = useState<Product[] | null>(null);

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const products = await getProductData();
      setData(products);
    };
    fetchData();
  }, []);

  // Handle the case when data is still loading or not available
  if (data === null) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="mt-8">
      <div>
        <h1 className="text-4xl font-semibold">Featured Products</h1>
      </div>
      <div className="flex justify-between flex-col md:flex-row flex-wrap mt-5">
        {/* Ensure data is not empty before calling .map() */}
        {data.length > 0 ? (
          data.map((product) => (
            <ProductCard Item={product} key={product._id} /> // Pass product data to ProductCard
          ))
        ) : (
          <p>No featured products available.</p> // If no products are found
        )}
      </div>
    </div>
  );
};

export default FeaturedProductComponent;
