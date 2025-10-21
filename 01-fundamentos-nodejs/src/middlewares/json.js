export async function json(req, res) {
  const buffers = [];

  for await (let chunk of req) {
    buffers.push(chunk);
  }

  try {
    const bodyContent = Buffer.concat(buffers).toString();
    req.body = JSON.parse(bodyContent);
  } catch {
    req.body = null;
  }

  res.setHeader("Content-Type", "application/json");
}
