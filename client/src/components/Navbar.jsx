import React, { useEffect, useState, useRef } from 'react'; // add useRef
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [placeholderText, setPlaceholderText] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    // New state for categories dropdown
    const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
    const hideTimeout = useRef(null);



    const placeholders = [
        "Search for organic Veggies ",
        "Search for fresh fruits ",
        "Search for Cold drinks ",
        "Search for Instant Food",
        "Search for Dairy Products ",
        "Search for Bakery & Breads ",
        "Search for Gains & Cereals ",
    ];

    // Dummy categories data (replace with actual data if fetched from API)
    const categories = [
        "organic Veggies",
        "fresh fruits",
        "Cold drinks",
        "Instant Food",
        "Dairy Products",
        "Bakery & Breads",
        "Gains & Cereals",
    ];
const categorySlugMap = {
  "organic Veggies": "vegetables",
  "fresh fruits": "fruits",
  "Cold drinks": "drinks",
  "Instant Food": "instant",
  "Dairy Products": "dairy",
  "Bakery & Breads": "bakery",
  "Gains & Cereals": "grains",
};


    useEffect(() => {
        const current = placeholders[placeholderIndex];
        let timeout;

        if (!isDeleting && placeholderText.length < current.length) {
            timeout = setTimeout(() => {
                setPlaceholderText((prev) => prev + current.charAt(prev.length));
            }, 100);
        } else if (isDeleting && placeholderText.length > 0) {
            timeout = setTimeout(() => {
                setPlaceholderText((prev) => prev.slice(0, -1));
            }, 50);
        } else if (!isDeleting && placeholderText.length === current.length) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting && placeholderText.length === 0) {
            setIsDeleting(false);
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }

        return () => clearTimeout(timeout);
    }, [placeholderText, isDeleting, placeholderIndex, placeholders]);


    const navigate = useNavigate();
    const { user, setUser, setShowUserLogin, setSearchQuery, searchQuery, getCartCount } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery, navigate]);

    // Function to handle category click
const handleCategoryClick = (category) => {
  const slug = categorySlugMap[category] || category.replace(/\s/g, '-').toLowerCase();
  navigate(`/products/${slug}`);
  setShowCategoriesDropdown(false);
  setOpen(false);
};

const handleCategoriesMouseEnter = () => {
  if (hideTimeout.current) clearTimeout(hideTimeout.current);
  setShowCategoriesDropdown(true);
};

