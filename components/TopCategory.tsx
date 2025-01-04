"use client";

import { Card, CardHeader, CardContent } from "./ui/card";
import { client } from "@/lib/Client";
import imageUrlBuilder from "@sanity/image-url";
import { Image as newimage } from "sanity";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

export const getProductData = async () => {
  const response = await client.fetch(
    `*[_type=='product' && category->name == 'top']{
        _id,
        title,
        description,
        image,
        discount, 
        slug,
        price,
        category -> {title }
    }`
  );
  return response;
};

interface Product {
  _id: string;
  title: string;
  description: string;
  image: newimage;
  price: number;
  discount: number;
  slug: string; // Add slug property
  category: {
    title: string;
  };
}

const builder = imageUrlBuilder(client);

function urlFor(source: newimage) {
  return builder.image(source);
}

export default async function TopCategories() {
  const data: Product[] = await getProductData();
  const router = useRouter(); // Initialize router

  const handleNavigation = (slug: string) => {
    router.push(`/product/${slug}`); // Navigate to the product's slug page
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Top Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((category, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer"
            onClick={() => handleNavigation(category.slug)} // Handle navigation
          >
            <CardHeader className="p-0">
              <div className="bg-black rounded-md">
                <Image
                  src={urlFor(category.image).url()}
                  alt={category.title}
                  width={300}
                  height={200}
                  className="w-full h-auto hover:opacity-70 hover:scale-105 duration-200 object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 -translate-x-1">
              <h3 className="text-md font-medium text-gray-800">
                {category.title}
              </h3>
              <p className="text-sm text-gray-600">1156</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
