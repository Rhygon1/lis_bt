"use server";

import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/db";

type ProductsType = [dataProductType[], Number];

export type dataProductType = {
  id: string;
  title: string;
  type: string,
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

export default async function getProducts(col: string, sort: string) {
  let res = supabase.from('products').select("*", { count: 'exact' })
  if(col){
    res = res.eq("type", col)
  }
  if(sort){
    if(sort == "p0"){
      res = res.order("price", {ascending: true})
    } else if(sort == "p1"){
      res = res.order("price", {ascending: false})
    } else if(sort == "d0"){
      res = res.order("created_at", {ascending: false})
    } else if(sort == "d1"){
      res = res.order("created_at", {ascending: true})
    }
  }

  const { data, count } = await res;

  if(data?.length){
    return [data.map(product => {
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
      createdAt: product.created_at
    }
    }), count] as ProductsType
  }

  return [
    [
      {
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },
      {
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },{
        id: uuidv4(),
        title: "TITLE",
        type: "Readymade suits",
        sizes: ["XS", "S"],
        dispatch: "soon",
        inStock: true,
        media: [
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/1037518551-5PrNDsqMtyRqmlUVaPfp33MmI1OZsR.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
        createdAt: JSON.stringify(Date.now())
      },
    ],
    100,
  ] as ProductsType;
}
