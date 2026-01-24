import { routeNames, type BreadcrumbArea } from "./route-names";

export interface Breadcrumb {
  name: string;
  href: string;
}

function formatSegment(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function resolveBreadcrumbs(
  pathname: string,
  area: BreadcrumbArea
): Breadcrumb[] {
  if (pathname === "/") return [];

  const breadcrumbs: Breadcrumb[] = [{ name: "Inicio", href: "/" }];
  const segments = pathname.split("/").filter(Boolean);
  const areaRoutes = routeNames[area];

  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    const label = areaRoutes[currentPath];

    if (label) {
      breadcrumbs.push({
        name: label,
        href: currentPath,
      });
      return;
    }

    breadcrumbs.push({
      name: formatSegment(segment),
      href: currentPath,
    });
  });

  return breadcrumbs;
}
