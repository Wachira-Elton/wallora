
import { downloadImage } from "./downloads.js";

export function setupPreview() {
  const dialog = document.getElementById("previewDialog");
  const image = document.getElementById("previewImage");
  const title = document.getElementById("previewTitle");
  const category = document.getElementById("previewCategory");
  const close = document.getElementById("closePreview");
  const original = document.getElementById("originalImageLink");

  const size = document.getElementById("downloadSize");
  const button = document.getElementById("downloadButton");
  const details = document.getElementById("imageDetails");
  const message = document.getElementById("downloadMessage");

  let currentWallpaper = null;

  close.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  image.addEventListener("load", () => {
    details.textContent =
      `Dimensions: ${image.naturalWidth} × ${image.naturalHeight} pixels`;
  });

  image.addEventListener("error", () => {
    details.textContent = "Preview image unavailable.";
    image.removeAttribute("src");
  });

size.addEventListener("change", () => {
  if (!currentWallpaper) return;

  const url = currentWallpaper.versions[size.value];

  if (!url) return;

  image.src = url;
  original.href = url;
});

  button.addEventListener("click", async () => {
    if (!currentWallpaper || button.disabled) return;

    const url = currentWallpaper.versions[size.value];

    if (!url) {
      message.textContent = "This image size is unavailable.";
      return;
    }

    button.disabled = true;

    await downloadImage(url, currentWallpaper.title, text => {
      message.textContent = text;
    });

    button.disabled = false;
  });

  return function openPreview(wallpaper) {
    currentWallpaper = wallpaper;

    size.value = "mobile";
    title.textContent = wallpaper.title;
    category.textContent = `Category: ${wallpaper.category}`;

    image.src = wallpaper.versions.mobile;
    image.alt = wallpaper.title;

    original.href = wallpaper.versions.mobile;

    details.textContent = "Loading image details...";
    message.textContent = "";

    dialog.showModal();
  };
}
