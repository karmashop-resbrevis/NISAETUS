import React, { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'

const InfoSidebar = ({ children, isOpen, setIsOpen }) => {

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

	return (
		<AnimatePresence mode='wait'>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.3 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}
						className='fixed inset-0 bg-black z-[5]'
						onClick={() => setIsOpen(false)}
					/>

					<motion.div
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '100%' }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}
						className='fixed right-0 top-0 h-screen w-full max-w-xl bg-white z-[6] overflow-hidden'
					>
						<div className="h-full scroll overflow-y-auto container">
							{children}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default InfoSidebar;