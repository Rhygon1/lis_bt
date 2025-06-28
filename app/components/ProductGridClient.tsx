"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { SelectDemo } from "./sortByCombobox";
import { dataProductType } from "@/app/(data)/getProducts";
import ProductCard from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProductGridClientProps {
  initialProducts: dataProductType[];
  initialTotalCount: number;
  getProductsAction: (
    col: string,
    sort: string,
    page: number,
    search: string
  ) => Promise<[dataProductType[], number]>;
}

export default function ProductGridClient({
  initialProducts,
  initialTotalCount,
  getProductsAction,
}: ProductGridClientProps) {
  const searchParams = useSearchParams();
  const collection = searchParams.get("col") || "";
  const search = searchParams.get("search") || "";
  const [selectedSort, setSelectedSort] = useState("");
  const [productsData, setProductsData] =
    useState<dataProductType[]>(initialProducts);
  const [totalCount, setTotalCount] = useState<Number>(initialTotalCount);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialProducts.length < initialTotalCount
  );
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] =
    useState<dataProductType[]>(initialProducts);

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

    const [fetchedProducts, count] = await getProductsAction(
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

  useEffect(() => {
    setFilteredProducts(() => {
      return productsData.filter((p) => !showInStockOnly || p.inStock);
    });
  }, [productsData, showInStockOnly]);

  return (
    <div className="flex flex-col max-w-screen mx-5 mt-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-800">
          {collection && `${collection}    |    `} {`${totalCount}`} Results
        </p>
        <div className="flex items-center space-x-4">
          <SelectDemo
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
      </div>

      <div className="flex justify-end py-3 w-full items-center space-x-2">
        <Switch
          id="in-stock-only"
          checked={showInStockOnly}
          onCheckedChange={setShowInStockOnly}
        />
        <Label htmlFor="in-stock-only">In Stock Only</Label>
      </div>

      {search && (
        <p className="w-full h-8 mt-7 flex justify-center items-center text-2xl font-[Overpass] font-thin">
          Search results for "{search}"
        </p>
      )}

      <div className="grid grid-cols-2 row-auto gap-1 lg:grid-cols-4 md:gap-3 mb-10 mt-8">
        {filteredProducts.map((product, idx) => {
          if (idx === filteredProducts.length - 1) {
            return (
              <div ref={lastProductRef} key={product.id}>
                <ProductCard
                  priority={page === 0 ? true : false}
                  updateProducts={() => fetchProducts(0, true)}
                  product={product}
                />
              </div>
            );
          } else {
            return (
              <ProductCard
                key={product.id}
                priority={page === 0 ? true : false}
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
