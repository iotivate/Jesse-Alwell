// Studio has its own chrome — bypass the site's body classes & fonts.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
