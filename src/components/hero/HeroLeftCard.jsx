export default function HeroLeftCard({ data }) {
  const { image, displayName } = data;

  return (
    <div className="heroLeftCard">
      <div className="photoFrame">
        <img className="profilePhoto" src={image} alt={displayName} />
      </div>

      <div className="heroLeftName">{displayName}</div>
    </div>
  );
}
