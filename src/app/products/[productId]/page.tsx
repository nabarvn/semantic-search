import { db } from "@/db";
import Image from "next/image";
import { eq } from "drizzle-orm";
import { BackButton } from "@/components";
import { productsTable } from "@/db/schema";
import { CheckCircle, Shield } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params: { productId } }: ProductPageProps) => {
  if (!productId) return notFound();

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, productId));

  if (!product) return notFound();

  return (
    <div className="divide-y divide-zinc-100 bg-white shadow-md rounded-b-md pb-8 px-12 py-8">
      <div>
        <BackButton />

        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
        </div>

        <div className="aspect-square border border-border w-52 h-52 my-6">
          <div className="relative bg-zinc-100 w-full h-full overflow-hidden rounded-xl">
            <Image
              fill
              priority
              sizes="100vh"
              loading="eager"
              alt="product image"
              src={`/${product.imageId}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <p className="font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-6 mt-4">
            <p className="text-base max-w-prose text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="flex items-center mt-6">
            <CheckCircle className="flex-shrink-0 text-green-500 h-4 w-4" />

            <p className="text-sm text-muted-foreground ml-2">
              Eligible for express delivery
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full mt-10">Add to cart</Button>

        <div className="text-center mt-6">
          <div className="inline-flex text-sm font-medium">
            <Shield className="flex-shrink-0 text-gray-400 self-center h-4 w-4 mr-2" />

            <span className="text-muted-foreground hover:text-gray-700">
              30 Day Return Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
