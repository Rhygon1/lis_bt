"use server";

export type productType = {
    name: string,
    amt: number,
    imgs: string[]
}

type ProductsType = [productType[], Number]

export default async function getProducts() {
  return [
    [
      { name: "1", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "2", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "3asada", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "d5asdadda", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "da4seda", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "das6cda", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "dase7da", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "dasdc8wa", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "dasead9a", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "dasdada20", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "dascada23", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
      { name: "dasdcaea34", amt: 76, imgs: ["https://6jax627y1avwmget.public.blob.vercel-storage.com/france-in-pictures-beautiful-places-to-photograph-eiffel-tower-pn3n5wYyPqnueaNLkNyQyccgSZ9YO2.jpg"] },
    ],
    100,
  ] as ProductsType;
}
