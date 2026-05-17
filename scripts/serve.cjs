const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

http
  .createServer((request, response) => {
    const requestedPath = decodeURIComponent(request.url.split("?")[0]).replace(/^\/+/, "");
    const requestedFile = path.resolve(root, requestedPath || "index.html");
    const file = requestedFile.startsWith(root) && fs.existsSync(requestedFile)
      ? requestedFile
      : path.join(root, "index.html");

    response.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
    fs.createReadStream(file).pipe(response);
  })
  .listen(port, host, () => {
    console.log(`Serving Stewart's Home Registry at http://${host}:${port}`);
  });
