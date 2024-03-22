import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/logUser";
import "./FeedBack.css";
import { useSelector } from "react-redux";
const FeedbackForm = ({ classification }) => {
  const [feedback, setFeedback] = useState("");
  const { loggedInUserName } = useContext(AuthContext);
  const orderData = useSelector((state) =>
    state.order.orderData.filter(
      (order) => order.allowedUser === loggedInUserName
    )
  );
  console.log("ooo", orderData);
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      classification,
      feedback,
      user: loggedInUserName,
    };

    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Feedback.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      console.log("Feedback submitted successfully!");
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="feedback-form">
      <h2>Feedback - {classification}</h2>
      <p>
        Hi {loggedInUserName}, we value your feedback for {classification}.
        Please share your thoughts:
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Enter your feedback here"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const FeedBack = () => {
  return (
    <div className="containerfeedback-">
      <h1 className="feedback-h1">Feedback</h1>
      <div className="feedback-classification-container">
        <FeedbackForm classification="Dairy" />
        <FeedbackForm classification="Meat" />
        <FeedbackForm classification="Food" />
      </div>
    </div>
  );
};

export default FeedBack;
