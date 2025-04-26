import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "The sunrise balloon ride was absolutely breathtaking. The staff was professional, friendly, and made us feel completely safe. A bucket list experience I'll remember forever!",
    author: "Emily Johnson",
    location: "Denver, CO",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
  },
  {
    quote:
      "My husband proposed during our private charter flight and it was magical! The team helped him plan every detail, from the champagne toast to capturing photos of the moment. Simply perfect.",
    author: "Sarah Williams",
    location: "Portland, OR",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
  },
  {
    quote:
      "As a photographer, I was blown away by the perspectives and light during the sunrise flight. The pilot positioned us perfectly for the best shots. Worth every penny!",
    author: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;

    const headingElements = headingRef.current?.children;
    const cardElements = cardRefs.current.filter(Boolean);

    if (!sectionRef.current || !headingElements || cardElements.length === 0) {
      console.warn("Testimonials section refs not ready for animation.");
      return;
    }

    gsap.set(headingElements, { opacity: 0, y: 30 });
    const headingScrollTrigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(headingElements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    gsap.set(cardElements, { opacity: 0, y: 50 });
    const cardsScrollTrigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 80%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(cardElements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    return () => {
      headingScrollTrigger?.kill();
      cardsScrollTrigger?.kill();
      gsap.killTweensOf(headingElements);
      gsap.killTweensOf(cardElements);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-1 pt-1 md:py-15 bg-slate-50"
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div
            ref={headingRef}
            className="mb-16 text-center"
            style={{ willChange: "opacity, transform" }}
          >
            <h2 className="mb-4 text-3xl font-bold font-space md:text-4xl text-slate-900">
              Customer Testimonials
            </h2>
            <p className="max-w-3xl mx-auto text-slate-700">
              Hear what our guests have to say about their unforgettable journey
              above the clouds.
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author + index}
                ref={addToRefs}
                className="relative p-6 bg-white shadow-lg rounded-xl"
                style={{ willChange: "opacity, transform" }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star
                      key={`empty-${i}`}
                      className="w-5 h-5 text-slate-300"
                    />
                  ))}
                </div>
                <p className="mb-6 italic text-slate-700">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="object-cover w-12 h-12 mr-4 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-center justify-center w-10 h-10 font-serif text-3xl font-bold rounded-full -top-5 -left-5 bg-sky-500 text-sky-50">
                  "
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
