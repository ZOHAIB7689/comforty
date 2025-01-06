import React from "react";
import { client } from "@/lib/Client";
import CartItem from "@/components/CartItem";
import { Card } from "@/components/ui/card";

// Fetch the product by slug
async function getProduct(slug: string) {
  try {
    const query = `*[_type == "product" && slug.current == $slug][0] {
      _id,  
      title,
      price,
      description,
      image
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Generate static paths
export async function generateStaticParams() {
  try {
    const query = `*[_type == "product"] {
      "slug": slug.current
    }`;
    const products = await client.fetch(query);

    // Ensure slug is a string and handle undefined cases
    return (products || []).map((product: { slug: string | undefined }) => ({
      slug: product.slug || "",
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Validate the slug
  if (!params?.slug || typeof params.slug !== "string") {
    console.error("Invalid slug parameter:", params.slug);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Invalid Product</h2>
          <p className="text-gray-600">The slug parameter is missing or invalid.</p>
        </Card>
      </div>
    );
  }

  // Fetch the product
  const product = await getProduct(params.slug);

  // Handle product not found
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
