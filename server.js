const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".txt": "text/plain; charset=utf-8" };
http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split("?")[0]);
  const file = requestPath === "/" ? "index.html" : requestPath.replace(/^\//, "");
  const target = path.resolve(root, file);
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    res.writeHead(404, { "Content-Type": types[".html"] });
    return res.end("<!doctype html><html lang='pt-BR'><title>Pagina nao encontrada</title><body><h1>Pagina nao encontrada</h1><a href='/'>Voltar ao inicio</a></body></html>");
  }
  res.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream" });
  fs.createReadStream(target).pipe(res);
}).listen(process.env.PORT || 3000, () => console.log("Site em http://localhost:3000"));
