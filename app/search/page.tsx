import Header from "../components/header";
import Footer from "../components/footer";
import MainSearch from "../components/mainSearch";
import { Suspense } from "react";

export default function Search() {
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
        <MainSearch />
      </Suspense>
      <Footer></Footer>
    </div>
  );
}
