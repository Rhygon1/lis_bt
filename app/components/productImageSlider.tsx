"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useFileTypeDetector } from "./fileDetector";

export const ProductImageSlider = ({ slides }: { slides: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({ dragFree: true });
  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainEmblaApi || !thumbEmblaApi) return;
      mainEmblaApi.scrollTo(index);
    },
    [mainEmblaApi, thumbEmblaApi]
  );

  const onSelect = useCallback(() => {
    if (!mainEmblaApi || !thumbEmblaApi) return;
    setSelectedIndex(mainEmblaApi.selectedScrollSnap());
    thumbEmblaApi.scrollTo(mainEmblaApi.selectedScrollSnap());
  }, [mainEmblaApi, thumbEmblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainEmblaApi) return;
    onSelect();
    mainEmblaApi.on("select", onSelect);
    mainEmblaApi.on("reInit", onSelect);
  }, [mainEmblaApi, onSelect]);

  return (
    <>
      <div className="embla aspect-square" ref={mainEmblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide h-full relative" key={index}>
              {useFileTypeDetector(slide) === "video" ? (
                <video
                  src={slide}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="embla embla--thumb h-34" ref={thumbEmblaRef}>
        <div className="embla__container embla__container--thumb h-full">
          {slides.map((slide, index) => (
            <div
              className={`embla__slide embla__slide--thumb h-full w-fit relative ${
                index === selectedIndex ? "is-selected" : ""
              }`}
              key={index}
              onClick={() => onThumbClick(index)}
            >
              {useFileTypeDetector(slide) === "video" ? (
                <video src={slide} className="w-full h-full object-contain" />
              ) : (
                <Image
                  src={slide}
                  alt={`Thumbnail ${index + 1}`}
                  width={120} // or whatever max thumbnail width you want
                  height={120} // preserves aspect ratio automatically
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    width: "auto",
                    height: "100%",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
