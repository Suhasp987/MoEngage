import React, { useState, useEffect } from "react";
import axios from "axios";
import StarReview from "../../components/StarReview";
import { FaStar } from "react-icons/fa";

const ReviewSection = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
 
  const [overallRating, setOverallRating] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(() => {
    const savedState = localStorage.getItem(`isButtonEnabled-${id}`);
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem(`isButtonEnabled-${id}`, JSON.stringify(isButtonEnabled));
  }, [isButtonEnabled, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${id}`
        );
        setReviews(reviewsResponse.data.reviews);
        setOverallRating(reviewsResponse.data.overallRating);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = async () => {
    setIsButtonEnabled(true);
    setReviews([...reviews, { review: newReview, rated: rating }]);
    const token = `bearer ${localStorage.getItem("token")}`;
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
        newReview,
        rating,
        id,
        token,
      });
      console.log("Review submitted successfully");
    } catch (error) {
      console.log("Error submitting review", error);
    }
    setNewReview("");
  };

  const handleRating = (selectedRating) => {
    console.log(selectedRating)
    setRating(selectedRating);
  };

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index}>
          <span style={{ fontWeight: "bold" }}>{review.owner}</span>
          <br />
          {review.review}
          <br />
          {review.rated}
          <FaStar size={16} color="#FFD700" />
        </div>
      ))}
      <StarReview onRate={handleRating} />
      <br />
      {!isButtonEnabled && (
        <>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Add your review..."
            style={{ width: "100%", height: "60px" }}
          />
          <button onClick={handleReviewSubmit} style={{ float: "right", width: "150px" }}>
            Submit Review
          </button>
        </>
      )}
    </div>
  );
};

export default ReviewSection;
