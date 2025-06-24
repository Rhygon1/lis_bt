"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type contextType = [string, Dispatch<SetStateAction<string>>, number];

export const CurrencyContext = createContext<contextType>([
  "USD",
  () => null,
  1,
]);

export default function CurrencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currency, setCurrency] = useState("USD");
  const [exchange, setExchange] = useState(1);

  useEffect(() => {
    const stored = window.localStorage.getItem("currency");
    if (stored) {
      setCurrency(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('currency', currency)

    async function setNewPrice() {
      let exchange = 1;
      if (currency != "USD") {
        let apiRes = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=USD&symbols=${currency}`
        );
        let apiResJson = await apiRes.json()
        exchange = apiResJson["rates"][currency]
      }
      setExchange(exchange);
    }
    setNewPrice();
  }, [currency]);

  return (
    <CurrencyContext.Provider value={[currency, setCurrency, exchange]}>
      {children}
    </CurrencyContext.Provider>
  );
}
