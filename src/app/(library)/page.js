"use client";
import { motion } from "framer-motion";
import CategoryGrid from "./components/categoriesgrid";
import BannerCarousel from "./components/BannerCarousel";
import HomeShowcase from "./components/HomeShowcase";
import QuickAccessLinks from "./components/QuickAccessLinks";
import HikmaResume from "./components/hikma resume";
import IslamicResume from "./components/islamic resume";

export default function Home() {
  const fadeInVariant = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 }, // تعديل: amount بدلاً من margin لتحسين المراقبة
    transition: { duration: 0.5, ease: "easeOut" } // تقليل المدة لسرعة الاستجابة
  };

  return (
    <main className="min-h-screen bg-gray-50 overflow-hidden flex flex-col gap-8 md:gap-10">
      <div className="w-full">
        <BannerCarousel />
      </div>

      <motion.section {...fadeInVariant} className="relative z-10">
        <HomeShowcase />
      </motion.section>

      <motion.section {...fadeInVariant}>
        <CategoryGrid />
      </motion.section>

      <motion.section {...fadeInVariant}>
        <HikmaResume />
      </motion.section>

      <motion.section {...fadeInVariant}>
        <IslamicResume />
      </motion.section>

      <motion.section {...fadeInVariant}>
        <QuickAccessLinks />
      </motion.section>
    </main>
  );
}