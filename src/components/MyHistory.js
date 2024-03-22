import React, { useEffect, useState, useContext } from "react";
import "./myHistory.css";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/logUser";

const History = () => {
  const { loggedInUserName } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const orderData = useSelector((state) => state.order.orderData);
  console.log("orderData history:", orderData);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filter the orderData based on loggedInUserName and sort by orderDate in descending order
  const filteredOrderData = orderData
    .filter((order) => order.allowedUser === loggedInUserName)
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  return (
    <div className="history-container">
      <h2 className="history-title">Order History</h2>
      <div className="history-order-list">
        {filteredOrderData && filteredOrderData.length > 0 ? (
          filteredOrderData.map((order) => (
            <div className="history-order-item" key={order.id}>
              <div className="history-order-info">
                <h3 className="history-order-name">{order.name}</h3>
                <p className="history-order-date">
                  Order Date: {order.orderDate}
                </p>
              </div>
              <div className="history-product-list">
                <h4 className="history-product-title">Products:</h4>
                <ol className="history-product-items">
                  {order.productNames.map((productName, index) => (
                    <li className="history-product-item" key={index}>
                      {productName}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="history-order-total">
                Total Price: {order.totalPrice}
              </p>
            </div>
          ))
        ) : (
          <p>No order history found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
