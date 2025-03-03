'use client'

import { urlFor } from '@/sanity/lib/image';
import { ArrowLeft, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useParams, usePathname} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ThreeDotsScale } from 'react-svg-spinners';
import * as motion from 'motion/react-client'
import { useTranslations } from 'next-intl';

export default function FeaturedSlugPageContents() {
	const lang = useTranslations('NisaetusText');
	const params = useParams();
	const slug = params?.slug;
	const pathname = usePathname();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageLoading, setImageLoading] = useState({
		banner: true,
		main: true,
		gallery: {}
	});

	useEffect(() => {
		const fetchProduct = async () => {
			if (!slug) {
				setLoading(false);
				return;
			}
			setLoading(true);
			try {
				const response = await fetch(`/api/nisaetus/Products/${slug}`);
				const data = await response.json();

				if (!data.error) {
					setProduct(data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [slug]);

	useEffect(() => {
		if (selectedImage) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [selectedImage]);

	const upVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
			}
		}
	};

	const fadeInVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
			}
		}
	};

	const changetext = pathname === `/products/all/${slug}`;

	const ImageSkeleton = () => (
		<div className="absolute inset-0 flex items-center justify-center z-[2] bg-black/90 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-700/30 to-transparent bg-[length:200%_100%] animate-glow">
				<div className="flex h-full w-full items-center justify-center">
					<ThreeDotsScale />
				</div>
			</div>
		</div>
	);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-[50vh]'>
				<ThreeDotsScale />
			</div>
		);
	}

	if (!product) {
		return (
			<div className='container mx-auto px-5 py-20 text-center'>
				<h1 className='text-2xl font-medium text-stone-900'>Product not found</h1>
				<Link href="/" className='text-stone-600 hover:text-stone-900 mt-4 inline-block'>
					Return to home
				</Link>
			</div>
		);
	}

	return (
		<div className='container mx-auto px-[5.5px] sm:px-5 sm:py-10 max-w-screen-xl'>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
				className="relative h-[380px] sm:h-[520px] w-full mx-auto overflow-hidden mb-5"
			>
				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-[1]" />

				{imageLoading.banner && <ImageSkeleton />}

				<Image
					src={urlFor(product.banner).url()}
					alt={product.title}
					fill
					className="object-cover object-center cursor-pointer"
					priority
					quality={100}
					onClick={() => setSelectedImage(urlFor(product.banner).url())}
					onLoad={() => setImageLoading(prev => ({ ...prev, banner: false }))}
				/>
			</motion.div>

			<div className='border-b border-stone-300 mt-14 mb-14' />

			<div className='text-stone-500 w-max mb-10'>
				<Link href={changetext ? '/products/all' : '/'} className='flex items-center gap-2 karma-hover-effect'>
					<ArrowLeft className='w-4 h-4' />
					{changetext ? (
						<span className='text-sm'>{lang('gobackbrowse')}</span>
					): (
						<span className='text-sm'>{lang('gobackhome')}</span>
					)}
				</Link>
			</div>

			<div className='container grid grid-cols-1 sm:grid-cols-2 gap-20 relative'>
				<div className='flex flex-col gap-1'>
					<motion.div
						initial='hidden'
						whileInView='visible'
						variants={fadeInVariants}
						viewport={{ once: true }}
						className='relative h-full w-full overflow-hidden bg-stone-200 px-5'
					>
						{product.images && product.images?.length > 0 && (
							<>
								{imageLoading.main && (
									<div className="absolute inset-0 flex items-center justify-center z-[2]">
										<ThreeDotsScale />
									</div>
								)}
								<Image
									src={urlFor(product.images[0]).url()}
									alt={product.title}
									width={800}
									height={600}
									className='object-cover cursor-pointer'
									onClick={() => setSelectedImage({
										url: urlFor(product.images[0]).url(),
										title: product[`displayTitle1`] || product.title,
										text: product[`displayText1`] || ''
									})}
									onLoad={() => setImageLoading(prev => ({ ...prev, main: false }))}
								/>
							</>
						)}
					</motion.div>

					<div className='flex'>
						{product.images && product.images.length > 0 && (
							<motion.div
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true }}
								variants={upVariants}
								className='grid grid-cols-2 gap-1'
							>
								{product.images.slice(1).map((image, index) => {
									const MapIndex = index + 2;
									return (
										<div key={image._key} className='relative h-full w-full overflow-hidden bg-stone-200 px-5'>
											{imageLoading.gallery[index] !== false && (
												<div className="absolute inset-0 flex items-center justify-center z-[2]">
													<ThreeDotsScale />
												</div>
											)}
											<Image
												src={urlFor(image).url()}
												width={350}
												height={150}
												alt={product.title}
												className='object-cover cursor-pointer'
												onClick={() => setSelectedImage({
													url: urlFor(image).url(),
													title: product[`displayTitle${MapIndex}`] || product.title,
													text: product[`displayText${MapIndex}`] || ''
												})}
												onLoad={() => setImageLoading(prev => ({
													...prev,
													gallery: { ...prev.gallery, [index]: false }
												}))}
											/>
										</div>
									);
								})}
							</motion.div>
						)}
					</div>
				</div>

				<motion.div
					initial='hidden'
					whileInView='visible'
					variants={fadeInVariants}
					viewport={{ once: true }}
					className='relative'
				>
					<div className='sticky top-20'>
						<div className='px-2 sm:px-0 mx-auto flex flex-col gap-5'>
							<span className='-mb-3 p-1 px-2 bg-stone-950 text-stone-200 w-max rounded text-xs font-bold'>{product.status.toUpperCase()}</span>
							<h1 className='text-xl sm:text-4xl'>{product.title}</h1>
							<p className='text-sm sm:text-base text-stone-600 mb-10'>{product.description}</p>
						</div>

						<div className='flex flex-col gap-2 mb-10'>
							<p className='text-stone-600'>DROPDOWN 1 KE DIDIEU (INFO MATERIAL PRODUK)</p>
							<p className='text-stone-600'>DROPDOWN 2 KE DIDIEU (INFO CARA MERSIHAN PRODUK)</p>
							<p className='text-stone-600'>DROPDOWN 3 KE DIDIEU (INFO UKURAN PRODUK)</p>
							<p className='text-stone-600'>DROPDOWN 4 KE DIDIEU (INFO PRODUK TAHAN TINA CUACA NAON)</p>
						</div>

						<div className='flex flex-col gap-2'>
							<button className='button-outline'>{lang('addtobag')}</button>
							<button className='button-black'>{lang('buynow')}</button>
						</div>

						<div className='mt-10'>
							<p className='text-stone-600'>{product.intro}</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Fullscreen Image Modal */}
			{selectedImage && (
				<div
					className="fixed inset-0 bg-stone-100 z-50 scroll"
				>
					<div className="relative max-w-none max-h-none flex justify-center items-center overflow-hidden">
						{imageLoading.banner && (
							<div className="absolute inset-0 flex items-center justify-center z-[2]">
								<ThreeDotsScale />
							</div>
						)}
						<Image
							src={selectedImage.url}
							width={1840}
							height={1560}
							quality={100}
							alt="Full Screen View"
							className="w-auto h-auto min-w-min min-h-min"
							onLoadingComplete={() => setImageLoading(prev => ({ ...prev, main: false }))}
						/>
						<button
							className="absolute top-5 right-5"
							onClick={() => setSelectedImage(null)}
						>
							<X className="icon w-10 h-10" />
						</button>
					</div>

					<div className='hidden sm:flex flex-col p-20 absolute top-0 max-w-4xl'>
						<h1 className='text-4xl text-stone-900 font-bold'>{selectedImage.title}</h1>
						<p className='text-xl text-stone-600'>{selectedImage.text}</p>
					</div>
				</div>
			)}

		</div>
	);
}