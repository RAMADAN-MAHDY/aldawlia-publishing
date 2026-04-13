"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import { toast } from "react-toastify";
import PageLoader from "@/app/loading";
import { useTranslation } from "react-i18next";

const AuthSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuthStore();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const dir = isArabic ? "rtl" : "ltr";

  useEffect(() => {
    const token = searchParams.get("token");

    const authenticate = async () => {
      if (token) {
        // 1. حفظ التوكن فوراً
        localStorage.setItem("jwtToken", token);

        try {
          // 2. أهم خطوة: استني لما بيانات اليوزر تيجي فعلياً
          // تأكدي إن checkAuth في الـ store بتعمل await للطلب
          await checkAuth();


          // 3. التحويل للصفحة الرئيسية بعد التأكد من وجود البيانات
          router.replace("/");
        } catch (error) {
          toast.error(t("auth_success.auth_fetch_failed"));
          router.replace("/login");
        }
      }
    };

    authenticate();
  }, [searchParams, router, checkAuth]);

  return (
    <div dir={dir} className="flex flex-col items-center justify-center min-h-[70vh] bg-[#f8f8f8]">
      <PageLoader />
      <h2 className="mt-4 text-xl font-bold text-gray-700">{t("auth_success.logging_in")}</h2>
    </div>
  );
};

export default AuthSuccessPage;
