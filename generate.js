const fs = require("fs");

const FEED_URL = "https://feeds.behold.so/TON_ID.json";

async function main() {
  const res = await fetch(FEED_URL);
  const data = await res.json();

  const posts = data.posts.slice(0, 9);

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
  grid-template-rows: repeat(3, 1fr);
  width: 100vw;
  height: 100vh;
  gap: 5px;
}

.item {
  width: 100%;
  height: 100%;
}

.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

</head>
<body>

<div class="grid">
${posts.map(p => {
  const img = p.sizes?.medium?.mediaUrl || p.mediaUrl;
  return `<div class="item"><img src="${img}" /></div>`;
}).join("")}
</div>

</body>
</html>
`;

  fs.writeFileSync("index.html", html);
}

main();
