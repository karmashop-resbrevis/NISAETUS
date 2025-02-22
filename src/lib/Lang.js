'use client';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function InterLang({ children }) {
	const router = useRouter();
	const [locale, setLocale] = useState('en');

	useEffect(() => {
		const storedLocale = localStorage.getItem('locale') || 'en';
		setLocale(storedLocale);
	}, []);

	const messages = require(`../locales/${locale}.json`);

	return (
		<NextIntlClientProvider messages={messages} locale={locale}>
			{children}
		</NextIntlClientProvider>
	);
}
