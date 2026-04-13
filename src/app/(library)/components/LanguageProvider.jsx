"use client";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n';

export default function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lang = i18n.language || 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
