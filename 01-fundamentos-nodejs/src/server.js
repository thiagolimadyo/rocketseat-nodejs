import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    // Early return -> Dentro de uma função, se houver algum RETURN, o que vier após não será executado
    // console.log(req.headers);
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "Joana Dark",
      email: "joana.d@micron.com",
    });

    return res.writeHead(201).end();
  }

  res.writeHead(404).end();
});

server.listen(3333);
