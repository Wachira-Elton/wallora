
import { wallpapers } from "./wallpapers.js";
import { renderWallpapers } from "./gallery.js";
import { setupSearch } from "./search.js";
import { setupPreview } from "./preview.js";

function startWallora() {
  const gallery = document.getElementById("wallpaperGrid");
  const message = document.getElementById("resultMessage");

  if (!gallery || !message) {
    console.error("Wallora could not find its gallery.");
    return;
  }

  const openPreview = setupPreview();

  setupSearch(wallpapers, results => {
    renderWallpapers(results, openPreview);
  });
}

startWallora();
