import React, { useState, useEffect, useContext } from "react";
import "./SpecialOffer.css";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/logUser";
import Combo from "./Combo";
const SpecialOffer = ({ addToCart }) => {
  const product = useSelector((state) => state.product.productData);
  const [startDate, setStartDate] = useState(getNextDate());
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");
  const { loggedInUserName } = useContext(AuthContext);
  // State to track clicked buttons
  const [clickedButtons, setClickedButtons] = useState([]);
  const [requiredWeight, setRequiredWeight] = useState("");
  const [requiredProtein, setRequiredProtein] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [totalprice, setTotalprice] = useState(0);
  const [productQua, setProductQua] = useState(1);
  const [subscriptionSubmitted, setSubscriptionSubmitted] = useState(false);

  // const allowedUser = { loggedInUserName };
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // console.log("PROTEIN", proteinValues);
  // Function to update the countdown values every second
  const updateCountdown = () => {
    const now = new Date();
    const targetDate = new Date("2023-07-03"); // Change this to your target date
    const timeDifference = targetDate - now;

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ hours, minutes, seconds });
    }
  };

  useEffect(() => {
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end - start;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const Tp = days * 20 * productQua;
      setTotalDays(days);
      setTotalprice(Tp);
    }
  }, [startDate, endDate, productQua]);
  console.log("tp", totalprice);
  const discount =
    totalDays > 365 ? 20 : totalDays > 90 ? 15 : totalDays > 30 ? 10 : 0;
  const discountedPrice = totalprice - (totalprice * discount) / 100;

  // Function to handle button click
  const handleAddToCart = (productItem) => {
    addToCart(productItem);
    setClickedButtons((prevButtons) => [...prevButtons, productItem.id]);
  };
  // const looggedInUserName = useSelector((state) => state.auth.loggedInUserName);
  // // console.log("loooooooo:", looggedInUserName);
  const handleSubscription = () => {
    if (!startDate || !endDate) {
      alert("Please enter start date and end date");
      return;
    }
    const subscriptionData = {
      allowedUser: loggedInUserName,
      startDate,
      endDate,
      address,
      totalDays,
      productQua,
    };

    // Determine the price to be posted based on the comparison
    if (discountedPrice < totalprice) {
      subscriptionData.totalPrice = discountedPrice;
    } else {
      subscriptionData.totalPrice = totalprice;
    }

    // Post the data to Firebase Realtime Database using the REST API
    fetch(
      "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Subscription.json",
      {
        method: "POST",
        body: JSON.stringify(subscriptionData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Subscription data posted to Firebase:", data);
        // Reset the values
        setStartDate(getNextDate());
        setEndDate("");
        setAddress("");
        setTotalDays(0);
        setTotalprice(0);
        // setDiscountedPrice(0);
        // Display the dialog box for order confirmation
        alert("Order Confirmed!"); // You can customize this dialog box as per your requirement
      })
      .catch((error) => {
        console.error("Error posting subscription data:", error);
      });
  };

  function getNextDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getNextDay(date) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 7);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const getTopThreeByClassification = (classification, sortBy) => {
    const filteredProducts = product.filter(
      (productItem) => productItem.classification === classification
    );
    const sortedProducts = filteredProducts.sort(
      (a, b) => b[sortBy] - a[sortBy]
    );
    return sortedProducts.slice(0, 4);
  };

  return (
    <div className="Special-offers-container">
      <div id="Subscription " className="subscription-section">
        <div className="Special-offer-milk-container">
          <h2 className="subscription-title">Milk Subscription</h2>

          <p className="subscription-description">
            Enjoy the convenience of a milk subscription and never run out of
            fresh milk again. Choose your preferred subscription offer and enjoy
            special benefits.
          </p>
          <div className="subscription-form">
            <label htmlFor="start-date">Start Date:</label>
            <input
              placeholder="start date"
              type="date"
              id="start-date"
              // value={startDate}
              min={getNextDate()}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              placeholder="end date"
              // value={endDate}
              min={getNextDay(startDate)}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <input
              placeholder="Quantity"
              type="number"
              id="Quantity"
              value={productQua}
              onChange={(e) => {
                const quantity = parseInt(e.target.value);
                if (quantity <= 5 && quantity >= 1) {
                  setProductQua(quantity);
                }
              }}
            />
            {/* <label htmlFor="address">Address:</label> */}
            <input
              placeholder="Address"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {totalDays > 0 && totalDays <= 30 && (
              <p className="discount-price">
                <span className="total-price-discount">
                  Total Days:{totalDays}
                </span>
                <br />
                <br />
                <span>Market Price:{totalprice}</span>
              </p>
            )}
            {totalDays > 30 && (
              <p className="discount-price">
                <span className="total-price-discount-og">
                  Total Days:{totalDays}
                </span>
                <br />
                <br />
                <span className="original-price">
                  Market Price:{totalprice}
                </span>

                <span className="discounted-price">
                  | Our Price:{discountedPrice}
                </span>
              </p>
            )}

            <button className="subscribe-btn" onClick={handleSubscription}>
              Subscribe
            </button>
          </div>
        </div>
        <div className="subscription-offers">
          <h2>Subscription Offers:</h2>
          <div className="countdown-bar">
            <h3>OFFER CLOSING SOON!!</h3>
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-value">{countdown.hours}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{countdown.minutes}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{countdown.seconds}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          </div>
          <ul>
            <li className="li-special-offer-timeout">
              Monthly Subscription - 10% off
            </li>
            <li className="li-special-offer-timeout">
              Quarterly Subscription - 15% off
            </li>
            <li className="li-special-offer-timeout">
              Yearly Subscription - 20% off
            </li>
          </ul>
        </div>
      </div>

      <div id="Trending product" className="Trending product">
        <h2 className="tp">TRENDING PRODUCT</h2>
        <div className="ProductList-product-section">
          <h3>FARM DAIRY TRENDING</h3>
          <div className="ProductList-product-row">
            {getTopThreeByClassification("Dairy", "search").map(
              (productItem) => (
                <div className="ProductList-product-item" key={productItem.id}>
                  <img src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                    {productItem.Quantity === 0 ? (
                      <p className="out-of-stock">Out of Stock</p>
                    ) : productItem.Quantity < 10 ? (
                      <p className="limited-stock">Limited Stock</p>
                    ) : productItem.Quantity >= 10 ? (
                      <p className="on-stock"> Stock Available</p>
                    ) : null}
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
              )
            )}
          </div>
        </div>

        <div className="ProductList-product-section">
          <h3>FARM MEAT TRENDING</h3>
          <div className="ProductList-product-row">
            {getTopThreeByClassification("meat", "search").map(
              (productItem) => (
                <div className="ProductList-product-item" key={productItem.id}>
                  <img src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                    {productItem.Quantity === 0 ? (
                      <p className="out-of-stock">Out of Stock</p>
                    ) : productItem.Quantity < 10 ? (
                      <p className="limited-stock">Limited Stock</p>
                    ) : productItem.Quantity >= 10 ? (
                      <p className="on-stock"> Stock Available</p>
                    ) : null}
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
              )
            )}
          </div>
        </div>

        <div className="ProductList-product-section">
          <h3>FARM FOOD TRENDING</h3>
          <div className="ProductList-product-row">
            {getTopThreeByClassification("food", "search").map(
              (productItem) => (
                <div className="ProductList-product-item" key={productItem.id}>
                  <img src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                    {productItem.Quantity === 0 ? (
                      <p className="out-of-stock">Out of Stock</p>
                    ) : productItem.Quantity < 10 ? (
                      <p className="limited-stock">Limited Stock</p>
                    ) : productItem.Quantity >= 10 ? (
                      <p className="on-stock"> Stock Available</p>
                    ) : null}
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
              )
            )}
          </div>
        </div>
        <div id="combo">
          <Combo addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
