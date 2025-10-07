import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../config/firebase";
import logo from "../assets/olx-logo.png";
import Footer from "../components/Footer";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // 🔹 Fetch products from Firebase
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);

      // Unique categories (filter empty/null)
      const uniqueCategories = [
        "all",
        ...new Set(
          data
            .map((item) => item.category)
            .filter((cat) => cat && cat.trim() !== "")
        ),
      ];
      setCategories(uniqueCategories);
    }
    fetchData();
  }, []);

  // 🔹 Filter products by search + category
  useEffect(() => {
    let temp = [...products];
    const finalSearch = searchTerm || searchQuery;

    if (finalSearch) {
      temp = temp.filter((item) =>
        item.itemName.toLowerCase().includes(finalSearch.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      temp = temp.filter((item) => item.category === selectedCategory);
    }

    setFiltered(temp);
  }, [searchQuery, products, selectedCategory, searchTerm]);

  // 🔹 SweetAlert function
  const showDetails = (item) => {
    Swal.fire({
      title: item.itemName,
      html: `
        <img src="${item.imgUrl}" alt="${item.itemName}" style="width:100%; height:200px; object-fit:cover; border-radius:8px; margin-bottom:10px;" />
        <p><strong>Brand:</strong> ${item.brandName}</p>
        <p><strong>Price:</strong> Rs ${item.price}</p>
        <p><strong>Contact:</strong> ${item.contact}</p>
        <p><strong>Description:</strong> ${item.description || "No description"}</p>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: 400,
    });
  };

  // 🔹 Handle search input in this page
  const handleSearch = () => {
    navigate(`/allproducts?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <main className="p-6">
      {/* 🔹 Logo */}
      <div className="flex justify-between items-center mb-6">
        <img
          src={logo}
          alt="Logo"
          className="h-12 cursor-pointer"
          // onClick={() => navigate("/")}
        />
        {/* 🔹 Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* 🔹 Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/2 p-2 rounded-l-lg border border-gray-300 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
        >
          🔍
        </button>
      </div>

      {/* 🔹 Navbar Category Filter */}
      <nav className="flex flex-wrap justify-center mb-6 gap-3 bg-gray-100 p-3 rounded-lg shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </nav>

      {/* 🔹 Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() => showDetails(item)}
            >
              <img
                src={item.imgUrl}
                alt={item.itemName}
                className="h-40 w-full object-cover rounded-md mb-3"
              />
              <h3 className="font-bold text-lg">{item.itemName}</h3>
              <p className="text-gray-600">{item.brandName}</p>
              <p className="text-blue-600 font-semibold">Rs {item.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </section>

      <br /><br /><br /><br /><br />

      <div >
        <Footer />
      </div>
    </main>
  );
}

export default AllProducts;
