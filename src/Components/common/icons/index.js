import React from 'react';
import { ReactComponent as SeekerLogo } from '../../../static/imgs/icons/logo_seeker_light.svg';
import { ReactComponent as MaltemLogo } from '../../../static/imgs/icons/logo_maltem_africa.svg';
import { ReactComponent as HomeSeekerLogo } from '../../../static/imgs/icons/logo_seeker_dark.svg';
import { ReactComponent as ArrowAdvanced } from '../../../static/imgs/icons/arrow-drop-down.svg';


export const SeekerBrand = ({ height = 30, width = 114 }) => {
	return <SeekerLogo className="logo--seeker" style={{ display: 'block', height, width }} />
}


export const MaltemBrand = () => {
	return <MaltemLogo className="logo--maltem" style={{ display: 'block', height: 30 }} />
}

export const HomeMaltemBrand = () => {
	return <HomeSeekerLogo className="home--logoseekrer" style={{ display: 'block', margin: '0 auto',  width: 176, height: 46 }} />
}

export const ArrowSearch = () => {
	return <ArrowAdvanced className="arrow--advanced" />
}