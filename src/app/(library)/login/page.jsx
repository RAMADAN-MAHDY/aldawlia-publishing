"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();
  const isArabic = i18n.language?.startsWith("ar");
  const dir = isArabic ? "rtl" : "ltr";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success(t("login_page.login_success"));
      router.push("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 ${isArabic ? "text-right" : "text-left"}`} dir={dir}>
      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{t("login_page.title")}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder={t("login_page.email_placeholder")}
              className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner outline-none focus:ring-2 focus:ring-amber-600"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder={t("login_page.password_placeholder")}
              className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner outline-none focus:ring-2 focus:ring-amber-600"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button 
              disabled={loading}
              className={`w-full mt-6 text-white font-bold py-4 rounded-2xl shadow-lg transition-all ${loading ? 'bg-gray-400' : 'bg-amber-600 hover:bg-sky-900 active:scale-95'}`}
            >
              {loading ? t("login_page.loading") : t("login_page.submit")}
            </button>
          </form>

        <GoogleSignInButton />

        <p className="text-sm text-center mt-6 text-gray-500">
          {t("login_page.no_account")}{" "}
          <Link href="/register" className="text-sky-900 font-bold hover:text-amber-600 hover:underline">
            {t("login_page.create_account")}
          </Link>
        </p>
      </div>
    </div>
  );
}
