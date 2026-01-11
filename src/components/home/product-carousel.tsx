"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { ProductCard } from "./product-card";

import type { ProductCardProps } from "@/types";

import "swiper/css";
import "swiper/css/navigation";

interface ProductCarouselProps {
  products: ProductCardProps[];
  sectionId: string;
}

export function ProductCarousel({
  products,
  sectionId,
}: ProductCarouselProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No hay productos disponibles
      </div>
    );
  }

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <div className="group relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        className="!pb-16 !pt-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={handlePrev}
        disabled={isBeginning}
        className={`absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-gray-800 group-hover:opacity-100 lg:-left-6 lg:opacity-0`}
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        disabled={isEnd}
        className={`absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-gray-800 group-hover:opacity-100 lg:-right-6 lg:opacity-0`}
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
