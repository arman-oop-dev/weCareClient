"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Banner from "/public/media/banner.jpg";

const slides = [
  {
    eyebrow: "TOGETHER, WE CAN",
    title: "Reaching out to those who need us.",
    description: "Your kindness can bring hope and create a better tomorrow.",
    button: "Explore Programmes",
    href: "/programmes",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = slides[activeSlide];

  const previousSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full overflow-hidden">
      {/* Main Carousel */}
      <div className="relative mx-auto flex w-full max-w-[1600px] items-stretch justify-center gap-0">
        {/* Previous Slide Preview */}
        <div className="relative hidden min-w-0 flex-1 overflow-hidden rounded-r-lg opacity-75 md:block">
          <Image
            src={Banner}
            alt="Community volunteering"
            fill
            sizes="15vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Active Slide */}
        <div className=" h-[440px] w-full shrink-0 overflow-hidden sm:h-[500px] md:w-[76%] md:rounded-lg lg:h-[540px]">
          <Image
            src={Banner}
            alt="Children in their community"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 76vw"
            placeholder="blur"
            className="object-cover object-center"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/15" />

          {/* Content Panel */}
          <div className="absolute left-5 top-1/2 w-[85%] max-w-[340px] -translate-y-1/2 bg-black/65 p-6 text-white shadow-lg sm:left-10 sm:p-8 lg:left-[17%]">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs">
              {currentSlide.eyebrow}
            </span>

            <h1 className="mt-3 font-heading text-3xl leading-tight font-semibold sm:text-4xl">
              {currentSlide.title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/80">
              {currentSlide.description}
            </p>

            <Link href="/programmes">
              <Button className="mt-6 h-11 bg-secondary px-6 font-semibold text-white hover:bg-secondary">
                See All Programs
                <span aria-hidden="true"> ↗</span>
              </Button>
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-6 flex gap-2 sm:left-10">
            {slides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute right-4 bottom-5 flex gap-2 sm:right-7">
            <button
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center bg-black/70 text-xl text-white transition-colors hover:bg-primary"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex size-10 items-center justify-center bg-black/70 text-xl text-white transition-colors hover:bg-primary"
            >
              ›
            </button>
          </div>
        </div>

        {/* Next Slide Preview */}
        <div className="relative hidden min-w-0 flex-1 overflow-hidden rounded-l-lg opacity-75 md:block">
          <Image
            src={Banner}
            alt="Community members"
            fill
            sizes="15vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      </div>
    </section>
  );
}
