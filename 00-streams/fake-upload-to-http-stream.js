import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  i = 0;
  _read() {
    const index = this.i++;
    setTimeout(() => {
      if (index > 5) {
        return this.push(null);
      }
      this.push(Buffer.from(String(index)));
    }, 10);
  }
}

// new OneToHundredStream().pipe(process.stdout);

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
