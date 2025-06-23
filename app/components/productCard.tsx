import currency from "currency.js";
import { Heart } from "lucide-react";
import { dataProductType } from "@/app/data/getProducts";
import { useState } from "react";

type propsType = {
  product: dataProductType;
};
export default function ProductCard(props: propsType) {
  let [wishlisted, setWishlisted] = useState(false);

  return (
    <div key={`${props.product.title}`} className="w-full aspect-3/5 mb-5">
      <div className="basis-full shrink-0 aspect-2/3 relative">
        <img
          src={props.product.media[0] as string}
          className="w-full h-full object-top object-cover"
        ></img>
        <button onClick={() => setWishlisted(a => !a)} className="absolute top-3 right-3 rounded-full bg-white w-7 h-7 flex items-center justify-center">
          <Heart fill={wishlisted ? "black" : "white"} className="w-4"></Heart>
        </button>
      </div>
      <p className="text-sm text-slate-600">{props.product.title}</p>
      <p className="text-slate-900 text-sm font-semibold">
        {currency(props.product.price).format()}
      </p>
    </div>
  );
}
