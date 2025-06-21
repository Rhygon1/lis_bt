import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator"
import { Menu } from "lucide-react";

type propsType = {
  collections: string[];
};

export default function AppSidebar(props: propsType) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="flex justify-start"></Menu>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        {props.collections.map((a) => {
          return (
            <div key={`${a}`} className="ml-5">
            <a href={`/search?col=${a}`}>
                {`${a}`}
              </a>
              <Separator className="my-2 mr-5 text-black"/>
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}
