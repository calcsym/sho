// @ts-nocheck
import { profileData } from '../data/profileData';
import BrandBlock from './BrandBlock';
import LogoMark from './LogoMark';

export default function TopNav() {
  return (
    <header className="topnav">
      <BrandBlock
        variant="nav"
        align="left"
        logoNode={<LogoMark />}
        logoSrc={profileData.brand.logo}
        name={profileData.brand.name}
        showStats={false}
        compact={true}
      />

      <nav className="navRight">
        <a className="navLink" href="#product">
          PRODUCT
        </a>
        <a className="ctaBtn" href="#contact">
          CONTACT ME
        </a>
      </nav>
    </header>
  );
}
