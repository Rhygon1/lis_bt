import React, { useState, useMemo, useContext } from "react";
import ReactCountryFlag from "react-country-flag";
import * as countryCodes from "country-codes-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CurrencyContext } from "@/app/currencyContext";

export default function CountrySelector() {
  const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "{currencyCode}"
  );
  const countries = ["US", "GB", "AU", "NZ", "MY", "SG"]
  const [currency, setCurrency, _] = useContext(CurrencyContext)

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-1/3 ml-4">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {
          Object.keys(myCountryCodesObject).map(cn => {
            if (!myCountryCodesObject[cn] || !countries.includes(cn)){
              return 
            }
            return (<SelectItem key={cn} value={myCountryCodesObject[cn]}>
              <ReactCountryFlag countryCode={cn}></ReactCountryFlag>
              <p>{myCountryCodesObject[cn]}</p>
            </SelectItem>)
          })
        }
      </SelectContent>
    </Select>
  );
}
