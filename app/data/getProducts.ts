"use server";

import { v4 as uuidv4 } from "uuid";

type ProductsType = [dataProductType[], Number];

export type dataProductType = {
  id: string;
  title: string;
  type: string,
  sizes: string[];
  dispatch: string;
  inStock: boolean;
  media: String[];
  description: string;
  price: number;
  customPrice: number;
  unstitchPrice: number;
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
          "https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg",
        ],
        description: "DISC",
        price: 20,
        customPrice: 30,
        unstitchPrice: 40,
      }
    ],
    100,
  ] as ProductsType;
}