const handleCategoriesMouseLeave = () => {
  hideTimeout.current = setTimeout(() => {
    setShowCategoriesDropdown(false);
  }, 150); // delay before hiding dropdown
};

    return (
        <>
            <div className="w-full py-1 font-medium text-sm text-white bg-gradient-to-r from-green-800 to-green-900">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6 text-center">
                    <p>🚚 Free Shipping on Orders Above ₹250</p>
                    <span className="hidden sm:inline">|</span>
                    <p>🎁 20% OFF on First Purchase</p>
                    <span className="hidden sm:inline">|</span>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-white text-primary font-semibold rounded-full px-3 py-0.5 hover:bg-gray-100 transition"
                        aria-label="View Products"
                    >
                        Shop Now
                    </button>
                </div>
            </div>

            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-50"> {/* Increased z-index */}

                <NavLink to='/' onClick={() => { setOpen(false); setShowCategoriesDropdown(false); }}>
                    <img className="h-9" src={assets.logo} alt="logo" />
                </NavLink>

{/* Desktop Menu */}
<div className="hidden sm:flex items-center gap-6">
  <NavLink
    className="px-4 py-1 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition"
    to="/seller"
    onClick={() => setShowCategoriesDropdown(false)}
  >
    Seller Dashboard
  </NavLink>

  <NavLink
    to="/"
    onClick={() => setShowCategoriesDropdown(false)}
    className="relative px-4 py-1 font-medium text-gray-700
      transition-colors duration-300 ease-in-out
      hover:text-primary group"
  >
    Home
    <span
      className="absolute left-0 -bottom-1 h-0.5 w-full bg-primary scale-x-0 
      origin-left transition-transform duration-300 ease-in-out
      group-hover:scale-x-100"
    ></span>
  </NavLink>

  <NavLink
    to="/products"
    onClick={() => setShowCategoriesDropdown(false)}
    className="relative px-4 py-1 font-medium text-gray-700
      transition-colors duration-300 ease-in-out
      hover:text-primary group"
  >
    All Product
    <span
      className="absolute left-0 -bottom-1 h-0.5 w-full bg-primary scale-x-0 
      origin-left transition-transform duration-300 ease-in-out
      group-hover:scale-x-100"
    ></span>
  </NavLink>


                  
{/* Categories Dropdown Trigger */}
<div
  className="relative cursor-pointer select-none group"
  onMouseEnter={handleCategoriesMouseEnter}
  onMouseLeave={handleCategoriesMouseLeave}
>
  <span className="cursor-pointer text-sm font-medium text-gray-700 transition-colors group-hover:text-primary">
    Categories
  </span>
  <img
    src={assets.dropdown_arrow}
    alt="dropdown"
    className="inline ml-1 w-3 transition-transform duration-300 group-hover:rotate-180"
  />

  <div
    className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-3 w-52 z-50 overflow-hidden
      transform transition-all duration-300 ease-in-out
      ${showCategoriesDropdown
        ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
        : "opacity-0 scale-95 pointer-events-none -translate-y-2"}`}
  >
    {categories.map((category, index) => (
      <p
        key={index}
        onClick={() => handleCategoryClick(category)}
        className="px-5 py-2 text-gray-700 text-sm hover:bg-gray-100 hover:text-primary transition-all duration-200"
      >
        {category}
      </p>
    ))}
  </div>
</div>


                    <div className="relative w-72 overflow-hidden border border-gray-300 px-3 rounded-full hidden lg:flex items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-1.5 w-full bg-transparent outline-none text-gray-700"
                            placeholder={searchQuery.length === 0 ? placeholderText : ""}
                        />
                        <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                    </div>

                    <div onClick={() => { navigate("/cart"); setShowCategoriesDropdown(false); }} className="relative cursor-pointer">
                        <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                    </div>

                    {!user ? (
                        <button onClick={() => { setShowUserLogin(true); setShowCategoriesDropdown(false); }} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                            Login
                        </button>)
                        : (
                            <div className='relative group'>
                                <img src={assets.profile_icon} className='w-10' alt="" />
                                <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow
                                    border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                                    <li onClick={() => { navigate("/my-orders"); setShowCategoriesDropdown(false); }}
                                        className='p-1 pl-3 hover:bg-primary/10 cursor-pointer'>My Order</li> {/* Changed to /my-orders based on your routes */}
                                    <li onClick={() => { logout(); setShowCategoriesDropdown(false); }}
                                        className='p-1 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                                </ul>
                            </div>
                        )}
                </div>

                {/* Mobile Menu */}
                <div className='flex items-center gap-6 sm:hidden'>
                    <div onClick={() => { navigate("/cart"); setShowCategoriesDropdown(false); }} className="relative cursor-pointer">
                        <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                        {getCartCount() > 0 && (
                            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                                {getCartCount()}
                            </button>
                        )}
                    </div>

                    <button onClick={() => { setOpen(open ? false : true); setShowCategoriesDropdown(false); }} aria-label="Menu" className="sm:hidden">
                        <img src={assets.menu_icon} alt='menu' />
                    </button>
                </div>

                {open && (
                    <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}>
                        <NavLink to="/" onClick={() => { setOpen(false); setShowCategoriesDropdown(false); }}>Home</NavLink>
                        <NavLink to="/products" onClick={() => { setOpen(false); setShowCategoriesDropdown(false); }}>All Product</NavLink>
                        {/* Categories for Mobile Menu */}
                        <div className="w-full">
                            <button onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)} className="block w-full text-left py-2 px-0 hover:bg-gray-50 focus:outline-none">
                                Categories <img src={assets.dropdown_arrow} alt="dropdown" className={`inline ml-1 w-3 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showCategoriesDropdown && (
                                <div className="pl-4 border-l border-gray-200 mt-1">
                                    {categories.map((category, index) => (
                                        <p
                                            key={index}
                                            onClick={() => handleCategoryClick(category)}
                                            className="block py-1 text-gray-700 hover:text-primary cursor-pointer text-sm"
                                        >
                                            {category}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {user &&
                            <NavLink to="/my-orders" onClick={() => { setOpen(false); setShowCategoriesDropdown(false); }}>My Orders</NavLink>
                        }
                        <NavLink to="/" onClick={() => { setOpen(false); setShowCategoriesDropdown(false); }}>Categories</NavLink>

                        {!user ? (
                            <button onClick={() => { setOpen(false); setShowUserLogin(true); setShowCategoriesDropdown(false); }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                                Login
                            </button>
                        ) : (
                            <button onClick={() => { logout(); setOpen(false); setShowCategoriesDropdown(false); }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;