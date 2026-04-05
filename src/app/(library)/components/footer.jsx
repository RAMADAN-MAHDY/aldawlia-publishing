"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, MessageCircle, Instagram, Phone, Mail, Home, Info, Headset } from 'lucide-react';
import api from "@/app/api";

const Footer = () => {
  const [settings, setSettings] = useState({
    footerText: "",
    phone: "",
    facebookLink: "",
    instagramLink: "",
    whatsappLink: "",
  });

  // الإيميل ثابت بناءً على طلبك
  const contactEmail = "contact@aldawlia-publishing.com";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data || {});
      } catch (e) {
        // تجاهل الخطأ
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-sky-950 border-t-8 border-[#C5A059] pt-12 pb-8 mt-12 shadow-2xl relative" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-center md:text-right">

          {/* العمود الأول: روابط سريعة */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-sky-800 inline-block pb-2">روابط سريعة</h3>
            <ul className="flex flex-col gap-4 items-center md:items-start text-sky-200 font-medium whitespace-nowrap">
              <li>
                <Link href="/" className="flex items-center gap-3 hover:text-[#C5A059] hover:-translate-x-2 hover:font-bold hover:scale-105 transition-all duration-300">
                  <Home size={18} />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-3 hover:text-[#C5A059] hover:-translate-x-2 hover:font-bold hover:scale-105 transition-all duration-300">
                  <Info size={18} />
                  <span>عن الموقع</span>
                </Link>
              </li>
              <li>
                <Link href="/hikma-institute" className="group flex items-center gap-3 hover:text-[#C5A059] hover:-translate-x-2 hover:font-bold hover:scale-105 transition-all duration-300">
                  <Home size={18} className="opacity-0 w-0" />
                  <span className="w-2 h-2 rounded-full bg-sky-600 group-hover:bg-[#C5A059] transition-colors"></span>
                  <span>معهد الحكمة الدولي</span>
                </Link>
              </li>
              <li>
                <Link href="/aldawlia-distribution" className="group flex items-center gap-3 hover:text-[#C5A059] hover:-translate-x-2 hover:font-bold hover:scale-105 transition-all duration-300 ">
                  <Home size={18} className="opacity-0 w-0" />
                  <span className="w-2 h-2 rounded-full bg-sky-600 group-hover:bg-[#C5A059] transition-colors"></span>
                  <span>مؤسسة الدراسات الاستراتيجية</span>
                </Link>
              </li>
              <li>
                <Link href="/islamic-business-directory" className="group flex items-center gap-3 hover:text-[#C5A059] hover:-translate-x-2 hover:font-bold hover:scale-105 transition-all duration-300 ">
                  <Home size={18} className="opacity-0 w-0" />
                  <span className="w-2 h-2 rounded-full bg-sky-600 group-hover:bg-[#C5A059] transition-colors"></span>
                  <span>الدليل التجاري الاسلامي</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثاني: السوشيال ميديا وتواصل مباشر */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-sky-800 inline-block pb-2">تابعنا وتواصل معنا</h3>
            <div className="flex flex-col gap-6 items-center md:items-start">
              {/* أيقونات السوشيال */}
              <div className="flex gap-4">
                <a className="bg-white p-3 rounded-full text-gray-700 hover:bg-gray-200 hover:scale-110 transition-all shadow-md">
                  <Facebook size={20} className="text-gray-700" />
                </a>
                <a className="bg-white p-3 rounded-full text-gray-700 hover:bg-gray-200 hover:scale-110 transition-all shadow-md flex items-center justify-center">
                  <Instagram size={20} className="text-gray-700" />
                </a>
                <a className="bg-white p-3 rounded-full text-gray-700 hover:bg-gray-200 hover:scale-110 transition-all shadow-md">
                  <MessageCircle size={20} className="text-gray-700" />
                </a>
              </div>

              {/* الإيميل والهاتف */}
              <div className="flex flex-col gap-4 items-center md:items-start text-sky-200 text-sm font-medium">
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 hover:text-[#C5A059] transition-colors bg-sky-900 px-4 py-2 rounded-lg border border-sky-800 w-full justify-center md:justify-start">
                  <Mail size={16} className="text-[#C5A059]" />
                  <span>{contactEmail}</span>
                </a>
                {settings.phone && (
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-3 hover:text-[#C5A059] transition-colors bg-sky-900 px-4 py-2 rounded-lg border border-sky-800 w-full justify-center md:justify-start" dir="ltr">
                    <Phone size={16} className="text-[#C5A059]" />
                    <span>{settings.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* العمود الثالث: عن المتجر */}
          <div className="md:pl-4">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-black text-white tracking-wider">الدار <span className="text-[#C5A059]">الدولية للتوزيع والنشر</span></h2>
            </Link>
            <p className="text-sky-200 text-sm leading-loose font-medium mb-6">
              منصة متخصصة في نشر وتوزيع الكتب الإلكترونية والأبحاث الاستراتيجية، نهتم بإيصال المعرفة لكل قارئ عربي بسهولة وأمان من خلال تجربة رقمية فريدة وموثوقة.
            </p>
          </div>
        </div>

        <div className="border-t border-sky-800 my-8"></div>

        <div className="text-center text-sky-300 text-sm font-light uppercase tracking-widest flex flex-col md:flex-row justify-center items-center gap-2">
          <span>{settings.footerText || `© ${new Date().getFullYear()} الدولية للنشر.`}</span>
          <span className="hidden md:inline">|</span>
          <span>جميع الحقوق محفوظة</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;