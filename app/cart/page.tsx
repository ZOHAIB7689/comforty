import { db, cartTable } from "@/lib/drizzle";
import { cookies } from "next/headers";
import { client } from "@/lib/Client";
import imageUrlBuilder from "@sanity/image-url";
import { Image as SanityImage } from "sanity";
import Image from "next/image";
import { eq } from "drizzle-orm";

// Define types for the product and cart item
type Product = {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  price: number;
};

// GROQ query to fetch product details
const fetchProductDetails = async (productIds: string[]): Promise<Product[]> => {
  const query = `*[_type == "product" && _id in $productIds]{
    _id,
    title,
    description,
    image,
    price
  }`;
  return await client.fetch<Product[]>(query, { productIds });
};

// Function to build image URL
const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source).url();

export default async function CartPage() {
  try {
    const cookiesData = await cookies(); 
    const userId = cookiesData.get("user_id")?.value|| ""

    if (!userId) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-lg font-semibold">No cart items found.</p>
        </div>
      );
    }

    // Fetch cart items from the database
    const cartItems = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.user_id, userId));

    if (!cartItems || cartItems.length === 0) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-lg font-semibold">Your cart is empty.</p>
        </div>
      );
    }

    // Extract product IDs and fetch product details
    const productIds = cartItems.map((item) => item.product_id);
    const products = await fetchProductDetails(productIds);

    // Match product details with cart items
    const cartWithDetails = cartItems.map((item) => {
      const product = products.find((product) => product._id === item.product_id);
      if (!product) {
        throw new Error(`Product with ID ${item.product_id} not found.`);
      }
      return { ...item, product };
    });

    // Component JSX
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-6">Bag</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bag Section */}
            <div className="col-span-2 space-y-4">
              {cartWithDetails.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <Image
                      src={urlFor(item.product.image)}
                      alt={item.product.title}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow md:ml-4">
                    <h2 className="text-lg font-semibold">{item.product.title}</h2>
                    <p className="text-sm text-gray-500">{item.product.description}</p>

                    <div className="text-sm text-gray-500 flex space-x-4 mt-1">
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>

                  {/* Product Price */}
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-semibold">${item.product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-semibold">
                    $
                    {cartWithDetails.reduce(
                      (total, item) => total + item.product.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Estimated Delivery & Handling</p>
                  <p className="font-semibold">Free</p>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <p>
                    $
                    {cartWithDetails.reduce(
                      (total, item) => total + item.product.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
              </div>
              <button className="w-full mt-4 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
 } catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-lg font-semibold text-red-500">
        An error occurred: {errorMessage}
      </p>
    </div>
  );
}}
