// Personaliza aquí las canciones: título, artista y ruta del archivo MP3.
const tracks = [
  { title: "Last Christmas", artist: "Wham", src: "https://mp3tourl.com/audio/1794179881048-756fc4aa-d3ea-4274-aafb-5eecde93ca02.mp3" },
  { title: "All I Want for Christmas Is You", artist: "Mariah Carey ", src: "https://mp3tourl.com/audio/1794180002361-b2b882b0-d37d-46b6-9033-8bba25f1dd2c.mp3" },
  { title: "Blanca Navidad", artist: "Kenia Os", src: "https://mp3tourl.com/audio/1794180049019-8e1c377e-b97b-4e28-b405-685dfe4bbaaa.mp3" }
];

const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const views = {
  home: document.getElementById("homeView"),
  about: document.getElementById("aboutView"),
  music: document.getElementById("musicView"),
  friends: document.getElementById("friendsView")
};
let clockStarted = false;

function showView(name) {
  Object.entries(views).forEach(([key, view]) => {
    view.hidden = key !== name;
  });
  if (name === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
  if (!clockStarted) {
    updateClock();
    window.setInterval(updateClock, 1000);
    clockStarted = true;
  }
}
document.getElementById("enterButton").addEventListener("click", () => {
  intro.style.transition = "opacity .65s ease, transform .65s ease";
  intro.style.opacity = "0";
  intro.style.transform = "scale(1.025)";
  window.setTimeout(() => {
    intro.hidden = true;
    mainPage.hidden = false;
    document.body.style.overflowX = "hidden";
    showView("home");
  }, 650);
});

document.querySelectorAll("[data-view]").forEach(control => {
  control.addEventListener("click", event => {
    event.preventDefault();
    showView(control.dataset.view);
  });
});

const audio = document.getElementById("audioPlayer");
const title = document.getElementById("trackTitle");
const artist = document.getElementById("trackArtist");
const playButton = document.getElementById("playTrack");
const status = document.getElementById("playerStatus");
const progressFill = document.getElementById("progressFill");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
let trackIndex = 0;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
function loadTrack(index, autoplay = false) {
  trackIndex = (index + tracks.length) % tracks.length;
  const track = tracks[trackIndex];
  title.textContent = track.title;
  artist.textContent = track.artist;
  audio.src = track.src;
  progressFill.style.width = "0%";
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Reproducir");
  status.textContent = "Tu banda sonora para los días fríos";
  if (autoplay) playAudio();
}
async function playAudio() {
  try {
    await audio.play();
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pausar");
    status.textContent = "Reproduciendo · deja que nieve";
  } catch (error) {
    status.textContent = "Añade tus MP3 en assets/music para escuchar";
  }
}
playButton.addEventListener("click", () => {
  if (audio.paused) playAudio();
  else {
    audio.pause();
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Reproducir");
    status.textContent = "En pausa · respira un momento";
  }
});
document.getElementById("nextTrack").addEventListener("click", () => loadTrack(trackIndex + 1, true));
document.getElementById("prevTrack").addEventListener("click", () => loadTrack(trackIndex - 1, true));
audio.addEventListener("loadedmetadata", () => duration.textContent = formatTime(audio.duration));
audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);
  progressFill.style.width = audio.duration ? `${(audio.currentTime / audio.duration) * 100}%` : "0%";
});
audio.addEventListener("ended", () => loadTrack(trackIndex + 1, true));
audio.addEventListener("error", () => {
  status.textContent = "No se encuentra el MP3. Revisa la ruta en js/main.js";
});
loadTrack(0);

function updateClock() {
  const now = new Date();
  document.getElementById("clockTime").textContent = now.toLocaleTimeString("es-ES", {hour:"2-digit", minute:"2-digit", second:"2-digit"});
  document.getElementById("clockDate").textContent = now.toLocaleDateString("es-ES", {day:"2-digit", month:"short", year:"numeric"}).replace(".", "").toUpperCase();
}


function updateClock() {
  const now = new Date();
  document.getElementById("clockTime").textContent = now.toLocaleTimeString("es-ES", {hour:"2-digit", minute:"2-digit", second:"2-digit"});
  document.getElementById("clockDate").textContent = now.toLocaleDateString("es-ES", {day:"2-digit", month:"short", year:"numeric"}).replace(".", "").toUpperCase();
}
