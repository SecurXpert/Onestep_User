import React, { useRef, useState, useEffect } from 'react';

const Pharmacy = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get('city');
    const pincode = formData.get('pincode');
    const searchTerm = formData.get('searchTerm');
    console.log({ city, pincode, searchTerm });
    setSearchQuery(searchTerm);
  };

  // Navigation dropdown data
  const navDropdowns = {
    "All Medicines": [
      "Pain Relievers",
      "Antibiotics",
      "Antihistamines",
      "Antacids",
      "Cold & Flu"
    ],
    "First Aid": [
      "Bandages",
      "Antiseptics",
      "First Aid Kits",
      "Burn Creams",
      "Medical Tape"
    ],
    "Skin & Hair Care": [
      "Shampoos",
      "Conditioners",
      "Face Wash",
      "Moisturizers",
      "Hair Oils",
      "Sunscreens"
    ],
    "Fitness & Health": [
      "Protein Powders",
      "Multivitamins",
      "Energy Bars",
      "Fitness Equipment",
      "Weight Management"
    ],
    "Vitamins & Nutrition": [
      "Vitamin D",
      "Vitamin A",
      "Vitamin C",
      "Vitamin B",
      "Calcium",
      "Hair and Skin Supplements"
    ],
    "Homeopathy": [
      "Homeopathy Diabetic Medicines",
      "Hair Care Products",
      "All Other Medicines"
    ],
    "Ayurveda": [
      "Ashwagandha",
      "Triphala",
      "Chyawanprash",
      "Giloy",
      "Neem"
    ],
    "Pain Relief": [
      "Headache",
      "Muscle Pain",
      "Joint Pain",
      "Back Pain",
      "Migraine Relief"
    ],
    "Baby Care": [
      "Diapers",
      "Wipes",
      "Body Soap",
      "Body Wash",
      "Shampoo",
      "Body Powder",
      "Moisturizer",
      "Anti Rash Cream",
      "Baby Dish Wash Liquids",
      "Vitamin D"
    ]
  };

  // Sample data for each section
  const sections = [
    {
      name: "All Medicines",
      items: [
        { id: 1, name: "Paracetamol", price: "₹49", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Cetirizine", price: "₹59", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Omeprazole", price: "₹89", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Azithromycin", price: "₹129", discount: "12% off", image: "https://via.placeholder.com/150" },
        { id: 27, name: "Amoxicillin", price: "₹99", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 28, name: "Ibuprofen", price: "₹79", discount: "10% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "First Aid",
      items: [
        { id: 5, name: "Bandages", price: "₹129", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 6, name: "Antiseptic", price: "₹99", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 7, name: "First Aid Kit", price: "₹399", discount: "25% off", image: "https://via.placeholder.com/150" },
        { id: 29, name: "Cotton Roll", price: "₹59", discount: "5% off", image: "https://via.placeholder.com/150" },
        { id: 30, name: "Thermometer", price: "₹199", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 31, name: "Gloves", price: "₹49", discount: "5% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "Skin & Hair Care",
      items: [
        { id: 8, name: "Shampoo", price: "₹199", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 9, name: "Conditioner", price: "₹249", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 10, name: "Face Wash", price: "₹149", discount: "25% off", image: "https://via.placeholder.com/150" },
        { id: 11, name: "Moisturizer", price: "₹299", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 32, name: "Sunscreen", price: "₹349", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 33, name: "Lip Balm", price: "₹99", discount: "10% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "Fitness & Health",
      items: [
        { id: 12, name: "Protein Powder", price: "₹999", discount: "30% off", image: "https://via.placeholder.com/150" },
        { id: 13, name: "Multivitamins", price: "₹499", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 14, name: "Energy Bars", price: "₹199", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 34, name: "Yoga Mat", price: "₹799", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 35, name: "Skipping Rope", price: "₹299", discount: "25% off", image: "https://via.placeholder.com/150" },
        { id: 36, name: "Fitness Tracker", price: "₹1599", discount: "35% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "Vitamins & Nutrition",
      items: [
        { id: 15, name: "Vitamin C", price: "₹299", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 16, name: "Vitamin D", price: "₹349", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 17, name: "Calcium", price: "₹249", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 37, name: "Iron Supplement", price: "₹199", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 38, name: "Zinc Tablets", price: "₹159", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 39, name: "Magnesium", price: "₹279", discount: "10% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "Homeopathy",
      items: [
        { id: 18, name: "Arnica 30", price: "₹99", discount: "5% off", image: "https://via.placeholder.com/150" },
        { id: 19, name: "Nux Vomica", price: "₹119", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 40, name: "Belladonna", price: "₹89", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 41, name: "Calcarea Carb", price: "₹109", discount: "8% off", image: "https://via.placeholder.com/150" },
        { id: 42, name: "Rhus Tox", price: "₹99", discount: "12% off", image: "https://via.placeholder.com/150" },
        { id: 43, name: "Aconite", price: "₹105", discount: "6% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "Ayurveda",
      items: [
        { id: 20, name: "Ashwagandha", price: "₹349", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 21, name: "Triphala", price: "₹299", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 44, name: "Chyawanprash", price: "₹399", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 45, name: "Brahmi", price: "₹229", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 46, name: "Neem Tablets", price: "₹189", discount: "12% off", image: "https://via.placeholder.com/150" },
        { id: 47, name: "Giloy Juice", price: "₹279", discount: "18% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "Pain Relief",
      items: [
        { id: 22, name: "Ibuprofen", price: "₹79", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 23, name: "Volini Gel", price: "₹199", discount: "25% off", image: "https://via.placeholder.com/150" },
        { id: 48, name: "Diclofenac Spray", price: "₹149", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 49, name: "Pain Relief Patch", price: "₹99", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 50, name: "Hot Bag", price: "₹299", discount: "30% off", image: "https://via.placeholder.com/150" },
        { id: 51, name: "Joint Pain Cream", price: "₹179", discount: "15% off", image: "https://via.placeholder.com/150" },
      ]
    },
    {
      name: "Baby Care",
      items: [
        { id: 24, name: "Diapers", price: "₹599", discount: "30% off", image: "https://via.placeholder.com/150" },
        { id: 25, name: "Baby Lotion", price: "₹249", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 26, name: "Baby Powder", price: "₹179", discount: "20% off", image: "https://via.placeholder.com/150" },
        { id: 52, name: "Baby Oil", price: "₹199", discount: "10% off", image: "https://via.placeholder.com/150" },
        { id: 53, name: "Baby Shampoo", price: "₹229", discount: "15% off", image: "https://via.placeholder.com/150" },
        { id: 54, name: "Baby Soap", price: "₹99", discount: "5% off", image: "https://via.placeholder.com/150" },
      ]
    }
  ];

  const sectionRefs = sections.map(() => useRef(null));

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const toggleDropdown = (sectionName, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggling dropdown:', sectionName); // Debug log
    setActiveDropdown(activeDropdown === sectionName ? null : sectionName);
  };

  // Filter sections based on search query
  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Sticky header with search and navigation */}
        <header className="sticky top-0 z-50 bg-gray-50 shadow-sm">
          {/* Search bar */}
          <div className="w-full max-w-7xl mx-auto px-4 py-2">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-100 p-2 rounded-lg">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">📍</span>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-40 p-1 border-0 bg-transparent focus:outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  className="w-40 p-1 border-0 bg-transparent focus:outline-none text-gray-700"
                />
              </div>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search for Medicines and Health Products"
                className="flex-1 p-1 border-0 bg-transparent focus:outline-none text-gray-700"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-semibold">QUICK BUY! Get UPTO 80% off on medicines*</span>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Quick order
                </button>
              </div>
            </form>
          </div>
          
          {/* Navigation bar with dropdowns */}
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto relative" ref={dropdownRef}>
              <ul className="flex justify-center space-x-6 p-4">
                {sections.map((section, index) => (
                  <li 
                    key={index} 
                    className="flex-shrink-0 relative"
                  >
                    <a 
                      href={`#${section.name.replace(/\s+/g, '-').toLowerCase()}`} 
                      className="text-gray-700 font-bold hover:underline whitespace-nowrap flex items-center"
                      onClick={(e) => toggleDropdown(section.name, e)}
                      aria-expanded={activeDropdown === section.name}
                      aria-controls={`dropdown-${section.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {section.name}
                      <svg 
                        className="w-4 h-4 ml-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    
                    {/* Dropdown menu */}
                    {activeDropdown === section.name && (
                      <div 
                        id={`dropdown-${section.name.replace(/\s+/g, '-').toLowerCase()}`}
                        className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-[100] py-1 border border-gray-200"
                      >
                        {navDropdowns[section.name]?.map((item, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={(e) => {
                              e.preventDefault();
                              setSearchQuery(item);
                              setActiveDropdown(null);
                            }}
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-8 mt-4">
          {filteredSections.length > 0 ? (
            filteredSections.map((section, index) => (
              <section 
                key={index} 
                id={section.name.replace(/\s+/g, '-').toLowerCase()} 
                className="mb-16 relative"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{section.name}</h2>
                
                <div className="relative group">
                  {/* Left arrow button */}
                  {section.items.length > 3 && (
                    <button 
                      onClick={() => scrollLeft(sectionRefs[index])}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                      aria-label={`Scroll ${section.name} left`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Scrollable cards container */}
                  <div 
                    ref={sectionRefs[index]}
                    className="flex overflow-x-hidden scrollbar-hide space-x-6 py-2 px-2"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {section.items.map(item => (
                      <div key={item.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                          {/* <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/150";
                            }}
                          /> */}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-gray-700 font-medium">{item.price}</span>
                            <span className="text-green-600 text-sm">{item.discount}</span>
                          </div>
                          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Right arrow button */}
                  {section.items.length > 3 && (
                    <button 
                      onClick={() => scrollRight(sectionRefs[index])}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                      aria-label={`Scroll ${section.name} right`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Pharmacy;