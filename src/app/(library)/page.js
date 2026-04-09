"use client"; // ضروري جداً عشان Framer Motion تشتغل

import { motion } from "framer-motion";
import CategoryGrid from "./components/categoriesgrid";
import BannerCarousel from "./components/BannerCarousel";
import QuickAccessLinks from "./components/QuickAccessLinks";
import HikmaResume from "./components/hikma resume";
import IslamicResume from "./components/islamic resume";

export default function Home() {
  
  // إعدادات الحركة الموحدة لكل سيكشن (ظهور تدريجي مع حركة خفيفة)
  const fadeInVariant = {
    initial: { opacity: 0, y: 30 }, // بيبدأ شفاف ونازل لتحت 30 بكسل
    whileInView: { opacity: 1, y: 0 }, // بيظهر وبيرجع لمكانه الأصلي
    viewport: { once: true, margin: "-100px" }, // بيشتغل مرة واحدة لما يدخل الشاشة بمسافة 100 بكسل
    transition: { duration: 0.8, ease: "easeOut" } // مدة الحركة ونعومتها
  };

  return (
    <main className="min-h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. البانر: يظهر فوراً عند فتح الصفحة */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4"
      >
        <BannerCarousel />
      </motion.div>

      {/* 2. الأقسام: تظهر عند السكرول */}
      <motion.div {...fadeInVariant}>
        <CategoryGrid />
      </motion.div>

      {/* 3. سيكشن Hikma: يظهر بنعومة */}
      <motion.div {...fadeInVariant}>
        <HikmaResume />
      </motion.div>

      {/* 4. سيكشن Islamic: يظهر بنعومة */}
      <motion.div {...fadeInVariant}>
        <IslamicResume />
      </motion.div>

      {/* 5. روابط الوصول السريع: تظهر في الآخر */}
      <motion.div {...fadeInVariant}>
        <QuickAccessLinks />
      </motion.div>
      
    </main>
  );
}