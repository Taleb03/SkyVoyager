import React, { useEffect, useRef, useState } from "react";
import { Sunrise, Users, Heart, Mountain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Sunrise Adventure",
    description:
      "Experience the magic of dawn as you gently rise with the sun, witnessing the world awakening below in a tapestry of colors.",
    icon: Sunrise,
    price: "$299",
    color: "bg-sunset-light",
    iconColor: "text-sunset-dark",
    bgColor: "bg-gradient-to-br from-white to-sunset-light/30",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Private Charter",
    description:
      "An exclusive journey for you and your loved ones. Customize your flight path and enjoy a premium experience with champagne service.",
    icon: Users,
    price: "$799",
    color: "bg-sky-light",
    iconColor: "text-sky-dark",
    bgColor: "bg-gradient-to-br from-white to-sky-light/30",
    image:
      "https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    title: "Proposal Package",
    description:
      "Create the perfect moment for your special question, with breathtaking views and our dedicated team to help plan every detail.",
    icon: Heart,
    price: "$999",
    color: "bg-earth-light",
    iconColor: "text-earth-dark",
    bgColor: "bg-gradient-to-br from-white to-earth-light/30",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    title: "Mountain Vista Tour",
    description:
      "Soar above majestic mountain peaks and experience breathtaking panoramic views of pristine wilderness and alpine landscapes.",
    icon: Mountain,
    price: "$449",
    color: "bg-forest-light",
    iconColor: "text-forest-dark",
    bgColor: "bg-gradient-to-br from-white to-forest-light/30",
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const buttonRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const triggers = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    triggers.current.forEach((t) => t?.kill?.());
    triggers.current = [];

    const cards = cardRefs.current.filter(Boolean);
    const buttonEl = buttonRef.current;

    if (!sectionRef.current || cards.length === 0 || !buttonEl) {
      console.warn("Experience section refs not ready for animation.");
      return;
    }

    const isMobile = windowSize.width < 768;

    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? "top 90%" : "top 80%",
      toggleActions: "play none none none",
    });
    triggers.current.push(sectionTrigger);

    gsap.set([...cards, buttonEl], {
      opacity: 0,
      y: isMobile ? 50 : 30,
    });

    const tl = gsap.timeline({
      scrollTrigger: sectionTrigger,
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.6 : 0.8,
      stagger: isMobile ? 0.2 : 0.1,
      ease: "power2.out",
    });

    tl.to(
      buttonEl,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
      triggers.current = [];
      gsap.killTweensOf([...cards, buttonEl]);
    };
  }, [windowSize]);

  return (
    <section
      id="experiences"
      className="section-padding bg-slate-50"
      ref={sectionRef}
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold font-space md:text-4xl text-slate-900">
              Flight Experiences
            </h2>
            <p className="max-w-3xl mx-auto text-slate-700">
              Choose from our curated selection of hot air balloon experiences,
              each designed to offer a unique perspective on the breathtaking
              landscapes below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${exp.bgColor}`}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="relative overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>
                <div className="p-6">
                  <div
                    className={`p-3 rounded-full ${exp.color} inline-block mb-4`}
                  >
                    <exp.icon className={`h-6 w-6 ${exp.iconColor}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold font-space text-slate-900">
                    {exp.title}
                  </h3>
                  <p className="mb-4 text-slate-600">{exp.description}</p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xl font-bold font-space text-slate-900">
                      Starting at {exp.price}
                    </span>
                    <Button
                      size="sm"
                      className="text-white bg-sky hover:bg-sky-dark"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-12 text-center"
            ref={buttonRef}
            style={{ willChange: "transform, opacity" }}
          >
            <Button className="px-8 py-6 text-lg font-medium text-white bg-sky hover:bg-sky-dark">
              View All Experiences
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
