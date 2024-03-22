import React, { useState, useEffect, useContext } from "react";
import "./CartList.css";
// import { useSelector } from "react-redux";
import Dialog from "./Dialog";
import { AuthContext } from "../contexts/logUser";

function CartList({
  cart,
  handleIncrease,
  handleDecrease,
  onOrderPlaced,
  isOrderPlaced,
}) {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    totalPrice: 0,
  });
  const [showPlaceOrderDialog, setShowPlaceOrderDialog] = useState(false);
  const [showOrderPlacedDialog, setShowOrderPlacedDialog] = useState(false);

  const { loggedInUserName } = useContext(AuthContext);
  // const product = useSelector((state) => state.product.productData);
  // console.log("product", product);
  const updateTotalPrice = (updatedCart) => {
    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setFormData({ ...formData, totalPrice: total });
  };

  const handlePlaceOrder = () => {
    setShowPlaceOrderDialog(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Phone number validation
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const productNames = cartItems.map((item) => item.name);

      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/FarmOrder.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            allowedUser: loggedInUserName,
            productNames: productNames,
            orderDate: new Date().toLocaleString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post order data.");
      }

      setShowPlaceOrderDialog(false);
      setShowOrderPlacedDialog(true);

      setTimeout(() => {
        setFormData({
          name: "",
          address: "",
          phoneNumber: "",
          totalPrice: 0,
        });
        setCartItems([]);
        onOrderPlaced();
        setShowOrderPlacedDialog(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCartItems(cart);
    updateTotalPrice(cart);
  }, [cart]);

  if (cartItems.length === 0) {
    return <p className="empty-cart-message">Your cart is empty.</p>;
  }

  return (
    <div className="margin">
      <div className="Carlist-classificatio-box-colors ">
        <div className="cartlist-box-container">
          <div className="cartlist-box-container-Dairy"></div>
          <div> - Dairy </div>
        </div>
        <div className="cartlist-box-container">
          <div className="cartlist-box-container-Meat"></div>
          <div> - Meat </div>
        </div>
        <div className="cartlist-box-container">
          <div className="cartlist-box-container-Food"></div>
          <div> - Food </div>
        </div>
      </div>
      {cartItems.length > 0 ? (
        <div className="cart-grid">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className={`cart-item ${
                item.classification === "meat"
                  ? "meat-background"
                  : item.classification === "food"
                  ? "food-background"
                  : "dairy-background"
              }`}
            >
              <div className="item-image">
                <img src={item.url} width={70} alt={item.name} />
              </div>
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-classification">{item.classification}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecrease(index)}
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncrease(index)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-price">
                <span className="price-label">Price:</span>
                <span className="item-total-price">
                  {item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}

      <div className="Cartlist-cart-summary">
        <div className="total-price">Total Price: ₹ {formData.totalPrice}</div>
        <button className="Cartlist-place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>

      {showPlaceOrderDialog && (
        <Dialog onClose={() => setShowPlaceOrderDialog(false)}>
          <form onSubmit={handleSubmit}>
            <div className="cartlist-form-list">
              <h3 className="cartlist-p-text">Order Details</h3>
              <input
                className="cartlist-input"
                placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />

              <input
                className="cartlist-input"
                placeholder="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />

              <input
                className="cartlist-input"
                placeholder="Phonenumber"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />

              <input
                className="cartlist-input"
                placeholder="Total Price"
                type="text"
                name="totalPrice"
                value={formData.totalPrice}
                disabled
              />

              <input
                className="cartlist-input"
                type="text"
                value={`Date: ${new Date().toLocaleString()}`}
                readOnly
              />

              {/* Add payment options */}
              <div className="payment-options">
                <h3>Payment Options</h3>
                <label>
                  <input
                    className="payment-input-cart"
                    type="radio"
                    name="paymentOption"
                    value="creditCard"
                  />
                  Credit Card
                </label>
                <label>
                  <input
                    className="payment-input-cart"
                    type="radio"
                    name="paymentOption"
                    value="debitCard"
                  />
                  Debit Card
                </label>
                <label>
                  <input
                    className="payment-input-cart"
                    type="radio"
                    name="paymentOption"
                    value="netBanking"
                  />
                  Net Banking
                </label>
                <label>
                  <input
                    className="payment-input-cart"
                    type="radio"
                    name="paymentOption"
                    value="cash on delivery"
                  />
                  Cash On Delivery
                </label>
              </div>

              <div className="cart-items-container">
                <p className="cartlist-p-text">Cart Items:</p>
                <div className="cart-items-list-container">
                  <ol className="cart-items-columns">
                    {cartItems.map((item, index) => (
                      <li className="cartlist-li" key={index}>
                        <div className="cartList-item">
                          <span className="cartlist-item-name">
                            {item.name}
                          </span>
                          <span className="cartlist-item-quantity">
                            ({item.quantity})
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <button className="cartlist-submit-order-btn" type="submit">
                Submit Order
              </button>
            </div>
          </form>
        </Dialog>
      )}

      {showOrderPlacedDialog && (
        <Dialog onClose={() => setShowOrderPlacedDialog(false)}>
          <div>Order placed successfully!</div>
        </Dialog>
      )}

      {isOrderPlaced && <div>Order placed successfully!</div>}
    </div>
  );
}

export default CartList;
