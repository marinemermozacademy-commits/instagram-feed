const fs = require("fs");

const FEED_URL = `https://feeds.behold.so/ggzF9fLF0zKUC5DAK1q2?t=${Date.now()}`;

async function main() {
  const res = await fetch(FEED_URL);
  const data = await res.json();

  const posts = data.posts.slice(0, 6);

const html = `<h1>UPDATED ${Date.now()}</h1>`;
`;

  fs.writeFileSync("index.html", html);
}

main();
