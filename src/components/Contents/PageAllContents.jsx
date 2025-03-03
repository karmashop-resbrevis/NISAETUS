'use client'
import React, { useEffect, useState } from "react";
import { ThreeDotsScale } from "react-svg-spinners";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import InfoSidebar from "@/components/Sidebar/InfoSidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatePresence } from "motion/react";
import * as motion from 'motion/react-client'

const PageAllContents = () => {
    const lang = useTranslations('NisaetusText');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        statuses: [],
        discounts: []
    });
    const [loadedImages, setLoadedImages] = useState({});
    const [filtersSidebar, setFiltersSidebar] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const products = await fetch(`/api/nisaetus/Products`);
                const data = await products.json();
                setProducts(data);
                setFilteredProducts(data);

                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);

                const uniqueStatuses = [...new Set(data.map(product => product.status))];
                setStatuses(uniqueStatuses);

                const uniqueDiscounts = [...new Set(data.map(product => product.discount))];
                setDiscounts(uniqueDiscounts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        if (filters.categories.length > 0) {
            filtered = filtered.filter(product =>
                filters.categories.includes(product.category)
            );
        }

        if (filters.statuses.length > 0) {
            filtered = filtered.filter(product =>
                filters.statuses.includes(product.status)
            );
        }

        if (filters.discounts.length > 0) {
            filtered = filtered.filter(product =>
                filters.discounts.includes(product.discount)
            );
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => {
            const currentValues = prev[filterType];
            let newValues;

            if (currentValues.includes(value)) {
                newValues = currentValues.filter(item => item !== value);
            } else {
                newValues = [...currentValues, value];
            }

            return {
                ...prev,
                [filterType]: newValues
            };
        });
    };

    const clearAllFilters = () => {
        setFilters({
            categories: [],
            statuses: [],
            discounts: []
        });
    };

    const getTotalFiltersCount = () => {
        return filters.categories.length + filters.statuses.length + filters.discounts.length;
    };

    const handleImageLoad = (productId) => {
        setLoadedImages(prev => ({
            ...prev,
            [productId]: true
        }));
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <ThreeDotsScale />
            </div>
        );
    }

    const slideVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    }

    return (
        <div className={'max-w-7xl mx-auto'}>
            <div className={'flex flex-col py-10 gap-10'}>
                <div className={'text-xs text-stone-600 cursor-default'}>
                    <Link href={'/'} className={'karma-hover-effect'}>{lang('home')}</Link>
                    <span> / {lang('allcollections')}</span>
                </div>
                <h1 className={'text-2xl text-stone-950'}>{lang('allcollections')}</h1>
            </div>
            <div className={'flex mb-2 justify-between'}>
                <div className={'text-sm text-stone-600'} onClick={() => setFiltersSidebar(!filtersSidebar)}>
                    <p className={`karma-hover-effect w-max ${filtersSidebar ? 'active' : ''}`}>
                        Filters {getTotalFiltersCount() > 0 && `(${getTotalFiltersCount()})`}
                    </p>
                </div>
                {getTotalFiltersCount() > 0 && (
                    <div className={'text-sm text-stone-600'}>
                        <p
                            className={'karma-hover-effect w-max'}
                            onClick={clearAllFilters}
                        >
                            {lang('clearfilters')}
                        </p>
                    </div>
                )}
            </div>
            <div className={'grid grid-cols-2 sm:grid-cols-3 mx-auto gap-1'}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <motion.div
                            initial={'hidden'}
                            whileInView={'visible'}
                            viewport={{ once: false }}
                            variants={slideVariants}
                            key={product._id}
                            className="relative"
                        >
                            <div
                                className={`absolute inset-0 flex items-center justify-center bg-stone-200 transition-opacity duration-300 ${loadedImages[product._id] ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <ThreeDotsScale />
                            </div>
                            <Link href={`/products/all/${product.slug.current}`}>
                                <Image
                                    src={urlFor(product.images[0]).url()}
                                    alt={product.title}
                                    width={800}
                                    height={600}
                                    className={'w-full h-auto bg-stone-200'}
                                    onLoad={() => handleImageLoad(product._id)}
                                />
                            </Link>
                            <div className={'absolute top-0 p-5 text-xs text-stone-200 flex gap-1'}>
                                <span className={'bg-stone-950 py-1 px-2 rounded'}>{product.discount}% OFF!</span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-3 py-20 text-center text-stone-600 text-xl">
                        No products match the selected filters
                    </div>
                )}
            </div>
            <InfoSidebar isOpen={filtersSidebar} setIsOpen={setFiltersSidebar}>
                <div className="relative min-h-full p-4">
                    <div className="absolute top-2 right-2">
                        <X className="icon w-8 h-8" onClick={() => setFiltersSidebar(false)} />
                    </div>
                    <div className="py-10 border-b border-black/20">
                        <h1 className="text-xl font-bold">{lang('filteroptions')}</h1>
                    </div>
                    <div className="mt-10">
                        <Accordion type="single" className='w-full mb-4' collapsible defaultValue={"categories"}>
                            <AccordionItem value="categories">
                                <AccordionTrigger className={'font-medium'}>{lang('category')}</AccordionTrigger>
                                <AccordionContent className={'text-stone-600 text-sm flex flex-col gap-4 px-4'}>
                                    {categories.map((category) => (
                                        <div key={category} className="flex items-center gap-2">
                                            <label htmlFor={`category-${category}`} className="relative cursor-pointer flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`category-${category}`}
                                                    checked={filters.categories.includes(category)}
                                                    onChange={() => handleFilterChange('categories', category)}
                                                    className="peer hidden"
                                                />
                                                <div className="w-5 h-5 border border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-stone-950 peer-checked:border-amber-500 transition duration-300"></div>
                                                <span className={`text-xs text-stone-600 karma-hover-effect ${filters.categories.includes(category) ? 'font-medium text-stone-950 active' : ''}`}>
                                                    {category.toUpperCase()}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="statuses">
                                <AccordionTrigger className={'font-medium'}>Status</AccordionTrigger>
                                <AccordionContent className={'text-stone-600 text-sm flex flex-col gap-4 px-4'}>
                                    {statuses.map((status) => (
                                        <div key={status} className="flex items-center gap-2">
                                            <label htmlFor={`status-${status}`}
                                                className="relative cursor-pointer flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`status-${status}`}
                                                    checked={filters.statuses.includes(status)}
                                                    onChange={() => handleFilterChange('statuses', status)}
                                                    className="peer hidden"
                                                />
                                                <div
                                                    className="w-5 h-5 border border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-stone-950 peer-checked:border-amber-500 transition duration-300"></div>
                                                <span
                                                    className={`text-xs text-stone-600 karma-hover-effect ${filters.statuses.includes(status) ? 'font-medium text-stone-950 active' : ''}`}>
                                                    {status.toUpperCase()}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="discounts">
                                <AccordionTrigger className={'font-medium'}>{lang('discount')}</AccordionTrigger>
                                <AccordionContent className={'text-stone-600 text-sm flex flex-col gap-4 px-4'}>
                                    {discounts.map((discount) => (
                                        <div key={discount} className="flex items-center gap-2">
                                            <label htmlFor={`status-${discount}`}
                                                className="relative cursor-pointer flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`status-${discount}`}
                                                    checked={filters.discounts.includes(discount)}
                                                    onChange={() => handleFilterChange('discounts', discount)}
                                                    className="peer hidden"
                                                />
                                                <div
                                                    className="w-5 h-5 border border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-stone-950 peer-checked:border-amber-500 transition duration-300"></div>
                                                <span
                                                    className={`text-xs text-stone-600 karma-hover-effect ${filters.discounts.includes(discount) ? 'font-medium text-stone-950 active' : ''}`}>
                                                    {discount}% OFF
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </InfoSidebar>
        </div>
    );
};

export default PageAllContents;