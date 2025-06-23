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

export default async function getProducts() {
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
