"use client";
import React from 'react';
import Image from "next/image";
import { MotionScroll, FadeInItem } from "@/app/(library)/components/motionScroll";
import { MessageCircle, Phone, CheckCircle2, BarChart3, Users, Truck, Globe } from "lucide-react";

const IslamicDirectoryPage = () => {
    const whatsappNumber = "+12017059422";
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

    return (
        <div className="bg-white text-right font-sans selection:bg-orange-100" dir="rtl">
            
            {/* --- Hero Section --- */}
            <header className="relative bg-sky-900 py-16 md:py-24 px-2 overflow-hidden border-b-8 border-[#d97706]">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] shadow-inner"></div>
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10">
                    
                    {/* المحتوى النصي - جهة اليمين */}
                   {/* المحتوى النصي - جهة اليمين */}
<FadeInItem className="text-right">
    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        الدليل التجاري <br/>
        <span className="text-[#d97706]">الإسلامي</span>
    </h1>
    <p className="text-xl md:text-2xl text-[#d97706] font-bold mb-8">دليلك لأعمال موثوقة من مجتمعك</p>
    
    <div className="text-lg text-sky-50 max-w-xl leading-relaxed mb-10 space-y-4">
        <p>
            اكتشف أفضل الخدمات والمهن من العرب والمسلمين في منطقتك. نحن نربط أصحاب الأعمال بجمهورهم المستهدف منذ عام 1990.
        </p>
        {/* السطور الإضافية لموازنة طول الصورة */}
        <div className="border-r-4 border-[#d97706] pr-4 py-2 bg-white/5 rounded-l-lg">
            <p className="text-sky-100 font-medium">
                • يغطي الدليل كافة مناطق شرق الولايات المتحدة ويوزع مجاناً على المراكز والمؤسسات الإسلامية.
            </p>
            <p className="text-sky-100 font-medium mt-2">
                • نعتبر الجسر الموثوق لربط الجالية العربية بأفضل مقدمي الخدمات المهنية والتجارية.
            </p>
        </div>
    </div>

    <div className="flex flex-wrap gap-4">
        <a 
            href={whatsappLink}
            target="_blank"
            className="bg-[#d97706] hover:bg-[#b45309] text-white font-black px-10 py-4 rounded-xl shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
        >
            <MessageCircle size={24} />
            تصفح الدليل (واتساب)
        </a>
    </div>
</FadeInItem>

                    {/* الصورة - جهة اليسار */}
                    <FadeInItem className="relative w-full flex justify-center lg:justify-end">
    {/* الصورة - جهة اليسار */}
{/* الصورة - جهة اليسار */}
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
                    </FadeInItem>

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16">
                
                {/* --- Section 1: About Muslim Business Directory --- */}
                <MotionScroll className="grid lg:grid-cols-2 gap-12 mb-24 items-start">
                    <FadeInItem>
                        <h2 className="text-3xl font-black text-sky-900 mb-8 border-r-8 border-[#d97706] pr-4">
                            ABOUT Muslim BUSINESS DIRECTORY
                        </h2>
                        <div className="space-y-5 text-lg text-gray-700">
                            <p className="font-medium text-sky-800 leading-relaxed italic">
                                - The Muslim BUSINESS DIRECTORY is issued under the auspices of the --Islamic society of Bay ridge Brooklyn, New York, and International Publication house LCC in New Jersey.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3"><CheckCircle2 className="text-[#d97706] flex-shrink-0" /> <p>The Muslim Business Directory covers the east of the United States</p></li>
                                <li className="flex gap-3"><CheckCircle2 className="text-[#d97706] flex-shrink-0" /> <p>The directory is distributed free of charge to Arab and Islamic shops, Islamic centers and institutions act.</p></li>
                                <li className="flex gap-3"><CheckCircle2 className="text-[#d97706] flex-shrink-0" /> <p>The Muslim BUSINESS DIRECTORY is issued of each year.</p></li>
                                <li className="flex gap-3"><CheckCircle2 className="text-[#d97706] flex-shrink-0" /> <p>The first issue of The Muslim BUSINESS DIRECTORY was in 1990</p></li>
                            </ul>
                            
                            <hr className="my-8 border-sky-100" />
                            
                            <ul className="space-y-4 font-bold text-sky-900 leading-relaxed">
                                <li>- يصدر الدليل برعاية كلاً من المركز الإسلامي في بيردج بروكلين نيويورك والدار الدولية للنشر والتوزيع بنيوجرسي.</li>
                                <li>- الدليل التجاري الإسلامي يغطي شرق الولايات المتحدة.</li>
                                <li>- يوزع الدليل مجاناً على المحلات العربية والإسلامية وعلى المراكز والمؤسسات الإسلامية.</li>
                                <li>- يصدر الدليل كل عام.</li>
                                <li>- أول عدد صدر من الدليل كان عام 1990 وما زال يصدر إلى الآن 2026.</li>
                            </ul>
                        </div>
                        
                        <a 
                            href={whatsappLink}
                            target="_blank"
                            className="mt-8 p-6 bg-sky-50 rounded-2xl border-2 border-dashed border-sky-200 flex items-center gap-6 hover:bg-sky-100 transition-colors group"
                        >
                            <div className="bg-sky-900 p-4 rounded-full text-white group-hover:scale-110 transition-transform"><Phone size={30} /></div>
                            <div>
                                <p className="font-bold text-sky-900">لو لديك أي سؤال لا تتردد أن تتصل بنا:</p>
                                <span className="text-3xl font-black text-[#d97706] tracking-tighter">9422 - 705-201</span>
                            </div>
                        </a>
                    </FadeInItem>

                    <FadeInItem className="bg-sky-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
                        <h3 className="text-2xl font-bold mb-8 text-[#d97706] border-b border-white/10 pb-4 italic tracking-tighter">🧾 صاحب عمل (Business Owner)</h3>
                        <div className="space-y-6 mb-10">
                            {["يدخل قسم الدليل", "ينشئ حساب", "يضيف نشاطه", "يظهر في الدليل", "يحصل على عملاء"].map((step, index) => (
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
                            أضف نشاطك وتصفح الدليل
                        </a>
                    </FadeInItem>
                </MotionScroll>

                {/* --- Section 2: Distribution & Logistics --- */}
                <MotionScroll className="grid md:grid-cols-2 gap-8 mb-24">
                    <FadeInItem className="bg-[#d97706] text-white p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-3xl font-black mb-4 flex items-center gap-3"><Truck /> خدمات التوزيع</h3>
                            <p className="text-xl font-bold mb-2 text-sky-900">نصل بمنتجك إلى جمهورك</p>
                            <p className="text-lg opacity-90 leading-relaxed">شبكة توزيع فعالة تغطي الأسواق المحلية.</p>
                        </div>
                        <a href={whatsappLink} target="_blank" className="mt-8 bg-sky-900 text-white font-black px-10 py-4 rounded-xl self-start hover:bg-sky-800 transition-all shadow-lg">اطلب خدمة التوزيع</a>
                    </FadeInItem>

                    <FadeInItem className="bg-slate-50 p-10 rounded-[2.5rem] border-2 border-sky-100 flex flex-col justify-between shadow-inner">
                        <div>
                            <h3 className="text-3xl font-black text-sky-900 mb-4 flex items-center gap-3">📊 دراسات الجدوى</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">نساعدك على تحويل فكرتك إلى مشروع واقعي من خلال دراسات دقيقة وتحليل شامل للسوق، لضمان اتخاذ قرارات مدروسة.</p>
                            <p className="font-bold text-[#d97706] text-xl">حوّل فكرتك إلى مشروع ناجح</p>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 font-bold italic">نقدم لك دراسة شاملة تساعدك على اتخاذ القرار الصحيح.</p>
                    </FadeInItem>
                </MotionScroll>

                {/* --- Section 3: Detailed Feasibility Institution --- */}
                <section className="mb-24">
                    <MotionScroll className="bg-sky-900 text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="max-w-4xl mx-auto relative z-10">
                            <FadeInItem className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-black mb-8 text-[#d97706] underline underline-offset-8 decoration-white/20 uppercase tracking-tighter">المؤسسة الدولية لدراسات الجدوى</h2>
                                <p className="text-xl leading-relaxed opacity-90 font-medium">
                                    في عالم سريع التغيّر مثل <span className="font-bold text-[#d97706]">New York City</span> و <span className="font-bold text-[#d97706]">New Jersey</span>، لم يعد النجاح في المشاريع قائماً على الحماس فقط… بل على التخطيط الدقيق، التحليل الذكي، واتخاذ القرار الصحيح في الوقت المناسب.
                                </p>
                            </FadeInItem>

                            <div className="grid md:grid-cols-2 gap-12 mb-16">
                                <FadeInItem className="space-y-6">
                                    <h4 className="text-2xl font-bold text-[#d97706] flex items-center gap-2">💡 لماذا دراسات الجدوى مهمة؟</h4>
                                    <p className="text-lg opacity-80 leading-loose">كثير من المشاريع تبدأ بفكرة رائعة… لكنها تفشل بسبب غياب الرؤية الواضحة. دراسة الجدوى هي خريطة طريق متكاملة تساعدك على فهم: هل مشروعك قابل للنجاح؟ كم تحتاج من رأس المال؟ ما حجم الأرباح المتوقعة؟ ومن هم المنافسون؟ وما هي المخاطر المحتملة؟</p>
                                </FadeInItem>
                                <FadeInItem className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                                    <h4 className="text-2xl font-bold text-[#d97706] flex items-center gap-2">🔍 ماذا نقدم لك؟</h4>
                                    <div className="space-y-4 text-sm font-bold">
                                        <p className="text-sky-300">✔️ دراسة السوق (تحليل الطلب وسلوك العملاء)</p>
                                        <p className="text-sky-300">✔️ الدراسة المالية (التكاليف، الإيرادات، ونقطة التعادل)</p>
                                        <p className="text-sky-300">✔️ الدراسة التشغيلية (الموارد، المعدات، وآلية العمل)</p>
                                        <p className="text-sky-300">✔️ تحليل المخاطر والتوصيات النهائية</p>
                                    </div>
                                </FadeInItem>
                            </div>

                            <FadeInItem className="bg-white text-sky-900 p-10 rounded-[2.5rem] text-center shadow-2xl border-t-8 border-[#d97706]">
                                <h4 className="text-3xl font-black mb-6 italic underline underline-offset-4 decoration-[#d97706]">حوّل فكرتك إلى مشروع ناجح</h4>
                                <p className="text-lg font-bold mb-8 opacity-80">لا تبدأ مشروعك بالحدس فقط… ابدأه بعلم، وخطة، ورؤية واضحة.</p>
                                
                                <a 
                                    href={whatsappLink} 
                                    target="_blank" 
                                    className="inline-flex items-center gap-4 bg-[#d97706] hover:bg-[#b45309] text-white font-black px-12 py-5 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                                >
                                    <MessageCircle size={28} />
                                    اطلب دراسة جدوى الآن (واتساب)
                                </a>
                                
                                <p className="mt-8 text-sm font-black text-sky-800 leading-loose border-t pt-8">
                                    ملحوظة مهمة: نحن متخصصون في دراسات الجدوى الغير تقليدية مثل دراسات جدوى الجامعات والمدارس الخاصة والمصانع بجميع أنواعها.
                                </p>
                            </FadeInItem>
                        </div>
                    </MotionScroll>
                </section>

                {/* --- Section 4: Blog & Additional --- */}
                <MotionScroll className="mb-24">
                    <FadeInItem className="text-center mb-10">
                        <h3 className="text-3xl font-black text-sky-900 flex justify-center items-center gap-3 uppercase tracking-widest"><BarChart3 /> المدونة (Blog)</h3>
                    </FadeInItem>
                    <div className="grid md:grid-cols-3 gap-6">
                        {["كيف تبدأ مشروعك في أمريكا؟", "أخطاء القروض", "التسويق للمشاريع الصغيرة"].map((blog, i) => (
                            <FadeInItem key={i} className="bg-sky-50 p-8 rounded-2xl font-bold text-sky-900 border-b-8 border-[#d97706] text-center shadow-sm hover:shadow-md transition-shadow">
                                {blog}
                            </FadeInItem>
                        ))}
                    </div>
                </MotionScroll>

                {/* --- Final CTA Section --- */}
                <MotionScroll>
                    <FadeInItem className="bg-sky-50 rounded-[3rem] p-12 text-center border-2 border-dashed border-sky-200">
                         <h3 className="text-3xl font-black text-sky-900 mb-8 italic">هل لديك فكرة مشروع؟ دعنا نحولها معك إلى خطة ناجحة.</h3>
                         <div className="flex flex-wrap justify-center gap-6">
                            <a 
                                href={whatsappLink} 
                                target="_blank" 
                                className="flex items-center gap-3 bg-green-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-green-700 transition-all shadow-xl hover:scale-105"
                            >
                                <MessageCircle size={24} /> تواصل واتساب الآن
                            </a>
                            <a 
                                href={whatsappLink} 
                                target="_blank" 
                                className="flex items-center gap-3 bg-sky-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-sky-800 transition-all shadow-xl hover:scale-105"
                            >
                                اطلب دراسة جدوى
                            </a>
                         </div>
                    </FadeInItem>
                </MotionScroll>

            </main>

            {/* --- Footer --- */}
            <footer className="bg-sky-950 text-white py-16 px-6 border-t-[10px] border-[#d97706]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <FadeInItem className="text-right">
                        <h4 className="text-3xl font-black mb-1 italic tracking-tighter">Muslim Business Directory</h4>
                        <p className="text-[#d97706] font-bold text-lg tracking-[.4em] uppercase">Established 1990 • 2026</p>
                    </FadeInItem>
                    <FadeInItem className="text-center md:text-left space-y-2 opacity-60">
                        <p className="font-bold">International House for Distribution LLC</p>
                        <p className="text-sm">Brooklyn, NY | New Jersey, USA</p>
                        <p className="text-[10px] tracking-widest uppercase mt-4">All Rights Reserved © 2026</p>
                    </FadeInItem>
                </div>
            </footer>
        </div>
    );
};

export default IslamicDirectoryPage;