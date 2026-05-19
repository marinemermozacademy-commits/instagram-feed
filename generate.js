const fs = require("fs");

const FEED_URL = `https://feeds.behold.so/ggzF9fLF0zKUC5DAK1q2?t=${Date.now()}`;

async function main() {
  const res = await fetch(FEED_URL);
  const data = await res.json();

  console.log("TOTAL POSTS:", data.posts?.length);
  console.log("FIRST POST ID:", data.posts?.[0]?.id);
  console.log("FIRST POST DATE:", data.posts?.[0]?.timestamp);

  const posts = data.posts.slice(0, 6);

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1920, height=1080">
<title>Instagram Feed</title>

<style>
body {
  margin: 0;
  background: #000;
  overflow: hidden;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  width: 100vw;
  height: 100vh;   /* 👈 IMPORTANT */
  padding: 10px;
  box-sizing: border-box;
}

.item {
  position: relative;

  aspect-ratio: 4 / 5;

  overflow: hidden;
  background: #000;
}

.item img {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}
</style>

</head>
<body>

<div class="grid">
${posts.map(p => {
  const img = p.mediaUrl;
  return `<div class="item"><img src="${img}" /></div>`;
}).join("")}
</div>

</body>
</html>
`;

  fs.writeFileSync("index.html", html);
}

main();

