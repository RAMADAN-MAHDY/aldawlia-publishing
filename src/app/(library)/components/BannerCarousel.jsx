"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BannerCarousel() {
  const slides = useMemo(
    () => [
      { src: "/bannerhome1.png", title: "Slide 1" },
      { src: "/bannerhome2.jpeg", title: "Slide 2" },
      { src: "/bannerhome3.png", title: "Slide 3" },
      { src: "/bannerhome4.png", title: "Slide 4" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const stopAutoPlay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [index]);

  const goTo = (i) => {
    stopAutoPlay();
    setIndex(i);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-50"
      /* الارتفاع الجديد الموزون: 300px للموبايل و 500px كحد أقصى للـ Desktop */
      style={{ height: "clamp(280px, 40vw, 450px)" }}
    >
      <AnimatePresence initial={false}>
        {slides.map((slide, i) => (
          i === index && (
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 10 }}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                /* object-top تضمن بقاء الكلام العلوي ظاهراً عند تقصير الارتفاع */
                className="object-cover object-top"
                priority={i === 0}
                sizes="100vw"
              />
              {/* Overlay خفيف جداً لإبراز الـ Dots */}
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-700 h-1.5 rounded-full shadow-sm ${
              i === index
                ? "w-10 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}