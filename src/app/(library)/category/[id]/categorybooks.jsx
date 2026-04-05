"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api"; 
import { ShoppingCart, Plus, Minus, ArrowRight, Heart } from "lucide-react";
import { toast } from "react-toastify";
import Activity from "@/app/loading";
// ✅ Stores
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import { useCartStore } from "@/app/(library)/store/useCartStore";
import { useFavoritesStore } from "@/app/(library)/store/useFavoritesStore";

const CategoryProducts = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryNameFromQuery = searchParams.get("name");
  const { user, isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (categoryNameFromQuery) {
      setCategoryName(categoryNameFromQuery);
    }
  }, [categoryNameFromQuery]);

  const { data: queryData, isLoading: queryLoading } = useQuery({
    queryKey: ["category", id, page],
    queryFn: async () => {
      const response = await api.get('/files', {
        params: {
          category: id,
          page: page,
          limit: limit
        }
      });
      return {
        products: response.data.data || [],
        categoryName: categoryNameFromQuery || "الكتب",
        totalPages: response.data.pagination?.totalPages || 1,
      };
    },
    enabled: Boolean(id),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!queryData) return;

    const realProducts = queryData.products || [];
    setProducts(realProducts);
    setCategoryName(queryData.categoryName || categoryNameFromQuery || "الكتب");

    const tp =
      queryData?.totalPages ??
      queryData?.pages ??
      (queryData?.total ? Math.ceil(queryData.total / limit) : null);
    setTotalPages(tp);
  }, [queryData, categoryNameFromQuery, limit]);

  useEffect(() => {
    if (categoryNameFromQuery) {
      setCategoryName(categoryNameFromQuery);
    }
  }, [categoryNameFromQuery]);

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading]);

  const toggleFavorite = async (e, bookId) => {
    e.stopPropagation();
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

  if (loading) return <Activity />;

  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-24" dir="rtl">
      
      {/* عنوان القسم */}
      <div className="bg-white/90 backdrop-blur-md sticky top-0 p-4 shadow-sm border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
          <button 
            onClick={() => router.back()} 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-sky-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#C5A059] transition-colors"
            aria-label="رجوع"
          >
            <ArrowRight size={20} />
          </button>
          <h1 className="text-sky-900 font-extrabold text-xl md:text-2xl">{categoryName || "المنتجات"}</h1>
        </div>
      </div>

      <div className="p-4 flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-sm flex flex-col items-center relative border border-gray-100 w-[calc(50%-8px)] md:w-[220px]"
            >
              {/* خصم */}
              {product.discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-gray-100 text-[10px] px-2 py-0.5 rounded-full z-10">
                  {product.discountPercent} %
                </div>
              )}
              
              {/* المفضلة */}
              <button 
                onClick={(e) => toggleFavorite(e, product._id)}
                className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full z-10 text-sky-900 hover:text-[#C5A059] hover:bg-sky-50 transition-colors shadow-sm"
                title="المفضلة"
              >
                <Heart size={16} fill={isFavorite(product._id) ? "currentColor" : "none"} className={isFavorite(product._id) ? "text-[#C5A059]" : ""} />
              </button>

              {/* الصورة */}
              <div 
                className="w-full h-44 flex items-center justify-center mb-3 cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => router.push(`/book/${product._id}`)}
              > 
                <img 
                  src={product.cover || product.image || "/placeholder.jpg"} 
                  alt={product.title || product.name} 
                  className="object-cover w-full h-full" 
                />
              </div>

              {/* الاسم فقط */}
              <h3 
                className="font-bold text-[13px] text-center mb-4 line-clamp-2 h-8 px-2 cursor-pointer hover:text-[#C5A059] transition-colors"
                onClick={() => router.push(`/book/${product._id}`)}
              >
                {product.title || product.name}
              </h3>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 font-bold w-full">
            لا توجد منتجات في هذا القسم حالياً.
          </div>
        )}
      </div>

      {/* Pagination Dots */}
      {totalPages && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                page === i + 1 ? "bg-sky-900" : "bg-gray-300"
              }`}
              aria-label={`اذهب إلى الصفحة ${i + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default CategoryProducts;
