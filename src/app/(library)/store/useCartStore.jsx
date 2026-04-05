import { create } from "zustand";
import api from "@/app/api"; // استيراد ملف api.jsx للتعامل مع الطلبات
import { toast } from "react-toastify";

export const useCartStore = create((set) => ({
  cart: [],
  loading: false,

  // جلب عربة التسوق
  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/cart");
      set({ cart: res.data });
    } catch (err) {
      console.error("خطأ في جلب السلة:", err.response?.data || err.message);
      set({ cart: [] });
      toast.error("فشل جلب السلة");
    } finally {
      set({ loading: false });
    }
  },

  // إضافة كتاب للسلة
  addToCart: async (fileId) => {
    try {
      const res = await api.post("/cart/add", { fileId });
      set({ cart: res.data });
      toast.success("تمت الإضافة للسلة!");
    } catch (err) {
      console.error(err.response?.data);
      toast.error("فشل الإضافة للسلة");
    }
  },

  // إزالة كتاب من السلة
  removeFromCart: async (fileId) => {
    try {
      const res = await api.delete(`/cart/remove/${fileId}`);
      set({ cart: res.data });
      toast.success("تم الحذف من السلة!");
    } catch (err) {
      console.error(err.response?.data);
      toast.error("فشل الحذف من السلة");
    }
  },

  // إفراغ السلة
  emptyCart: async () => {
    try {
      const res = await api.delete("/cart");
      set({ cart: res.data });
      toast.success("تم إفراغ السلة!");
    } catch (err) {
      console.error(err.response?.data);
      toast.error("فشل إفراغ السلة");
    }
  },
}));
