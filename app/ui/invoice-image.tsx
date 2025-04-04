"use client";

import Image from "next/image";
import { useState } from "react";

export default function InvoiceImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc || "/customers/default.png"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc("/customers/default.png")}
    />
  );
}
