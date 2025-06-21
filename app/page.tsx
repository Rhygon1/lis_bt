import Image from "next/image";
import Header from "@/app/components/header";
import Collections from "./components/collections";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen">
      <Header></Header>
      <img src="/main.jpg"></img>

      {/* <img src="//www.lashkaraa.com/cdn/shop/files/MOBILE_BANNER_2_68483fd1-7307-4410-84d0-ffbbc0f6aaae.jpg?v=1748104386&width=1500"></img> */}
      <Collections></Collections>
      <Footer></Footer>
    </div>
  );
}
