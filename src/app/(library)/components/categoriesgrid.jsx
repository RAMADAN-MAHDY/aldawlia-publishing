"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import Activity from '@/app/loading';
import { Box } from "lucide-react";
import api from '@/app/api';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ إضافة error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');

        console.log(response.data); // للتأكد من شكل الداتا

        // ✅ استخدام data مباشرة (غيريها لو الباك مختلف)
        setCategories(response.data.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('حصل خطأ أثناء تحميل البيانات'); // ✅
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Activity />;
  if (error) return <div>{error}</div>; // ✅

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mb-20" dir="rtl">
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        تصنيفات المتجر
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
        {categories?.map((category) => (
          <Link 
            href={{
              pathname: `/category/${category._id}`,
              query: { name: category.name },
            }}
            key={category._id} 
            className="relative overflow-hidden rounded-xl shadow-md bg-white aspect-square group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            
            <div className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm p-1 rounded-full">
              <Box className="w-5 h-5 text-gray-800" />
            </div>

            <img 
              src={
                category.image
                  ? category.image.startsWith('http')
                    ? category.image
                    : `https://e-library-api-production.up.railway.app${category.image}`
                  : "/placeholder.jpg"
              }
              alt={category.name || "تصنيف"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-x-0 bottom-0">
              <div className="bg-black/20 backdrop-blur-md w-full p-3 rounded-t-lg transition-all duration-300">
                <span className="text-white font-bold text-sm md:text-lg block">
                  {category.name}
                </span>
                <span className="text-white text-[10px] md:text-sm mt-1 block opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  تصفح المنتجات في هذا القسم
                </span>
              </div>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;