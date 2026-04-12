"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Tag, ArrowLeft, Info } from 'lucide-react';
import api from '@/app/api';

const BookSlider = ({ title, icon: Icon, books, loading, colorClass }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCleanUrl = (url) => {
    if (!url || typeof url !== 'string') return "/placeholder.jpg";
    return url.trim().replace(/[`]/g, "");
  };

  useEffect(() => {
    if (books.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % books.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [books.length]);

  if (loading) {
    return (
      <div className="flex-1 bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-lg w-1/3 mb-8"></div>
        <div className="flex gap-6 items-center">
          <div className="w-32 h-48 bg-gray-100 rounded-xl"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="h-10 bg-gray-100 rounded w-full mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) return null;

  const currentBook = books[currentIndex];

  return (
    <div className="flex-1 bg-white rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden relative group">
      {/* Header */}
      <div className={`p-5 flex items-center justify-between border-b border-gray-50 ${colorClass === 'amber' ? 'bg-amber-50/30' : 'bg-sky-50/30'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${colorClass === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-900'} animate-pulse`}>
            <Icon size={20} fill={colorClass === 'amber' ? 'currentColor' : 'none'} />
          </div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight">{title}</h3>
        </div>
        <div className="flex gap-1">
          {books.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? (colorClass === 'amber' ? 'w-4 bg-amber-500' : 'w-4 bg-sky-900') : 'w-1 bg-gray-200'}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-8 flex items-center gap-6 md:gap-8 min-h-[280px]"
        >
          {/* Cover */}
          <div className="relative w-28 md:w-36 aspect-[3/4.5] rounded-xl overflow-hidden shadow-xl border-2 border-white ring-1 ring-gray-100 shrink-0">
            <Image
              src={getCleanUrl(currentBook?.coverUrl || currentBook?.cover)}
              alt={currentBook?.title || "Book Cover"}
              fill
              unoptimized
              className="object-cover"
            />
            {currentBook?.isOnSale && currentBook.discountPercent > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-lg shadow-lg">
                -{Math.round(currentBook.discountPercent)}%
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {currentBook?.category?.name || "إصدار عام"}
            </span>
            <h4 className="text-lg md:text-xl font-black text-sky-950 line-clamp-2 leading-snug">
              {currentBook?.title}
            </h4>
            
            <div className="flex items-center gap-2 mt-1">
              {currentBook?.isOnSale && (
                <span className="text-gray-400 line-through text-xs font-bold">{currentBook?.price}</span>
              )}
              <span className={`text-xl font-black ${colorClass === 'amber' ? 'text-amber-600' : 'text-sky-900'}`}>
                {currentBook?.isOnSale ? currentBook?.discountPrice : currentBook?.price}
                <span className="text-[10px] mr-1">ج.م</span>
              </span>
            </div>

            <button
              onClick={() => router.push(`/book/${currentBook?.id || currentBook?._id}`)}
              className={`mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs transition-all shadow-md active:scale-95 text-white ${colorClass === 'amber' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-sky-900 hover:bg-sky-950'}`}
            >
              استكشف التفاصيل
              <ArrowLeft size={14} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const HomeShowcase = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [offerBooks, setOffersBooks] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await api.get('/files/latest');
        setLatestBooks((response?.data?.data || []).slice(0, 5));
      } catch (err) {
        console.error("Latest fetch error:", err);
      } finally {
        setLoadingLatest(false);
      }
    };

    const fetchOffers = async () => {
      try {
        const response = await api.get('/files/on-sale', { params: { limit: 5 } });
        setOffersBooks((response?.data?.data || []).slice(0, 5));
      } catch (err) {
        console.error("Offers fetch error:", err);
      } finally {
        setLoadingOffers(false);
      }
    };

    fetchLatest();
    fetchOffers();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Latest Releases - Right Side */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mr-2">
            <div className="w-1.5 h-6 bg-sky-900 rounded-full"></div>
            <h2 className="text-2xl font-black text-sky-950 tracking-tight">أحدث ما وصلنا</h2>
          </div>
          <BookSlider 
            title="إصدارات جديدة" 
            icon={Sparkles} 
            books={latestBooks} 
            loading={loadingLatest} 
            colorClass="sky"
          />
        </div>

        {/* Offers - Left Side */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mr-2">
            <div className="w-1.5 h-6 bg-amber-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-sky-950 tracking-tight">أقوى العروض</h2>
          </div>
          <BookSlider 
            title="خصومات حصرية" 
            icon={Tag} 
            books={offerBooks} 
            loading={loadingOffers} 
            colorClass="amber"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeShowcase;
