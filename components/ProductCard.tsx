"use client";

import React from "react";
import { Image as newimage } from "sanity"; // Ensure this import is correct and matches the type used in Products interface
import { urlFor } from "@/sanity/lib/image";
import { FC } from "react";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export interface Products {
  _id: string;
  title: string;
  description: string;
  image: newimage;
  price: number;
  slug: string; // Add slug property to the Product type
  category: {
    title: string;
  };
}

export const handleAddToCart = async (productId: string) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
    }),
  });
  await res.json();
};

const ProductCard: FC<{ Item: Products }> = ({ Item }) => {
  const router = useRouter(); // Initialize router

  const handleNavigation = () => {
    router.push(`/product/${Item.slug}`); // Navigate to the product's slug page
  };

  return (
    <div onClick={handleNavigation} className="cursor-pointer">
      <div className="border rounded-lg p-2 hover:bg-zinc-50 duration-200 hover:-translate-y-2">
        <div className="w-full h-3/4 overflow-hidden">
          <div className="bg-black w-[200px] rounded-md">
            <Image
              src={urlFor(Item.image).url()}
              alt={Item.title}
              height={200}
              width={200}
              className="hover:scale-110 hover:opacity-70 duration-200"
            />
          </div>
        </div>
        <div className="flex m-2 justify-between w-full">
          <h1 className="text-sm">{Item.title}</h1>
          <button
            className="mr-2 p-2 rounded-lg duration-200 hover:bg-[#029FAE] font-bold"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking the button
              handleAddToCart(Item._id); // Pass product ID to handleAddToCart
            }}
          >
            <IoCartOutline size={24} />
          </button>
        </div>
        <p className="text-lg p-2 font-bold mt-2">${Item.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
