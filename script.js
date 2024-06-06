// JavaScript pour gérer les vidéos YouTube
function loadVideo() {
  const videoId = document.getElementById('videoId').value;
  const player = document.getElementById('player');
  player.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;

  // Ajouter à l'historique
  const history = document.getElementById('history');
  const listItem = document.createElement('div');
  listItem.innerHTML = `Video watched: ${videoId}`;
  history.appendChild(listItem);
}

// JavaScript pour intégrer Spotify
// Remplacer par les fonctionnalités de Spotify API
