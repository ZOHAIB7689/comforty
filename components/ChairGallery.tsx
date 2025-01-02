"use client";

import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Image as SanityImage } from "sanity";

interface Product {
  _id: string;
  name?: string;
  image: SanityImage;
  category: {
    title: string;
  };
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
  return builder.image(source).url();
}

const query = `*[_type == 'product' && category->name == 'chairs']{
  _id,
  name,
  image,
  category-> {
    title
  }
}`;

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full bg-[#F5F7F9]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col space-y-12">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Text Column */}
            <div className="flex flex-col justify-center">
              <div className="rotate-[-90deg] origin-left text-lg font-medium tracking-wider text-gray-800 mb-16">
                EXPLORE NEW AND POPULAR STYLES
              </div>
            </div>

            {/* Right Image Column */}
            <div className="relative aspect-square bg-[#EEF1F4]">
              {products[0] && (
                <Image
                  src={urlFor(products[0].image)}
                  alt={products[0].name || "Featured Chair"}
                  fill
                  className="object-contain p-8"
                  priority
                />
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <h2 className="text-2xl font-medium text-center mb-8">
              Our Products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(1, 5).map((product) => (
                <div key={product._id} className="group">
                  <div className="relative aspect-square bg-[#EEF1F4] mb-4 rounded-sm overflow-hidden">
                    <Image
                      src={urlFor(product.image)}
                      alt={product.name || "Chair"}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
