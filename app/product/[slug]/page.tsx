import React from 'react';
import { FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";
import { client } from "@/lib/Client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define the interface for the product, including the image type
interface Product {
  title: string;
  price: number;
  description: string;
  image: { asset: { _ref: string } }; // Sanity image asset type
}

// Function to fetch a specific product by its slug
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    title,
    price,
    description,
    image
  }`;
  return client.fetch(query, { slug });
}

// Generate static paths for all products
export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    "slug": slug.current
  }`;
  const products = await client.fetch(query);
  return products.map((product: { slug: string }) => ({
    params: { slug: product.slug },
  }));
}

// Product page component
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product: Product = await getProduct(params.slug);  // Fetch the product using the slug

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Product not found</h2>
          <p className="text-gray-600">The requested product could not be found.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()} // Use urlFor to generate image URL
                    alt={product.title}
                    fill // Use fill for responsive images
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
                <Badge className="mb-2" variant="secondary">In Stock</Badge>
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {product.title}
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-3xl font-bold text-emerald-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">USD</span>
                </div>
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <ul className="space-y-2 text-gray-600">
                    <li>Premium Quality Materials</li>
                    <li>Handcrafted with Care</li>
                    <li>100% Satisfaction Guaranteed</li>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <p className="text-gray-600">
                    Free shipping on orders over $50. Standard delivery 3-5 business days.
                  </p>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <FaShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full">
                  Buy Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
