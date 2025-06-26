"use client";

import { useSearchParams } from "next/navigation";
import getProducts from "../(data)/getProducts";
import { useEffect, useState, useRef, useCallback } from "react";
import { SelectDemo } from "./sortByCombobox";
import { dataProductType } from "@/app/(data)/getProducts";
import ProductCard from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";

type ProductsType = [dataProductType[], number];

export default function MainSearch() {
  const searchParams = useSearchParams();
  const collection = searchParams.get("col") || "";
  const search = searchParams.get("search") || "";
  const [selectedSort, setSelectedSort] = useState("");
  const [productsData, setProductsData] = useState<dataProductType[]>([]);
  const [totalCount, setTotalCount] = useState<Number>(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  async function fetchProducts(pageToLoad: number, reset = false) {
    setLoading(true);

    const [fetchedProducts, count] = await getProducts(
      collection,
      selectedSort,
      pageToLoad,
      search
    );

    if (reset) {
      setProductsData(fetchedProducts);
      setHasMore(fetchedProducts.length < count); // set based on count
    } else {
      setProductsData((prev) => {
        const newData = [...prev, ...fetchedProducts];
        setHasMore(newData.length < count); // set based on combined length
        return newData;
      });
    }

    setTotalCount(count);
    setLoading(false);
  }

  // Reset on filter/sort/collection change
  useEffect(() => {
    setPage(0);
    fetchProducts(0, true);
  }, [selectedSort, collection, search]);

  // Fetch more on scroll
  useEffect(() => {
    if (page === 0) return; // Already loaded
    fetchProducts(page);
  }, [page]);

  return (
    <div className="flex flex-col max-w-screen mx-5 mt-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-800">
          {collection && `${collection}    |    `} {`${totalCount}`} Results
        </p>
        <SelectDemo
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </div>

      {search && <p className="w-full h-8 mt-7 flex justify-center items-center text-2xl font-[Overpass] font-thin">Search results for "{search}"</p>}

      <div className="grid grid-cols-2 row-auto gap-1 lg:grid-cols-4 md:gap-3 mb-10 mt-8">
        {productsData.map((product, idx) => {
          if (idx === productsData.length - 1) {
            return (
              <div ref={lastProductRef} key={product.id}>
                <ProductCard
                  updateProducts={() => fetchProducts(0, true)}
                  product={product}
                />
              </div>
            );
          } else {
            return (
              <ProductCard
                key={product.id}
                updateProducts={() => fetchProducts(0, true)}
                product={product}
              />
            );
          }
        })}
        {loading &&
          new Array(10)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                key={`skeleton-${i}`}
                className="w-full aspect-3/5 mb-5"
              />
            ))}
      </div>
    </div>
  );
}
