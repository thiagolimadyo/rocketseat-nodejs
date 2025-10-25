import Database from "./database.js";
import { randomUUID } from "node:crypto";
import buildRoutePath from "./utils/build-route-path.js";

const db = new Database();

export const routes = [
  {
    method: "GET",
    url: buildRoutePath("/users"),
    async handler(req, res) {
      const users = await db.select("users");
      const { query } = req;

      console.log(query);

      res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/users"),
    async handler(req, res) {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      const newUser = await db.insert("users", user);

      return res.writeHead(201).end(JSON.stringify(newUser));
    },
  },
  {
    method: "DELETE",
    url: buildRoutePath("/users/:id"),
    async handler(req, res) {
      const { id } = req.params;
      const result = await db.delete("users", id);
      // console.log(result);
      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    url: buildRoutePath("/users/:id"),
    async handler(req, res) {
      const { id } = req.params;
      const { name, email } = req.body;

      await db.update("users", id, { name, email });

      return res.writeHead(204).end();
    },
  },
];
