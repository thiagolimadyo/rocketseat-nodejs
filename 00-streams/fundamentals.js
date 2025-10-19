// EM Nodejs, toda porta de entrada e saída automaticamente é uma STREAM
// import process from "node:process";

// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        return this.push(null);
      }

      this.push(Buffer.from(String(i)));
    }, 10);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const chunkTransformed = Number(String(chunk)) * -1;
    callback(null, Buffer.from(String(chunkTransformed)));
  }
}

class MultiplyByTen extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString() * 10));
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTen());
