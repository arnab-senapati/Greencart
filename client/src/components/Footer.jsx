import React from "react";
import { assets, footerLinks } from "../assets/assets";

const socialIcons = [
  { id: 1, icon: assets.facebook, url: "https://facebook.com" },
  { id: 2, icon: assets.instagram, url: "https://instagram.com" },
  { id: 3, icon: assets.twitter, url: "https://twitter.com" },
  { id: 4, icon: assets.linkedin, url: "https://linkedin.com" },
];

const paymentIcons = [
  assets.visa,
  assets.card,
  assets.google_pay,
  assets.phonepe,
  assets.paytm,
];

const Footer = () => {
  const reorderedLinks = [...footerLinks];

  const followUsIndex = reorderedLinks.findIndex(
    (section) => section.title === "Follow Us"
  );

  const getInTouchSection = {
    title: "Get In Touch",
    isCustom: true,
  };

  if (followUsIndex > -1) {
    reorderedLinks.splice(followUsIndex, 0, getInTouchSection);
  }

  return (
    <footer className="bg-gray-50 text-gray-700 mt-24">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-16 
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 border-b border-gray-300">
        {/* Logo + description */}
        <div>
          <img src={assets.logo} alt="logo" className="w-28 mb-6" />
          <p className="text-gray-600 max-w-xs mb-6">
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable.
          </p>
        </div>

        {/* Footer links + Get In Touch + Social */}
        {reorderedLinks.map((section, index) => {
if (section.isCustom && section.title === "Get In Touch") {
  return (
    <div key="get-in-touch">
      <h3 className="font-semibold text-gray-900 text-lg mb-5">Get In Touch</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>
          <a
            href="https://wa.me/8087087224"
            className="hover:text-primary hover:underline"
          >
            <span className="text-gray-800 font-medium">WhatsApp us at:</span> 8087087224
          </a>
        </li>
        <li>
          <a
            href="tel:+919129912991"
            className="hover:text-primary hover:underline"
          >
            <span className="text-gray-800 font-medium">Call:</span> +91-9129912991
          </a>
        </li>
        <li>
          <a
            href="mailto:support@example.com"
            className="hover:text-primary hover:underline"
          >
            <span className="text-gray-800 font-medium">Email:</span> support@example.com
          </a>
        </li>
      </ul>
    </div>
  );
}


          if (section.title === "Follow Us") {
            return (
              <div key="follow-us">
                <h3 className="font-semibold text-gray-900 text-lg mb-5">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialIcons.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition"
                    >
                      <img src={social.icon} alt="social icon" className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 text-lg mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-primary hover:underline transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        )}
      </div>

      {/* Payment methods + copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} GreatStack. All rights reserved.
        </div>
        <div className="flex space-x-6">
          {paymentIcons.map((icon, idx) => (
            <img key={idx} src={icon} alt="payment method" className="h-8" />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;