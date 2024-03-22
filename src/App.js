import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Shop from "./components/Shop";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import CartList from "./components/CartList";
import ProductList from "./components/ProductList";
import FeedbackForm from "./components/FeedBack";
import History from "./components/MyHistory";
import { AuthProvider } from "./contexts/logUser";
import SpecialOffer from "./components/SpecialOffer";

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  // const product = useSelector((state) => state.product.productData);
  // console.log("ppp", product);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    totalPrice: 0,
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleRouteChange = (route) => {
    console.log("Route changed:", route);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(" app cart", cart);

  const addToCart = (data) => {
    setCart([...cart, { ...data, quantity: 1 }]);
    setCartAnimation(true);

    setTimeout(() => {
      setCartAnimation(false);
    }, 500);
  };

  const handleDecrease = (index) => {
    const updatedCart = [...cart];
    // const currentQuantity = updatedCart[index].Quantity;
    // updatedCart[index].Quantity = currentQuantity + 1;
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
    } else {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
    updateTotalPrice(updatedCart);
    // const { Quantity } = updatedCart[index];
    // postQuantityToDatabase(Quantity);
  };
  // const postQuantityToDatabase = async (Quantity) => {
  //   try {
  //     const response = await fetch(
  //       `https://add-to-card-a30ca-default-rtdb.firebaseio.com/Products.json`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ Quantity }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update quantity in the database.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleIncrease = (index) => {
    const updatedCart = [...cart];
    const currentquantity = updatedCart[index].quantity;
    // const currentQuantity = updatedCart[index].Quantity;

    if (currentquantity < 10) {
      updatedCart[index].quantity = currentquantity + 1;
      setCart(updatedCart);
      updateTotalPrice(updatedCart);
    }

    // if (currentQuantity > 1) {
    //   // Check if the current quantity is greater than 1
    //   // updatedCart[index].Quantity = currentQuantity - 1; // Decrease the quantity by 1
    //   setCart(updatedCart);
    //   updateTotalPrice(updatedCart);
    // }
    // const { Quantity } = updatedCart[index];
    // postQuantityToDatabase(Quantity);
  };

  const updateTotalPrice = (updatedCart) => {
    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setFormData({ ...formData, totalPrice: total });
  };

  const handleOrder = () => {
    setShowDialog(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCartReset = () => {
    setCart([]);
  };

  return (
    <Router>
      <AuthProvider>
        <div>
          {isLoggedIn ? (
            <>
              <Header
                handleRouteChange={handleRouteChange}
                count={cart.length}
                cartAnimation={cartAnimation}
              />
              <Routes>
                <Route
                  path="/admin/shop"
                  element={<Shop addToCart={addToCart} />}
                />
                <Route
                  path="/admin/cart"
                  element={
                    <CartList
                      cart={cart}
                      handleIncrease={handleIncrease}
                      handleDecrease={handleDecrease}
                      onOrderPlaced={handleCartReset}
                      isOrderPlaced={isOrderPlaced}
                    />
                  }
                />
                <Route path="/admin/feedback" element={<FeedbackForm />} />
                <Route path="/admin/history" element={<History />} />
                <Route
                  path="/"
                  element={<ProductList addToCart={addToCart} />}
                />
                <Route
                  path="/admin/special-offers"
                  element={<SpecialOffer addToCart={addToCart} />}
                />
              </Routes>
            </>
          ) : (
            <Auth />
          )}
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
