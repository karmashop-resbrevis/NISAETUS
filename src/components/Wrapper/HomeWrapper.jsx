import React from 'react'
import Header from '../MainComponents/Header'
import Footer from '../MainComponents/Footer'

const HomeWrapper = ({ children }) => {
	return (
		<div className='relative'>
			<Header />
				{children}
			<Footer />
		</div>
	)
}

export default HomeWrapper