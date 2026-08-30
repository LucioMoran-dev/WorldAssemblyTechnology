"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/seeds";

const AUTOPLAY_MS = 6000;
const INTERACTION_COOLDOWN_MS = 3200;
const SWIPE_THRESHOLD_PX = 72;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const totalSlides = heroSlides.length;
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    lastX: number;
  }>({
    pointerId: null,
    startX: 0,
    lastX: 0,
  });

  const markUserInteraction = useCallback(() => {
    setIsInteracting(true);
    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
    }
    cooldownTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, INTERACTION_COOLDOWN_MS);
  }, []);

  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    markUserInteraction();
  };

  const finishDrag = useCallback(
    (clientX?: number) => {
      if (!isDragging) return;

      const endX =
        typeof clientX === "number" ? clientX : dragStateRef.current.lastX;
      const deltaX = endX - dragStateRef.current.startX;

      if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
        if (deltaX < 0) goToNext();
        else goToPrev();
      }

      setDragOffsetPx(0);
      setIsDragging(false);
      dragStateRef.current.pointerId = null;
      markUserInteraction();
    },
    [goToNext, goToPrev, isDragging, markUserInteraction]
  );

  useEffect(() => {
    if (totalSlides <= 1) return;
    if (isDragging || isHovered || isInteracting) return;

    const interval = setInterval(goToNext, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [goToNext, isDragging, isHovered, isInteracting, totalSlides]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
    };
  }, []);

  if (totalSlides === 0) return null;

  return (
    <div
      ref={bannerRef}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-xl ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setParallax({ x: 0, y: 0 });
      }}
      onMouseMove={(event) => {
        if (prefersReducedMotion || isDragging) return;
        const bounds = bannerRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const ratioX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const ratioY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        setParallax({
          x: clamp(ratioX, -1, 1),
          y: clamp(ratioY, -1, 1),
        });
      }}
      aria-roledescription="carousel"
      aria-label="Promociones destacadas"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.24),transparent_40%),radial-gradient(circle_at_85%_75%,rgba(59,130,246,0.2),transparent_45%)]" />

      <div className="overflow-hidden">
        <div
          className={`flex touch-pan-y ${
            isDragging
              ? ""
              : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          }`}
          style={{
            transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffsetPx}px), 0, 0)`,
          }}
          onPointerDown={(event) => {
            if (totalSlides <= 1) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            dragStateRef.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              lastX: event.clientX,
            };
            setIsDragging(true);
            setDragOffsetPx(0);
            markUserInteraction();
          }}
          onPointerMove={(event) => {
            if (!isDragging) return;
            if (
              dragStateRef.current.pointerId !== null &&
              dragStateRef.current.pointerId !== event.pointerId
            ) {
              return;
            }

            dragStateRef.current.lastX = event.clientX;
            setDragOffsetPx(event.clientX - dragStateRef.current.startX);
          }}
          onPointerUp={(event) => finishDrag(event.clientX)}
          onPointerCancel={() => finishDrag()}
          onPointerLeave={() => {
            if (isDragging) finishDrag();
          }}
        >
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            const imageTranslate = prefersReducedMotion
              ? "translate3d(0px, 0px, 0px) scale(1)"
              : isActive && !isDragging
                ? `translate3d(${(parallax.x * 10).toFixed(2)}px, ${(parallax.y * 10).toFixed(2)}px, 0px) scale(1.02)`
                : "translate3d(0px, 0px, 0px) scale(1)";
            const chipTranslate = prefersReducedMotion
              ? "translate3d(0px, 0px, 0px)"
              : isActive && !isDragging
                ? `translate3d(${(parallax.x * -6).toFixed(2)}px, ${(parallax.y * -6).toFixed(2)}px, 0px)`
                : "translate3d(0px, 0px, 0px)";

            return (
              <article key={slide.id} className="w-full flex-shrink-0">
                <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:py-14">
                  <div
                    className={`z-10 space-y-6 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    <Badge className="gradient-accent border-0 px-4 py-1.5 font-bold tracking-wide text-white shadow-md">
                      {slide.badge}
                    </Badge>

                    <h1 className="text-3xl leading-tight font-bold text-balance text-white lg:text-5xl">
                      {slide.title}
                    </h1>

                    <p className="text-base leading-relaxed text-gray-300 lg:text-lg">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-blue-600 hover:shadow-[0_16px_28px_rgba(37,99,235,0.45)] focus-visible:ring-2 focus-visible:ring-blue-300 active:translate-y-0 active:scale-[0.98]"
                      >
                        <Link href={slide.primaryCtaHref}>
                          {slide.primaryCtaLabel}
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 border-white/80 bg-card/5 px-8 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-card hover:text-foreground focus-visible:ring-2 focus-visible:ring-white active:translate-y-0 active:scale-[0.98]"
                      >
                        <Link href={slide.secondaryCtaHref}>
                          {slide.secondaryCtaLabel}
                        </Link>
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {slide.footnote}
                    </p>
                  </div>

                  <div className="relative h-full">
                    <div className="relative mx-auto w-full max-w-[500px]">
                      <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-blue-500/25 blur-3xl" />

                      <div
                        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-[0_26px_56px_rgba(0,0,0,0.5)] transition-transform duration-300"
                        style={{ transform: imageTranslate }}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-blue-300/10" />
                      </div>

                      <div
                        className="absolute top-4 right-4 rounded-xl border border-white/20 bg-card/90 p-3 shadow-xl backdrop-blur-sm transition-transform duration-300"
                        style={{ transform: chipTranslate }}
                      >
                        <div className="text-xs font-bold text-blue-600">
                          {slide.chipTitle}
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {slide.chipValue}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {slide.chipSubtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => handleDotClick(index)}
                aria-label={`Ir al slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-7 bg-card"
                    : "w-2.5 bg-card/40 hover:bg-card/70"
                }`}
              />
            ))}
          </div>

          <span className="rounded-full border border-white/20 bg-card/10 px-2 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
            {String(activeIndex + 1).padStart(2, "0")}/
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
