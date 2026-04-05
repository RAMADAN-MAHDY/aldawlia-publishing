# بيانات وهمية للمشروع (Mock Data)

هذا الملف يحتوي على بيانات وهمية للكتب لاستخدامها في اختبار الصفحات والمكونات دون الحاجة إلى backend.

## كيفية الاستخدام

1. **استيراد الملف في المكونات:**
   ```javascript
   import mockBooks from '@/data/mockBooks.json'
   ```

2. **استخدام في React Query (للتطوير المحلي):**
   ```javascript
   const { data: books } = useQuery({
     queryKey: ['books'],
     queryFn: () => Promise.resolve(mockBooks),
     staleTime: 5 * 60 * 1000,
   })
   ```

3. **استخدام في مكونات أخرى:**
   - يمكن استخدام `mockBooks` كمصفوفة لعرض قائمة الكتب.
   - مثال: في `OffersCarousel.jsx` أو `categorybooks.jsx`.

## هيكل البيانات

كل كتاب يحتوي على:
- `_id`: معرف فريد
- `title`: عنوان الكتاب
- `description`: وصف مختصر
- `price`: السعر بالقروش (0 للمجاني)
- `cover`: مسار صورة الغلاف
- `category`: الفئة
- `author`: اسم المؤلف
- `pages`: عدد الصفحات
- `language`: اللغة
- `createdAt`: تاريخ الإنشاء

## ملاحظات
- هذه البيانات وهمية فقط للاختبار والتطوير.
- في الإنتاج، استبدلها ببيانات حقيقية من API.