import getProductById from "@/app/(data)/getProductById";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function Page({ params }: { params: { id: string } }) {
  let {id} = await params
  const product = await getProductById(id);

  const cols = [
    "Readymade Suits",
    "Anarkalis",
    "Gowns",
    "Lehangas",
    "Menswear",
    "Girls Kids Dresses",
    "Boys Kids Dresses",
    "Jewellery",
    "Sarees",
    "Blouses",
    "Indo Western",
  ];

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <Header collections={cols} />
      <ProductDetailsClient product={product} />
      <Footer />
    </div>
  );
}