export default function buildRoutePath(path) {
  const routeParameterRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replace(
    routeParameterRegex,
    "(?<$1>[a-zA-Z0-9_-]+)"
  );
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  let match = [...path.matchAll(routeParameterRegex)];
  // console.log(match);
  // console.log(pathWithParams);
  // console.log(pathRegex);
  return pathRegex;
}
