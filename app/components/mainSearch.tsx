"use client";

import { useSearchParams } from "next/navigation";
import getProducts from "../data/getProducts";
import { useEffect, useState } from "react";
import { SelectDemo } from "./sortByCombobox";
import { productType } from "../data/getProducts";
import currency from "currency.js";
import { Heart } from "lucide-react";
import ProductCard from "./productCard";

type ProductsType = [productType[], Number];

export default function MainSearch() {
  const searchParams = useSearchParams();
  const collection = searchParams.get("col");
  const [productsData, setProductsData] = useState<ProductsType>([[], 0]);

  useEffect(() => {
    getProducts().then(setProductsData);
  }, []);

  return (
    <div className="flex flex-col max-w-screen mx-5 mt-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-800">
          {collection && `${collection}    |    `} {`${productsData[1]}`}{" "}
          Results
        </p>
        <SelectDemo />
      </div>
      <div className="grid grid-cols-2 row-auto gap-1 lg:grid-cols-4 md:gap-3 my-10">
        {productsData[0].map((a) => {
          return <ProductCard key={a.name} product={a}></ProductCard>;
        })}
      </div>
    </div>
  );
}
