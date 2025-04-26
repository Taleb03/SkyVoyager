import React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
`;

const HeroSection = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{ scrollMarginTop: "6rem" }}
    >
      <style>{styles}</style>

      <div className="absolute inset-0 w-full h-full bg-black">
        <div className="absolute inset-0 z-10 w-full h-full bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <img
          src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Hot air balloons flying over landscape at sunrise"
          className="object-cover object-center w-full h-full"
          loading="eager"
        />
      </div>

      <div className="container relative z-20 px-4 mx-auto text-center text-white sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight font-space sm:text-5xl lg:text-6xl xl:text-7xl sm:mb-6">
          <span
            className="block opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Elevate Your Journey
          </span>
          <span
            className="block mt-2 opacity-0 text-sky-200 sm:mt-4 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            One Balloon Ride at a Time
          </span>
        </h1>
        <p
          className="max-w-2xl mx-auto mb-6 text-lg opacity-0 sm:text-xl lg:text-2xl lg:max-w-3xl sm:mb-8 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          Experience the breathtaking beauty of the world from above with our
          premium hot air balloon adventures.
        </p>
        <div
          className="flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row sm:gap-4 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-5 text-base text-white transition-all transform rounded-lg bg-sky-500 hover:bg-sky-600 sm:text-lg sm:px-8 sm:py-6 hover:scale-105"
          >
            Book Your Flight
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection("experiences")}
            className="px-6 py-5 text-base text-white transition-all transform border-2 border-white rounded-lg hover:bg-white/10 sm:text-lg sm:px-8 sm:py-6 hover:scale-105"
          >
            Explore Packages
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("our-story")}
        className="absolute z-20 text-white -translate-x-1/2 bottom-6 sm:bottom-8 left-1/2 animate-bounce hover:animate-pulse focus:outline-none"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10" />
      </button>
    </section>
  );
};

export default HeroSection;
