import http from "node:http";
import { Transform } from "node:stream";

class InvertSignalStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(String(chunk)) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const content = Buffer.concat(buffers).toString();

  console.log(content);
  return res.end(content);

  // return req.pipe(new InvertSignalStream()).pipe(res);
});

server.listen(3334);
