"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import api from "@/app/api"; // استيراد ملف api.jsx للتعامل مع الطلبات
import { ShoppingCart, Plus, Minus, Heart } from "lucide-react";
import { useCartStore } from "@/app/(library)/store/useCartStore";
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import { useFavoritesStore } from "@/app/(library)/store/useFavoritesStore";
import { toast } from "react-toastify";
import Activity from "@/app/loading";
import Image from "next/image";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get("keyword");
  
  const { addToCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["search", keyword],
    queryFn: async () => {
      if (!keyword) return [];
      const response = await api.get('/files', {
        params: {
          q: keyword
        }
      });
      return response.data.data || [];
    },
    enabled: Boolean(keyword),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!keyword) {
      setProducts([]);
      return;
    }

    if (data) {
      setProducts(data);
    }
  }, [data, keyword]);

  if (queryLoading) return <Activity />;

  const toggleFavorite = async (e, bookId) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info("سجّل الدخول لإضافة المفضلة");
      return router.push("/login");
    }
    if (isFavorite(bookId)) {
      await removeFromFavorites(bookId);
    } else {
      await addToFavorites(bookId);
    }
  };

  if (queryLoading) return <Activity />;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8" dir="rtl">
      <h1 className="text-xl font-bold mb-6 text-sky-900">
        نتائج البحث عن: <span className="text-[#C5A059] font-black">{keyword}</span>
      </h1>

      {products.length === 0 ? (
        <p className="text-center py-10">لا توجد نتائج تطابق بحثك</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-2xl p-4 hover:shadow-lg transition-shadow bg-white flex flex-col relative">
              {/* المفضلة */}
              <button 
                onClick={(e) => toggleFavorite(e, product._id)}
                className="absolute top-4 right-4 bg-white/90 p-1.5 rounded-full z-10 text-sky-900 hover:text-[#C5A059] hover:bg-sky-50 transition-colors shadow-sm"
                title="المفضلة"
              >
                <Heart size={16} fill={isFavorite(product._id) ? "currentColor" : "none"} className={isFavorite(product._id) ? "text-[#C5A059]" : ""} />
              </button>

              {/* رابط للصورة والاسم */}
              <Link href={`/book/${product._id}`} className="flex-grow mt-2">
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={product.cover || product.image || "/placeholder.jpg"}
                    alt={product.title || product.name}
                    fill
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center mb-4 line-clamp-2 px-2 hover:text-[#C5A059] transition-colors">{product.title || product.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
