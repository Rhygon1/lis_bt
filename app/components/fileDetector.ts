import { useEffect, useState } from "react";

export function useFileTypeDetector(url: string) {
  const [type, setType] = useState<"image" | "video" | "unknown">("unknown");

  useEffect(() => {
    const img = new Image();
    img.src = url;

    const handleLoad = () => setType("image");
    const handleError = () => {
      // If image fails, assume video
      const video = document.createElement("video");
      video.src = url;
      video.onloadeddata = () => setType("video");
      video.onerror = () => setType("unknown");
    };

    img.onload = handleLoad;
    img.onerror = handleError;
  }, [url]);

  return type;
}
