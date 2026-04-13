"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, BookOpen, CheckCircle2, Download, Loader2, AlertCircle } from "lucide-react";
import api from "@/app/api";
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import PageLoader from "@/app/loading";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const MyPurchasesPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState({}); // { bookId: "url" }
  const [timers, setTimers] = useState({});             // { bookId: secondsLeft }
  const [fetchingLink, setFetchingLink] = useState({}); // { bookId: true/false }
  const isArabic = i18n.language?.startsWith("ar");
  const dir = isArabic ? "rtl" : "ltr";

  const totalPrice = purchases.reduce((sum, purchase) => sum + (Number(purchase.book?.price) || 0), 0);

  // تحديث العدادات كل ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        let changed = false;
        Object.keys(next).forEach(id => {
          if (next[id] > 0) {
            next[id] -= 1;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleGetDownloadLink = async (bookId) => {
    if (!bookId) return;
    try {
      setFetchingLink((prev) => ({ ...prev, [bookId]: true }));
      const { data } = await api.get(`/files/${bookId}/download-link`);
      const info = data.data;
      
      if (info.url) {
        setDownloadLinks((prev) => ({ ...prev, [bookId]: info.url }));
        
        // حساب الوقت المتبقي بدقة بناءً على توقيت السيرفر
        const expiry = new Date(info.expiresAt).getTime();
        const now = new Date(info.serverTime).getTime();
        const secondsLeft = Math.max(0, (expiry - now) / 1000);
        
        setTimers((prev) => ({ ...prev, [bookId]: secondsLeft }));
        window.open(info.url, "_blank");
        
        // تحديث حالة المشتريات محلياً لتغيير شكل الزر
        setPurchases(prev => prev.map(p => {
          const pId = p.book?._id || p.bookId || p.book?.id;
          if (pId === bookId) return { ...p, isDownloaded: true, downloadExpiry: info.expiresAt };
          return p;
        }));
      }
    } catch (err) {
      console.error("Download Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || t("my_purchases_page.download_link_failed"));
    } finally {
      setFetchingLink((prev) => ({ ...prev, [bookId]: false }));
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const res = await api.get("/payments/my-purchases");
        const data = res.data?.data || [];
        const serverTime = res.data.serverTime || new Date();
        
        // إعادة بناء العدادات لمن تم تحميلهم مسبقاً وما زال وقتهم فعالاً
        const initialTimers = {};
        data.forEach(p => {
          if (p.isDownloaded && p.downloadExpiry) {
            const expiry = new Date(p.downloadExpiry).getTime();
            const now = new Date(serverTime).getTime();
            const secondsLeft = Math.max(0, (expiry - now) / 1000);
            if (secondsLeft > 0) {
              const bookId = p.book?._id || p.bookId || p.book?.id;
              if (bookId) initialTimers[bookId] = secondsLeft;
            }
          }
        });
        
        setTimers(initialTimers);
        setPurchases(data);
      } catch (error) {
        console.error("[My Purchases] Failed to load:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center" dir={dir}>
        <BookOpen size={80} className="text-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-600">{t("my_purchases_page.login_to_view")}</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          {t("my_purchases_page.login_description")}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="bg-amber-600 text-white px-8 py-3 rounded-3xl font-bold shadow-lg hover:bg-sky-900 transition-colors">
            {t("my_purchases_page.login")}
          </Link>
          <Link href="/register" className="border border-sky-900 text-sky-900 px-8 py-3 rounded-3xl font-bold hover:bg-sky-100 transition-colors">
            {t("my_purchases_page.create_account")}
          </Link>
        </div>
      </div>
    );
  }

  if (loading && purchases.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className={`bg-[#f8f8f8] min-h-screen pb-24 ${isArabic ? "text-right" : "text-left"}`} dir={dir}>
      <div className="bg-white/95 backdrop-blur-md sticky top-0 z-40 p-4 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sky-900 hover:text-amber-600 transition-all active:scale-95"
          >
            {isArabic ? <ArrowRight size={26} /> : <ArrowLeft size={26} />}
          </button>
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-black text-sky-900 flex items-center justify-center gap-2">
              <BookOpen size={28} className="text-amber-600" /> {t("my_purchases_page.title")}
            </h1>
            <p className="text-sm text-gray-500">{t("my_purchases_page.subtitle")}</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{t("my_purchases_page.stats_count")}</p>
            <h2 className="mt-3 text-3xl font-black text-sky-950">{purchases.length}</h2>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{t("my_purchases_page.stats_total")}</p>
            <h2 className="mt-3 text-3xl font-black text-sky-950">{totalPrice.toLocaleString()} {t("my_purchases_page.currency")}</h2>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{t("my_purchases_page.stats_browse")}</p>
            <Link href="/" className="inline-flex items-center gap-2 mt-3 text-amber-600 font-bold hover:text-sky-900 transition-colors">
              {t("my_purchases_page.back_to_store")}
            </Link>
          </div>
        </div>

        {purchases.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 text-center">
            <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700">{t("my_purchases_page.empty_title")}</h2>
            <p className="text-gray-500 mt-2">{t("my_purchases_page.empty_description")}</p>
            <Link href="/" className="mt-6 inline-flex bg-amber-600 text-white px-8 py-3 rounded-3xl font-bold hover:bg-sky-900 transition-colors">
              {t("my_purchases_page.browse_books")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {purchases.map((purchase) => (
              <div key={purchase._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 p-5">
                  <div className="w-full h-44 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={
                        purchase.book?.coverUrl || 
                        purchase.coverUrl || 
                        purchase.bookCover ||
                        "/logo.png"
                      }
                      alt={purchase.book?.title || purchase.bookTitle || "book cover"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.target;
                        if (img && img.src && !img.src.endsWith('/logo.png')) {
                          img.src = "/logo.png";
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-bold">{t("my_purchases_page.purchase_successful")}</span>
                      <h3 className="mt-3 text-lg md:text-xl font-black text-sky-950 line-clamp-2">
                        {purchase.book?.title || purchase.bookTitle || purchase.title || t("my_purchases_page.unknown_book")}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {t("my_purchases_page.book_id")}: {purchase.book?.id || purchase.bookId || t("my_purchases_page.not_available")}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {t("my_purchases_page.price")}: {
                          purchase.book?.price || purchase.price || purchase.amount 
                            ? `${Number(purchase.book?.price || purchase.price || purchase.amount).toLocaleString()} ${t("my_purchases_page.currency")}` 
                            : t("my_purchases_page.not_available")
                        }
                      </p>
                      {purchase.book === null && (
                        <p className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                          {t("my_purchases_page.book_data_updating")}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-4 py-2 text-xs font-black self-start">
                          <CheckCircle2 size={16} /> {t("my_purchases_page.ownership_confirmed")}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/book/${purchase.book?._id || purchase.bookId || purchase.book?.id}`}
                            className="p-3 rounded-2xl border border-gray-100 text-sky-900 hover:bg-gray-50 bg-white shadow-sm flex items-center gap-2 text-xs font-bold transition-all"
                          >
                            <BookOpen size={16} /> {t("my_purchases_page.view_details")}
                          </Link>
                        </div>
                      </div>

                      <div className="border-t border-dashed border-gray-100 pt-4">
                        {timers[purchase.book?._id || purchase.bookId || purchase.book?.id] > 0 ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between bg-amber-50 rounded-2xl p-4 border border-amber-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-600 font-black shadow-sm shrink-0">
                                  {formatTime(timers[purchase.book?._id || purchase.bookId || purchase.book?.id])}
                                </div>
                                <div>
                                  <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">{t("my_purchases_page.link_active_now")}</p>
                                  <p className="text-xs text-amber-900 font-medium tracking-tight">{t("my_purchases_page.save_file_now")}</p>
                                </div>
                              </div>
                              <a 
                                href={downloadLinks[purchase.book?._id || purchase.bookId || purchase.book?.id]} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-amber-600 text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:bg-amber-700 transition-all shadow-amber-100"
                              >
                                <Download size={14} /> {t("my_purchases_page.receive_file")}
                              </a>
                            </div>
                          </div>
                        ) : purchase.isDownloaded ? (
                          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100 text-gray-400">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm shrink-0">
                              <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider">{t("my_purchases_page.downloaded_before")}</p>
                                <p className="text-xs font-medium">{t("my_purchases_page.download_link_used")}</p>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleGetDownloadLink(purchase.book?._id || purchase.bookId || purchase.book?.id)}
                            disabled={fetchingLink[purchase.book?._id || purchase.bookId || purchase.book?.id]}
                            className="w-full bg-sky-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-sky-100 hover:bg-sky-950 transition-all active:scale-95 disabled:opacity-70 group"
                          >
                            {fetchingLink[purchase.book?._id || purchase.bookId || purchase.book?.id] ? (
                              <Loader2 className="animate-spin" size={20} />
                            ) : (
                              <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                            )}
                            {t("my_purchases_page.download_pdf")}
                          </button>
                        )}
                        <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
                          <AlertCircle size={10} /> 
                          {!purchase.isDownloaded 
                            ? t("my_purchases_page.note_one_link")
                            : t("my_purchases_page.note_five_minutes")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchasesPage;
