
export async function downloadImage(url, title, onStatus) {
  onStatus("Preparing your download...");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Image download failed.");
    }

    const blob = await response.blob();

    if (!blob.size || !blob.type.startsWith("image/")) {
      throw new Error("The downloaded file is not a valid image.");
    }

    const imageUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const safeName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "wallpaper";

    const extension = blob.type.split("/")[1] || "jpg";

    link.href = imageUrl;
    link.download = `${safeName}.${extension}`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);

    const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);

    onStatus(`Download started. File size: ${sizeMB} MB`);

  } catch (error) {
    console.error("Download error:", error);

    onStatus(
      "Download unavailable. Use the Open original image link instead."
    );
  }
}
