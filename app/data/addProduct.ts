"use server";

import { dataProductType } from "./getProducts";
import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function addProduct(
  product: Omit<Omit<dataProductType, "id">, "createdAt">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const id = uuidv4();

    // Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        sizes TEXT NOT NULL,
        dispatch TEXT NOT NULL,
        in_stock BOOLEAN NOT NULL,
        media TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        custom_price INTEGER NOT NULL,
        unstitch_price INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Insert product
    await sql`
      INSERT INTO products (
        id, title, type, sizes, dispatch, in_stock, media, description, price, custom_price, unstitch_price
      ) VALUES (
        ${id}, ${product.title}, ${product.type}, ${JSON.stringify(product.sizes)}, ${
      product.dispatch
    }, ${product.inStock}, ${JSON.stringify(product.media)}, ${
      product.description
    }, ${product.price}, ${product.customPrice}, ${product.unstitchPrice}
      )
    `;

    return { success: true, id };
  } catch (error: any) {
    console.error("Error inserting product:", error);
    return { success: false, error: error.message };
  }
}
