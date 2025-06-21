import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-black w-screen h-[300px] flex flex-col justify-start items-start">
      <p className="text-white text-lg font-[Overpass] ml-10 mt-5 font-semibold">Contact Us</p>
      <div className="flex gap-5 ml-10 mt-7">
        <a href="https://www.instagram.com/lisboutiquepriti/">
          <Instagram color="white" className=""></Instagram>
        </a>
        <a href="https://www.facebook.com/share/15rbF1B7yn/">
          <Facebook color="white" className=""></Facebook>
        </a>
      </div>
      <div className="ml-10 mt-8 flex flex-col gap-5">
        <div className="flex gap-3">
          <MapPin color="white" className="w-4"></MapPin>
          <p className="text-white text-xs flex items-center">St. Cloud, Florida</p>
        </div>
        <div className="flex gap-3">
          <Phone color="white" className="w-4"></Phone>
          <p className="text-white text-xs flex items-center">+1 (689) 267-8636</p>
        </div>
        <div className="flex gap-3">
          <Mail color="white" className="w-4"></Mail>
          <p className="text-white text-xs flex items-center">lisboutique06@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
