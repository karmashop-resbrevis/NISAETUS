'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User2, X } from "lucide-react";
import { BrandIcon } from "../Icons/KarmaIcons";
import InfoSidebar from "../Sidebar/InfoSidebar";
import MenuSidebar from "../Sidebar/MenuSidebar";
import SearchSidebar from "../Sidebar/SearchSidebar";
import { useTranslations } from "next-intl";

const HeaderContents = () => {
	const lang = useTranslations('NisaetusText');
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const [userSidebar, setUserSidebar] = useState(false);
	const [bagSidebar, setBagSidebar] = useState(false);
	const [menuSidebar, setMenuSidebar] = useState(false);
	const [searchSidebar, setSearchSidebar] = useState(false);
	const [categoriesDropdown, setCategoriesDropdown] = useState(false);

	const cicing = pathname === "/product-collections/all";
	const awas = pathname.startsWith("/nisaetus-brainrot/");

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			if (scrollY > 50 && !isScrolled) {
				setIsScrolled(true);
			} else if (scrollY <= 50 && isScrolled) {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isScrolled]);

	let bagItems = '';

	return (
		<header className={`top-0 z-[5] bg-white dark:bg-stone-950 ${cicing ? 'relative' : 'sticky'} ${awas ? 'hidden' : 'block'}`}>
			<div className="flex items-center justify-between px-5 sm:px-20 py-3 border-b border-black/20">

				{/* KONTEN HEADER */}

				{/* KIRI */}
				<div className="flex items-center gap-5">
					<div className="text-sm gap-4">
						<Menu className="icon w-6 h-6" onClick={() => {
								setMenuSidebar(!menuSidebar);
								setSearchSidebar(false);
							}} 
						/>
					</div>
				</div>

				{/* TENGAH */}
				<div className="absolute left-1/2 transform -translate-x-1/2">
					<Link
						href={'/'}
						aria-label="Home"
					>
						<BrandIcon isScrolled={isScrolled} />
					</Link>
				</div>

				{/* KANAN */}
				<div className="flex items-center gap-4">
					<Search className={'icon'} onClick={() => setSearchSidebar(!searchSidebar)} />
					<div className={'relative'}>
						<ShoppingBag className={'icon'} onClick={() => {
								setBagSidebar(!bagSidebar);
								setSearchSidebar(false);
							}} 
						/>
					</div>
					<User2 className={'icon'} onClick={() => {
							setUserSidebar(!userSidebar);
							setSearchSidebar(false);
						}} 
					/>
				</div>
			</div>

			{/* KONTEN HEADER END */}


			{/* SIDEBAR */}

			{/* SEARCH SIDEBAR */}
			<SearchSidebar isOpen={searchSidebar} setIsOpen={setSearchSidebar} lang={lang} />

			{/* MENU SIDEBAR */}
			<MenuSidebar menuSidebar={menuSidebar} setMenuSidebar={setMenuSidebar} categoriesDropdown={categoriesDropdown} setCategoriesDropdown={setCategoriesDropdown} lang={lang} />

			{/* USER SIDEBAR */}
			<InfoSidebar isOpen={userSidebar} setIsOpen={setUserSidebar}>
				<div className="relative min-h-full p-4">
					<div className="absolute top-2 right-2">
						<X className="icon w-8 h-8" onClick={() => setUserSidebar(false)} />
					</div>
					<div className="py-10 border-b border-black/20">
						<h1 className="text-xl font-bold">{lang('profile')}</h1>
						<h2 className="text-stone-500">{lang('reviewprofile')}</h2>
					</div>
				</div>
			</InfoSidebar>

			{/* BAG SIDEBAR */}
			<InfoSidebar isOpen={bagSidebar} setIsOpen={setBagSidebar}>
				<div className="relative min-h-full p-4">
					<div className="absolute top-2 right-2">
						<X className="icon w-8 h-8" onClick={() => setBagSidebar(false)} />
					</div>

					{bagItems ? (
						<>
							<div className="py-10 border-b border-black/20">
								<h1 className="text-xl font-bold">{lang('yourshoppingbag')}</h1>
								<h2 className="text-stone-500">{lang('reviewbag')}</h2>
							</div>
							<div className="flex flex-col justify-center items-center py-10">
								<p>ANU 1</p>
								<p>ANU 2</p>
								<p>ANU 3</p>
								<p>ANU 4</p>
							</div>
						</>
					) : (
						<div className="flex flex-col items-center justify-center h-[80vh]">
							<h1 className="mb-10">EMPTY</h1>
							<Link href={'/products/all'} onClick={() => setBagSidebar(false)}>
								<button name="SHOPPING" className="button-black">{lang('continueshopping').toUpperCase()}</button>
							</Link>
						</div>
					)}
				</div>
			</InfoSidebar>

			{/* SIDEBAR END */}

		</header>
	);
};

export default HeaderContents;