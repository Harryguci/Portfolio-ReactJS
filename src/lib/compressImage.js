/**
 * Compress an image File/Blob for inline rich-text embedding.
 * Resizes to max dimensions and iteratively lowers JPEG quality until under maxBytes.
 */
export async function compressImageFile(
  file,
  {
    maxWidth = 1400,
    maxHeight = 1400,
    quality = 0.74,
    minQuality = 0.45,
    maxBytes = 450_000,
    outputType = "image/jpeg",
  } = {},
) {
  if (!file || !file.type?.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  // Keep SVG as-is (usually small); reject huge files early
  if (file.type === "image/svg+xml") {
    if (file.size > maxBytes) {
      throw new Error("SVG is too large. Please use a smaller file.");
    }
    return fileToDataUrl(file);
  }

  const bitmap = await loadImageBitmap(file);
  const { width, height } = fitWithin(bitmap.width, bitmap.height, maxWidth, maxHeight);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.fillStyle = "#0a0140";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  let q = quality;
  let dataUrl = canvas.toDataURL(outputType, q);

  while (estimateDataUrlBytes(dataUrl) > maxBytes && q > minQuality) {
    q = Math.max(minQuality, q - 0.08);
    dataUrl = canvas.toDataURL(outputType, q);
  }

  if (estimateDataUrlBytes(dataUrl) > maxBytes) {
    // Last resort: shrink further
    const scale = Math.sqrt(maxBytes / estimateDataUrlBytes(dataUrl));
    const w2 = Math.max(320, Math.floor(width * scale));
    const h2 = Math.max(240, Math.floor(height * scale));
    canvas.width = w2;
    canvas.height = h2;
    ctx.fillStyle = "#0a0140";
    ctx.fillRect(0, 0, w2, h2);
    const retryBitmap = await loadImageBitmap(file);
    ctx.drawImage(retryBitmap, 0, 0, w2, h2);
    retryBitmap.close?.();
    dataUrl = canvas.toDataURL(outputType, minQuality);
  }

  if (estimateDataUrlBytes(dataUrl) > maxBytes * 1.35) {
    throw new Error(
      "Image is still too large after compression. Try a smaller source image.",
    );
  }

  return dataUrl;
}

function fitWithin(width, height, maxWidth, maxHeight) {
  const ratio = Math.min(1, maxWidth / width, maxHeight / height);
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  };
}

function estimateDataUrlBytes(dataUrl) {
  const base64 = dataUrl.split(",")[1] || "";
  return Math.ceil((base64.length * 3) / 4);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

async function loadImageBitmap(file) {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }

  const dataUrl = await fileToDataUrl(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to decode image."));
    img.src = dataUrl;
  });
}
