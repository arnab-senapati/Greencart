import React, { useEffect, useState} from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";


const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
 

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  // State for accordion items
  const [openAccordion, setOpenAccordion] = useState(null); // Stores the index of the open item

  const product = products.find((item) => item._id === id);

  // Dummy data for plant care and features (replace with actual data from product object if available)
  const plantCare = [
    {
      id: 'water',
      icon: assets.water_icon, // Make sure you have these icons in your assets
      title: "Water Twice A Week",
      description: "Ensure the soil is moist but not waterlogged. Check top inch of soil before watering.",
    },
    {
      id: 'sunlight',
      icon: assets.sun_icon, // Example: assets.sun_icon for sunlight
      title: "Needs Bright Indirect Sunlight",
      description: "Place in a spot with plenty of bright, indirect light. Avoid direct harsh sun.",
    },
    {
      id: 'petFriendly',
      icon: assets.pet_icon, // Example: assets.pet_icon for pet
      title: "Not Pet Friendly",
      description: "This plant is toxic if ingested by pets. Keep out of reach of animals.",
    },
    {
      id: 'beginnerFriendly',
      icon: assets.beginner_icon, // Example: assets.beginner_icon for beginner
      title: "Beginner Friendly",
      description: "An easy-to-care-for plant, perfect for those new to plant parenting.",
    },
  ];

  const features = [
    {
      icon: assets.shipping_icon, // Example: assets.shipping_icon
      text: "Free Shipping above ₹499",
    },
    {
      icon: assets.return_icon, // Example: assets.return_icon
      text: "14-days Guaranteed Replacement if damaged",
    },
    {
      icon: assets.guidance_icon, // Example: assets.guidance_icon
      text: "Expert Guidance",
    },
  ];

useEffect(() => {
  if (products.length > 0 && product) {
    let productsCopy = products.slice();
    productsCopy = productsCopy.filter(
      (item) => product.category === item.category && item._id !== product._id
    );
    console.log("Filtered relatedProducts:", productsCopy); // 👈 Add this
    setRelatedProducts(productsCopy.slice(0, 5));
  }
}, [products, product]);


  useEffect(() => {
    setThumbnail(product?.image?.[0] || null);
  }, [product]);

  // Toggle accordion item
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };


  return (
    product && (
      <div className="mt-12">
        <p>
          <Link to="/">Home</Link> /{" "}
          <Link to="/products">Products</Link> /{" "}
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}
          </Link>{" "}
          / <span className="text-primary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">



{/* Left Side: Product Images */}
 <div className="w-full md:w-1/2 flex flex-col gap-4">
  {/* Main Image */}
  <div className="w-full aspect-square border border-gray-300 rounded overflow-hidden flex items-center justify-center bg-white relative">
    <AnimatePresence mode="wait">
      <motion.img
        key={thumbnail} // Ensures animation on image change
        src={thumbnail}
        alt="Selected product"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full object-contain"
      />
    </AnimatePresence>
  </div>

  {/* Thumbnails below main image */}
  <div className="flex gap-3 justify-center flex-wrap">
    {product.image.map((image, index) => (
      <motion.div
        key={index}
        onClick={() => setThumbnail(image)}
        whileHover={{ scale: 1.05 }}
        className={`border aspect-square w-20 md:w-24 rounded overflow-hidden cursor-pointer transition-all duration-300 ${
          thumbnail === image ? 'border-primary shadow-md' : 'border-gray-300'
        }`}
      >
        <img
          src={image}
          alt={`Thumbnail ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>
    ))}
  </div>
</div>




          {/* Right Side: Product Details & New Sections */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="md:w-4 w-3.5"
                  />
                ))}
              <p className="text-base ml-2">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500/70">
                (inclusive of all taxes)
              </span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary
                 text-white hover:bg-primary-dull transition"
              >
                Buy now
              </button>
            </div>

 {/* Plant Care Section (Accordion) */}
 <div className="border-t border-gray-200 pt-8 w-full">
  <h2 className="text-2xl font-semibold mb-6">Plant Care Guide</h2>

  <div className="rounded-xl border border-gray-300 divide-y divide-gray-300 overflow-hidden">
    {plantCare.map((item) => (
      <div key={item.id}>
        <button
          className="w-full flex justify-between items-center px-6 py-5 bg-transparent hover:bg-gray-50 transition-all"
          onClick={() => toggleAccordion(item.id)}
        >
          <div className="flex items-center gap-4">
            <img
              src={item.icon}
              alt={item.title}
              className="w-6 h-6 opacity-80"
            />
            <span className="font-medium text-base text-gray-800">
              {item.title}
            </span>
          </div>
          <img
            src={assets.dropdown_arrow}
            alt="Toggle"
            className={`w-4 h-4 transition-transform duration-300 ${
              openAccordion === item.id ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            openAccordion === item.id ? "max-h-40 py-4 px-6 bg-gray-50" : "max-h-0"
          }`}
        >
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>

  <p className="text-primary text-sm mt-6 cursor-pointer border-b-2 border-primary w-max hover:opacity-80 transition">
    View Light Guide
  </p>
</div>




            {/* Features/Promises Section */}
          <div className=" grid grid-cols-3 gap-12 border-gray-300">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center mt-1">
                  <img src={feature.icon} alt={feature.text} className="w-12 h-12 mb-2 opacity-80" />
                  <p className="text-xs text-gray-600">{feature.text}</p>
                </div>
              ))}
            </div>


          </div>
        </div>

        
{/* Related Products */}
<div className="flex flex-col items-center mt-20">
  <div className="flex flex-col items-center w-max">
    <p className="text-3xl font-medium">Related Products</p>
    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
    {relatedProducts &&
      relatedProducts
        .filter((product) => product.inStock)
        .slice(0, 5)
        .map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
  </div>

  <button
    onClick={() => navigate("/products")}
    className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary-dull/10 transition"
  >
    See more
  </button>
</div>

      </div>
    )
  );
};

export default ProductDetails;