import { FaShoppingCart } from "react-icons/fa";
import { client } from "@/lib/Client";
import Image from "next/image";

interface Product {
  title: string;
  price: number;
  description: string;
  image: any;
}

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    title,
    price,
    description,
    image}`;
  return client.fetch(query, { slug });
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    "slug": slug.current  }`;
  const products = await client.fetch(query);
  
  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product: Product = await getProduct(params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen md:pl-56 md:pr-36 bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <div className="rounded-lg w-full max-w-sm">
            {product.image && (
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover rounded-lg"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold text-[rgb(35,43,83)]">
            {product.title}
          </h1>
          <span className="p-4 bg-[#029FAE] rounded-full inline-block font-semibold text-white">
            ${product.price.toFixed(2)} US
          </span>
          <p className="text-[#6C757D] text-base leading-relaxed">
            {product.description}
          </p>
          <button className="flex items-center gap-2 bg-[#007BFF] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#0056b3] transition">
            <FaShoppingCart size={18} />
            Add To Cart 
          </button>
        </div>
      </div>
    </div>
  );
}
