"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/(library)/store/useAuthStore";
import { toast } from "react-toastify";
import Activity from "@/app/loading";

const AuthSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");

    const authenticate = async () => {
      if (token) {
        // حفظ التوكن
        localStorage.setItem("jwtToken", token);
        
        // جلب بيانات المستخدم للتأكد وتحديث الحالة
        await checkAuth();
        
        toast.success("تم تسجيل الدخول بنجاح عبر جوجل");
        router.push("/");
      } else {
        toast.error("فشل في استلام بيانات تسجيل الدخول");
        router.push("/login");
      }
    };

    authenticate();
  }, [searchParams, router, checkAuth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#f8f8f8]">
      <Activity />
      <h2 className="mt-4 text-xl font-bold text-gray-700">جاري تسجيل الدخول...</h2>
    </div>
  );
};

export default AuthSuccessPage;
