import http from "node:http";
import { json } from "./middlewares/json.js";
import Database from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    // Early return -> Dentro de uma função, se houver algum RETURN, o que vier após não será executado
    // console.log(req.headers);

    const users = await database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    };

    const newUser = await database.insert("users", user);
    // users.push(user);

    return res.writeHead(201).end(JSON.stringify(newUser));
  }

  res.writeHead(404).end();
});

server.listen(3333);
