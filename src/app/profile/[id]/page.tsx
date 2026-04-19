import MediaGrid from "@/components/MediaGrid";

const staticMedia = [
  { id: "001", type: "PHOTO" as const, url: "/photos/001.jpg", thumbUrl: null, width: null, height: null, durationSec: null, altText: "Photo 001", postId: "static-1" },
  { id: "002", type: "PHOTO" as const, url: "/photos/002.jpg", thumbUrl: null, width: null, height: null, durationSec: null, altText: "Photo 002", postId: "static-2" },
  { id: "003", type: "PHOTO" as const, url: "/photos/003.jpg", thumbUrl: null, width: null, height: null, durationSec: null, altText: "Photo 003", postId: "static-3" },
];

export default async function ProfileGalleryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
        Gallery
      </h1>
      <MediaGrid items={staticMedia} />
    </div>
  );
}
