import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

// console.log(databasePath);

export default class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  async select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  async insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  async delete(table, id) {
    const index = this.#database[table].findIndex((el) => el.id === id);
    console.log(id);
    if (index > -1) {
      this.#database[table].splice(index, 1);
      this.#persist();
      return index;
    }

    return;
  }

  async update(table, id, data) {
    const index = this.#database[table].findIndex((el) => el.id === id);

    if (index > -1) {
      this.#database[table].splice(index, 1, { id, ...data });
      this.#persist();
      return;
    }

    return;
  }
}
