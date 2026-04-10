"use client";
import React from 'react';
import { MotionScroll, FadeInItem } from "@/app/(library)/components/motionScroll";
import { MessageCircle, CheckCircle2, Truck, BarChart3 } from "lucide-react";

const IslamicDirectoryPage = () => {
    const whatsappLink = "https://wa.me/12017059422";

    return (
        <div className="bg-white text-right font-sans selection:bg-amber-100 text-gray-800" dir="rtl">
            
            {/* --- Hero Section (بدون أزرار) --- */}
            <header className="relative bg-[#0c4a6e] py-24 px-6 border-b-[6px] border-[#d97706]">
                <FadeInItem className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">الدليل التجاري الإسلامي</h1>
                    <p className="text-xl md:text-2xl text-[#d97706] font-bold mb-6">دليلك لأعمال موثوقة من مجتمعك</p>
                    <p className="text-lg text-sky-50 max-w-3xl mx-auto leading-relaxed">
                        اكتشف أفضل الخدمات والمهن من العرب والمسلمين في منطقتك.
                    </p>
                </FadeInItem>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16">
                
                {/* --- Section 1: About (بدون أزرار) --- */}
                <MotionScroll className="grid lg:grid-cols-2 gap-16 mb-24">
                    <FadeInItem>
                        <h2 className="text-3xl font-black text-[#0c4a6e] mb-8 border-r-8 border-[#d97706] pr-4">
                            ABOUT Muslim BUSINESS DIRECTORY
                        </h2>
                        <div className="space-y-6 text-lg">
                            <p className="italic text-sky-900 font-medium">
                                - The Muslim BUSINESS DIRECTORY is issued under the auspices of the --Islamic society of Bay ridge Brooklyn, New York, and International Publication house LCC in New Jersey.
                            </p>
                            <ul className="space-y-3 font-semibold text-gray-700">
                                <li>• The Muslim Business Directory covers the east of the United States.</li>
                                <li>• The directory is distributed free of charge to Arab and Islamic shops, Islamic centers and institutions act.</li>
                                <li>• The Muslim BUSINESS DIRECTORY is issued of each year.</li>
                                <li>• The first issue of The Muslim BUSINESS DIRECTORY was in 1990.</li>
                            </ul>
                            <hr className="border-sky-100" />
                            <div className="space-y-4 font-bold text-[#0c4a6e]">
                                <p>• يصدر الدليل برعاية كلاً من المركز الإسلامي في بيردج بروكلين نيويورك والدار الدولية للنشر والتوزيع بنيوجرسي.</p>
                                <p>• الدليل التجاري الإسلامي يغطي شرق الولايات المتحدة.</p>
                                <p>• يوزع الدليل مجاناً على المحلات العربية والإسلامية وعلي المراكز والمؤسسات الإسلامية.</p>
                                <p>• أول عدد صدر من الدليل كان عام 1990 ومازال يصدر إلى الآن 2026.</p>
                            </div>
                        </div>
                    </FadeInItem>

                    <FadeInItem className="bg-[#0c4a6e] text-white p-10 rounded-[3rem] shadow-xl">
                        <h3 className="text-2xl font-black mb-8 text-[#d97706] border-b border-white/10 pb-4">🧾 صاحب عمل (Business Owner)</h3>
                        <div className="space-y-6">
                            {["يدخل قسم الدليل", "ينشئ حساب", "يضيف نشاطه", "يظهر في الدليل", "يحصل على عملاء"].map((step, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-[#d97706] text-white flex items-center justify-center font-black">{i + 1}</span>
                                    <p className="text-xl font-bold">{step}</p>
                                </div>
                            ))}
                        </div>
                    </FadeInItem>
                </MotionScroll>

                {/* --- Section 2: Distribution & Logistics --- */}
                <MotionScroll className="grid md:grid-cols-2 gap-8 mb-24">
                    <FadeInItem className="bg-[#d97706] text-white p-10 rounded-[2.5rem] shadow-lg">
                        <h3 className="text-3xl font-black mb-4 flex items-center gap-3"><Truck /> خدمات التوزيع</h3>
                        <p className="text-xl font-bold mb-2 text-[#0c4a6e]">نصل بمنتجك إلى جمهورك</p>
                        <p className="text-lg opacity-90 leading-relaxed font-medium">شبكة توزيع فعالة تغطي الأسواق المحلية.</p>
                    </FadeInItem>
                    <FadeInItem className="bg-slate-50 p-10 rounded-[2.5rem] border-2 border-sky-100">
                        <h3 className="text-3xl font-black text-[#0c4a6e] mb-4 flex items-center gap-3">📊 دراسات الجدوى</h3>
                        <p className="text-lg text-gray-700 leading-relaxed font-bold">نساعدك على تحويل فكرتك إلى مشروع واقعي من خلال دراسات دقيقة وتحليل شامل للسوق، لضمان اتخاذ قرارات مدروسة.</p>
                    </FadeInItem>
                </MotionScroll>

                {/* --- Section 3: Detailed Feasibility --- */}
                <section className="mb-24">
                    <MotionScroll className="bg-[#0c4a6e] text-white rounded-[3rem] p-10 md:p-16 shadow-2xl">
                        <FadeInItem className="text-center mb-12">
                            <h2 className="text-4xl font-black mb-6 text-[#d97706]">المؤسسة الدولية لدراسات الجدوى</h2>
                            <p className="text-xl leading-relaxed opacity-90">في عالم New York City و New Jersey، النجاح يتطلب تخطيطاً دقيقاً وتحليلاً ذكياً.</p>
                        </FadeInItem>

                        <div className="grid md:grid-cols-2 gap-12 mb-12">
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-[#d97706]">💡 لماذا دراسات الجدوى مهمة؟</h4>
                                <p className="opacity-80 leading-relaxed font-medium">خريطة طريق متكاملة تساعدك على فهم قابلية النجاح، رأس المال المطلوب، الأرباح المتوقعة، والمنافسين.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="text-xl font-bold text-[#d97706] mb-4">🔍 ماذا نقدم لك؟</h4>
                                <ul className="grid grid-cols-2 gap-3 text-sm font-bold">
                                    <li>✔️ دراسة السوق</li>
                                    <li>✔️ الدراسة المالية</li>
                                    <li>✔️ الدراسة التشغيلية</li>
                                    <li>✔️ تحليل المخاطر</li>
                                </ul>
                            </div>
                        </div>

                        <FadeInItem className="text-center border-t border-white/10 pt-10 font-bold">
                            <p className="text-xl mb-4 text-[#d97706]">حوّل فكرتك إلى مشروع ناجح</p>
                            <p className="text-sm opacity-70">متخصصون في دراسات الجدوى غير التقليدية مثل الجامعات والمدارس الخاصة والمصانع بجميع أنواعها.</p>
                        </FadeInItem>
                    </MotionScroll>
                </section>

                {/* --- Section 4: Blog (بدون أزرار) --- */}
                <MotionScroll className="mb-24">
                    <h3 className="text-3xl font-black text-[#0c4a6e] text-center mb-10 uppercase tracking-widest">المدونة (Blog)</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {["كيف تبدأ مشروعك في أمريكا؟", "أخطاء القروض", "التسويق للمشاريع الصغيرة"].map((blog, i) => (
                            <div key={i} className="bg-sky-50 p-8 rounded-2xl font-black text-[#0c4a6e] border-b-8 border-[#d97706] text-center shadow-sm">
                                {blog}
                            </div>
                        ))}
                    </div>
                </MotionScroll>

                {/* --- FINAL CALL TO ACTION (الزر الوحيد) --- */}
                <FadeInItem className="text-center p-12 bg-slate-50 rounded-[3rem] border-2 border-dashed border-[#0c4a6e]">
                    <h3 className="text-3xl font-black text-[#0c4a6e] mb-4">لو لديك أي سؤال لا تتردد أن تتصل بنا</h3>
                    <p className="text-2xl font-black text-[#d97706] mb-10 tracking-widest">9422 - 705-201</p>
                    
                    <a 
                        href={whatsappLink} 
                        target="_blank" 
                        className="inline-flex items-center gap-4 bg-[#d97706] hover:bg-[#b45309] text-white font-black px-16 py-6 rounded-2xl shadow-2xl transition-all hover:scale-105 text-2xl"
                    >
                        <MessageCircle size={32} />
                        تواصل واتساب أو اطلب دراسة جدوى
                    </a>
                </FadeInItem>

            </main>

            <footer className="bg-[#082f49] text-white py-12 px-6 border-t-8 border-[#d97706]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-right">
                        <h4 className="text-2xl font-black italic">Muslim Business Directory</h4>
                        <p className="text-[#d97706] font-bold text-sm tracking-[0.3em] uppercase">Since 1990 • 2026</p>
                    </div>
                    <div className="text-center md:text-left text-xs opacity-50 font-bold">
                        <p>International House for Distribution LLC</p>
                        <p>Brooklyn, NY | New Jersey, USA</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default IslamicDirectoryPage;