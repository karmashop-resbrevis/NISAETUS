'use client';
import { useState, useEffect } from 'react';
import {IDFlag, USFlag} from "@/components/Icons/KarmaIcons";

export default function LanguageSwitcher() {
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
      <div className={`flex gap-3 cursor-pointer items-center karma-hover-effect ${activeLang === 'en' ? 'pointer-events-none' : ''}`} onClick={() => changeLanguage('en')}>
        <USFlag/>
        <p className={`w-max ${activeLang === 'en' ? 'karma-hover-effect active font-medium' : ''}`}>EN</p>
      </div>
        <div className={'border-r'}/>
      <div className={`flex gap-3 cursor-pointer items-center karma-hover-effect ${activeLang === 'id' ? 'pointer-events-none' : ''}`} onClick={() => changeLanguage('id')}>
        <IDFlag/>
        <p className={`w-max ${activeLang === 'id' ? 'karma-hover-effect active font-medium' : ''}`}>ID</p>
      </div>
    </div>
  );
}
