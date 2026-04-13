"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, Tag, Heart } from 'lucide-react';
import api from '@/app/api';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/app/(library)/store/useAuthStore';
import { useFavoritesStore } from '@/app/(library)/store/useFavoritesStore';
import { toast } from 'react-toastify';

const BookGridSection = ({ title, icon: Icon, books, loading, colorClass, viewAllPath }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const isAr = i18n.language === 'ar';

  const getCleanUrl = (url) => {
    if (!url || typeof url !== 'string') return "/placeholder.jpg";
    return url.trim().replace(/[`]/g, "");
  };

  const toggleFavorite = async (e, bookId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info(t("search_page.login_for_favorites"));
      return router.push("/login");
    }
    if (isFavorite(bookId)) {
      await removeFromFavorites(bookId);
    } else {
      await addToFavorites(bookId);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-3 border border-gray-100 animate-pulse">
            <div className="h-40 bg-gray-100 rounded-2xl mb-3"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between ${isAr ? "flex-row" : "flex-row-reverse"}`}>
        <div className={`flex items-center gap-2 ${isAr ? "flex-row" : "flex-row-reverse"}`}>
          <div className={`p-2 rounded-xl ${colorClass === "amber" ? "bg-amber-100 text-amber-600" : "bg-sky-100 text-sky-900"}`}>
            <Icon size={18} />
          </div>
          <h3 className="text-lg font-black text-gray-900">{title}</h3>
        </div>
        <button
          onClick={() => router.push(viewAllPath)}
          className={`text-xs font-bold ${colorClass === "amber" ? "text-amber-600" : "text-sky-900"} hover:underline`}
        >
          {t("home.showcase.view_all")}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {books.slice(0, 4).map((book) => {
          const bookId = book.id || book._id;
          return (
            <div
              key={bookId}
              onClick={() => router.push(`/book/${bookId}`)}
              className="bg-white rounded-3xl shadow-sm flex flex-col items-center relative border border-gray-100 overflow-hidden group cursor-pointer"
            >
              <button
                onClick={(e) => toggleFavorite(e, bookId)}
                className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full z-10 text-sky-900 hover:text-amber-600 hover:bg-sky-50 transition-colors shadow-sm"
                title={t("search_page.favorites")}
              >
                <Heart size={16} fill={isFavorite(bookId) ? "currentColor" : "none"} className={isFavorite(bookId) ? "text-amber-600" : ""} />
              </button>

              <div className="w-full h-44 relative">
                <Image
                  src={getCleanUrl(book.coverUrl || book.cover)}
                  alt={book.title || "Book"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col items-center pb-4 w-full px-2 pt-3">
                <h3 className="font-bold text-[13px] text-center line-clamp-2 h-10">
                  {book.title || book.name}
                </h3>
                <span className="text-[10px] text-amber-600 font-bold mt-2 hover:underline">
                  {t("search_page.explore_more")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HomeShowcase = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [latestBooks, setLatestBooks] = useState([]);
  const [offerBooks, setOffersBooks] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await api.get('/files/latest');
        setLatestBooks((response?.data?.data || []).slice(0, 6));
      } catch (err) {
        console.error("Latest fetch error:", err);
      } finally {
        setLoadingLatest(false);
      }
    };

    const fetchOffers = async () => {
      try {
        const response = await api.get('/files/on-sale', { params: { limit: 20 } });
        setOffersBooks((response?.data?.data || []).slice(0, 6));
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
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Latest Releases */}
        <div className="flex flex-col gap-6">
          <div className={`flex items-center gap-2 ${isAr ? 'mr-2' : 'ml-2 flex-row-reverse'}`}>
            <div className="w-1.5 h-6 bg-sky-900 rounded-full"></div>
            <h2 className={`text-2xl font-black text-sky-950 tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>
              {t('home.showcase.latest_title')}
            </h2>
          </div>
          <BookGridSection
            title={t('home.showcase.latest_slider')}
            icon={Sparkles} 
            books={latestBooks} 
            loading={loadingLatest} 
            colorClass="sky"
            viewAllPath="/search?sort=latest"
          />
        </div>

        {/* Offers */}
        <div className="flex flex-col gap-6">
          <div className={`flex items-center gap-2 ${isAr ? 'mr-2' : 'ml-2 flex-row-reverse'}`}>
            <div className="w-1.5 h-6 bg-amber-600 rounded-full"></div>
            <h2 className={`text-2xl font-black text-sky-950 tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>
              {t('home.showcase.offers_title')}
            </h2>
          </div>
          <BookGridSection
            title={t('home.showcase.offers_slider')}
            icon={Tag} 
            books={offerBooks} 
            loading={loadingOffers} 
            colorClass="amber"
            viewAllPath="/offers"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeShowcase;
