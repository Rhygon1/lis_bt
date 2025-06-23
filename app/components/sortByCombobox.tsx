import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useState } from "react";

type propsType = {
  selectedSort: string,
  setSelectedSort: Dispatch<SetStateAction<string>>
}

export function SelectDemo(props: propsType) {

  return (
    <Select
      value={props.selectedSort}
      onValueChange={(value) => {
        props.setSelectedSort(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem value="p0">Price (low to high)</SelectItem>
          <SelectItem value="p1">Price (high to low)</SelectItem>
          <SelectItem value="d0">Latest</SelectItem>
          <SelectItem value="d1">Oldest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
