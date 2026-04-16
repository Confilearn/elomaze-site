import handler from "../dist/server/server.js";

export default async function (req, res) {
  try {
    const url = `https://${req.headers.host}${req.url}`;

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });

    const response = await handler(request);

    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
