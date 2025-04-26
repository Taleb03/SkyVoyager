import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 text-white bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-2xl font-bold font-space">SkyVoyage</h3>
              <p className="mb-4 text-slate-300">
                Elevating your journey with premium hot air balloon experiences
                since 2010.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white transition-colors hover:text-sky"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-white transition-colors hover:text-sky"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-white transition-colors hover:text-sky"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-white transition-colors hover:text-sky"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#our-story"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="#experiences"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Experiences
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Information</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Flight Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Weather Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Gift Certificates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors text-slate-300 hover:text-sky"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Newsletter</h4>
              <p className="mb-4 text-slate-300">
                Subscribe to receive special offers and updates from SkyVoyage
                Balloons.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 text-white bg-slate-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-sky"
                />
                <button className="px-4 text-white transition-colors bg-sky hover:bg-sky-dark rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between pt-8 border-t border-slate-800 md:flex-row">
            <p className="mb-4 text-sm text-slate-400 md:mb-0">
              © {new Date().getFullYear()} SkyVoyage Balloons. All rights
              reserved.
            </p>
            <div className="flex space-x-4 text-sm text-slate-400">
              <a href="#" className="transition-colors hover:text-sky">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="transition-colors hover:text-sky">
                Terms of Service
              </a>
              <span>|</span>
              <a href="#" className="transition-colors hover:text-sky">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
