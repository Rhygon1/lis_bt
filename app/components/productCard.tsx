import currency from "currency.js";
import { Heart } from "lucide-react";
import { productType } from "../data/getProducts";
import { useState } from "react";

type propsType = {
  product: productType;
};
export default function ProductCard(props: propsType) {
  let [wishlisted, setWishlisted] = useState(false);

  return (
    <div key={`${props.product.name}`} className="w-full aspect-3/5 mb-5">
      <div className="basis-full shrink-0 aspect-2/3 relative">
        <img
          src={props.product.imgs[0]}
          className="w-full h-full object-top object-cover"
        ></img>
        <button onClick={() => setWishlisted(a => !a)} className="absolute top-3 right-3 rounded-full bg-white w-7 h-7 flex items-center justify-center">
          <Heart fill={wishlisted ? "black" : "white"} className="w-4"></Heart>
        </button>
      </div>
      <p className="text-sm text-slate-600">{props.product.name}</p>
      <p className="text-slate-900 text-sm font-semibold">
        {currency(props.product.amt).format()}
      </p>
    </div>
  );
}
