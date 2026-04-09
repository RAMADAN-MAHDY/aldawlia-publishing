"use client";
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/app/api"; // تأكدي من مسار ملف الـ axios الخاص بك

const PaymentStatus = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasCalledApi = useRef(false); // لمنع استدعاء الـ API مرتين بسبب الـ StrictMode

    // الحصول على المعرفات من الرابط
    const successParam = searchParams.get("success");
    const orderId = searchParams.get("orderId"); 
    const transactionId = searchParams.get("transactionId");
    
    // إضافات Stripe
    const stripePaymentIntent = searchParams.get("payment_intent");
    const stripeStatus = searchParams.get("redirect_status");

    // تحديد الحالة النهائية والمعرف
    const isSuccess = successParam === "true" || stripeStatus === "succeeded";
    const id = orderId || transactionId || stripePaymentIntent;

    useEffect(() => {
        // لو مفيش نجاح في الرابط أو مفيش ID، نرجعه للرئيسية
        if (!isSuccess || !id) {
            if (successParam === "false" || stripeStatus === "failed") {
                toast.error("فشلت عملية الدفع، يرجى المحاولة مرة أخرى");
            }
            // نعطي فرصة بسيطة قبل التحويل للتأكد
            const timeout = setTimeout(() => {
                 if (!isSuccess || !id) router.push("/");
            }, 2000);
            return () => clearTimeout(timeout);
        }

        const verifyPayment = async (retryCount = 0) => {
            if (hasCalledApi.current && retryCount === 0) return;
            if (retryCount === 0) hasCalledApi.current = true;

            try {
                // 1. التحقق من حالة الدفع من السيرفر (بند 4 في الوثيقة)
                // المسار: GET /payments/:id
                // ملاحظة: قد تكون الحالة pending لأن Webhook لم يصل بعد (قد يستغرق ثانية واحدة)
                console.log(`[Payment Verification] ID: ${id}, Attempt: ${retryCount + 1}`);
                const { data } = await api.get(`/payments/${id}`);
                const paymentData = data.data || data;
                const paymentStatus = paymentData.status;

                console.log("[Payment Verification] Response:", {
                    status: paymentStatus,
                    bookId: paymentData.book?.id || paymentData.bookId,
                    bookNull: paymentData.book === null,
                    amount: paymentData.amount
                });

                // 2. إذا كانت الحالة pending والمحاولة الأولى، انتظر ثانية وأعد المحاولة
                if (paymentStatus === "pending" && retryCount < 3) {
                    console.log(`[Payment Verification] Status pending, retrying (${retryCount + 1}/3)...`);
                    toast.info("جاري معالجة العملية عبر البوابة...");
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    return verifyPayment(retryCount + 1);
                }

                // 3. تحقق من حالة الدفع النهائية
                if (paymentStatus === "succeeded") {
                    // 4. استخراج بيانات الكتاب من رد السيرفر
                    const bookId = paymentData.book?.id || paymentData.bookId;
                    console.log("[Payment Verification] Payment succeeded! Redirecting to purchases...");

                    toast.success("تم تأكيد الدفع بنجاح!");

                    // 5. انتظر قليلاً لتأكد من تحديث قاعدة البيانات ثم اذهب لصفحة المشتريات
                    await new Promise(resolve => setTimeout(resolve, 800));
                    router.push("/my-purchases");
                } else {
                    console.warn(`[Payment Verification] Payment not succeeded. Status: ${paymentStatus}`);
                    toast.warning(`حالة الدفع: ${paymentStatus}. يرجى التحقق من عمليتك.`);
                    
                    // اذهب لصفحة المشتريات بدلاً من الرئيسية
                    // قد تكون العملية نجحت لكن حالة الدفع لم تتحدث بعد
                    await new Promise(resolve => setTimeout(resolve, 800));
                    router.push("/my-purchases");
                }
            } catch (err) {
                console.error("[Payment Verification] Error:", err.response?.data || err.message);
                toast.error(err.response?.data?.message || "حدث خطأ أثناء التحقق من الدفع");
                
                // في حالة الخطأ، روح لصفحة المشتريات - قد تكون العملية نجحت رغم الخطأ
                console.log("[Payment Verification] Error occurred, redirecting to purchases...");
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push("/my-purchases");
            }
        };

        verifyPayment();
    }, [isSuccess, id, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white" dir="rtl">
            <div className="text-center">
                {/* أنيميشن لطيف أثناء التحقق */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-sky-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-sky-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">جاري تأكيد عملية الشراء</h2>
                <p className="text-gray-500 text-sm font-medium">يرجى عدم إغلاق الصفحة، نقوم بمعالجة طلبك الآن...</p>
            </div>
        </div>
    );
};

export default PaymentStatus;