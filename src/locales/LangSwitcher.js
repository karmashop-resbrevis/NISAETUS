'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [activeLang, setActiveLang] = useState('');

  useEffect(() => {
    const storedLang = localStorage.getItem('locale') || 'en';
    setActiveLang(storedLang);
  }, []);

  const changeLanguage = (lang) => {
    localStorage.setItem('locale', lang);
    window.location.reload();
  };

  return (
    <div className='flex gap-5'>
      <p onClick={() => changeLanguage('en')} className={`karma-hover-effect w-max ${activeLang === 'en' ? 'active' : ''}`}>🇺🇸 English</p>
      <p onClick={() => changeLanguage('id')} className={`karma-hover-effect w-max ${activeLang === 'id' ? 'active' : ''}`}>🇮🇩 Indonesian</p>
    </div>
  );
}
