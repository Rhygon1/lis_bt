"use server";

import supabase from "@/lib/db";

type ProductsType = [dataProductType[], number];

export type dataProductType = {
  id: string;
  title: string;
  type: string;
  sizes: string[];
  dispatch: string;
  inStock: boolean;
  media: string[];
  description: string;
  price: number;
  customPrice: number;
  unstitchPrice: number;
  createdAt: string;
};

export default async function getProducts(
  col: string,
  sort: string,
  page: number,
  search: string
) {
  let res = supabase.from("products").select("*", { count: "exact" });
  if (col) {
    res = res.eq("type", col);
  }
  if (sort) {
    if (sort == "p0") {
      res = res.order("price", { ascending: true });
    } else if (sort == "p1") {
      res = res.order("price", { ascending: false });
    } else if (sort == "d0") {
      res = res.order("created_at", { ascending: false });
    } else if (sort == "d1") {
      res = res.order("created_at", { ascending: true });
    }
  }
  if (search){
    res = res.or(`title.ilike.%${search}%,description.ilike.%${search}%,dispatch.ilike.%${search}%,type.ilike.%${search}%`);
  }
  
  const pageLength = 15;
  res = res.range(page * pageLength, page * pageLength + (pageLength - 1));

  const { data, count } = await res;

  if (data?.length) {
    return [
      data.map((product) => {
        return {
          title: product.title,
          description: product.description,
          media: product.media,
          price: product.price,
          customPrice: product.custom_price,
          unstitchPrice: product.unstitch_price,
          dispatch: product.dispatch,
          sizes: product.sizes,
          inStock: product.in_stock,
          type: product.type,
          id: product.id,
          createdAt: product.created_at,
        };
      }),
      count as number,
    ] as ProductsType;
  } else {
    return [[], count] as ProductsType;
  }

  // return [[], 0] as ProductsType
}
