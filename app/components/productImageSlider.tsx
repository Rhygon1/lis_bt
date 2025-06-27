'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const isVideo = (url: string) => url.match(/\.(mp4|webm|ogg)$/i);

export const ProductImageSlider = ({ slides }: { slides: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({ dragFree: true })
  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainEmblaApi || !thumbEmblaApi) return
      mainEmblaApi.scrollTo(index)
    },
    [mainEmblaApi, thumbEmblaApi],
  )

  const onSelect = useCallback(() => {
    if (!mainEmblaApi || !thumbEmblaApi) return
    setSelectedIndex(mainEmblaApi.selectedScrollSnap())
    thumbEmblaApi.scrollTo(mainEmblaApi.selectedScrollSnap())
  }, [mainEmblaApi, thumbEmblaApi, setSelectedIndex])

  useEffect(() => {
    if (!mainEmblaApi) return
    onSelect()
    mainEmblaApi.on('select', onSelect)
    mainEmblaApi.on('reInit', onSelect)
  }, [mainEmblaApi, onSelect])

  return (
    <>
      <div className="embla aspect-square" ref={mainEmblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide h-full" key={index}>
              {isVideo(slide) ? (
                <video src={slide} controls className="w-full h-full object-contain" />
              ) : (
                <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="embla embla--thumb" ref={thumbEmblaRef}>
        <div className="embla__container embla__container--thumb">
          {slides.map((slide, index) => (
            <div
              className={`embla__slide embla__slide--thumb ${index === selectedIndex ? 'is-selected' : ''}`}
              key={index}
              onClick={() => onThumbClick(index)}
            >
              {isVideo(slide) ? (
                <video src={slide} className="w-full h-full object-contain" />
              ) : (
                <img src={slide} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

