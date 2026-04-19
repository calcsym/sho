// @ts-nocheck
import Hero from './components/hero/Hero';
import MediaGrid from './components/MediaGrid';
import ModelCard from './components/print/ModelCard';
import PrintModelCardButton from './components/print/PrintModelCardButton';
import ProfileActions from './components/ProfileActions';
import SeoJsonLd from './components/seo/SeoJsonLd';
import TopNav from './components/TopNav';
import { profileData } from './data/profileData';

export default function App() {
  return (
    <>
      <SeoJsonLd data={profileData} />
      <div className="page">
        <div className="shell">
          <TopNav />
          <Hero />
          <ProfileActions>
            <PrintModelCardButton />
          </ProfileActions>

          {/* Print-only content */}
          <div className="printOnly">
            <ModelCard data={profileData} />
          </div>
          <MediaGrid />
        </div>
      </div>
    </>
  );
}
