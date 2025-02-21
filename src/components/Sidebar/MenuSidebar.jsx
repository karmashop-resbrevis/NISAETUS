import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import { X } from 'lucide-react'
import Link from 'next/link'

const MenuSidebar = ({menuSidebar, setMenuSidebar, setCategoriesDropdown, categoriesDropdown, menuSidebarTitle, menuSidebarSubTitle, NisaetusText}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      fetch("/api/nisaetus/Genders")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    if (menuSidebar) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuSidebar])

  return (
    <AnimatePresence mode='wait'>
        {menuSidebar && (
            <>
                <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 0.3}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2, ease: 'easeInOut'}}
                    className='fixed inset-0 bg-black z-[2]'
                    onClick={() => setMenuSidebar(false)}
                />

                <motion.div 
                    initial={{opacity: 0, x: '-100%'}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: '-100%'}}
                    transition={{duration: 0.2, ease: 'easeInOut'}}
                    className='fixed top-0 h-screen w-full max-w-xl bg-white z-[3] overflow-hidden'
                >
                    <div className="h-full scroll overflow-y-auto container">
                      <div className="relative min-h-full p-4">
                          <div className="absolute top-2 right-2">
                              <X className="icon w-8 h-8" onClick={() => setMenuSidebar(false)}/>
                          </div>
                          <div className="py-10 border-b border-black/20">
                              <h1 className="text-xl font-bold">{NisaetusText.menu}</h1>
                              <h2 className="text-stone-500">{NisaetusText.menunavigation}</h2>
                          </div>
                          <div className="relative py-10 flex flex-col">
                              <p onClick={() => setCategoriesDropdown(!categoriesDropdown)} className={`karma-hover-effect w-max ${categoriesDropdown ? 'active' : ''}`}>{NisaetusText.browse}</p>
                              <AnimatePresence mode="wait">
                                  {categoriesDropdown && (
                                      <motion.div
                                          initial={{opacity: 0, x: '-10%'}}
                                          animate={{opacity: 1, x: 0}}
                                          exit={{opacity: 0, x: '-10%'}}
                                          transition={{duration: 0.2, ease: 'easeInOut'}}
                                          className="relative p-5 mt-1 flex flex-col gap-1"
                                      >
                                          {categories.map((category) => (
                                              <div key={category._id}>
                                                  <Link href={`/products/${category.slug.current}`} onClick={() => {setMenuSidebar(false), setCategoriesDropdown(false)}} className="karma-hover-effect">{category.title}</Link>
                                              </div>
                                          ))}
                                          <Link href={`/products/all`} onClick={() => {setMenuSidebar(false), setCategoriesDropdown(false)}} className="karma-hover-effect w-max">Browse all our collections</Link>
                                          <Link href={'/dummy'} onClick={() => setMenuSidebar(false)} className="karma-hover-effect w-max">Testing Page</Link>
                                      </motion.div>
                                  )}
                              </AnimatePresence>
                          </div>
                      </div>
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}

export default MenuSidebar