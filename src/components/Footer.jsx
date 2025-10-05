function Footer() {
  return (
    <>
      {/* Footer Links */}
      <footer className="bg-gray-200 border-t-[3px] border-gray-400 px-6 py-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
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
                <p>Tiktok</p>
                <p>Youtube</p>
                <p>Facebook</p>
            <div className="flex gap-4">
              {/* Social icons yahan dal sakte ho */}
            </div>
          </div>
        </section>
      </footer>

      {/* Back to Top Button (fixed) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-white border border-gray-400 text-gray-800 px-4 py-2  shadow hover:bg-gray-100 transition rounded"
        >
          ↑ Back to Top
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-950 text-center text-white  p-4   ">
        <h1>Classified in Pakistan © 2007 - 2025 OLX</h1>
      </div>
    </>
  );
}

export default Footer;
