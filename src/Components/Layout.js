import React from 'react';

import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }) => (
	<div className="container container--main">
		<Header />
		<div className="content">
			{children}
		</div>
		<Footer />
	</div>
);

export default Layout;

