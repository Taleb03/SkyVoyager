import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const quoteRef = useRef(null);
  const numberRefs = useRef({});

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      ScrollTrigger.refresh(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
    const isDesktop = windowSize.width >= 1024 && windowSize.width < 1440;
    const isLargeDesktop = windowSize.width >= 1440;

    const getScrollConfig = () => ({
      start: isMobile
        ? "top 90%"
        : isTablet
        ? "top 85%"
        : isLargeDesktop
        ? "top 70%"
        : "top 75%",
      end: isMobile
        ? "bottom 60%"
        : isTablet
        ? "bottom 80%"
        : isLargeDesktop
        ? "bottom 90%"
        : "bottom 85%",
      scrub: isMobile ? 0.5 : isTablet ? 0.7 : isLargeDesktop ? 1.2 : 1,
      toggleActions: "play none none none",
    });

    const xOffsetContent = isMobile
      ? -20
      : isTablet
      ? -30
      : isLargeDesktop
      ? -60
      : -50;
    const xOffsetImage = isMobile
      ? 20
      : isTablet
      ? 30
      : isLargeDesktop
      ? 60
      : 50;

    gsap.set(contentRef.current, {
      opacity: 0,
      x: xOffsetContent,
    });

    gsap.set(imageRef.current, {
      opacity: 0,
      x: xOffsetImage,
    });

    gsap.set([...statsRef.current.children, quoteRef.current], {
      opacity: 0,
      y: isMobile ? 15 : isTablet ? 20 : isLargeDesktop ? 35 : 30,
    });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        ...getScrollConfig(),
      },
    });

    mainTl
      .to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: isMobile ? 0.6 : isTablet ? 0.7 : 0.8,
        ease: "power2.out",
      })
      .to(
        contentRef.current,
        {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.6 : isTablet ? 0.7 : 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    const statsTl = gsap.timeline({
      scrollTrigger: {
        trigger: isMobile ? statsRef.current : sectionRef.current,
        start: isMobile
          ? "top 85%"
          : isTablet
          ? "top 80%"
          : isLargeDesktop
          ? "top 70%"
          : "top 75%",
        end: isMobile
          ? "bottom 50%"
          : isTablet
          ? "bottom 60%"
          : isLargeDesktop
          ? "bottom 80%"
          : "bottom 70%",
        toggleActions: "play none none none",
      },
    });

    statsTl.to(statsRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: isMobile ? 0.15 : isTablet ? 0.12 : 0.1,
      duration: isMobile ? 0.4 : isTablet ? 0.5 : isLargeDesktop ? 0.7 : 0.6,
      ease: "back.out(1.2)",
    });

    gsap.to(quoteRef.current, {
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.5 : isTablet ? 0.6 : isLargeDesktop ? 0.8 : 0.7,
      ease: "power1.out",
      scrollTrigger: {
        trigger: quoteRef.current,
        start: isMobile
          ? "top 90%"
          : isTablet
          ? "top 85%"
          : isLargeDesktop
          ? "top 75%"
          : "top 80%",
        end: isMobile
          ? "bottom 70%"
          : isTablet
          ? "bottom 65%"
          : isLargeDesktop
          ? "bottom 85%"
          : "bottom 75%",
        toggleActions: "play none none none",
      },
    });

    Object.entries(numberRefs.current).forEach(([key, element]) => {
      if (!element) return;

      const targetValue = parseInt(element.dataset.value);
      const suffix = element.dataset.suffix || "";

      const duration = isMobile ? 1.5 : isTablet ? 2 : isLargeDesktop ? 3 : 2.5;

      const delay = parseInt(key.replace("num", "")) * (isMobile ? 0.1 : 0.2);

      const numberTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile
            ? "top 80%"
            : isTablet
            ? "top 70%"
            : isLargeDesktop
            ? "top 55%"
            : "top 60%",
          end: isMobile
            ? "bottom 30%"
            : isTablet
            ? "bottom 40%"
            : isLargeDesktop
            ? "center 45%"
            : "center 50%",
          toggleActions: "play none none none",
          scrub: false,
        },
      });

      const counter = { val: 0 };
      numberTl.to(counter, {
        val: targetValue,
        duration: duration,
        delay: delay,
        ease: "power1.inOut",
        onUpdate: function () {
          const value = Math.round(counter.val);
          if (suffix === "k+") {
            element.textContent = `${value}k+`;
          } else if (suffix === "%") {
            element.textContent = `${value}%`;
          } else {
            element.textContent = `${value.toLocaleString()}+`;
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [windowSize]);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="py-16 overflow-hidden bg-white md:py-24 lg:py-28 xl:py-32"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="order-2 md:order-1" ref={contentRef}>
              <h2 className="mb-4 text-3xl font-bold font-space md:text-4xl lg:text-5xl md:mb-6 text-slate-900">
                Our <span className="text-sky-500">Story</span>
              </h2>
              <div className="space-y-4 md:space-y-6">
                <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                  Founded in 2010 by a team of passionate aviation enthusiasts
                  and adventure seekers, SkyVoyager Balloons was born from a
                  simple desire: to share the magic of hot air ballooning with
                  the world.
                </p>
                <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                  What began as a single balloon and a dream has blossomed into
                  the region's premier hot air balloon experience company, with
                  a fleet of state-of-the-art balloons and a perfect safety
                  record.
                </p>
                <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                  Our experienced pilots, each with thousands of flight hours,
                  are storytellers, naturalists, and guides who enhance your
                  journey.
                </p>
              </div>

              {/* Stats */}
              <div
                className="flex flex-wrap gap-4 mt-8 md:gap-6 md:mt-10"
                ref={statsRef}
              >
                {[
                  { value: 5000, suffix: "+", label: "Successful Flights" },
                  { value: 100, suffix: "%", label: "Safety Record" },
                  { value: 15, suffix: "k+", label: "Happy Customers" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center p-3 md:p-4 bg-sky-50 rounded-xl flex-1 min-w-[110px] sm:min-w-[140px] md:min-w-[160px]"
                  >
                    <span
                      ref={(el) => (numberRefs.current[`num${index}`] = el)}
                      data-value={stat.value}
                      data-suffix={stat.suffix}
                      className="text-2xl font-bold text-transparent sm:text-3xl md:text-4xl font-space bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text"
                    >
                      0
                    </span>
                    <span className="mt-1 text-xs text-center sm:text-sm md:text-base text-slate-600 md:mt-2">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image with hover animation */}
            <div className="order-1 md:order-2" ref={imageRef}>
              <div className="relative">
                <img
                  alt="Our balloon fleet"
                  className="w-full h-auto transition-transform duration-300 transform rounded-lg shadow-lg md:rounded-xl md:shadow-2xl hover:scale-105"
                  src="https://images.unsplash.com/photo-1486578077620-8a022ddd481f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{ willChange: "transform" }}
                />
                <div
                  ref={quoteRef}
                  className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md md:shadow-lg max-w-[240px] md:max-w-[280px] hidden sm:block border border-slate-100"
                >
                  <p className="text-sm italic font-medium md:text-base text-slate-700">
                    "Every flight creates memories that last a lifetime."
                  </p>
                  <p className="mt-2 text-xs font-semibold md:text-sm text-sky-600 md:mt-3">
                    — Michael Reynolds, Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
