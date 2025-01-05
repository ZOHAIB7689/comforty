"use client";

import React from "react";
import { FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface CartItemProps {
  product: {
    _id:string
    title: string;
    price: number;
    description: string;
    image: { asset: { _ref: string } };
  };
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          product_id: product._id,
        }),
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  if (!product) {
  return <div>Product not found</div>;
}


  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <FaHeart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <FaShare className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-emerald-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">USD</span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{product.description}</p>

        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={handleAddToCart}
        >
          <FaShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
