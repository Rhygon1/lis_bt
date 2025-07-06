import Header from "@/app/components/header";
import Collections from "./components/collections";
import Footer from "./components/footer";

export default function Home() {
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
      <img src="/main.jpg" alt="main image" />

      {/* <img src="//www.lashkaraa.com/cdn/shop/files/MOBILE_BANNER_2_68483fd1-7307-4410-84d0-ffbbc0f6aaae.jpg?v=1748104386&width=1500"></img> */}
      <Collections collections={collections}></Collections>
      <Footer></Footer>
    </div>
  );
}
