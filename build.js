const fs = require("fs");
const path = require("path");
const { services, generatedPages } = require("./pages");

const root = __dirname;
const output = path.join(root, "dist");
const files = ["index.html", "styles.css", "styles-overrides.css", "pages.css", "script.js", "llms.txt", "robots.txt", "google0eab71c0078a4591.html"];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
files.forEach((file) => fs.copyFileSync(path.join(root, file), path.join(output, file)));
fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });

const pages = generatedPages();
for (const [relativePath, html] of pages) {
  const destination = path.join(output, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html, "utf8");
}

const modifiedDates = {
  "/": fs.statSync(path.join(root, "index.html")).mtime.toISOString().slice(0, 10),
  generated: fs.statSync(path.join(root, "pages.js")).mtime.toISOString().slice(0, 10)
};
const urls = ["/", "/contato/", ...services.map(({ slug }) => `/servicos/${slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>https://yorramn.dev.br${url}</loc><lastmod>${url === "/" ? modifiedDates["/"] : modifiedDates.generated}</lastmod></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(output, "sitemap.xml"), sitemap, "utf8");

const htmlFiles = [path.join(output, "index.html"), ...[...pages.keys()].map((relativePath) => path.join(output, relativePath))];
for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const requiredOnce = [/<title>/g, /<h1(?:\s|>)/g, /name="description"/g, /rel="canonical"/g];
  const socialImageTags = [
    /property="og:image" content="https:\/\/yorramn\.dev\.br\/assets\/logoverde_1\.jpg"/g,
    /property="og:image:secure_url" content="https:\/\/yorramn\.dev\.br\/assets\/logoverde_1\.jpg"/g,
    /property="og:image:type" content="image\/jpeg"/g,
    /name="twitter:image" content="https:\/\/yorramn\.dev\.br\/assets\/logoverde_1\.jpg"/g
  ];
  if (html.includes('<div id="root">')) throw new Error(`Contêiner legado do React encontrado em ${htmlFile}`);
  if (requiredOnce.some((pattern) => (html.match(pattern) || []).length !== 1)) throw new Error(`Estrutura SEO inválida em ${htmlFile}`);
  if (socialImageTags.some((pattern) => (html.match(pattern) || []).length !== 1)) throw new Error(`Metadados de imagem social inválidos em ${htmlFile}`);
}

console.log(`Site gerado em ${output} com ${pages.size + 1} páginas HTML.`);
