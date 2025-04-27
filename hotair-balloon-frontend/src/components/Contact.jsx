import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;

    const headingElements = headingRef.current?.children;
    const formElement = formRef.current;
    const infoElement = infoRef.current;

    if (
      !sectionRef.current ||
      !headingElements ||
      !formElement ||
      !infoElement
    ) {
      console.warn("Contact section refs not ready for animation.");
      return;
    }

    gsap.set(headingElements, { opacity: 0, y: 30 });
    gsap.set([formElement, infoElement], { opacity: 0, y: 50 });

    const headingTrigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
      onEnter: () =>
        gsap.to(headingElements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
        }),
    });

    const formTrigger = ScrollTrigger.create({
      trigger: formElement,
      start: "top 85%",
      toggleActions: "play none none none",
      onEnter: () =>
        gsap.to(formElement, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          overwrite: true,
        }),
    });

    const infoTrigger = ScrollTrigger.create({
      trigger: infoElement,
      start: "top 85%",
      toggleActions: "play none none none",
      onEnter: () =>
        gsap.to(infoElement, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.1,
          ease: "power2.out",
          overwrite: true,
        }),
    });

    return () => {
      headingTrigger?.kill();
      formTrigger?.kill();
      infoTrigger?.kill();
      gsap.killTweensOf(headingElements);
      gsap.killTweensOf([formElement, infoElement]);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="pt-8 pb-16 md:pt-12 md:pb-24 bg-slate-50"
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
              Book Your Flight
            </h2>
            <p className="max-w-3xl mx-auto text-slate-700">
              Ready to experience the adventure of a lifetime? Contact us to
              book your hot air balloon journey or inquire about our custom
              packages.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div
              ref={formRef}
              className="p-8 bg-white shadow-xl rounded-xl"
              style={{ willChange: "opacity, transform" }}
            >
              <h3 className="mb-6 text-2xl font-semibold font-space text-slate-900">
                Reserve Your Experience
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" name="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      name="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      name="phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="participants">Number of Participants</Label>
                    <Select name="participants">
                      <SelectTrigger id="participants">
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "person" : "people"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Type</Label>
                    <Select name="experience">
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunrise">
                          Sunrise Adventure
                        </SelectItem>
                        <SelectItem value="private">Private Charter</SelectItem>
                        <SelectItem value="proposal">
                          Proposal Package
                        </SelectItem>
                        <SelectItem value="wine">Premium Wine Tour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" name="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Special Requests</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about any special requirements or questions"
                    name="message"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-6 font-medium text-white bg-sky-500 hover:bg-sky-600"
                >
                  Book Your Adventure
                </Button>
              </form>
            </div>

            <div ref={infoRef} style={{ willChange: "opacity, transform" }}>
              <div className="flex flex-col justify-center p-8 mb-6 text-white shadow-lg rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 min-h-[320px]">
                <h3 className="mb-6 text-2xl font-semibold font-space">
                  Contact Information
                </h3>
                <div className="space-y-4 text-sm sm:text-base">
                  <div className="flex items-start">
                    <Phone className="flex-shrink-0 w-5 h-5 mt-1 mr-3" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-start">
                    <Mail className="flex-shrink-0 w-5 h-5 mt-1 mr-3" />
                    <span>info@skyvoyagerballoons.com</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="flex-shrink-0 w-5 h-5 mt-1 mr-3" />
                    <span>
                      123 Skyway Drive
                      <br />
                      Horizon Valley, CA 94123
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="flex-shrink-0 w-5 h-5 mt-1 mr-3" />
                    <span>
                      Open 7 days a week
                      <br />
                      Flights depart at sunrise & approx. 2 hrs before sunset
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden shadow-lg rounded-xl min-h-[320px]">
                <img
                  src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format=fit=crop&w=2340&q=80"
                  alt="Approximate launch area map"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
