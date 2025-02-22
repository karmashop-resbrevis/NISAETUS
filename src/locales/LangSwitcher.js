'use client';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (lang) => {
    localStorage.setItem('locale', lang);
    window.location.reload();
  };

  return (
    <div className='flex flex-col'>
      <p onClick={() => changeLanguage('en')} className='karma-hover-effect w-max'>🇺🇸 English</p>
      <p onClick={() => changeLanguage('id')} className='karma-hover-effect w-max'>🇮🇩 Indonesian</p>
    </div>
  );
}
