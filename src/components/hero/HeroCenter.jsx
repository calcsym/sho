// @ts-nocheck
import BrandBlock from '../BrandBlock';

export default function HeroCenter({ data }) {
  const { brand, stats } = data;

  return (
    <div className="heroCenter">
      <BrandBlock
        variant="hero"
        align="center"
        name="" // ✅ remove center name
        title={brand.title} // keep title
        intro={brand.intro} // keep intro
        badges={[...brand.affiliations, ...brand.roles]}
        location={brand.location}
        stats={stats}
        statsLayout="inline"
        compact="auto"
        compactHideStats={false}
      />
    </div>
  );
}
