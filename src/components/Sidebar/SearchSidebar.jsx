import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { ThreeDotsScale } from 'react-svg-spinners';
import IDR from '@/lib/currency';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { X } from 'lucide-react';

const SearchSidebar = ({ isOpen, setIsOpen, NisaetusText }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [products, setProducts] = useState([]);
	const [genders, setGenders] = useState([]);
	// const [loading, setLoading] = useState(false);
	const [searching, setSearching] = useState(false);
	const searchInputRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			fetchProducts();
			fetchGenders();
			searchInputRef.current?.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && searchInputRef.current) {
			const focusTimer = setTimeout(() => {
				searchInputRef.current?.focus();
			}, 500);

			return () => clearTimeout(focusTimer);
		}
	}, [isOpen]);

	useEffect(() => {
		setSearching(true);

		const delay = setTimeout(() => {
			setSearchTerm(searchTerm);
			setSearching(false);
		}, 500);
		return () => clearTimeout(delay);
	}, [searchTerm]);

	const fetchProducts = async () => {
		// setLoading(true);
		try {
			const response = await fetch('/api/nisaetus/Products');
			const data = await response.json();
			if (data.error) {
				console.error(data.error);
			} else {
				setProducts(data);
			}
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			// setLoading(false);
		}
	};

	const fetchGenders = async () => {
		// setLoading(true);
		try {
			const response = await fetch('/api/nisaetus/Genders');
			const data = await response.json();
			if (data.error) {
				console.error(data.error);
			} else {
				setGenders(data);
			}
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			// setLoading(false);
		}
	};

	const getGenderNames = (genderRefs) => {
		return genderRefs.map(ref => {
			const gender = genders.find(g => g._id === ref._ref);
			return gender ? gender.title : 'Unknown';
		});
	};

	const filteredProducts = products.filter(product =>
		product.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	// if (loading) {
	//   return (
	//       <div className='flex justify-center items-center min-h-screen'>
	//           <ThreeDotsScale/>
	//       </div>
	//   );
	// }

	const fadeInVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: 'easeInOut'
			}
		}
	}

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.3 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}
						className="fixed top-12 inset-0 bg-black z-[2]"
						onClick={() => setIsOpen(false)}
					/>

					<motion.div
						initial={{ opacity: 0, height: '-50%' }}
						animate={{ opacity: 1, height: '100%' }}
						exit={{ opacity: 0, height: '-50%' }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}
						className="fixed top-12 w-full bg-white z-[3] scroll pb-20"
					>
						<div className="relative p-5 py-10 flex w-screen max-w-2xl mx-auto items-center justify-between">
							<div>
								<h1 className="text-xl font-bold">{NisaetusText.searchproducts}</h1>
								<h2 className="text-stone-500">{NisaetusText.searchsomething}</h2>
							</div>
							<div>
								<X className="icon w-8 h-8" onClick={() => setIsOpen(false)} />
							</div>
						</div>

						{/* SEARCH INPUT */}
						<div className="w-full flex flex-col justify-center pb-5 px-2 mx-auto items-center">
							<div className="relative w-full max-w-sm sm:max-w-xl">
								<input
									id="search"
									ref={searchInputRef}
									className="peer input"
									placeholder=""
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									autoComplete='off'
									required
								/>
								<label
									htmlFor="search"
									className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-base transition-all 
                                  peer-valid:top-3 peer-valid:text-xs 
                                  peer-focus:top-3 peer-focus:text-xs cursor-text"
								>
									{NisaetusText.searchproducts}
								</label>

								{/* SHOW PRODUK NU GEUS DI FILTER KU SEARCH */}
								{searchTerm && (
									<div className="flex flex-col gap-2 justify-center items-start text-center mt-10">
										{searching ? (
											<div className='mt-10 mx-auto'>
												<ThreeDotsScale className='w-20 h-20' />
											</div>
										) : filteredProducts.length > 0 ? (
											<>
												{filteredProducts.map((product) => (
													<Link
														key={product._id}
														href={`/products/featured/${product.slug.current}`}
														className='transition duration-150 rounded border border-stone-300 p-2 hover:bg-stone-100 w-full'
														onClick={() => setIsOpen(false)}
													>
														<motion.div
															initial='hidden'
															animate='visible'
															variants={fadeInVariants}
															className='container flex gap-10 items-center text-left w-full'
														>
															<div className='w-24'>
																<Image
																	src={urlFor(product.images[0]).url()}
																	width={400}
																	height={300}
																	alt={product.title}
																	priority={'true'}
																/>
															</div>
															<div className='flex flex-col gap-1'>
																<h1 className="text-lg">{product.title}</h1>
																<span className='text-xs text-stone-500 -mt-1'>{getGenderNames(product.gender)} / {product.category}</span>
																<p className="block text-sm text-stone-500">{IDR(product.price)}</p>
															</div>
														</motion.div>
													</Link>
												))}
											</>
										) : (
											<motion.div
												initial='hidden'
												animate='visible'
												variants={fadeInVariants}
												className='mx-auto mt-32 text-stone-950 text-2xl'
											>
												<h1>{NisaetusText.noproductsfound}</h1>
											</motion.div>
										)}
									</div>
								)}

							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SearchSidebar;