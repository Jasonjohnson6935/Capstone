import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductListQuery, useAddToCartMutation } from "../redux/api";

function ProductList({ token }) {
  const { data, error, isLoading } = useProductListQuery(token);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [addedProductName, setAddedProductName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        setAddedProductName(""); // Reset added product name
      }, 3000); // 3 seconds
      console.log("Popup appeared"); // Log the appearance of the popup
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  const filteredProducts = data.filter((product) => {
    return (
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase())
    );
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = (product) => {
    if (!token) {
      alert("You must log in to add items to the cart.");
      return;
    }
    
    addToCart({ token, body: { productId: product.id, quantity: 1 } });
    setAddedProductName(product.title);
    setShowPopup(true);
  };
  
  {token ? (
    <button
      onClick={() => handleAddToCart(product)}
      disabled={isAddingToCart}
    >
      Add to Cart
    </button>
  ) : (
    <button disabled>
      Log in to Add to Cart
    </button>
  )}
  
  {showPopup && (
    <div className="popup">
      <p>{token ? `${addedProductName} was added to the cart.` : "You must log in to add items to the cart."}</p>
    </div>
  )}  
  

  return (
    <div>
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {Array.from(new Set(data.map((product) => product.category))).map(
          (category) => (
            <option key={category} value={category}>
              {category}
            </option>
          )
        )}
      </select>
      {filteredProducts.map((product) => {
        return (
          <div className="product-item" key={product.id}>
          <h2>Category: {product.category}</h2>
          <img src={product.image} alt={product.title} />
          <div>
            <Link to={`/products/${product.id}`}>See More Details</Link>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={isAddingToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        );
      })}
      {showPopup && (
        <div className="popup">
          <p>{addedProductName} was added to the cart.</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;

