'use client'
import React, { use, useEffect, useState } from 'react';
import { ThreeDotsScale } from 'react-svg-spinners';
import ImageCarousel from '../ui/HomeBanner';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client'
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const HomeContents = () => {
	const lang = useTranslations('NisaetusText');
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [hotProducts, setHotProducts] = useState([]);
	const [newProducts, setNewProducts] = useState([]);
	const [genders, setGenders] = useState([]);
	const [loading, setLoading] = useState(false);

	const [imageLoading, setImageLoading] = useState({
		banner: true,
		main: true,
		gallery: {}
	});

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [productsRes, gendersRes] = await Promise.all([
					fetch('/api/nisaetus/Products'),
					fetch('/api/nisaetus/Genders')
				]);

				const productsData = await productsRes.json();
				const gendersData = await gendersRes.json();

				if (!productsData.error) {
					const featured = productsData.filter(product =>
						product.status && product.status.toLowerCase() === 'featured'
					);
					const hot = productsData.filter(product =>
						product.status && product.status.toLowerCase() === 'hot'
					);
					const newP = productsData.filter(product =>
						product.status && product.status.toLowerCase() === 'new'
					);
					setFeaturedProducts(featured);
					setHotProducts(hot);
					setNewProducts(newP);
				}
				if (!gendersData.error) setGenders(gendersData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Left-to-right animation variant
	const leftToRightVariant = {
		hidden: { opacity: 0, x: -100 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut'
			}
		}
	};

	// Right-to-left animation variant
	const rightToLeftVariant = {
		hidden: { opacity: 0, x: 100 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut'
			}
		}
	};

	// Staggered up animation for the flex section
	const staggeredUpVariant = (index) => ({
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
				delay: index * 0.2
			}
		}
	});

	const fadeIn = (index) => ({
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
				delay: index * 0.1
			}
		}
	});

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<ThreeDotsScale />
			</div>
		);
	}

	return (
		<div className='pb-10 overflow-hidden'>

			{/* GAMBAR CAROUSEL (FEATURED PRODUCT) */}
			<div className='h-full w-full overflow-hidden'>
				<ImageCarousel products={featuredProducts} lang={lang} />
			</div>
			{/* GAMBAR CAROUSEL (FEATURED PRODUCT) END */}

			{/* DISPLAY GAMBAR FEATURED (ENGKE GANTI (GAMBAR NU LAIN MEUREUN) + PIKIRANEUN) */}
			<div className="container max-w-7xl mx-auto px-5 py-10 sm:py-20 flex flex-col gap-10">
				<AnimatePresence>
					{hotProducts.map((product, index) => (
						<div
							key={product._id}
							className={`flex items-center mb-20 sm:mb-32 ${index % 2 === 0 ? 'flex-col gap-5 sm:gap-16 sm:flex-row' : 'flex-col gap-5 sm:gap-16 sm:flex-row-reverse'
								}`}
						>
							<motion.div
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: '-100px' }}
								variants={index % 2 === 0 ? leftToRightVariant : rightToLeftVariant}
								className="w-full sm:w-3/6 flex justify-start container"
							>
								{imageLoading.main && (
									<div className="absolute inset-0 flex items-center justify-center z-[2]">
										<ThreeDotsScale />
									</div>
								)}
								<Link
									href={`/products/hot/${product.slug?.current}`}
								>
									<Image
										src={urlFor(product.images[0]).url()}
										alt={product.title}
										width={800}
										height={600}
										className="w-full h-auto object-cover bg-stone-200"
										loading="lazy"
										onLoad={() => setImageLoading(prev => ({ ...prev, main: false }))}
									/>
								</Link>
							</motion.div>

							<motion.div
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: '-100px' }}
								variants={index % 2 === 0 ? rightToLeftVariant : leftToRightVariant}
								className={'w-full sm:w-3/5 flex flex-col gap-5 text-left'}
							>
								<span className='-mb-5 text-sm sm:text-lg text-stone-600'>{product.displayTitle1}</span>
								<h1 className="text-2xl sm:text-4xl text-stone-950">{product.title}</h1>
								<p className="text-stone-600 text-sm sm:text-base">{product.description}</p>
							</motion.div>
						</div>
					))}
				</AnimatePresence>
			</div>
			{/* DISPLAY GAMBAR FEATURED (ENGKE GANTI + PIKIRANEUN) END */}

			{/* GAMBAR CONTAINER DISPLAY INTRO (ENGKE GANTI + PIKIRANEUN) */}
			<motion.div
				initial='hidden'
				whileInView='visible'
				variants={leftToRightVariant}
				viewport={{ once: true }}
				className='container mx-auto max-w-7xl px-5 mb-10 text-lg sm:text-2xl font-bold'
			>
				<h1>{lang('newproductstext')}</h1>
			</motion.div>

			<div className='container grid grid-cols1 sm:grid-cols-2 gap-1 mx-auto max-w-7xl px-5 mb-20'>
				{newProducts.map((product, index) => (
					<motion.div
						key={product._id}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-150px' }}
						variants={staggeredUpVariant(index)}
						className='w-full bg-stone-200 p-5'
					>
						{imageLoading.main && (
							<div className="absolute inset-0 flex items-center justify-center z-[2]">
								<ThreeDotsScale />
							</div>
						)}
						<Link href={`/products/new/${product.slug?.current}`}>
							<Image
								src={urlFor(product.images[0]).url()}
								alt={product.title}
								width={800}
								height={600}
								className="w-auto h-auto object-cover object-center"
								loading="lazy"
								onLoad={() => setImageLoading(prev => ({ ...prev, main: false }))}
							/>
						</Link>
						<div className='flex flex-col gap-5'>
							<h1 className='font-bold sm:text-2xl'>{product.title}</h1>
							<span className='text-stone-600'>{product.intro}</span>
						</div>
					</motion.div>
				))}
			</div>
			{/* GAMBAR CONTAINER DISPLAY INTRO (ENGKE GANTI + PIKIRANEUN) END */}

			{/* GAMBAR JANG BROWSE MEN/WOMAN (ENGKE GANTI + PIKIRANEUN + TAMBAH GAMBAR DI SANITY DINA GENDER JANG DIDIEU) */}
			<AnimatePresence>
				{!loading && genders.length > 0 && (
					<>
						{genders.map((gender, index) => (
							<motion.div
								key={gender._id}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: '-150px' }}
								variants={fadeIn(index)}
								className='relative w-full h-full flex-shrink-0 overflow-hidden'
							>
								<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-[1]" />
								<div className="absolute inset-0 bg-radial-overlay z-[2]" />

								{gender.banner && (
									<div className="w-full h-[380px] relative sm:h-[760px]">
										{imageLoading.banner && (
											<div className="absolute inset-0 flex items-center justify-center z-[2]">
												<ThreeDotsScale />
											</div>
										)}
										<Image
											src={urlFor(gender.banner).url()}
											fill
											sizes="100vw"
											quality={100}
											loading='lazy'
											className='object-cover'
											alt={gender.title || 'Gender banner'}
											onLoad={() => setImageLoading(prev => ({ ...prev, banner: false }))}
										/>
										<div className="absolute left-0 right-0 bottom-20 flex flex-col justify-center items-center z-[3]">
											<div className={'flex flex-col justify-center items-center text-center pb-5 space-y-2'}>
												{/* Display additional product details */}
												<h1 className={'text-stone-200 text-2xl sm:text-4xl uppercase text-shadow'}>
													{gender.displayText}
												</h1>
											</div>
											<Link href={`/products/${gender.slug.current}`}>
												<button
													className="button-white"
												>
													{lang('browse').toUpperCase()}
												</button>
											</Link>
										</div>
									</div>
								)}
							</motion.div>
						))}
					</>
				)}
			</AnimatePresence>
			{/* GAMBAR JANG BROWSE MEN/WOMAN (ENGKE GANTI + PIKIRANEUN + TAMBAH GAMBAR DI SANITY DINA GENDER JANG DIDIEU) END */}

		</div>
	)
}

export default HomeContents;