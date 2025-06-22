import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function SelectDemo() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Select
      value={selectedOption}
      onValueChange={(value) => {
        setSelectedOption(value);
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
