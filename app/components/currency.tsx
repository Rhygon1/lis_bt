import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../currencyContext";
import currency from "currency.js";
import { symbol } from "zod";

type propsType = {
  price: number;
};

function getCurrencySymbol(isoCode: string, locale = "en-US") {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: isoCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const parts = formatter.formatToParts(0);
    const currencyPart = parts.find((part) => part.type === "currency");

    return currencyPart ? currencyPart.value : "";
  } catch (error) {
    console.error(`Error getting currency symbol for ${isoCode}:`, error);
    return ""; // Return an empty string or handle the error as appropriate
  }
}

export function Currency(props: propsType) {
  const [currencyType, _, exchange] = useContext(CurrencyContext);
  const [price, setPrice] = useState(Number(props.price.toPrecision(2)) * exchange);

  useEffect(() => {
    setPrice(Number(props.price.toPrecision(2)) * exchange);
  }, [props.price, exchange]);

  return (
    <p className="text-slate-900 text-sm font-semibold">
      {currency(price).format({ symbol: getCurrencySymbol(currencyType) })}
    </p>
  );
}

