import { client } from "@/lib/Client";
import imageUrlBuilder from "@sanity/image-url";
import { Image } from "sanity";
import ProductCard from "@/components/ProductCard";

export const getProductData = async () => {
  const response = await client.fetch(`*[_type=='product']{
    _id,
    title,
    description,
    image,
    discount, 
    price,
    category -> {title}
  }`);
  return response;
};

const builder = imageUrlBuilder(client);

interface Product {
  _id: string;
  title: string;
  description: string;
  image: Image;
  price: number;
  discount:number
  category: {
    title: string;
  };
}

// Fixed urlFor function
function urlFor(source: Image) {
  return builder.image(source);
}

export default async function Home() {
  const data: Product[] = await getProductData();
  return (
    <div className="bg-gray-200 h-screen w-full flex justify-center items-center">
      {data.map((item) => (
        <ProductCard key={item._id} Item={item} />
      ))}
    </div>

);

}
