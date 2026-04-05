"use client";

import { useEffect, useState } from "react";
import api from "@/app/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineChart, BarChart as BarChartIcon, UserPlus, FileArchive, Target, TrendingUp, DollarSign } from "lucide-react";
// في تطبيق إنتاجي كامل، يمكن إضافة recharts أو chart.js لرسم رسوم بيانية فعلية.
// هنا سنعتمد على مكونات UI جذابة لعرض البيانات الرقمية ببساطة كما ورد من الـ API.

export default function AdminAnalyticsPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/stats/advanced');
            setStats(res.data.data);
        } catch (err) {
            toast.error("فشل جلب التحليلات المتقدمة");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading || !stats) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-pink-500 font-bold animate-pulse text-xl flex items-center gap-3">
                    <TrendingUp size={30} />
                    جاري إعداد تقارير ذكاء الأعمال ...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-8 bg-gray-50/50 min-h-screen" dir="rtl">
            <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />

            {/* Header */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <div className="p-4 bg-pink-600 rounded-2xl shadow-lg shadow-pink-200">
                    <LineChart className="text-white w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">ذكاء الأعمال (BI Insights)</h2>
                    <p className="text-gray-500 text-xs font-medium">لوحة خاصة بعرض الاتجاهات، أداء المجالات، وسلوك المستخدمين (Advanced Analysis)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Average Order Value (AOV) */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4 text-emerald-600">
                        <Target className="w-6 h-6" />
                        <h3 className="font-bold text-gray-700 dark:text-gray-300">متوسط قيمة الطلب (AOV)</h3>
                    </div>
                    <div className="text-4xl font-black text-gray-900 dark:text-white">
                        {((stats.aov?.averageCents || 0) / 100).toLocaleString()} <span className="text-lg">ج.م</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">متوسط ما ينفقه كل عميل في العملية الشرائية الواحدة.</p>
                </div>

                {/* 2. Signup Channels */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <UserPlus className="w-6 h-6" />
                        <h3 className="font-bold text-gray-700 dark:text-gray-300">طرق التسجيل (Channels)</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        {stats.signupChannels?.map(ch => (
                            <div key={ch._id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 px-4 rounded-xl">
                                <span className="font-bold text-sm text-gray-600 dark:text-gray-300 capitalize">{ch._id === 'local' ? 'عبر الإيميل المباشر' : 'عبر جوجل'}</span>
                                <span className="font-black text-blue-600">{ch.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Stagnant Books */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4 text-red-500">
                        <FileArchive className="w-6 h-6" />
                        <h3 className="font-bold text-gray-700 dark:text-gray-300">الكتب الراكدة جدًا</h3>
                    </div>
                    <div className="text-4xl font-black text-gray-900 dark:text-white">
                        {stats.stagnantBooks?.length || 0}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 mb-4">كتب مضافة منذ أكثر من 30 يوم ولم تحقق أي مبيعات.</p>
                    <div className="text-xs space-y-2 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                        {stats.stagnantBooks?.map(book => (
                            <div key={book._id} className="flex items-center gap-2 text-gray-500 border-b border-gray-100 dark:border-gray-700 pb-1">
                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                <span className="truncate">{book.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Category Performance */}
                <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 md:p-10 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-8 text-pink-600">
                        <BarChartIcon className="w-8 h-8" />
                        <h3 className="text-xl font-black text-gray-800 dark:text-white">أداء المجالات (Revenue per Category)</h3>
                    </div>

                    <div className="space-y-6">
                        {stats.categoryPerformance?.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">لم يتم تسجيل مبيعات تصنيفية بعد.</p>
                        ) : stats.categoryPerformance?.map((cat, index) => {
                            // للحصول على نسبة مئوية بصرية مقارنة بأعلى مجال
                            const maxRev = Math.max(...stats.categoryPerformance.map(c => c.totalRevenueCents));
                            const percent = maxRev === 0 ? 0 : (cat.totalRevenueCents / maxRev) * 100;

                            return (
                                <div key={cat._id || index} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">{cat.categoryDetails[0]?.name || "مجال محذوف/غير متوفر"}</span>
                                        <span className="font-black text-pink-600">{(cat.totalRevenueCents / 100).toLocaleString()} ج.م</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-400 font-bold">بِيع منها {cat.salesCount} نسخة</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
