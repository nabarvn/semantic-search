import { db } from "@/db";
import Link from "next/link";
import Image from "next/image";
import { sql } from "drizzle-orm";
import { XCircle } from "lucide-react";
import { Index } from "@upstash/vector";
import { redirect } from "next/navigation";
import { vectorize } from "@/lib/vectorize";
import { Product, productsTable } from "@/db/schema";

interface SearchPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export type CoreProduct = Omit<Product, "createdAt" | "updatedAt">;

const index = new Index<CoreProduct>();

const SearchPage = async ({ searchParams: { query } }: SearchPageProps) => {
  if (Array.isArray(query) || !query) {
    return redirect("/");
  }

  // full-text search
  let products: CoreProduct[] = await db
    .select()
    .from(productsTable)
    .where(
      // selecting products where the concatenated `name` and `description` columns match the search query
      sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${
        productsTable.description
      })) @@ to_tsquery('simple', lower(${query
        .trim()
        .split(" ")
        .join(" & ")}))`
    )
    .limit(3);

  // perform semantic search if the number of products returned from the full-text search is less than 3
  if (products.length < 3) {
    const vector = await vectorize(query);

    // search products by cosine similarity
    const res = await index.query({
      topK: 5,
      vector,
      includeMetadata: true,
    });

    // filtering out items that are already retrieved from the neon database
    const vectorProducts = res
      .filter((existingProduct) => {
        if (
          products.some((product) => product.id === existingProduct.id) ||
          existingProduct.score < 0.9
        ) {
          return false;
        } else {
          return true;
        }
      })
      .map(({ metadata }) => metadata as CoreProduct);

    products.push(...vectorProducts);
  }

  if (products.length === 0) {
    return (
      <div className="text-center bg-white shadow-md rounded-b-md py-4">
        <XCircle className="mx-auto text-gray-400 h-8 w-8" />

        <h3 className="text-sm font-semibold text-gray-900 mt-2">No results</h3>

        <p className="text-sm text-gray-500 mx-auto max-w-prose mt-1">
          Sorry, we couldn&apos;t find any matches for{" "}
          <span className="text-green-600 font-medium">{query}</span>.
        </p>
      </div>
    );
  }

  return (
    <ul className="bg-white shadow-md rounded-b-md divide-y divide-zinc-100 py-4">
      {products.slice(0, 3).map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <li className="flex space-x-4 mx-auto px-8 py-4">
            <div className="relative flex items-center bg-zinc-100 rounded-lg h-40 w-40">
              <Image
                fill
                sizes="100vh"
                loading="eager"
                alt="product image"
                src={`/${product.imageId}`}
              />
            </div>

            <div className="flex-1 space-y-2 w-full py-1">
              <h1 className="text-lg font-medium text-gray-900">
                {product.name}
              </h1>

              <p className="prose prose-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>

              <p className="text-base font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchPage;
