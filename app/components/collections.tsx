import Link from "next/link";

type propsType = {
  collections: string[]
}

export default function Collections(props: propsType) {

  return (
    <div className="flex flex-col items-center">
      <p className="mt-10 text-xl font-[Overpass]">Shop by Collections</p>
      <div className="overflow-x-auto flex relative max-w-[95%] no-scrollbar m-4">
        <Link prefetch={true} className="basis-1/2 lg:basis-1/4 shrink-0" href="/search">
          <div className="mx-1 basis-1/2 shrink-0 aspect-square overflow-hidden bg-black">
            <p className="h-full w-full flex items-center justify-center text-white font-[Overpass]">SHOP ALL</p>
          </div>
        </Link>
        {props.collections.map((a) => {
          return (
            <Link prefetch={true} key={`${a}`} className="basis-1/2 lg:basis-1/4 shrink-0" href={`/search?col=${a}`}>
              <div className="mx-1 basis-1/2 shrink-0 aspect-square overflow-hidden">
                <img
                  src={`/categories/${a.toLowerCase()}.jpg`}
                  className="w-full h-full object-top object-cover"
                ></img>
              </div>
              <p className="text-center mt-3 font-[Overpass] font-500">{`${a}`}</p>
            </Link>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

// readymade suits
// anarkali
// gowns
// lehangas
// menethnic wear
// girls kids dreses
// boys kids dresses
// jewellery
// sarees
// blouses
// indo western
