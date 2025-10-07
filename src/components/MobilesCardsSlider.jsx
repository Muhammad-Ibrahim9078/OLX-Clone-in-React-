import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function MobilesCardsSlider() {
  const [cards, setCards] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [sliderReady, setSliderReady] = useState(false);

  // 🔹 Detect screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Fetch vehicle products
  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, "products"), where("category", "==", "mobile"));
        const snapshot = await getDocs(q);
        const dataArr = [];
        snapshot.forEach((doc) => dataArr.push({ id: doc.id, ...doc.data() }));
        setCards(dataArr);
        setTimeout(() => setSliderReady(true), 200);
      } catch (err) {
        console.error("Error fetching products: ", err);
      }
    }
    fetchData();
  }, []);

  // 🔹 SweetAlert for details
  const showDetails = (card) => {
    Swal.fire({
      title: `<strong>${card.itemName}</strong>`,
      html: `
        <img src="${card.imgUrl}" alt="${card.itemName}" style="width:100%;border-radius:10px;margin-bottom:10px;" />
        <p><b>Brand:</b> ${card.brandName || "N/A"}</p>
        <p><b>Price:</b> Rs ${card.price}</p>
        <p><b>Contact:</b> ${card.contact || "Not available"}</p>
        <p><b>Description:</b><br> ${card.description || "No description provided."}</p>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#3085d6",
      width: "400px",
    });
  };

  // 🔹 Custom Arrows for desktop slider
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );

  const desktopSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  const mobileSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
  };

  return (
    <div className="max-w-6xl mx-auto my-8 relative">
      <h2 className="text-xl font-bold mb-4">Mobiles</h2>

      {cards.length === 0 && <p className="text-gray-500">No products found...</p>}

      {sliderReady && cards.length > 0 && (
        <>
          {isMobile ? (
            <Slider {...mobileSettings}>
              {cards.map((card) => (
                <div key={card.id} className="p-2 cursor-pointer" onClick={() => showDetails(card)}>
                  <div className="border rounded-lg shadow hover:shadow-lg p-4 bg-white transition-transform transform hover:scale-105">
                    <div className="h-56 bg-gray-200 rounded mb-2 flex items-center justify-center overflow-hidden">
                      {card.imgUrl ? (
                        <img src={card.imgUrl} alt={card.itemName} className="w-full h-full object-cover rounded" />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                    <h3 className="font-semibold">{card.itemName}</h3>
                    <p className="text-green-600 font-bold">Rs {card.price}</p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...desktopSettings}>
              {cards.map((card) => (
                <div key={card.id} className="p-2 cursor-pointer" onClick={() => showDetails(card)}>
                  <div className="border rounded-lg shadow hover:shadow-lg p-4 bg-white transition-transform transform hover:scale-105">
                    <div className="h-48 sm:h-56 md:h-64 bg-gray-200 rounded mb-2 flex items-center justify-center overflow-hidden">
                      {card.imgUrl ? (
                        <img src={card.imgUrl} alt={card.itemName} className="w-full h-full object-cover rounded" />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                    <h3 className="font-semibold">{card.itemName}</h3>
                    <p className="text-green-600 font-bold">Rs {card.price}</p>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </>
      )}
    </div>
  );
}

export default MobilesCardsSlider;
