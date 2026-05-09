let episodes = [];

const episodeList = document.getElementById("episode-list");
const searchInput = document.getElementById("search");

fetch("episodes.json")
  .then(res => res.json())
  .then(data => {
    episodes = data;
    displayEpisodes(episodes);
  });

function displayEpisodes(list) {
  episodeList.innerHTML = "";

  list.forEach(ep => {
    const div = document.createElement("div");

    let className = "canon";

    if (ep.type === "Filler") className = "filler";
    if (ep.type === "Mixed Canon/Filler") className = "mixed";

    div.className = `episode ${className}`;

    div.innerHTML = `
      <h3>Episode ${ep.number}</h3>
      <p>${ep.title}</p>
      <strong>${ep.type}</strong>
    `;

    episodeList.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = episodes.filter(ep =>
    ep.title.toLowerCase().includes(value) ||
    ep.number.toString().includes(value)
  );

  displayEpisodes(filtered);
});

function filterEpisodes(type) {
  if (type === "All") {
    displayEpisodes(episodes);
    return;
  }

  const filtered = episodes.filter(ep => ep.type === type);
  displayEpisodes(filtered);



