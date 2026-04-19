import '../../print.css';

export default function ModelCard({ data }) {
  const { brand, profileCard, measurements, contact, stats } = data;

  return (
    <section className="printCard" aria-label="Print Model Card">
      <header className="printHeader">
        <div className="printIdentity">
          <div className="printName">{brand.name}</div>
          <div className="printTitle">{brand.title}</div>

          <div className="printMeta">
            {brand.location?.label ? <span>{brand.location.label}</span> : null}
            {contact.email ? <span>· {contact.email}</span> : null}
            {contact.phone ? <span>· {contact.phone}</span> : null}
          </div>
        </div>

        <div className="printPhotoWrap">
          <img className="printPhoto" src={profileCard.image} alt={brand.name} />
        </div>
      </header>

      {brand.intro ? <p className="printIntro">{brand.intro}</p> : null}

      <div className="printGrid">
        <div className="printBlock">
          <div className="printBlockTitle">Measurements</div>
          <div className="printList">
            <div>
              <b>Height</b> {measurements.height}
            </div>
            <div>
              <b>Bust</b> {measurements.bust}
            </div>
            <div>
              <b>Waist</b> {measurements.waist}
            </div>
            <div>
              <b>Hips</b> {measurements.hips}
            </div>
            <div>
              <b>Shoes</b> {measurements.shoes}
            </div>
          </div>
        </div>

        <div className="printBlock">
          <div className="printBlockTitle">Roles</div>
          <div className="printBadges">
            {[...(brand.affiliations || []), ...(brand.roles || [])].map((b, i) => (
              <span key={i} className="printBadge">
                <span className="printBadgeIcon">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>

        <div className="printBlock">
          <div className="printBlockTitle">Social / Portfolio</div>
          <div className="printList">
            {(brand.profiles || []).map((p, i) => (
              <div key={i}>
                <b>{p.label}</b> {p.url}
              </div>
            ))}
          </div>
        </div>

        <div className="printBlock">
          <div className="printBlockTitle">Stats</div>
          <div className="printStatsLine">
            {stats?.map((s, i) => (
              <span key={s.label}>
                <b>{s.value}</b> {s.label}
                {i < stats.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className="printFooter">
        <span>
          © {new Date().getFullYear()} {brand.name}
        </span>
        {brand.brandName ? <span> · {brand.brandName}</span> : null}
      </footer>
    </section>
  );
}
