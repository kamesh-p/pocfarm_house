import React, { useState, useEffect, useContext } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductData } from "../store/product-slice";
import { Container, Row, Col } from "reactstrap";
import { AuthContext } from "../contexts/logUser";
import { getOrderData } from "../store/Order-slice";
import cow from "../Assert/image/Cow-removebg-preview.png";
import Footer from "./Footer";

function ProductList({ addToCart }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productData);
  const { loggedInUserName } = useContext(AuthContext);

  const orderData = useSelector((state) => state.order.orderData);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);

  useEffect(() => {
    dispatch(getOrderData());
    dispatch(getProductData());
  }, [dispatch]);

  const filteredOrderData = orderData.filter(
    (order) => order.allowedUser === loggedInUserName
  );

  const productNames = filteredOrderData.flatMap((order) => order.productNames);

  const productCounts = productNames.reduce((counts, name) => {
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});

  const sortedCartItems = Object.entries(productCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const topProducts = sortedCartItems.slice(0, 30).map((item) => item[0]);

  const filteredProducts = product.filter((productItem) =>
    topProducts.includes(productItem.name)
  );

  const dairyProducts = filteredProducts
    .filter((productItem) => productItem.classification === "Dairy")
    .map((productItem) => ({
      ...productItem,
      count: productCounts[productItem.name] || 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4); // Filter to top 4 items

  const foodProducts = filteredProducts
    .filter((productItem) => productItem.classification === "food")
    .map((productItem) => ({
      ...productItem,
      count: productCounts[productItem.name] || 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4); // Filter to top 4 items

  const meatProducts = filteredProducts
    .filter((productItem) => productItem.classification === "meat")
    .map((productItem) => ({
      ...productItem,
      count: productCounts[productItem.name] || 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4); // Filter to top 4 items

  const handleAddToCart = (productItem) => {
    addToCart(productItem);
    setClickedButtons((prevButtons) => [...prevButtons, productItem.id]);
  };

  return (
    <div className="ProductList-product-list-container">
      <section id="Intro" className="hero-section">
        <Container className="ProductList-Home-Cont">
          <Row>
            <Col lg="6" md="6">
              <div className="hero-display-content ">
                <div className="hero__content">
                  <p className="hero__subtitle">Welcome {loggedInUserName},</p>
                  <h2>Embrace the Wholesome Goodness of Dairy</h2>
                  <p className="hero-para">
                    We invite you to embark on a journey that celebrates the
                    wholesome goodness of dairy. We believe that dairy products
                    are not just ingredients but treasures that enrich our lives
                    and nourish our bodies. From the lush green pastures where
                    our cows graze to the expert hands that transform their milk
                    into delightful creations, we take pride in offering you the
                    finest dairy products
                  </p>
                </div>
                <div className="Hero-Background-image">
                  <img src={cow} alt="cow" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {(meatProducts.length > 0 ||
        dairyProducts.length > 0 ||
        foodProducts.length > 0) && (
        <div id="SuggestedProducts" className="ProductList-product-section">
          <h2 className="bsp">Suggested Products</h2>

          {meatProducts.length > 0 && (
            <>
              <h2 className="segment-suggested-products">Top Meat Products</h2>
              <div className="ProductList-product-row">
                {meatProducts.map((productItem) => (
                  <div
                    className="ProductList-product-item"
                    key={productItem.id}
                  >
                    <img src={productItem.url} alt="img" />
                    <p>
                      {productItem.name} | {productItem.classification}
                      {productItem.Quantity === 0 ? (
                        <p className="out-of-stock">Out of Stock</p>
                      ) : productItem.Quantity < 10 ? (
                        <p className="limited-stock">Limited Stock</p>
                      ) : (
                        <p className="on-stock"> Stock Available</p>
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
                ))}
              </div>
            </>
          )}

          {dairyProducts.length > 0 && (
            <>
              <h2 className="segment-suggested-products">Top Dairy Products</h2>
              <div className="ProductList-product-row">
                {dairyProducts.map((productItem) => (
                  <div
                    className="ProductList-product-item"
                    key={productItem.id}
                  >
                    <img src={productItem.url} alt="img" />
                    <p>
                      {productItem.name} | {productItem.classification}
                      {productItem.Quantity === 0 ? (
                        <p className="out-of-stock">Out of Stock</p>
                      ) : productItem.Quantity < 10 ? (
                        <p className="limited-stock">Limited Stock</p>
                      ) : (
                        <p className="on-stock"> Stock Available</p>
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
                ))}
              </div>
            </>
          )}

          {foodProducts.length > 0 && (
            <>
              <h2 className="segment-suggested-products">Top Food Products</h2>
              <div className="ProductList-product-row">
                {foodProducts.map((productItem) => (
                  <div
                    className="ProductList-product-item"
                    key={productItem.id}
                  >
                    <img src={productItem.url} alt="img" />
                    <p>
                      {productItem.name} | {productItem.classification}
                      {productItem.Quantity === 0 ? (
                        <p className="out-of-stock">Out of Stock</p>
                      ) : productItem.Quantity < 10 ? (
                        <p className="limited-stock">Limited Stock</p>
                      ) : (
                        <p className="on-stock"> Stock Available</p>
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
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div id="Contact">
        <Footer />
      </div>
    </div>
  );
}

export default ProductList;
