'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { urlFor } from '@/sanity/lib/image';
import { ThreeDotsScale } from 'react-svg-spinners';

const ImageCarousel = ({ products, NisaetusText }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const dragThreshold = 50;
    const containerRef = useRef(null);

    const startTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === products.length - 1 ? 0 : prevIndex + 1
            );
        }, 8000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [products.length]);

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].pageX);
        clearInterval(timerRef.current);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const maxDrag = containerWidth * 0.3;
        const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

        setTranslateX(boundedDiff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);

        if (Math.abs(translateX) > dragThreshold) {
            if (translateX > 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else if (translateX < 0 && currentIndex < products.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }

        setTranslateX(0);
        startTimer();
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
        startTimer();
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
        startTimer();
    };

    if (!products || products.length === 0) {
        return null;
    }

    const [imageLoading, setImageLoading] = useState({
        banner: true,
        main: true,
        gallery: {}
    });

    const ImageSkeleton = () => (
        <div className="absolute inset-0 flex items-center justify-center z-[2] bg-black/90 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-700/30 to-transparent bg-[length:200%_100%] animate-glow">
                <div className="flex h-full w-full items-center justify-center">
                    <ThreeDotsScale />
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative w-full">
            <div
                ref={containerRef}
                className="relative h-[380px] sm:h-[820px] w-full overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <div
                    className={`absolute w-full h-full flex ${isDragging ? '' : 'transition-transform duration-500'} ease-out`}
                    style={{
                        transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`
                    }}
                >
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            className="relative w-full h-full flex-shrink-0 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-[1]" />
                            <div className="absolute inset-0 bg-radial-overlay z-[2]" />

                            <div className={`absolute w-[110%] h-[110%] -top-[5%] -left-[5%] transition-transform duration-[5000ms] ease-in-out
                                ${index === currentIndex ? 'animate-kenburns' : ''}`}
                            >
                                {imageLoading.banner && <ImageSkeleton />}
                                <Image
                                    src={urlFor(product.banner).url()}
                                    alt={product.title || `Slide ${index + 1}`}
                                    fill
                                    className="object-cover object-center"
                                    priority={index === 0}
                                    quality={100}
                                    draggable={false}
                                    onLoad={() => setImageLoading(prev => ({...prev, banner: false}))}
                                />
                            </div>

                            <div className="absolute left-0 right-0 bottom-20 flex flex-col justify-center items-center z-[3]">
                                <div className={'flex flex-col justify-center items-center text-center pb-5 space-y-2'}>
                                    {/* Display additional product details */}
                                    <p className={'text-stone-200 text-xs sm:text-sm uppercase text-shadow -mb-2 sm:mb-0 font-bold'}>
                                        {product.category}
                                    </p>
                                    <h1 className={'text-stone-200 text-xl sm:text-4xl font-bold text-shadow'}>
                                        {product.title}
                                    </h1>
                                </div>
                                <Link href={`/products/featured/${product.slug?.current || ''}`}>
                                    <button
                                        className="button-white"
                                    >
                                        {NisaetusText.seemoredetails.toUpperCase()}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between p-2 border-b relative">
                <div className={'flex gap-2 mx-auto border-r border-l px-5 sm:px-20'}>
                    <button onClick={goToPrevious}>
                        <ChevronLeft aria-label='PREVIOUS' className="w-4 h-4 transition-all duration-300 hover:text-amber-500 text-black dark:text-white" />
                    </button>

                    <div className="text-sm px-10">
                        {currentIndex + 1} / {products.length}
                    </div>

                    <button onClick={goToNext}>
                        <ChevronRight aria-label='NEXT' className="w-4 h-4 transition-all duration-300 hover:text-amber-500 text-black dark:text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;