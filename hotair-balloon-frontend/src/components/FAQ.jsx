import React, { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { ShieldCheck, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Are hot air balloon rides safe?",
    answer:
      "Yes, hot air ballooning is one of the safest forms of aviation. Our experienced pilots are FAA certified with thousands of flight hours, and our balloons undergo rigorous safety inspections. We also strictly adhere to weather guidelines and will postpone flights if conditions are not optimal for safety.",
  },
  {
    question: "What should I wear for my balloon ride?",
    answer:
      "Dress in comfortable layers appropriate for the season, as temperatures at higher altitudes can be cooler than on the ground. Wear closed-toe, flat shoes suitable for standing and potentially walking in fields. Avoid loose accessories like scarves that could get caught, and consider bringing a hat and sunglasses.",
  },
  {
    question: "How long does the entire experience last?",
    answer:
      "The entire experience typically lasts 3-4 hours, which includes check-in, pre-flight briefing, balloon inflation, the flight itself (approximately 60-90 minutes), landing, pack-up, and a celebratory champagne toast. The exact duration may vary based on weather conditions and the specific package you've chosen.",
  },
  {
    question: "What happens if my flight is canceled due to weather?",
    answer:
      "If we need to cancel your flight due to unsuitable weather conditions, we'll contact you as soon as possible and offer to reschedule your flight for another date. If rescheduling isn't possible, we offer a full refund. Your safety is our top priority, and our experienced pilots make the final decision on weather suitability.",
  },
  {
    question: "Can I bring my camera or phone?",
    answer:
      "Absolutely! We encourage you to bring cameras or smartphones to capture your experience. We recommend securing them with straps to prevent dropping. Our pilots can suggest the best moments for photos, and some packages include professional photography services as well.",
  },
  {
    question: "Is there an age or health restriction?",
    answer:
      "Passengers should be at least 6 years old and able to stand for the duration of the flight (typically 60-90 minutes). Anyone with recent surgeries, heart conditions, or who is pregnant should consult their doctor before flying. We can accommodate most passengers, but please inform us of any mobility concerns when booking.",
  },
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const safetyElementsRef = useRef([]);
  safetyElementsRef.current = [];
  const faqElementsRef = useRef([]);
  faqElementsRef.current = [];

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;

    const leftColumn = leftColRef.current;
    const rightColumn = rightColRef.current;
    const safetyEls = safetyElementsRef.current.filter(Boolean);
    const faqEls = faqElementsRef.current.filter(Boolean);

    if (!sectionRef.current || !leftColumn || !rightColumn) {
      console.warn("FAQ section refs not ready for animation.");
      return;
    }

    gsap.set([leftColumn, rightColumn], { opacity: 0, y: 50 });

    const leftColTrigger = ScrollTrigger.create({
      trigger: leftColumn,
      start: "top 85%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(leftColumn, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    const rightColTrigger = ScrollTrigger.create({
      trigger: rightColumn,
      start: "top 85%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(rightColumn, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    return () => {
      leftColTrigger?.kill();
      rightColTrigger?.kill();
      gsap.killTweensOf([leftColumn, rightColumn]);
    };
  }, []);

  const addSafetyRef = (el) => {
    if (el && !safetyElementsRef.current.includes(el)) {
      safetyElementsRef.current.push(el);
    }
  };
  const addFaqRef = (el) => {
    if (el && !faqElementsRef.current.includes(el)) {
      faqElementsRef.current.push(el);
    }
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-16 bg-white md:py-24"
      style={{ scrollMarginTop: "0.2rem" }}
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2">
            <div ref={leftColRef} style={{ willChange: "opacity, transform" }}>
              <div className="flex items-center mb-6">
                <ShieldCheck className="w-8 h-8 mr-3 text-sky-500" />
                <h2 className="text-3xl font-bold font-space text-slate-900">
                  Safety First
                </h2>
              </div>

              <p className="mb-6 text-slate-700">
                At SkyVoyager Balloons, your safety is our highest priority. Our
                perfect safety record is the result of our unwavering commitment
                to rigorous standards and procedures.
              </p>

              <div className="p-6 mb-6 bg-slate-50 rounded-xl">
                <h3 className="mb-4 text-xl font-semibold font-space text-slate-900">
                  Our Safety Commitment
                </h3>
                <ul className="space-y-3">
                  {[
                    "FAA-certified pilots with minimum 1,000+ flight hours",
                    "Balloons inspected before each flight",
                    "Comprehensive weather monitoring systems",
                    "Regular equipment maintenance exceeding FAA requirements",
                    "Flight insurance for each passenger",
                    "Ground crew trained in emergency procedures",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-0.5 mr-3 text-white rounded-full bg-sky-500">
                        <Check size={16} />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-700">
                We only fly when conditions are optimal, and our team is trained
                to make conservative decisions regarding weather and flight
                conditions. Your adventure should be thrilling, but never at the
                expense of safety.
              </p>
            </div>

            <div ref={rightColRef} style={{ willChange: "opacity, transform" }}>
              <h2 className="mb-8 text-3xl font-bold font-space text-slate-900">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-medium text-left text-slate-900 hover:text-sky-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
