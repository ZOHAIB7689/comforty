import React from "react";
import { client } from "@/lib/Client";
import CartItem from "@/components/CartItem";
import { Card } from "@/components/ui/card";

// Fetch the product by slug
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
  _id,  
  title,
    price,
    description,
    image
  }`;
  return client.fetch(query, { slug });
}

// Generate static paths
export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    "slug": slug.current
  }`;
  const products = await client.fetch(query);
  return products.map((product: { slug: string }) => ({
    params: { slug: product.slug },
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

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
        {/* Pass product as props to the CartItem Client Component */}
        <CartItem product={product} />
      </div>
    </div>
  );
}
