'use client'
import React, {useCallback, useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from 'lucide-react';
import { AnimatePresence } from "motion/react"
import Link from "next/link";
import { KarmaFacebookIcon, KarmaIGIcon } from "../Icons/KarmaIcons";
import * as motion from "motion/react-client"

const HeaderAnnouncement = () => {

    const announcements = [
        "MASIH DALAM PROSES DEVELOPMENT",
        "PERKIRAAN BULAN DEPAN SELESAI",
        "JANGAN LUPA KUNJUNGI KAMI NANTI!"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const resetTimer = useCallback(() => {
        return setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
    }, []);

    useEffect(() => {
        const timer = resetTimer();
        return () => clearInterval(timer);
    }, [currentIndex, resetTimer]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <div className="relative bg-black/90 dark:bg-white text-white dark:text-black p-2">
                <div className={'hidden sm:flex absolute gap-5 px-52'}>
                    <Link
                        href={'https://facebook.com/kiraftmisa'}
                        target={'_blank'}
                    >
                        <KarmaFacebookIcon className={'w-5 h-5 transition duration-100 hover:scale-110'}/>
                    </Link>
                    <Link
                        href={'https://instagram.com/pseudonym.x64'}
                        target={'_blank'}
                    >
                        <KarmaIGIcon className={'w-5 h-5 transition duration-100 hover:scale-110'}/>
                    </Link>
                </div>
                <div className="max-w-lg mx-auto relative">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={goToPrevious}
                            className="absolute left-0 z-10"
                            aria-label="Previous announcement"
                        >
                            <ChevronLeft className="w-5 h-5 text-white/40 dark:text-black/50" />
                        </button>

                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3, ease: 'easeInOut'}}
                            className="w-full px-8"
                        >
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className="text-xs text-center"
                                >
                                    {announcements[currentIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </motion.div>

                        <button
                            onClick={goToNext}
                            className="absolute right-0 z-10"
                            aria-label="Next announcement"
                        >
                            <ChevronRight className="w-5 h-5 text-white/40 dark:text-black/50" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderAnnouncement;