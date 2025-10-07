import React, { useEffect, useRef, useState } from "react";

function Footer() {
  const footerRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowButton(entry.isIntersecting);
      },
      { threshold: 0.1 } // jab 10% footer visible hoga tab trigger karega
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Footer Links */}
      <footer
        ref={footerRef}
        className="bg-gray-200 border-t-[3px] border-gray-400 px-6 py-10"
      >
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center sm:text-left">
          <ul className="space-y-2 text-sm">
            <li className="font-bold text-gray-800">Popular Categories</li>
            <li>Cars</li>
            <li>Mobile Phones</li>
            <li>Property</li>
          </ul>

          <ul className="space-y-2 text-sm">
            <li className="font-bold text-gray-800">Trending Searches</li>
            <li>Bikes</li>
            <li>Mobile Phones</li>
            <li>Watches</li>
          </ul>

          <ul className="space-y-2 text-sm">
            <li className="font-bold text-gray-800">About Us</li>
            <li>OLX Blogs</li>
            <li>Contact Us</li>
            <li>OLX for Business</li>
          </ul>

          <ul className="space-y-2 text-sm">
            <li className="font-bold text-gray-800">OLX</li>
            <li>Help</li>
            <li>SiteMap</li>
            <li>Terms of Use</li>
          </ul>

          <div className="space-y-3 text-sm">
            <h1 className="font-bold text-gray-800">Follow Us</h1>
            <div className="flex justify-center sm:justify-start gap-4 text-gray-700">
              <p className="cursor-pointer hover:text-blue-600 transition">TikTok</p>
              <p className="cursor-pointer hover:text-blue-600 transition">YouTube</p>
              <p className="cursor-pointer hover:text-blue-600 transition">Facebook</p>
            </div>
          </div>
        </section>
      </footer>

      {/* Back to Top Button (only visible when footer in view) */}
      {showButton && (
        <div className="fixed bottom-[50px] right-6 z-50 animate-fadeIn">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white border border-gray-400 text-gray-800 px-4 py-2 shadow-md hover:bg-gray-100 transition rounded"
          >
            ↑ Back to Top
          </button>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="bg-blue-950 text-center text-white py-4 text-sm md:text-base">
        <h1>Classified in Pakistan © 2007 - 2025 OLX</h1>
      </div>
    </>
  );
}

export default Footer;
