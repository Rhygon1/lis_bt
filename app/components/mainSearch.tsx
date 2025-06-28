import { Suspense } from "react";
import { dataProductType } from "@/app/(data)/getProducts";
import { Skeleton } from "@/components/ui/skeleton";
import ProductGridClient from "./ProductGridClient";
import getProducts from "@/app/(data)/getProducts";

export default async function MainSearch({ searchParams }: { searchParams: { col?: string; search?: string } }) {
  const collection = searchParams.col || "";
  const search = searchParams.search || "";

  const [initialProducts, initialTotalCount] = await getProducts(
    collection,
    "", // initial sort
    0, // initial page
    search
  );

  return (
    <Suspense fallback={
      <div className="grid grid-cols-2 row-auto gap-1 lg:grid-cols-4 md:gap-3 mb-10 mt-8 mx-5">
        {new Array(10).fill(null).map((_, i) => (
          <Skeleton key={`skeleton-${i}`} className="w-full aspect-3/5 mb-5" />
        ))}
      </div>
    }>
      <ProductGridClient
        initialProducts={initialProducts}
        initialTotalCount={initialTotalCount}
        getProductsAction={getProducts}
      />
    </Suspense>
  );
}