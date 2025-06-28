import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import MainSearch from "@/app/components/mainSearch";
import { Suspense } from "react";

export type ParamsType = Promise<{ col?: string; search?: string }>;
type Props = { searchParams: ParamsType };

export default async function Search({ searchParams }: Props) {
  const params = await searchParams;
  let collections = [
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

  return (
    <div className="flex flex-col max-w-screen">
      <Header collections={collections}></Header>
      <Suspense>
        <MainSearch searchParams={params} />
      </Suspense>
      <Footer></Footer>
    </div>
  );
}