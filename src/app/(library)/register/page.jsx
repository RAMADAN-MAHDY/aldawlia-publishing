"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuthStore();
  const isArabic = i18n.language?.startsWith("ar");
  const dir = isArabic ? "rtl" : "ltr";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim() || form.name.length < 2) {
      toast.error(t("register_page.name_validation"));
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error(t("register_page.email_validation"));
      return;
    }
    if (!form.password || form.password.length < 8) {
      toast.error(t("register_page.password_validation"));
      return;
    }

    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success(t("register_page.register_success"));
      router.push("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 ${isArabic ? "text-right" : "text-left"}`} dir={dir}>
      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{t("register_page.title")}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder={t("register_page.name_placeholder")}
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner outline-none focus:ring-2 focus:ring-amber-600 text-right"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder={t("register_page.email_placeholder")}
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner outline-none focus:ring-2 focus:ring-amber-600 text-right"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder={t("register_page.password_placeholder")}
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner outline-none focus:ring-2 focus:ring-amber-600 text-right"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button 
            disabled={loading}
            className={`w-full mt-6 text-white font-bold py-4 rounded-2xl shadow-lg transition-all ${loading ? 'bg-gray-400' : 'bg-amber-600 hover:bg-sky-900 active:scale-95'}`}
          >
            {loading ? t("register_page.loading") : t("register_page.submit")}
          </button>
        </form>

        <GoogleSignInButton />

        <p className="text-sm text-center mt-6 text-gray-500">
          {t("register_page.have_account")}{" "}
          <Link href="/login" className="text-sky-900 font-bold hover:text-amber-600 hover:underline">
            {t("register_page.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
