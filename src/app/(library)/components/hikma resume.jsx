"use client";
import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HikmaResume = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="py-10 bg-white overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Side: Image */}
          <div className={`w-full md:w-1/2 flex justify-center order-1 ${isAr ? 'md:order-2' : 'md:order-1'}`}>
            <div className="relative h-[300px] md:h-[450px] w-full max-w-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-50">
              <Image
                src="/imghome.jpg"
                alt={t('home.hikma_resume.title')}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Side: Content */}
          <div className={`w-full md:w-1/2 ${isAr ? 'text-right md:order-1' : 'text-left md:order-2'} order-2`}>
            <div className="space-y-6">
              <span className="text-amber-600 font-bold tracking-widest text-sm uppercase block mb-2">
                {t('home.hikma_resume.tag')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-sky-900 leading-tight">
                {t('home.hikma_resume.title')}
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                {t('home.hikma_resume.desc')}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => router.push("/hikma-institute")}
                  className="inline-flex items-center gap-3 py-4 px-10 bg-sky-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-100 group"
                >
                  {t('home.hikma_resume.cta')}
                  {isAr ? (
                    <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                  ) : (
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HikmaResume;
