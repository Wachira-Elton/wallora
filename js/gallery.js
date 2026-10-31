
export function renderWallpapers(items, openPreview) {
  const gallery = document.getElementById("wallpaperGrid");
  const message = document.getElementById("resultMessage");

  gallery.replaceChildren();

  if (items.length === 0) {
    message.textContent = "No wallpapers found. Try another search.";
    return;
  }

  message.textContent = `Showing ${items.length} wallpapers`;

  items.forEach(wallpaper => {
    const card = document.createElement("article");
    card.className = "wallpaper-card";

    const image = document.createElement("img");
    image.src = wallpaper.versions.desktop;
    image.alt = wallpaper.title;
    image.loading = "lazy";
    image.decoding = "async";

    image.onerror = () => {
      const error = document.createElement("p");
      error.textContent = "Image unavailable";
      error.style.padding = "50px 10px";
      card.replaceChild(error, image);
    };

    const info = document.createElement("div");
    info.className = "wallpaper-info";

    const title = document.createElement("h3");
    title.textContent = wallpaper.title;

    const category = document.createElement("p");
    category.textContent = wallpaper.category;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "preview-button";
    button.textContent = "Preview wallpaper";
    button.addEventListener("click", () => openPreview(wallpaper));

    info.append(title, category, button);
    card.append(image, info);
    gallery.appendChild(card);
  });
}
