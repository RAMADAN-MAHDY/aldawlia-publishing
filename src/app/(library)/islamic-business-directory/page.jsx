"use client";
import React from 'react';
import Image from "next/image";
import { MotionScroll, FadeInItem } from "@/app/(library)/components/motionScroll";
import { MessageCircle, Phone, CheckCircle2, Truck } from "lucide-react";
import { useTranslation, Trans } from 'react-i18next';

export const dynamic = 'force-static';

const IslamicDirectoryPage = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const whatsappNumber = "+12017059422";
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

    return (
        <div className="bg-white text-right font-sans selection:bg-orange-100" dir={isAr ? 'rtl' : 'ltr'}>
            
            {/* --- Hero Section --- */}
            <header className="relative bg-sky-900 py-16 md:py-24 px-2 overflow-hidden border-b-8 border-[#d97706]">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] shadow-inner"></div>
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10">
                    
                    {/* المحتوى النصي */}
                    <FadeInItem className={isAr ? 'text-right' : 'text-left'}>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            <Trans 
                                i18nKey="islamic_business.hero.title"
                                components={{
                                    br: <br />,
                                    span: <span className="text-[#d97706]" />
                                }}
                            />
                        </h1>
                        <p className="text-xl md:text-2xl text-[#d97706] font-bold mb-8">{t('islamic_business.hero.subtitle')}</p>
                        
                        <div className="text-lg text-sky-50 max-w-xl leading-relaxed mb-10 space-y-4">
                            <p>{t('islamic_business.hero.description')}</p>
                            
                            <div className={`border-[#d97706] py-2 bg-white/5 rounded-lg ${isAr ? 'border-r-4 pr-4' : 'border-l-4 pl-4'}`}>
                                {t('islamic_business.hero.points', { returnObjects: true }).map((point, idx) => (
                                    <p key={idx} className={`text-sky-100 font-medium ${idx > 0 ? 'mt-2' : ''}`}>
                                        • {point}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a 
                                href={whatsappLink}
                                target="_blank"
                                className="bg-[#d97706] hover:bg-[#b45309] text-white font-black px-10 py-4 rounded-xl shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
                            >
                                <MessageCircle size={24} />
                                {t('islamic_business.hero.cta')}
                            </a>
                        </div>
                    </FadeInItem>

                    {/* الصورة */}
                    <FadeInItem className="relative w-full flex justify-center lg:justify-end">
                        <div className="relative w-[320px] h-[450px] md:w-[500px] md:h-[750px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                            <Image 
                                src="/imghome2.jpeg" 
                                alt="Islamic Business Directory"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 320px, 500px"
                            />
                        </div>
                    </FadeInItem>

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16">
                
                {/* --- Section 1: About --- */}
                <MotionScroll className="grid lg:grid-cols-2 gap-12 mb-24 items-start">
                    <FadeInItem className={isAr ? 'text-right' : 'text-left'}>
                        <h2 className={`text-3xl font-black text-sky-900 mb-8 border-[#d97706] ${isAr ? 'border-r-8 pr-4' : 'border-l-8 pl-4'}`}>
                            {t('islamic_business.about.title')}
                        </h2>
                        <div className="space-y-5 text-lg text-gray-700">
                            <p className="font-medium text-sky-800 leading-relaxed italic">
                                {t('islamic_business.about.desc_italic')}
                            </p>
                            <ul className="space-y-4">
                                {t('islamic_business.about.items', { returnObjects: true }).map((item, idx) => (
                                    <li key={idx} className="flex gap-3">
                                        <CheckCircle2 className="text-[#d97706] flex-shrink-0" /> 
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>
                            
                            <hr className="my-8 border-sky-100" />
                            
                            <ul className="space-y-4 font-bold text-sky-900 leading-relaxed">
                                {t('islamic_business.about.arabic_points', { returnObjects: true }).map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <a 
                            href={whatsappLink}
                            target="_blank"
                            className="mt-8 p-6 bg-sky-50 rounded-2xl border-2 border-dashed border-sky-200 flex items-center gap-6 hover:bg-sky-100 transition-colors group"
                        >
                            <div className="bg-sky-900 p-4 rounded-full text-white group-hover:scale-110 transition-transform"><Phone size={30} /></div>
                            <div>
                                <p className="font-bold text-sky-900">{t('islamic_business.about.contact_label')}</p>
                                <span className="text-3xl font-black text-[#d97706] tracking-tighter">{t('islamic_business.about.contact_number')}</span>
                            </div>
                        </a>
                    </FadeInItem>

                    <FadeInItem className={`bg-sky-900 text-white p-10 rounded-[2.5rem] shadow-2xl ${isAr ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-2xl font-bold mb-8 text-[#d97706] border-b border-white/10 pb-4 italic tracking-tighter">{t('islamic_business.owner.title')}</h3>
                        <div className="space-y-6 mb-10">
                            {t('islamic_business.owner.steps', { returnObjects: true }).map((step, index) => (
                                <div key={index} className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 rounded-full bg-[#d97706] text-white flex items-center justify-center font-black group-hover:scale-110 transition-transform">{index + 1}</span>
                                    <p className="text-xl font-medium tracking-tight">{step}</p>
                                </div>
                            ))}
                        </div>
                        <a 
                            href={whatsappLink}
                            target="_blank"
                            className="w-full bg-[#d97706] hover:bg-[#b45309] text-white text-center font-black py-5 rounded-xl shadow-lg block transition-all uppercase"
                        >
                            {t('islamic_business.owner.cta')}
                        </a>
                    </FadeInItem>
                </MotionScroll>

                {/* --- Section 2: Distribution --- */}
                <MotionScroll className="grid md:grid-cols-2 gap-8 mb-24">
                    <FadeInItem className={`bg-[#d97706] text-white p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-between ${isAr ? 'text-right' : 'text-left'}`}>
                        <div>
                            <h3 className="text-3xl font-black mb-4 flex items-center gap-3"><Truck /> {t('islamic_business.distribution.title')}</h3>
                            <p className="text-xl font-bold mb-2 text-sky-900">{t('islamic_business.distribution.subtitle')}</p>
                            <p className="text-lg opacity-90 leading-relaxed">{t('islamic_business.distribution.desc')}</p>
                        </div>
                        <a href={whatsappLink} target="_blank" className="mt-8 bg-sky-900 text-white font-black px-10 py-4 rounded-xl self-start hover:bg-sky-800 transition-all shadow-lg">{t('islamic_business.distribution.cta')}</a>
                    </FadeInItem>

                    <FadeInItem className={`bg-slate-50 p-10 rounded-[2.5rem] border-2 border-sky-100 flex flex-col justify-between shadow-inner ${isAr ? 'text-right' : 'text-left'}`}>
                        <div>
                            <h3 className="text-3xl font-black text-sky-900 mb-4 flex items-center gap-3">📊 {t('islamic_business.feasibility.title')}</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">{t('islamic_business.feasibility.desc')}</p>
                            <p className="font-bold text-[#d97706] text-xl">{t('islamic_business.feasibility.footer_title')}</p>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 font-bold italic">{t('islamic_business.feasibility.footer_desc')}</p>
                    </FadeInItem>
                </MotionScroll>

                {/* --- Section 3: Feasibility --- */}
                <section className="mb-24">
                    <MotionScroll className="bg-sky-900 text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="max-w-4xl mx-auto relative z-10">
                            <FadeInItem className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-black mb-8 text-[#d97706] underline underline-offset-8 decoration-white/20 uppercase tracking-tighter">
                                    {t('islamic_business.detailed_feasibility.title')}
                                </h2>
                                <p className="text-xl leading-relaxed opacity-90 font-medium">
                                    {t('islamic_business.detailed_feasibility.desc')}
                                </p>
                            </FadeInItem>

                            <div className="grid md:grid-cols-2 gap-12 mb-16">
                                <FadeInItem className={`space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
                                    <h4 className="text-2xl font-bold text-[#d97706] flex items-center gap-2">{t('islamic_business.detailed_feasibility.importance_title')}</h4>
                                    <p className="text-lg opacity-80 leading-loose">{t('islamic_business.detailed_feasibility.importance_desc')}</p>
                                </FadeInItem>
                                <FadeInItem className={`space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm ${isAr ? 'text-right' : 'text-left'}`}>
                                    <h4 className="text-2xl font-bold text-[#d97706] flex items-center gap-2">{t('islamic_business.detailed_feasibility.offering_title')}</h4>
                                    <div className="space-y-4 text-sm font-bold">
                                        {t('islamic_business.detailed_feasibility.offering_items', { returnObjects: true }).map((item, idx) => (
                                            <p key={idx} className="text-sky-300">{item}</p>
                                        ))}
                                    </div>
                                </FadeInItem>
                            </div>

                            <FadeInItem className="bg-white text-sky-900 p-10 rounded-[2.5rem] text-center shadow-2xl border-t-8 border-[#d97706]">
                                <h4 className="text-3xl font-black mb-6 italic underline underline-offset-4 decoration-[#d97706]">{t('islamic_business.detailed_feasibility.cta_title')}</h4>
                                <p className="text-lg font-bold mb-8 opacity-80">{t('islamic_business.detailed_feasibility.cta_desc')}</p>
                                
                                <a 
                                    href={whatsappLink} 
                                    target="_blank" 
                                    className="inline-flex items-center gap-4 bg-[#d97706] hover:bg-[#b45309] text-white font-black px-12 py-5 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                                >
                                    <MessageCircle size={28} />
                                    {t('islamic_business.detailed_feasibility.cta_button')}
                                </a>
                            </FadeInItem>
                        </div>
                    </MotionScroll>
                </section>
            </main>
        </div>
    );
};

export default IslamicDirectoryPage;