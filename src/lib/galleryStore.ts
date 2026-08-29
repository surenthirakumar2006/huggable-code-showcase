export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  addedAt: number;
}

const STORAGE_KEY = "tuneup_gallery_v3";

const DEFAULT_GALLERY: GalleryImage[] = [
  {
    id: "g1",
    url: "/comp/img1.png",
    alt: "Editorial black and white portrait of a sharp undercut haircut",
    addedAt: 1,
  },
  {
    id: "g2",
    url: "/comp/img2.png",
    alt: "Close-up of a defined beard fade with straight-razor lines",
    addedAt: 2,
  },
  {
    id: "g3",
    url: "/comp/img3.png",
    alt: "Distinguished older man with a silver side-part pompadour",
    addedAt: 3,
  }
];

export function getGalleryImages(): GalleryImage[] {
  if (typeof window === "undefined") return DEFAULT_GALLERY;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY));
    return DEFAULT_GALLERY;
  }
  return JSON.parse(data);
}

export function saveGalleryImages(images: GalleryImage[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }
}

export function addGalleryImage(url: string, alt: string): GalleryImage {
  const images = getGalleryImages();
  const newImage: GalleryImage = {
    id: Math.random().toString(36).substring(2, 11),
    url,
    alt: alt || "Gallery image",
    addedAt: Date.now(),
  };
  saveGalleryImages([...images, newImage]);
  return newImage;
}

export function removeGalleryImage(id: string) {
  const images = getGalleryImages();
  saveGalleryImages(images.filter(img => img.id !== id));
}
