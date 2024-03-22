import "./Shop.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductData } from "../store/product-slice";
import "@fortawesome/fontawesome-free/css/all.css";

function Shop({ addToCart }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productData);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the product data when the component mounts
    dispatch(getProductData());
  }, [dispatch]);

  // State to track clicked buttons
  const [clickedButtons, setClickedButtons] = useState([]);

  // Function to handle button click
  const handleAddToCart = (productItem) => {
    addToCart(productItem);
    setClickedButtons((prevButtons) => [...prevButtons, productItem.id]);
  };

  const orderData = useSelector((state) => state.order.orderData);
  console.log("order:", orderData);

  const filteredProducts = product.filter(
    (productItem) =>
      productItem.name &&
      productItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasFilteredDairyProducts = filteredProducts.some(
    (productItem) => productItem.classification === "Dairy"
  );
  const hasFilteredMeatProducts = filteredProducts.some(
    (productItem) => productItem.classification === "meat"
  );
  const hasFilteredFoodProducts = filteredProducts.some(
    (productItem) => productItem.classification === "food"
  );

  return (
    <div className="Shop-container">
      <input
        className="shop-search-products"
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {hasFilteredDairyProducts && (
        <div id="Shop-Farm-Dairy" className="Shop-category-section">
          <h2 className="Shop-category">Farm Dairy</h2>
        </div>
      )}
      <div className="Shop-flex">
        {filteredProducts
          .filter((productItem) => productItem.classification === "Dairy")
          .map((productItem) => (
            <div className="Shop-product-item" key={productItem.id}>
              <div className="Shop-product-info">
                <img src={productItem.url} alt="img" />
                <p>
                  {productItem.name} | {productItem.classification}
                  {productItem.Quantity === 0 ? (
                    <p className="out-of-stock">Out of Stock</p>
                  ) : productItem.Quantity < 10 ? (
                    <p className="limited-stock">Limited Stock</p>
                  ) : (
                    <p className="on-stock">Stock Available</p>
                  )}
                </p>
                <p>{productItem.category}</p>
                <p>Rs. {productItem.price} /-</p>
                <button
                  onClick={() => handleAddToCart(productItem)}
                  disabled={productItem.Quantity === 0}
                  className={
                    clickedButtons.includes(productItem.id) ? "clicked" : ""
                  }
                >
                  {clickedButtons.includes(productItem.id)
                    ? "Added"
                    : "Add To Cart"}
                </button>
              </div>
            </div>
          ))}
      </div>

      {hasFilteredMeatProducts && (
        <div id="Shop-Farm-Meat" className="Shop-category-section">
          <h2 className="Shop-category">Farm Meat</h2>
        </div>
      )}
      <div className="Shop-flex">
        {filteredProducts
          .filter((productItem) => productItem.classification === "meat")
          .map((productItem) => (
            <div className="Shop-product-item" key={productItem.id}>
              <div className="Shop-product-info">
                <img src={productItem.url} alt="img" />
                <p>
                  {productItem.name} | {productItem.classification}
                  {productItem.Quantity === 0 ? (
                    <p className="out-of-stock">Out of Stock</p>
                  ) : productItem.Quantity < 10 ? (
                    <p className="limited-stock">Limited Stock</p>
                  ) : (
                    <p className="on-stock">Stock Available</p>
                  )}
                </p>
                <p>{productItem.category}</p>
                <p>Rs. {productItem.price} /-</p>
                <button
                  onClick={() => handleAddToCart(productItem)}
                  disabled={productItem.Quantity === 0}
                  className={
                    clickedButtons.includes(productItem.id) ? "clicked" : ""
                  }
                >
                  {clickedButtons.includes(productItem.id)
                    ? "Added"
                    : "Add To Cart"}
                </button>
              </div>
            </div>
          ))}
      </div>

      {hasFilteredFoodProducts && (
        <div id="Shop-Farm-Food" className="Shop-category-section">
          <h2 className="Shop-category">Farm Food</h2>
        </div>
      )}
      <div className="Shop-flex">
        {filteredProducts
          .filter((productItem) => productItem.classification === "food")
          .map((productItem) => (
            <div className="Shop-product-item" key={productItem.id}>
              <div className="Shop-product-info">
                <img src={productItem.url} alt="img" />
                <p>
                  {productItem.name} | {productItem.classification}
                  {productItem.Quantity === 0 ? (
                    <p className="out-of-stock">Out of Stock</p>
                  ) : productItem.Quantity < 10 ? (
                    <p className="limited-stock">Limited Stock</p>
                  ) : (
                    <p className="on-stock">Stock Available</p>
                  )}
                </p>
                <p>{productItem.category}</p>
                <p>Rs. {productItem.price} /-</p>
                <button
                  onClick={() => handleAddToCart(productItem)}
                  disabled={productItem.Quantity === 0}
                  className={
                    clickedButtons.includes(productItem.id) ? "clicked" : ""
                  }
                >
                  {clickedButtons.includes(productItem.id)
                    ? "Added"
                    : "Add To Cart"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shop;
