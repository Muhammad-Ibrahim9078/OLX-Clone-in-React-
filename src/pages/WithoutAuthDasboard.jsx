import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import logo from "../assets/olx-logo.png";
import mobilebanner from "../assets/mobile-banner.JPG";
import banner from "../assets/banner for cover.JPG";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function WithoutAuthDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [properties, setProperties] = useState([]);
  const [mobiles, setMobiles] = useState([]);

  // 🔹 Fetch products by category
  useEffect(() => {
    async function fetchCategoryData(category, setter) {
      try {
        const q = query(collection(db, "products"), where("category", "==", category));
        const snapshot = await getDocs(q);
        const dataArr = [];
        snapshot.forEach((doc) => dataArr.push({ id: doc.id, ...doc.data() }));
        setter(dataArr);
      } catch (err) {
        console.error(`Error fetching ${category}:`, err);
      }
    }

    fetchCategoryData("vehicle", setVehicles);
    fetchCategoryData("property", setProperties);
    fetchCategoryData("mobile", setMobiles);
  }, []);

  // 🔹 Login alert for unauthenticated users
  function loginAlert() {
    Swal.fire({
      icon: "warning",
      title: "Login First",
      text: "Please login to continue.",
      timer: 2000,
      showConfirmButton: false,
    });
  }

  // 🔹 Render cards in a responsive grid
  const renderCards = (data) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={loginAlert}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="bg-white border rounded-lg shadow-md p-4 text-center">
            <img
              src={item.imgUrl || "https://via.placeholder.com/150"}
              alt={item.itemName}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{item.itemName}</h3>
            <p className="text-gray-600">{item.price ? `Rs ${item.price}` : "No Price"}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-100 shadow-md">
        <section className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 gap-4 sm:gap-0">
          <img src={logo} alt="Olx" className="h-12 cursor-pointer" />

          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3">
            <Link
              to="/login"
              className="bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition w-full sm:w-auto text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition w-full sm:w-auto text-center"
            >
              Signup
            </Link>
            <button
              type="button"
              className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto text-center"
              onClick={loginAlert}
            >
              + Sell
            </button>
          </div>
        </section>
      </header>

      <Navbar />

      {/* Image Banners */}
      <section className="mt-[50px]">
        {/* Desktop/Tablet Banner */}
        <div className="hidden md:flex items-center justify-center relative w-[97%] h-[500px] rounded-xl overflow-hidden mx-auto">
          <img
            src={banner}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <h1
              className="text-3xl md:text-5xl font-bold text-center rounded"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              This is OLX Clone Website
            </h1>
            <p
              className="text-lg text-center rounded"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              Developed by Muhammad Ibrahim
            </p>
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="flex md:hidden items-center justify-center relative w-full h-[250px] rounded-xl overflow-hidden mt-3">
          <img
            src={mobilebanner}
            alt="Mobile Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-2">
            <h1
              className="text-2xl font-bold text-center drop-shadow-md rounded"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              OLX Clone Website
            </h1>
            <p
              className="text-sm text-center drop-shadow-md rounded"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              By Muhammad Ibrahim
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="p-6 space-y-10">
        {/* Vehicles */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Vehicles</h2>
          {vehicles.length > 0 ? renderCards(vehicles) : <p>Loading vehicles...</p>}
        </section>

        {/* Properties */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Properties</h2>
          {properties.length > 0 ? renderCards(properties) : <p>Loading properties...</p>}
        </section>

        {/* Mobiles */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Mobiles</h2>
          {mobiles.length > 0 ? renderCards(mobiles) : <p>Loading mobiles...</p>}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default WithoutAuthDashboard;
