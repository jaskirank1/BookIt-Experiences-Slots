import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { Search } from "lucide-react";
import { asset } from "../assets/asset";

const Navbar: React.FC = () => {
  const { setSearchTerm } = useSearch();
  const [localSearch, setLocalSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 500);

    return () => clearTimeout(delay);
  }, [localSearch, setSearchTerm]);

  return (
    <nav className="
      w-full h-[87px] flex justify-between items-center 
      px-6 sm:px-10 md:px-[80px] lg:px-[124px]
      py-4 bg-white shadow-sm
    ">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src={asset.logo}
          alt="Logo"
          className="w-[100px] h-[55px] object-contain"
        />
      </div>

      {/* Desktop Search Section */}
      <div className="hidden md:flex items-center gap-3">
        <input
          type="text"
          placeholder="Search experiences..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-[340px] h-[42px] rounded-md bg-[#EDEDED] px-4 text-gray-700 outline-none placeholder-gray-500 transition-all duration-300
                     lg:w-[300px] md:w-[240px] sm:w-[200px]"
        />
        <button
          onClick={() => setSearchTerm(localSearch)}
          className="w-[87px] h-[42px] bg-[#FFD643] rounded-lg text-black font-medium hover:brightness-95 transition
                     lg:w-[70px] md:w-[60px]"
        >
          Search
        </button>
      </div>

      {/* Mobile Search Icon */}
      <button
        className="md:hidden p-2 bg-[#FFD643] rounded-full hover:brightness-95 transition ml-2"
        onClick={() => setShowMobileSearch((prev) => !prev)}
      >
        <Search className="text-black w-5 h-5" />
      </button>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="absolute top-[87px] left-0 w-full bg-white shadow-md flex items-center px-4 py-3 gap-3 md:hidden z-50">
          <input
            type="text"
            placeholder="Search experiences..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-grow h-[40px] rounded-md bg-[#EDEDED] px-4 text-gray-700 outline-none placeholder-gray-500"
          />
          <button
            onClick={() => {
              setSearchTerm(localSearch);
              setShowMobileSearch(false);
            }}
            className="bg-[#FFD643] px-4 py-2 rounded-md text-black font-medium"
          >
            Go
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
