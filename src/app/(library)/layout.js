import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "./providers"; 
import Navbar from "./components/navbar"; 
import NavBottom from "./components/navbottom"; 
import Footer from "./components/footer";
import TopBanner from "./components/TopBanner";
import PageTransition from "./components/pageTransition"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// الـ Metadata هتفضل شغالة هنا عادي لأن الملف بقى Server Component
export const metadata = {
  title: "مكتبة إلكترونية",
  // ... باقي الميتاداتا بتاعتك زي ما هي بالظبط
};

export default function ShopLayout({ children }) {
  return (
    <html lang="ar" dir="rtl"> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
          <Providers>
            <TopBanner/>
            <Navbar />
            <main className="min-h-screen">
              {/* هنا لفينا المحتوى بالأنميشن من غير ما نضرب الـ Metadata */}
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <NavBottom />
            <Footer />
          </Providers>
      </body>
    </html>
  );
}