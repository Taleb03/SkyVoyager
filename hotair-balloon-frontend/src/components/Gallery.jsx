
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1724155840929-4c51c3061d45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Colorful hot air balloons at sunrise",
    width: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    alt: "Flying over mountains in a hot air balloon",
    width: "standard",
  },
  {
    src: "https://images.unsplash.com/photo-1495819427834-1954f20ebb97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    alt: "Inside view from hot air balloon basket",
    width: "standard",
  },
  {
    src: "https://images.unsplash.com/photo-1662914055707-5c6337a018f4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hot air balloon festival with many balloons",
    width: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1723293321357-120f918df227?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Glowing hot air balloons against night sky",
    width: "standard",
  },
  {
    src: "https://images.unsplash.com/photo-1670236272849-21f1b9d94149?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Balloon silhouette against colorful sunset",
    width: "standard",
  },
];

const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const galleryItemRefs = useRef(new Map());
  const triggers = useRef([]);

  const getGalleryRefsArray = () => {
    const refsArray = [];
    galleryImages.forEach((_, index) => {
      const node = galleryItemRefs.current.get(index);
      if (node) {
        refsArray.push(node);
      }
    });
    return refsArray;
  };

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;

    const setupAnimations = () => {
      triggers.current.forEach((st) => st.kill?.());
      triggers.current = [];
      gsap.killTweensOf([headingRef.current?.children, getGalleryRefsArray()]);

      const headingElements = headingRef.current?.children;
      const galleryElements = getGalleryRefsArray();

      if (headingElements?.length) {
        gsap.set(headingElements, { opacity: 0, y: 30 });

        const headingTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            const anim = gsap.to(headingElements, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
        triggers.current.push(headingTrigger);
      }

      if (galleryElements.length > 0 && gridRef.current) {
        gsap.set(galleryElements, { opacity: 0, y: 50 });

        const itemsTrigger = ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          onEnter: () => {
            const anim = gsap.to(galleryElements, {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
        triggers.current.push(itemsTrigger);
      }
    };

    const timeoutId = setTimeout(() => {
      setupAnimations();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      triggers.current.forEach((st) => st.kill?.());
      triggers.current = [];
      gsap.killTweensOf([headingRef.current?.children, getGalleryRefsArray()]);
    };
  }, [galleryImages.length]);

  const openLightbox = (src) => {
    setLightboxImage(src);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.tagName === "BUTTON" ||
      e.target.closest("button")
    ) {
      setLightboxImage(null);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
        document.body.style.overflow = "auto";
      }
    };

    if (lightboxImage) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "auto";
      }
    };
  }, [lightboxImage]);

  return (
    <section
      id="gallery"
      className="pt-1 pb-1 bg-white md:pt-12 md:pb-24"
      ref={sectionRef}
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center" ref={headingRef}>
            <h2 className="mb-4 text-3xl font-bold font-space md:text-4xl text-slate-900">
              Gallery
            </h2>
            <p className="max-w-3xl mx-auto text-slate-700">
              Glimpses of the extraordinary experiences that await you high
              above the ground.
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                ref={(el) => {
                  if (el) {
                    galleryItemRefs.current.set(index, el);
                  } else {
                    galleryItemRefs.current.delete(index);
                  }
                }}
                className={`
                    relative h-64 overflow-hidden rounded-lg cursor-pointer
                    transition-transform duration-300 ease-in-out hover:scale-[1.02]
                    ${image.width === "wide" ? "md:col-span-2" : "col-span-1"}
                `}
                onClick={() => openLightbox(image.src)}
                style={{ willChange: "transform, opacity" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-sm"
              onClick={closeLightbox} // Close on overlay click
              role="dialog" // Accessibility
              aria-modal="true" // Accessibility
              aria-label="Image Lightbox" // Accessibility
            >
              <button
                className="absolute z-10 p-2 text-white transition-colors duration-200 top-4 right-4 hover:text-sky-300"
                onClick={closeLightbox} // Ensure button also closes
                aria-label="Close lightbox" // Accessibility
              >
                <X size={32} />
              </button>
              <div className="relative max-w-full max-h-[90vh]">
                {" "}
                {/* Container for image to manage size */}
                <img
                  src={lightboxImage}
                  alt="Gallery view" // Alt could be more descriptive if needed
                  className="block object-contain w-auto h-auto max-w-full max-h-[inherit]" // Ensure image scales correctly within container
                  // Prevent closing lightbox when clicking directly on the image
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
