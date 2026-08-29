import { Icon } from "./Icon";
import { useEffect, useState } from "react";
import { getGalleryImages, GalleryImage } from "@/lib/galleryStore";

export function GalleryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setImages(getGalleryImages());
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-md border border-outline-variant/30 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/20 px-6 py-4">
          <h2 className="headline-md uppercase text-on-surface italic">Full Portfolio</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-low hover:text-on-surface"
          >
            <Icon name="close" className="text-[24px]" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
            {images.map((img) => (
              <div key={img.id} className="group relative mb-4 overflow-hidden rounded-sm border border-outline-variant/20">
                <img 
                  src={img.url} 
                  alt={img.alt}
                  className="w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
