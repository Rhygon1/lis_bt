"use client";

import { useSearchParams } from "next/navigation";
import getProducts from "../data/getProducts";
import { useEffect, useState } from "react";
import { SelectDemo } from "./sortByCombobox";
import { dataProductType } from "@/app/data/getProducts";
import ProductCard from "./productCard";

type ProductsType = [dataProductType[], Number];

export default function MainSearch() {
  const searchParams = useSearchParams();
  const collection = searchParams.get("col") || "";
  const [selectedSort, setSelectedSort] = useState("");
  const [productsData, setProductsData] = useState<ProductsType>([[], 0]);

  function updateProducts() {
    let [col, sort] = [collection, selectedSort];
    getProducts(col, sort).then(setProductsData);
  }

  useEffect(() => {
    updateProducts();
  }, [selectedSort, collection]);

  return (
    <div className="flex flex-col max-w-screen mx-5 mt-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-800">
          {collection && `${collection}    |    `} {`${productsData[1]}`}{" "}
          Results
        </p>
        <SelectDemo
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </div>
      <div className="grid grid-cols-2 row-auto gap-1 lg:grid-cols-4 md:gap-3 my-10">
        {productsData[0].map((a) => {
          return <ProductCard key={a.id} updateProducts={updateProducts} product={a}></ProductCard>;
        })}
      </div>
    </div>
  );
}
