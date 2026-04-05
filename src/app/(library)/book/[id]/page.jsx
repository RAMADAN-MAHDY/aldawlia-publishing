"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Activity from "@/app/loading";
import { ArrowRight, Download, Heart } from "lucide-react";
import { useFavoritesStore } from "@/app/(library)/store/useFavoritesStore";
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import { useCartStore } from "@/app/(library)/store/useCartStore";
import Image from "next/image";

const BookDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();

  const [downloading, setDownloading] = useState(false);

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await api.get(`/files/${id}`);
      return response.data.data || response.data;
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });

  const { data: coverUrl } = useQuery({
    queryKey: ["cover", id],
    queryFn: async () => {
      const response = await api.get(`/files/${id}`);
      const data = response.data.data || response.data;
      return { url: data.cover || data.coverUrl || "/default-book-cover.png" };
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });

  const handleDownload = async () => {
    setDownloading(true);
    try {
      if (!book?.price || book.price === 0) {
        const response = await api.get(`/files/${id}/download-link`);
        window.open(response.data.data.url, "_blank");
        toast.success("تم بدء التحميل!");
      } else {
        // إذا كان الكتاب مدفوعاً نحوله للسلة و نضيفه لها
        if (!isAuthenticated) {
          toast.info("يرجى تسجيل الدخول أولاً لإتمام الشراء");
          return router.push("/login");
        }
        await addToCart(id);
        router.push("/cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "فشل العملية، حاول لاحقاً");
    } finally {
      setDownloading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.info("سجّل الدخول لإضافة المفضلة");
      return router.push("/login");
    }
    if (isFavorite(id)) {
      await removeFromFavorites(id);
    } else {
      await addToFavorites(id);
    }
  };

  if (isLoading) return <Activity />;
  if (!book) return null;

  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-24" dir="rtl">
      <div className="bg-white/90 backdrop-blur-md sticky top-0 p-4 shadow-sm border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
          <button
            onClick={() => router.back()}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-sky-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#C5A059] transition-colors"
            aria-label="رجوع"
          >
            <ArrowRight size={20} />
          </button>
          <h1 className="text-sky-900 font-extrabold text-xl md:text-2xl">تفاصيل الكتاب</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6 flex flex-col items-center text-center">
        <div className="relative w-full max-w-md h-80 mb-4 rounded-2xl overflow-hidden shadow-md border border-sky-100">
          <button 
            onClick={toggleFavorite}
            className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow z-10 text-sky-900 hover:text-[#C5A059] hover:bg-sky-50 transition-colors"
          >
            <Heart size={24} fill={isFavorite(id) ? "currentColor" : "none"} className={isFavorite(id) ? "text-[#C5A059]" : ""} />
          </button>
          
          <Image
            src={coverUrl || book.cover || "/default-book-cover.png"}
            alt={book.title}
            fill
            priority
            quality={70}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h2>

        <div className="flex flex-col items-center gap-1 mb-2 justify-center">
          {book.isOnSale ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                {(book.price / 100)?.toLocaleString()} ج.م
              </span>
              <span className="font-black text-3xl text-[#C5A059]">
                {(book.discountPrice / 100)?.toLocaleString()} ج.م
              </span>
            </>
          ) : (
            <span className={`font-black text-2xl ${book.price > 0 ? "text-[#C5A059]" : "text-sky-700"}`}>
              {book.price > 0 ? `${(book.price / 100)?.toLocaleString()} ج.م` : "مجاني"}
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 pt-4 w-full text-right">
          <h3 className="font-bold text-gray-800 mb-2">الوصف</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{book.description || "وصف الكتاب غير متوفر حالياً."}</p>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`mt-6 w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            downloading ? "bg-gray-300" : "bg-sky-900 active:scale-95 hover:bg-[#C5A059]"
          }`}
        >
          <Download size={20} />
          {downloading ? "جاري التحميل..." : book.price > 0 ? "شراء وتحميل" : "تحميل مجاني"}
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
