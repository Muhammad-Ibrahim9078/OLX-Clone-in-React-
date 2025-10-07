import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/olx-logo.png";
import AddItem from "./AddItem";
import LogoutButton from "./LogoutButton";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleShowAll() {
    // Navigate to AllProducts page with searchTerm
    navigate(`/allproducts?search=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <header className="bg-blue-100 shadow-md">
      <section className="flex justify-between p-[30px] flex-wrap">
        <img
          src={logo}
          alt="Olx"
          className="h-12 cursor-pointer"
          onClick={() => navigate("/allproducts")} // logo click se bhi AllProducts
        />
        <div className="flex text-white font-bold gap-[10px]">
          <AddItem />
          <LogoutButton />
        </div>
      </section>

      {/* Search + All Products Button */}
      <section className="flex justify-center p-[15px]">
        <div className="flex items-center w-full md:w-1/2 bg-white rounded-lg shadow-inner px-3">
          <input
            type="text"
            placeholder="Search item"
            className="w-full h-[55px] bg-transparent outline-none p-2 text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleShowAll} // ✅ Jaise hi input touch/click, page open ho jaye
          />
          <button
            onClick={handleShowAll}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            🔍 Search Products
          </button>
        </div>
      </section>
    </header>
  );
}

export default Header;
