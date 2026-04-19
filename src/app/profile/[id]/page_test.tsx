import { profileData } from "@/data/profileData";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
      <h1>{profileData.profileCard.displayName}</h1>
      <p>{profileData.brand.title}</p>
      <p>{profileData.brand.intro}</p>

      <h2>Stats</h2>
      {profileData.stats.map((s) => (
        <div key={s.label}>
          <strong>{s.value}</strong> {s.label}
        </div>
      ))}

      <h2>Contact</h2>
      <div>{profileData.contact.email}</div>
      <div>{profileData.contact.phone}</div>
    </div>
  );
}
