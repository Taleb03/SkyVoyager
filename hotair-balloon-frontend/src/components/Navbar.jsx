import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";
import gsap from "gsap";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const timeline = useRef(gsap.timeline({ paused: true }));
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const bookNowRef = useRef(null);

  useEffect(() => {
    const mobileMenuElement = mobileMenuRef.current;
    const links = mobileMenuElement?.querySelectorAll("a");
    gsap.set(logoRef.current, { x: -100, autoAlpha: 0 });
    gsap.set(navLinksRef.current, { y: -20, autoAlpha: 0 });
    gsap.set(bookNowRef.current, { autoAlpha: 0 });

    const masterTL = gsap.timeline();

    masterTL.to(logoRef.current, {
      x: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power2.out",
    });

    masterTL.to(
      navLinksRef.current,
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    masterTL.to(
      bookNowRef.current,
      {
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    gsap.set(mobileMenuElement, {
      y: -50,
      autoAlpha: 0,
      pointerEvents: "none",
    });

    gsap.set(links, { y: 20, autoAlpha: 0 });

    timeline.current
      .to(mobileMenuElement, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "auto",
      })
      .to(
        links,
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          duration: 0.2,
        },
        "-=0.1"
      )
      .reverse();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      gsap.to(headerRef.current, {
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        backgroundColor: scrolled
          ? "rgba(255,255,255,1)"
          : "rgba(255,255,255,0)",
        duration: 0.3,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center" ref={logoRef}>
          <span
            className={cn(
              "font-bold text-xl sm:text-2xl transition-colors",
              isScrolled ? "text-slate-900" : "text-white"
            )}
          >
            SkyVoyager
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {[
            "Home",
            "Our Story",
            "Experiences",
            "Gallery",
            "Testimonials",
            "FAQ",
            "Contact",
          ].map((item, index) => (
            <a
              key={item}
              ref={(el) => (navLinksRef.current[index] = el)}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={cn(
                "text-sm md:text-base transition-colors",
                isScrolled
                  ? "text-slate-700 hover:text-sky-600"
                  : "text-white hover:text-sky-200"
              )}
            >
              {item}
            </a>
          ))}
          <Button
            ref={bookNowRef}
            className="bg-sky-500 hover:bg-sky-600 text-white ml-4"
          >
            Book Now
          </Button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "lg:hidden p-2",
            isScrolled ? "text-slate-900" : "text-white"
          )}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed inset-0 z-[60] bg-white"
      >
        <div className="container mx-auto px-4 pt-24 pb-8 h-full overflow-y-auto">
          <nav className="flex flex-col items-center gap-6">
            {[
              "Home",
              "Our Story",
              "Experiences",
              "Gallery",
              "Testimonials",
              "FAQ",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-900 hover:text-sky-600"
              >
                {item}
              </a>
            ))}
            <Button className="bg-sky-500 hover:bg-sky-600 text-white w-full mt-6">
              Book Now
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
