function getActivePathname() {
  return location.hash.replace('#', '') || '/';
}

function extractPathnameSegments(pathname) {
  const splitPath = pathname.split('/');

  return {
    resource: splitPath[1] || null,
    id: splitPath[2] || null,
  };
}

function constructRouteFromSegements(pathSegments) {
  let pathname = '';

  if (pathSegments.resource)
    pathname += pathname.concat(`/${pathSegments.resource}`);

  if (pathSegments.id) pathname = pathname.concat('/:id');

  return pathname || '/';
}

export function getActiveRoute() {
  const pathname = getActivePathname();
  const pathSegments = extractPathnameSegments(pathname);

  return constructRouteFromSegements(pathSegments);
}
