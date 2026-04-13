"use client";
import React from 'react';
import { MotionScroll, FadeInItem } from "@/app/(library)/components/motionScroll";
import { useTranslation, Trans } from 'react-i18next';

export const dynamic = 'force-static';

export default function CompactOfficialAboutPage() {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    return (
        /* تم تغيير text-right إلى ديناميكي يعتمد على اللغة */
        <div className={`bg-white ${isAr ? 'text-right' : 'text-left'} font-sans leading-relaxed text-gray-800 overflow-hidden`} dir={isAr ? 'rtl' : 'ltr'}>

            {/* 1. Header & Official Identity */}
            <section
                className="w-full py-12 px-8 text-white border-b-[6px]"
                style={{
                    backgroundColor: '#0c4a6e',
                    backgroundImage: 'linear-gradient(to left, #0c4a6e, #075985)',
                    borderColor: '#d97706'
                }}
            >
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
                    <FadeInItem>
                        <h1 className="text-3xl md:text-5xl font-black mb-1 text-white">
                            {t('about.title')}
                        </h1>
                    </FadeInItem>

                    <FadeInItem delay={0.2}>
                        <div className="bg-sky-800 bg-opacity-70 inline-block px-6 py-3 rounded-lg border border-sky-600 shadow-sm">
                            <p className="text-xl md:text-2xl font-bold italic text-white tracking-wide">
                                {t('about.motto')}
                            </p>
                        </div>
                    </FadeInItem>

                    <FadeInItem delay={0.4} className="max-w-4xl mt-6 text-base md:text-lg leading-relaxed text-gray-100 flex flex-col gap-2">
                        <p className="font-bold text-amber-600 text-xl mb-2">{t('about.subtitle1')}</p>
                        <p>{t('about.subtitle2')}</p>
                        <p>{t('about.subtitle3')}</p>
                        <p>{t('about.subtitle4')}</p>
                        <p>{t('about.subtitle5')}</p>
                        <p className="font-bold mt-2">{t('about.subtitle6')}</p>
                    </FadeInItem>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* 2. Who We Are */}
                <FadeInItem className="mb-14">
                    {/* تعديل الـ Padding والـ Border حسب اللغة */}
                    <h3 className={`text-3xl font-bold text-sky-900 mb-8 border-amber-600 ${isAr ? 'border-r-8 pr-4' : 'border-l-8 pl-4'}`}>
                        {t('about.who_we_are.title')}
                    </h3>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6">
                        <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                            <Trans i18nKey="about.who_we_are.description1">
                                تأسست <span className="font-bold text-sky-800">الدار الدولية للنشر والتوزيع عام 1987</span> بولاية نيوجيرسي، وتعتبر من أوائل الدور العربية والإسلامية في الولايات المتحدة الأمريكية ولها حوالي ما يقرب من <span className="font-bold text-amber-600">200 كتاب</span> في جميع مجالات النشر سواء الإسلامية أو الأدبية أو السياسية أو مقارنة الأديان وكذلك كتب الأطفال باللغة العربية والإنجليزية والإسبانية.
                            </Trans>
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                            <Trans i18nKey="about.who_we_are.description2">
                                ومن أشهر إصداراتها <span className="font-bold text-sky-900 underline decoration-amber-600 decoration-2 underline-offset-4">الدليل التجاري الإسلامي</span> الذي يصدر في شرق الولايات المتحدة منذ عام 1990 وحتى 2025.
                            </Trans>
                        </p>

                        <div className="mt-4 pt-6 flex flex-wrap gap-6 text-base font-bold border-t-2 border-gray-200">
                            <p className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-gray-700">📍 {t('about.footer.location')}</p>
                            <p className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-gray-700">☎ {t('about.footer.phone')}</p>
                            <p className="bg-sky-100 p-3 rounded-xl border border-sky-200 shadow-sm text-sky-800">✉ {t('about.footer.email1')}</p>
                            <p className="bg-sky-100 p-3 rounded-xl border border-sky-200 shadow-sm text-sky-800">✉ {t('about.footer.email2')}</p>
                        </div>
                    </div>
                </FadeInItem>

                {/* 3. Institutional Structure */}
                <section className="mb-14">
                    <FadeInItem className="text-center mb-10">
                        <h3 className="text-4xl font-black text-sky-900 mb-3">{t('about.structure.title')}</h3>
                        <p className="text-lg md:text-xl text-amber-600 font-bold tracking-widest">{t('about.structure.subtitle')}</p>
                        <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 rounded-full"></div>
                    </FadeInItem>

                    <MotionScroll className="grid lg:grid-cols-3 gap-8">
                        <div className="bg-white border text-center border-gray-200 p-8 rounded-3xl shadow-sm border-t-8 border-t-sky-800">
                            <div className="bg-sky-100 text-sky-900 w-14 h-14 flex items-center justify-center rounded-full text-2xl font-black mx-auto mb-6">1</div>
                            <h5 className="font-bold text-sky-900 text-2xl mb-4">{t('about.structure.item1_title')}</h5>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">{t('about.structure.item1_desc')}</p>
                        </div>

                        <div className="bg-white border text-center border-gray-200 p-8 rounded-3xl shadow-sm border-t-8 border-t-sky-800">
                            <div className="bg-sky-100 text-sky-900 w-14 h-14 flex items-center justify-center rounded-full text-2xl font-black mx-auto mb-6">2</div>
                            <h5 className="font-bold text-sky-900 text-2xl mb-4">{t('about.structure.item2_title')}</h5>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">{t('about.structure.item2_desc')}</p>
                        </div>

                        <div className="bg-white lg:bg-sky-900 border text-center border-gray-200 lg:border-sky-800 p-8 rounded-3xl shadow-lg border-b-8 border-b-amber-600">
                            <div className="bg-sky-100 lg:bg-white text-sky-900 w-14 h-14 flex items-center justify-center rounded-full text-2xl font-black mx-auto mb-6 shadow-md border-2 border-amber-600">3</div>
                            <h5 className="font-bold text-sky-900 lg:text-white text-2xl mb-2">{t('about.structure.item3_title')}</h5>
                            <p className="font-bold text-amber-600 italic mb-4 text-lg">{t('about.structure.item3_subtitle')}</p>
                            <p className="text-base text-gray-600 lg:text-gray-200 leading-relaxed">{t('about.structure.item3_desc')}</p>
                        </div>
                    </MotionScroll>
                </section>

                {/* 4. Research Units */}
                <FadeInItem className="mb-14 p-8 bg-sky-50 rounded-[2rem] border border-sky-100 shadow-sm">
                    <h4 className={`text-2xl font-bold text-sky-900 mb-8 border-amber-600 ${isAr ? 'border-r-4 pr-4' : 'border-l-4 pl-4'}`}>
                        {t('about.units.title')}
                    </h4>

                    <MotionScroll className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-lg font-bold">
                        {(() => {
                            const units = t('about.units.items', { returnObjects: true });
                            return Array.isArray(units) ? (
                                units.map((unit, i) => (
                                    <div
                                        key={i}
                                        className="bg-white p-5 rounded-xl flex items-center justify-center text-center shadow-sm border border-gray-100 text-sky-900 h-full"
                                    >
                                        {unit}
                                    </div>
                                ))
                            ) : null;
                        })()}
                    </MotionScroll>
                </FadeInItem>

                {/* 5. Philosophy & Vision */}
                <div className="mb-14 grid lg:grid-cols-2 gap-8">
                    <FadeInItem className={`p-8 bg-white border border-gray-200 rounded-3xl shadow-sm border-amber-600 ${isAr ? 'border-r-8' : 'border-l-8'}`}>
                        <h4 className="font-bold text-sky-900 text-2xl mb-4">{t('about.vision.title')}</h4>
                        <p className="text-xl leading-relaxed text-gray-700">{t('about.vision.desc')}</p>
                    </FadeInItem>
                    <FadeInItem className="p-8 bg-sky-900 text-white rounded-3xl shadow-lg border-2 border-sky-800">
                        <h4 className="font-bold text-amber-600 text-2xl mb-4">{t('about.values.title')}</h4>
                        <p className="text-xl leading-relaxed mb-2">{t('about.values.desc')}</p>
                        <p className="text-base text-gray-300 italic">{t('about.values.motto')}</p>
                    </FadeInItem>
                </div>

                {/* 6. Strategic School */}
                <FadeInItem className="mb-14">
                    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-grow">
                            <h4 className="text-3xl font-black text-sky-900 mb-4">{t('about.school.title')}</h4>
                            <p className="text-lg md:text-xl text-gray-700 mb-6 font-medium leading-relaxed">
                                {t('about.school.desc')}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {t('about.school.items', { returnObjects: true }).map((item, idx) => (
                                    <div key={idx} className="bg-white text-sky-800 font-bold px-4 py-3 rounded-lg border border-sky-100 shadow-sm text-center">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:flex flex-shrink-0 bg-sky-900 border-4 border-amber-600 text-white rounded-full w-32 h-32 items-center justify-center shadow-lg font-black text-3xl">
                            IWI
                        </div>
                    </div>
                </FadeInItem>

                {/* 7. Goals */}
                <section className="mb-10">
                    <FadeInItem>
                        <h4 className={`text-3xl font-bold text-sky-900 mb-8 border-amber-600 ${isAr ? 'border-r-4 pr-4' : 'border-l-4 pl-4'}`}>
                            {t('about.goals.title')}
                        </h4>
                    </FadeInItem>
                    <MotionScroll className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
                        {t('about.goals.items', { returnObjects: true }).map((text, i) => (
                            <div key={i} className="bg-white border border-gray-200 p-5 rounded-xl flex items-center gap-4 shadow-sm h-full">
                                <span className="bg-sky-100 text-sky-900 w-10 h-10 flex items-center justify-center rounded-full text-lg font-black flex-shrink-0">{i + 1}</span>
                                <p className="font-medium text-gray-800 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </MotionScroll>
                </section>

            </main>

            {/* Footer */}
            <FadeInItem className="bg-gray-900 text-white rounded-t-[3rem] py-16 px-8 text-center mt-12">
                <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
                    <p className="text-2xl md:text-3xl font-black italic text-amber-600 tracking-wider leading-relaxed">
                        {t('about.footer.quote')}
                    </p>
                    <div className="w-24 h-1 bg-gray-700 mx-auto my-4 rounded-full"></div>
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-gray-300 font-medium text-lg">
                        <span className="bg-gray-800 px-6 py-3 rounded-xl border border-gray-700">📍 {t('about.footer.location')}</span>
                        <span className="bg-gray-800 px-6 py-3 rounded-xl border border-gray-700">📞 {t('about.footer.phone')}</span>
                    </div>
                    <div className="mt-6 text-sm text-gray-500 uppercase tracking-widest font-light">
                        {t('about.footer.rights')}
                    </div>
                </div>
            </FadeInItem>
        </div>
    );
}