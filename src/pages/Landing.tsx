import {  Shield, Clock } from 'lucide-react';
import { CheckCircle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, } from 'lucide-react';
import Header from '../components/Header';
import AboutSection from '../components/section/AboutSection';
import TestimonialsSection from '../components/section/Testimonial';
import HeroSection from '../components/section/Herosection';
import HowItWorks from '../components/section/HowItworks';

export default function Landing() {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <HeroSection/>
      
      <HowItWorks/>
      <AboutSection />
      <TestimonialsSection />
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "support@gatepass.edu" },
                { icon: MapPin, text: "123 University Ave, Campus City, ST 12345" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <item.icon className="w-6 h-6 text-[#24FE41]" />
                  <p className="text-gray-700 dark:text-gray-200 group-hover:text-[#24FE41] transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#24FE41] transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#24FE41] transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#24FE41] transition-colors"
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#24FE41] text-gray-900 rounded-lg hover:bg-[#1ee539] transition-all duration-200 font-semibold hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
     
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="w-8 h-8 text-[#24FE41]" />
                <span className="text-xl font-bold text-white">Gate Pass</span>
              </div>
              <p className="text-gray-300">
                Securing your campus with innovative digital solutions.
              </p>
            </div>
            {[
              {
                title: "Quick Links",
                links: [
                  { name: "Features", href: "#features" },
                  { name: "How it Works", href: "#how-it-works" },
                  { name: "About Us", href: "#about" },
                  { name: "Contact", href: "#contact" }
                ]
              },
              {
                title: "Support",
                links: [
                  { name: "FAQ", href: "#faq" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Help Center", href: "#" }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className="text-gray-300 hover:text-[#24FE41] transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-300 hover:text-[#24FE41] transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Gate Pass System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}