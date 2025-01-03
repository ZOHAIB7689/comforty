import React from "react";
import { client } from "@/lib/Client";
import imageUrlBuilder from "@sanity/image-url";
import { Image as newImage } from "sanity";
import Image from "next/image";

// Define the structure of the Product data
interface Product {
  _id: string;
  image: newImage;
}

// Fetch Product Data
export const getProductData = async (): Promise<Product[]> => {
  const response =
    await client.fetch(`*[_type=='product']{
    _id,
    image
  }`);

  // Ensure we return an empty array if the response is undefined or null
  return response || [];
};

// Image URL Builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
function urlFor(source: newImage): string {
  return builder.image(source).url() || "";
}

const ChairGallery = async () => {
  // Fetch product data and ensure proper typing and error handling
  const data: Product[] = await getProductData();

  if (data.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="mt-12 flex items-center relative">
      {/* Rotated Text Section */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-32 -rotate-90 origin-center">
        <p className="text-sm md:text-lg text-gray-700 font-semibold tracking-wide whitespace-nowrap">
          EXPLORE NEW AND POPULAR PRODUCTS
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center ">
        {/* Left Section - Main Product */}
        <div className="md:w-1/2 flex justify-center items-center ml-10">
          <div className="overflow-hidden bg-black rounded-lg"> 
            <Image
              src={urlFor(data.slice(5, 6)[0].image)}
              alt="Main Product"
              width={400}
              height={400}
              className=" object-contain hover:scale-125 scale-105 duration-200 hover:opacity-50 cursor-pointer max-w-full max-h-[400px]"
              priority
            />
          </div>
        </div>

        {/* Right Section - Gallery of Other Products */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4 ">
          {data.slice(3, 7).map((product, index) => (
            <div className="overflow-hidden hover:bg-black rounded-lg">
              <Image
                key={product._id}
                src={urlFor(product.image)}
                alt={`Product ${index + 1}`}
                width={200}
                height={200}
                className=" hover:scale-110 duration-200 hover:opacity-70 cursor-pointer object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChairGallery;