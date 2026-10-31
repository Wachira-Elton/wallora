
export function setupSearch(wallpapers, render) {
  const input = document.getElementById("searchInput");
  const buttons = document.querySelectorAll("[data-category]");

  let selectedCategory = "all";

  function updateGallery() {
    const query = input.value.trim().toLowerCase();

    const results = wallpapers.filter(wallpaper => {
      const matchesText =
        wallpaper.title.toLowerCase().includes(query) ||
        wallpaper.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" ||
        wallpaper.category === selectedCategory;

      return matchesText && matchesCategory;
    });

    render(results);
  }

  input.addEventListener("input", updateGallery);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;

      buttons.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      updateGallery();
    });
  });

  updateGallery();
}
