'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import { ArrowRight, Loader2, MailWarning } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import enData from '@/locales/en.json';
import idData from '@/locales/id.json';

const FooterContents = () => {
	const lang = useTranslations('NisaetusText');
	const locale = useLocale();
	const footerBottomSections = locale === 'id' ? idData.footerBottomSections : enData.footerBottomSections;
	const [emailSubscribe, setEmailSubscribe] = useState({ email: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const inputEmailSubscribe = (e) => {
		setEmailSubscribe({ ...emailSubscribe, [e.target.name]: e.target.value });
		setError('');
	}

	const subscriberSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (!emailSubscribe.email) {
				setError('Email is required!')
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(emailSubscribe.email)) {
				setError('Please enter a valid email address.');
				return;
			}

			await new Promise((resolve) => setTimeout(resolve, 2000));

			alert(`TEST HEULA : ${emailSubscribe.email}`);
			setEmailSubscribe({ email: '' });

		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const up = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeInOut'
			}
		}
	};

	const BRAND = process.env.NEXT_PUBLIC_NAMA_BRAND;

	return (
		<AnimatePresence>
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				variants={up}
				className='h-full w-full pt-20'
			>
				<footer className='pb-10 border-t border-stone-300 px-5 overflow-hidden'>
					<div className='w-72 mx-auto'>
						<Image src={'/nisaetus.png'} width={800} height={600} alt='NISAETUS' priority={true} className='w-auto h-auto' />
					</div>
					<div className='w-full max-w-6xl flex flex-col gap-5 items-center mx-auto text-center -mt-14 mb-10'>
						<h1 className='text-2xl font-bold'>
							{lang('brandIntro')}
						</h1>
						<p
							className="text-stone-600"
							dangerouslySetInnerHTML={{
								__html: lang('brandDescription').replace(/Nisaetus/g, `<strong>${BRAND}</strong>`)
							}}
						/>
					</div>
					<form onSubmit={subscriberSubmit}>
						<h1 className='text-lg font-bold text-center mb-4'>{lang('subscribeText')}</h1>
						<div className="relative sm:w-96 max-w-sm w-full sm:max-w-xl mx-auto">
							<input
								id="search"
								className="peer input h-15 text-sm pr-12 truncate"
								placeholder=""
								name='email'
								value={emailSubscribe.email}
								onChange={inputEmailSubscribe}
								autoComplete='off'
								required
							/>
							{loading ? (
								<Loader2 className="animate-spin absolute top-3 right-3 input-icon-loading p-1" />
							) : (
								<ArrowRight onClick={subscriberSubmit} className='absolute top-3 right-3 input-icon p-1' />
							)}
							<label
								htmlFor="search"
								className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-base transition-all 
                                            peer-valid:top-3 peer-valid:text-xs 
                                            peer-focus:top-3 peer-focus:text-xs cursor-text"
							>
								{lang('youremailhere')}
							</label>
						</div>
						<AnimatePresence mode='wait'>
							{error &&
								<AnimatePresence mode='wait'>
									<motion.div
										key={error}
										initial={{ opacity: 0, y: -30 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 1, y: -30 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className='flex justify-center items-center text-red-600 text-sm gap-3 mt-5'
									>
										<MailWarning className='icon mt-1' />
										<p className="mt-2 text-sm">{error}</p>
									</motion.div>
								</AnimatePresence>
							}
						</AnimatePresence>
					</form>

					<motion.div
						layout
						animate={{ y: error ? 10 : 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<div className='border-b border-stone-300 mb-16 mt-5' />

						<div className="hidden sm:grid grid-cols-4 w-full max-w-7xl mx-auto">
							{footerBottomSections.map((section, index) => (
								<div key={index} className="flex flex-col gap-2 mx-auto">
									<h2 className="text-xl">{section.title}</h2>
									<ul className="text-stone-600 text-sm flex flex-col">
										{section.items.map((item, i) => (
											<li key={i} className='karma-hover-effect hover:text-stone-800 w-max'>{item}</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</motion.div>
				</footer>
			</motion.div>
		</AnimatePresence>
	)
}

export default FooterContents