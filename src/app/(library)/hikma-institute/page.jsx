"use client";
import React from 'react';
import Link from 'next/link';
// استيراد الكومبوننتس الخاصة بالحركة 
// 1. أيقونات التنقل والتحكم
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';

// 2. أيقونات الثقة والضمان
import Check from 'lucide-react/dist/esm/icons/check';
import Shield from 'lucide-react/dist/esm/icons/shield';

// 3. أيقونات الانتشار والمواقع
import Globe from 'lucide-react/dist/esm/icons/globe';
import Map from 'lucide-react/dist/esm/icons/map';

// 4. أيقونات التحليل والتعليم
import BarChart from 'lucide-react/dist/esm/icons/bar-chart';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';

// 5. أيقونات الفريق والمجتمع
import Users from 'lucide-react/dist/esm/icons/users';
import { MotionScroll, FadeInItem } from "@/app/(library)/components/motionScroll";
import { useTranslation } from 'react-i18next';

export const dynamic = 'force-static';

export default function AlhekmaInstitutePage() {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    return (
        <div className="bg-white text-right font-sans leading-relaxed text-gray-800" dir={isAr ? 'rtl' : 'ltr'}>

            {/* 1. Header & Official Identity */}
            <header
                className="w-full py-10 px-8 text-white border-b-[6px]"
                style={{
                    backgroundColor: '#0c4a6e',
                    backgroundImage: 'linear-gradient(to left, #0c4a6e, #075985)',
                    borderColor: '#d97706'
                }}
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 relative">
                    {/* زر العودة */}
                    <Link 
                        href="/" 
                        className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} flex items-center gap-2 text-amber-500 hover:text-white transition-colors group mb-4 md:mb-0`}
                    >
                        <ArrowLeft size={20} className={`${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'} transition-transform`} />
                        <span>{t('hikma_institute.back')}</span>
                    </Link>

                    <FadeInItem className="flex-shrink-0 mt-8 md:mt-0">
                        <img
                            src="/logo-instatute.jpeg"
                            alt="لوجو معهد الحكمة"
                            className="w-24 h-24 md:w-36 md:h-36 object-contain bg-white p-2 rounded-2xl shadow-lg border-2 border-amber-600"
                        />
                    </FadeInItem>

                    <FadeInItem delay={0.2} className={`${isAr ? 'text-right' : 'text-left'} flex-grow`}>
                        <h1 className="text-3xl md:text-5xl font-black mb-2 text-white">{t('hikma_institute.hero.title')}</h1>
                        <p className="text-xl md:text-2xl font-bold tracking-widest mb-4 uppercase text-amber-600">{t('hikma_institute.hero.english_name')}</p>

                        <div className="bg-sky-800 bg-opacity-70 inline-block px-5 py-2 rounded-lg border border-sky-600">
                            <p className="text-xl md:text-2xl font-bold italic text-white">{t('hikma_institute.hero.motto')}</p>
                        </div>

                        <div className="mt-6 text-base opacity-95 leading-relaxed text-white">
                            <p className="font-bold text-amber-600 mb-1">{t('hikma_institute.hero.identity_label')}</p>
                            <p>{t('hikma_institute.hero.official_name')}</p>
                            <p>{t('hikma_institute.hero.legal_affiliation')}</p>
                        </div>
                    </FadeInItem>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* 2. The Core Idea */}
                <FadeInItem className="mb-12">
                    <h3 className={`text-3xl font-bold text-sky-900 mb-6 border-amber-600 ${isAr ? 'border-r-8 pr-4 text-right' : 'border-l-8 pl-4 text-left'}`}>
                        {t('hikma_institute.core_idea.title')}
                    </h3>
                    <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
                        <p className={`text-lg md:text-xl leading-relaxed mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                            {t('hikma_institute.core_idea.desc')}
                        </p>
                        <p className="font-bold text-sky-800 mb-6 text-center text-lg md:text-xl">{t('hikma_institute.core_idea.focus_label')}</p>
                        <MotionScroll className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {t('hikma_institute.core_idea.items', { returnObjects: true }).map((item, idx) => (
                                <div 
                                    key={idx}
                                    className="bg-white p-6 rounded-2xl shadow-md font-bold text-center border-b-4 border-sky-600 text-sky-900 text-lg hover:-translate-y-1 transition-transform"
                                >
                                    {item}
                                </div>
                            ))}
                        </MotionScroll>
                        <p className="mt-8 text-center italic text-gray-500 text-lg">{t('hikma_institute.core_idea.footer_desc')}</p>
                    </div>
                </FadeInItem>

                {/* 3. Vision, Mission, Values & About */}
                <section className="mb-12 grid lg:grid-cols-2 gap-8">
                    <FadeInItem className="space-y-8">
                        <div className={`p-6 bg-sky-50 rounded-2xl border-sky-900 shadow-sm ${isAr ? 'border-r-4 text-right' : 'border-l-4 text-left'}`}>
                            <h4 className={`font-bold text-sky-900 text-2xl mb-4 flex items-center gap-2 ${!isAr && 'flex-row'}`}><BookOpen className="text-sky-900" /> {t('hikma_institute.about.title')}</h4>
                            <p className="text-lg leading-relaxed">{t('hikma_institute.about.desc')}</p>
                        </div>
                        <div className={`p-6 bg-white border border-sky-200 rounded-2xl shadow-sm ${isAr ? 'text-right' : 'text-left'}`}>
                            <h4 className="font-bold text-sky-900 text-2xl mb-4 flex items-center gap-2"><Globe className="text-sky-900" /> {t('hikma_institute.vision.title')}</h4>
                            <p className="text-lg leading-relaxed">{t('hikma_institute.vision.desc')}</p>
                        </div>
                    </FadeInItem>
                    
                    <FadeInItem delay={0.2} className="space-y-8">
                        <div className={`p-6 bg-sky-900 text-white rounded-2xl shadow-lg ${isAr ? 'text-right' : 'text-left'}`}>
                            <h4 className="font-bold text-amber-600 text-2xl mb-4 flex items-center gap-2"><Shield className="text-amber-600" /> {t('hikma_institute.mission.title')}</h4>
                            <p className="text-lg leading-relaxed text-white">{t('hikma_institute.mission.desc')}</p>
                        </div>
                        <div className={`p-6 bg-sky-50 rounded-2xl border-2 border-amber-600 shadow-sm ${isAr ? 'text-right' : 'text-left'}`}>
                            <h4 className="font-bold text-sky-900 text-2xl mb-4">{t('hikma_institute.values.title')}</h4>
                            <p className="text-lg font-bold text-sky-800 leading-relaxed">{t('hikma_institute.values.desc')}</p>
                        </div>
                    </FadeInItem>
                </section>

                {/* 4. Strategic Objectives */}
                <FadeInItem className="mb-12">
                    <h4 className={`text-3xl font-bold text-sky-900 mb-8 border-amber-600 ${isAr ? 'border-r-4 pr-4 text-right' : 'border-l-4 pl-4 text-left'}`}>
                        {t('hikma_institute.objectives.title')}
                    </h4>
                    <MotionScroll className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
                        {t('hikma_institute.objectives.items', { returnObjects: true }).map((text, i) => (
                            <div 
                                key={i} 
                                className="bg-white border border-gray-200 p-5 rounded-xl flex items-center gap-4 shadow-sm hover:scale-[1.02] transition-transform"
                            >
                                <span className="bg-sky-100 text-sky-900 w-10 h-10 flex items-center justify-center rounded-full text-lg font-black flex-shrink-0">{i + 1}</span>
                                <p className={`font-medium leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>{text}</p>
                            </div>
                        ))}
                    </MotionScroll>
                </FadeInItem>

                {/* 5. Activities & Domains */}
                <FadeInItem className="grid lg:grid-cols-2 gap-12 mb-12 p-8 bg-sky-50 rounded-[2rem] border border-sky-100 shadow-sm">
                    <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                        <h4 className="text-2xl font-bold text-sky-900 mb-8 underline decoration-amber-600 underline-offset-8">{t('hikma_institute.domains.title')}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-bold">
                            {t('hikma_institute.domains.items', { returnObjects: true }).map((domain, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-gray-100">
                                    <span className="text-amber-600 text-xl">●</span> {domain}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                        <h4 className="text-2xl font-bold text-sky-900 mb-8 underline decoration-amber-600 underline-offset-8">{t('hikma_institute.activities.title')}</h4>
                        <ul className="space-y-6 text-lg font-medium">
                            {t('hikma_institute.activities.items', { returnObjects: true }).map((activity, i) => (
                                <li key={i} className="flex items-start gap-4 p-2">
                                    <span className="text-sky-700 bg-sky-100 p-1 rounded-full text-sm mt-1"><Check size={16} /></span>
                                    <span className="leading-relaxed">{activity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeInItem>

                {/* 6. Research Departments */}
                <FadeInItem className="mb-12 py-12 px-6 md:px-10 bg-white border border-gray-200 rounded-[3rem] shadow-sm">
                    <h3 className="text-3xl font-black text-sky-900 mb-12 text-center underline decoration-amber-600 underline-offset-8">{t('hikma_institute.departments.title')}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                        {/* الأقسام الثلاثة الرئيسية */}
                        {t('hikma_institute.departments.main', { returnObjects: true }).map((dept, i) => (
                            <div key={i} className={`bg-gray-50 p-6 md:p-8 rounded-3xl shadow-sm border-t-8 border-sky-900 ${isAr ? 'text-right' : 'text-left'}`}>
                                <h5 className={`font-bold text-sky-900 text-xl mb-4 flex items-center gap-2 ${!isAr && 'flex-row'}`}>
                                    {i === 0 ? <Map size={20} /> : i === 1 ? <Shield size={20} /> : <Globe size={20} />}
                                    {dept.t}
                                </h5>
                                <p className="text-sm text-gray-500 mb-4 italic">{dept.s}</p>
                                <ul className="text-sm space-y-3 font-semibold">
                                    {dept.i.map((item, idx) => <li key={idx}>• {item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {t('hikma_institute.departments.others', { returnObjects: true }).map((dept, i) => (
                            <div 
                                key={i} 
                                className={`bg-sky-900 text-white p-6 rounded-2xl border-amber-600 shadow-lg flex flex-col justify-center hover:-translate-y-2 transition-transform ${isAr ? 'border-r-8 text-right' : 'border-l-8 text-left'}`}
                            >
                                <h6 className="font-bold text-lg mb-3 text-amber-600 leading-relaxed">{dept.n}</h6>
                                <p className="text-sm text-white leading-relaxed">{dept.t}</p>
                            </div>
                        ))}
                    </div>
                </FadeInItem>

                {/* 7. Strategic Specialized Units */}
                <FadeInItem className="mb-16">
                    <h4 className={`text-3xl font-bold text-sky-900 mb-10 border-amber-600 ${isAr ? 'border-r-4 pr-4 text-right' : 'border-l-4 pl-4 text-left'}`}>
                        {t('hikma_institute.specialized_units.title')}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {t('hikma_institute.specialized_units.items', { returnObjects: true }).map((unit, i) => (
                            <div key={i} className={`p-6 border border-gray-200 bg-white shadow-sm rounded-2xl hover:border-sky-300 transition-all ${i === 4 ? 'lg:col-span-2' : ''} ${isAr ? 'text-right' : 'text-left'}`}>
                                <h5 className="font-bold text-sky-900 mb-3 text-lg">{unit.t}</h5>
                                <p className="text-base leading-relaxed font-medium">{unit.d}</p>
                            </div>
                        ))}
                    </div>
                </FadeInItem>

                {/* 8. Future Institutional Structure */}
                <FadeInItem className="mb-4 bg-gray-900 text-white py-12 px-6 md:px-10 rounded-[3rem] shadow-2xl">
                    <h4 className="text-3xl font-bold text-amber-600 mb-10 text-center">{t('hikma_institute.future.title')}</h4>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {t('hikma_institute.future.items', { returnObjects: true }).map((name, i) => (
                            <span 
                                key={i} 
                                className="bg-sky-900 px-6 py-4 rounded-xl text-base md:text-lg font-bold border border-sky-600 shadow-md hover:bg-amber-600 transition-colors cursor-default text-center text-white"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                    <p className="mt-12 text-center text-xl md:text-2xl font-black italic text-amber-600 tracking-widest">{t('hikma_institute.hero.motto')}</p>
                </FadeInItem>

            </main>

            {/* Footer Branding */}
            <footer className="bg-sky-950 text-white py-16 px-8 text-center border-t-8 border-amber-600">
                <div className="max-w-4xl mx-auto">
                    <h5 className="text-2xl md:text-3xl font-black mb-3 tracking-widest uppercase">{t('hikma_institute.hero.english_name')}</h5>
                    <p className="text-base md:text-lg opacity-80 italic mb-8 tracking-[0.2em] text-amber-600">{t('hikma_institute.hero.english_subtitle')}</p>
                    <div className="w-24 h-1 bg-amber-600 mx-auto mb-8 rounded-full"></div>
                    <div className="text-sm opacity-75 uppercase leading-relaxed font-light">
                        {t('hikma_institute.footer.rights1')}
                        <br />
                        {t('hikma_institute.footer.rights2')}
                    </div>
                </div>
            </footer>
        </div>
    );
}