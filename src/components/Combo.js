import React, { useState, useEffect, useContext } from "react";
import "./Combo.css";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/logUser";

const Combo = ({ addToCart }) => {
  const product = useSelector((state) => state.product.productData);
  const [requiredWeight, setRequiredWeight] = useState("");
  const [requiredProtein, setRequiredProtein] = useState(0);
  const { loggedInUserName } = useContext(AuthContext);

  const [proteinValues, setProteinValues] = useState([]);
  const [filteredProductArray, setFilteredProductArray] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);

  const calculateRequiredProtein = () => {
    if (requiredWeight !== "") {
      const weight = parseFloat(requiredWeight);
      const proteinPerKg = 0.8;
      const proteinAmount = weight * proteinPerKg;
      setRequiredProtein(proteinAmount);

      // Filter the proteinValues array based on requiredProtein
      const filteredProteinArray = proteinValues.filter(
        (productItem) => productItem.protein <= proteinAmount
      );
      console.log("Filtered Protein Array:", filteredProteinArray);

      // Filter the product array to have the same names as filteredProteinArray
      const filteredProductArray = product.filter((productItem) => {
        return filteredProteinArray.some(
          (filteredItem) => filteredItem.name === productItem.name
        );
      });
      setFilteredProductArray(filteredProductArray);
      console.log("Filtered product array:", filteredProductArray);
    }
  };

  useEffect(() => {
    const proteinArray = product.map((productItem) => ({
      name: productItem.name,
      protein: productItem.Protein,
    }));
    setProteinValues(proteinArray);
    // Sort the proteinArray in descending order based on the protein value
    proteinArray.sort((a, b) => b.protein - a.protein);

    setProteinValues(proteinArray);

    // Calculate the sum of all protein values
    const proteinSum = proteinArray.reduce(
      (sum, productItem) => sum + productItem.protein,
      0
    );

    // Filter the proteinArray to match the requiredProtein value
    let filteredProteinArray = [];
    if (proteinSum === requiredProtein) {
      filteredProteinArray = proteinArray;
    } else if (proteinSum > requiredProtein) {
      let sum = 0;
      filteredProteinArray = proteinArray.filter((productItem) => {
        if (sum < requiredProtein) {
          sum += productItem.protein;
          return true;
        }
        return false;
      });
    }

    // Filter the product array to have the same names as filteredProteinArray
    const filteredProductArray = product.filter((productItem) => {
      return filteredProteinArray.some(
        (filteredItem) => filteredItem.name === productItem.name
      );
    });
    setFilteredProductArray(filteredProductArray);

    console.log("Filtered product array:", filteredProductArray);
  }, [product, requiredProtein]);

  // const handleButtonClick = (name) => {
  //   // Toggle the clicked button state
  //   setFilteredProductArray((prevState) =>
  //     prevState.map((productItem) => {
  //       if (productItem.name === name) {
  //         return {
  //           ...productItem,
  //           clicked: !productItem.clicked,
  //         };
  //       }
  //       return productItem;
  //     })
  //   );
  // };

  // Function to handle button click
  const handleAddToCart = (productItem) => {
    addToCart(productItem);
    setClickedButtons((prevButtons) => [...prevButtons, productItem.id]);
  };

  return (
    <div className="combo-container">
      <h2 className="combo-h2">Protein Combo</h2>
      <div className="combo-header">
        <p>Calculate Required Protein:</p>
        <div className="weight-input">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={requiredWeight}
            onChange={(e) => setRequiredWeight(e.target.value)}
          />
        </div>
        <button className="calculate-button" onClick={calculateRequiredProtein}>
          Calculate
        </button>
        <p className="required-protein">Required Protein: {requiredProtein}g</p>
      </div>
      <h2 className="combo-h2">Filtered Products:</h2>
      <div className="filtered-products">
        {filteredProductArray.map((productItem) => (
          <div
            key={productItem.id}
            className={`product-item ${productItem.clicked ? "active" : ""}`}
          >
            <img src={productItem.url} alt="Product" />
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
            <p>Classification: {productItem.classification}</p>
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

      {/* <p className="logged-in-user">Logged in user: {loggedInUserName}</p> */}
    </div>
  );
};

export default Combo;
