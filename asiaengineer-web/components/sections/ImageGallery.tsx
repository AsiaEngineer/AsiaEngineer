'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  url: string;
  alt: string;
}

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function close() {
    setActiveIndex(null);
  }
  function prev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }
  function next() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.url}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square overflow-hidden rounded-card"
          >
            <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="25vw" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/95 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Tutup galeri"
            className="absolute right-4 top-4 text-white"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-2 text-white md:left-8"
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="relative h-[70vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto berikutnya"
            className="absolute right-2 text-white md:right-8"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
