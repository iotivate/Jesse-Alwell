import { getSite } from "@/lib/content";
import { Nav } from "./nav";

// Server wrapper: fetches site config and hands off to the client Nav.
export async function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const site = await getSite();
  return (
    <Nav
      artistName={site.artistName}
      location={site.location}
      overlay={overlay}
    />
  );
}
