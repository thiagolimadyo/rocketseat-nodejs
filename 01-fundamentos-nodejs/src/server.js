import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import extractQueryParams from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((el) => {
    return el.method === method && el.url.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.url);

    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  res.writeHead(404).end();
});

server.listen(3333);
