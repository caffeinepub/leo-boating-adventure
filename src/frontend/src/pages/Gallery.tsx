import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const IMAGES = [
  {
    src: "/assets/generated/gallery-family.dim_600x400.jpg",
    label: "Family Ride",
  },
  {
    src: "/assets/generated/gallery-couple.dim_600x400.jpg",
    label: "Couple Ride",
  },
  {
    src: "/assets/generated/gallery-group.dim_600x400.jpg",
    label: "Corporate Group",
  },
  {
    src: "/assets/generated/gallery-sunset.dim_600x400.jpg",
    label: "Sunset Ride",
  },
  {
    src: "/assets/generated/gallery-mangrove.dim_600x400.jpg",
    label: "Mangrove View",
  },
  {
    src: "/assets/generated/gallery-marina.dim_600x400.jpg",
    label: "Marina View",
  },
  {
    src: "/assets/generated/gallery-speed.dim_600x400.jpg",
    label: "Speed Boat",
  },
  {
    src: "/assets/generated/gallery-birthday.dim_600x400.jpg",
    label: "Birthday Ride",
  },
  {
    src: "/assets/generated/gallery-birds.dim_600x400.jpg",
    label: "Bird Watching",
  },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    for (const e of Array.from(el.querySelectorAll(".fade-up"))) {
      observer.observe(e);
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const pageRef = useFadeIn();

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImg = useCallback(
    () =>
      setLightboxIdx((p) =>
        p !== null ? (p - 1 + IMAGES.length) % IMAGES.length : null,
      ),
    [],
  );
  const nextImg = useCallback(
    () => setLightboxIdx((p) => (p !== null ? (p + 1) % IMAGES.length : null)),
    [],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLightbox, prevImg, nextImg]);

  return (
    <div ref={pageRef}>
      <section className="bg-navy py-16 px-4 text-center">
        <h1 className="font-poppins font-black text-white text-4xl md:text-5xl mb-4 fade-up">
          Our <span className="text-gold">Gallery</span>
        </h1>
        <p className="text-white/70 font-opensans text-lg fade-up">
          Moments captured on the beautiful Pondicherry waters
        </p>
      </section>

      <section className="py-20 px-4 bg-[#F0F8FF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {IMAGES.map((img, i) => (
              <button
                type="button"
                key={img.label}
                onClick={() => setLightboxIdx(i)}
                data-ocid={`gallery.item.${i + 1}`}
                className="gallery-item rounded-xl overflow-hidden fade-up aspect-video block text-left"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
                <div className="gallery-overlay rounded-xl">
                  <div className="text-center text-white">
                    <ZoomIn size={32} className="mx-auto mb-2" />
                    <span className="font-poppins font-bold">{img.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <dialog
          open
          className="fixed inset-0 m-0 max-w-none w-full h-full bg-black/90 z-[9998] flex items-center justify-center p-0 border-0"
          data-ocid="gallery.lightbox.modal"
          onClose={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            data-ocid="gallery.lightbox.close.button"
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={prevImg}
            data-ocid="gallery.lightbox.prev.button"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={IMAGES[lightboxIdx].src}
            alt={IMAGES[lightboxIdx].label}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
          <button
            type="button"
            onClick={nextImg}
            data-ocid="gallery.lightbox.next.button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="font-poppins font-bold text-white text-lg">
              {IMAGES[lightboxIdx].label}
            </span>
            <span className="text-white/60 font-opensans text-sm ml-3">
              {lightboxIdx + 1} / {IMAGES.length}
            </span>
          </div>
        </dialog>
      )}
    </div>
  );
}
