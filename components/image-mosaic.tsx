import Image from "next/image";
import type { ImportedImage } from "../lib/site-content";

export function ImageMosaic({
  images,
  showCaptions = false
}: {
  images: ImportedImage[];
  showCaptions?: boolean;
}) {
  return (
    <div className={`image-mosaic${showCaptions ? " image-mosaic-captioned" : ""}`}>
      {images.map((image) => (
        <figure className="mosaic-card" key={image.id}>
          <div className="mosaic-image">
            <Image alt={image.alt} fill sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 25vw" src={image.localPath} />
          </div>
          {showCaptions ? <figcaption>{image.alt}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
