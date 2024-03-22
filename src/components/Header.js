import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import logo from "../Assert/image/logo-modified.png";
import Ramesh from "../Assert/Ramesh.png";
import Dhananjayan from "../Assert/Dhananjayan.png";
import Vignesh from "../Assert/Vignesh.png";
import Kamesh from "../Assert/Kamesh.png";
import Prakash from "../Assert/Prakash.png";
import FeedbackForm from "./FeedBack";
import { AuthContext } from "../contexts/logUser";
import "@fortawesome/fontawesome-free/css/all.css";
import cartIcon from "../Assert/basket-cart-icon.png";
const Header = ({ handleRouteChange, count, cartAnimation }) => {
  const [showCart, setShowCart] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showSpecialOffersDropdown, setShowSpecialOffersDropdown] =
    useState(false);

  const dispatch = useDispatch();

  const { loggedInUserName } = useContext(AuthContext);
  console.log("cart:", loggedInUserName);
  const getUserImage = () => {
    if (loggedInUserName === "Ramesh") {
      return Ramesh;
    } else if (loggedInUserName === "Dhananjayan") {
      return Dhananjayan;
    } else if (loggedInUserName === "Vignesh") {
      return Vignesh;
    } else if (loggedInUserName === "Prakash") {
      return Prakash;
    } else if (loggedInUserName === "Kamesh") {
      return Kamesh;
    } else {
      return loggedInUserName;
    }
  };

  const userImage = getUserImage();

  const handleClick = (route) => {
    handleRouteChange(route);
  };

  const handleBestSelling = () => {
    const dairySection = document.getElementById("Best Selling Products");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false);
  };

  const handleTrendingProduct = () => {
    const dairySection = document.getElementById("Trending product");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false);
  };
  const handleHealthProduct = () => {
    const dairySection = document.getElementById("combo");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false);
  };
  const handleSubscription = () => {
    const dairySection = document.getElementById("Subscription ");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false);
  };
  const handleSuggestedProduct = () => {
    const dairySection = document.getElementById("Suggested Products");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false);
  };
  const handleContact = () => {
    const dairySection = document.getElementById("Contact");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false);
  };
  const handleIntro = () => {
    const dairySection = document.getElementById("Intro");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowHomeDropdown(false);
  };
  const handleSpecialOffersClick = () => {
    handleShowCart(false);
    handleShowShop(false);
    handleLinkClick("SpecialOffers");
    setShowSpecialOffersDropdown((prevState) => !prevState);
  };

  const logOutHandler = () => {
    dispatch(authActions.logout());
  };

  const handleShowCart = (value) => {
    setShowCart(value);
  };

  const handleShowShop = (value) => {
    setShowShop(value);
  };

  const handleLinkClick = (linkName) => {
    if (activeLink === linkName) {
      setActiveLink(null);
    } else {
      setActiveLink(linkName);
    }
    setShowHomeDropdown(false);
    setShowShopDropdown(false);
    setShowUserDropdown(false);
  };

  const handleShoppingAppClick = () => {
    handleShowCart(false);
    handleShowShop(false);
    handleLinkClick("Home");
    setShowHomeDropdown((prevState) => !prevState);
  };

  const handleShopClick = () => {
    handleShowCart(false);
    handleShowShop(true);
    handleLinkClick("Shop");
    setShowShopDropdown((prevState) => !prevState);
  };

  const handleFarmDairyClick = () => {
    const dairySection = document.getElementById("Shop-Farm-Dairy");
    dairySection.scrollIntoView({ behavior: "smooth" });
    setShowShopDropdown(false);
  };

  const handleFarmMeatClick = () => {
    const meatSection = document.getElementById("Shop-Farm-Meat");
    meatSection.scrollIntoView({ behavior: "smooth" });
    setShowShopDropdown(false);
  };

  const handleFarmFoodClick = () => {
    const meatSection = document.getElementById("Shop-Farm-Food");
    meatSection.scrollIntoView({ behavior: "smooth" });
    setShowShopDropdown(false);
  };

  const handleUserDropdown = () => {
    setShowUserDropdown((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <h1 className="company-name">FarmHouse</h1>
      </div>
      <nav className="nav-desktop">
        <ul>
          <li
            className={`user-dropdown ${
              activeLink === "Home" && showHomeDropdown ? "active" : ""
            }`}
          >
            <div className="dropdown">
              <Link
                to="/"
                onClick={handleShoppingAppClick}
                onMouseEnter={() => handleLinkClick("Home")}
                className="header-link"
              >
                Home
                {showHomeDropdown && activeLink === "Home" && (
                  <div className="dropdown-content">
                    <span onClick={handleIntro}>Intro</span>
                    <span onClick={handleSuggestedProduct}>
                      Suggested Products
                    </span>
                    <span onClick={handleContact}>Contact Us</span>
                  </div>
                )}
              </Link>
            </div>
          </li>
          <li
            className={`user-dropdown ${
              activeLink === "SpecialOffers" && showSpecialOffersDropdown
                ? "active"
                : ""
            }`}
          >
            <div className="dropdown">
              <Link
                className="header-link"
                to="/admin/special-offers"
                onClick={handleSpecialOffersClick}
                onMouseEnter={() => handleLinkClick("SpecialOffers")}
              >
                SpecialOffers
                {showSpecialOffersDropdown &&
                  activeLink === "SpecialOffers" && (
                    <div className="dropdown-content">
                      <span onClick={handleSubscription}>Subscription</span>

                      <span onClick={handleTrendingProduct}>
                        Trending Products
                      </span>
                      <span onClick={handleHealthProduct}>Health Care</span>
                    </div>
                  )}
              </Link>
            </div>
          </li>

          <li
            className={`user-dropdown ${
              activeLink === "Shop" && showShopDropdown ? "active" : ""
            }`}
          >
            <div className="dropdown">
              <Link
                className="header-link"
                to="/admin/shop"
                onClick={handleShopClick}
                onMouseEnter={() => handleLinkClick("Shop")}
              >
                Shop
                {showShopDropdown && activeLink === "Shop" && (
                  <div className="dropdown-content">
                    <span onClick={handleFarmDairyClick}>Farm Dairy</span>
                    <span onClick={handleFarmMeatClick}>Farm Meat</span>
                    <span onClick={handleFarmFoodClick}>Farm Food</span>
                  </div>
                )}
              </Link>
            </div>
          </li>
          <li>
            <Link to="/admin/cart" className="header-link">
              {count > 0 && <sup>{count}</sup>}
              <img
                src={cartIcon}
                alt="Cart"
                className={`cart-icon ${cartAnimation ? "cart-animation" : ""}`}
                onClick={() => handleShowCart(true)}
              />
            </Link>
          </li>
          <li>
            <div className="user-dropdown">
              <img
                src={userImage}
                alt={loggedInUserName}
                onClick={handleUserDropdown}
                className="user-image"
              />
              {showUserDropdown && (
                <div className="dropdown-content">
                  <span>
                    <Link to="/admin/history">History</Link>
                  </span>
                  <span>
                    <Link to="/admin/feedback">Feedback</Link>
                  </span>
                  <span>
                    <Link onClick={logOutHandler}>Logout</Link>
                  </span>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
      {showFeedbackForm && <FeedbackForm />}
    </header>
  );
};

export default Header;
