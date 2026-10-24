import { useEffect, useState } from "react";
import { DEFAULT_PROJECT_THUMB } from "../../constants/assets";

/**
 * Image that falls back to a local default thumb when src is missing or fails to load.
 */
export default function SafeImage({
  src,
  fallback = DEFAULT_PROJECT_THUMB,
  alt = "",
  className,
  loading = "lazy",
  decoding = "async",
  ...rest
}) {
  const resolvedSrc = src || fallback;
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={(e) => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
        rest.onError?.(e);
      }}
    />
  );
}
