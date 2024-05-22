import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarReview from "../../components/StarReview";
import { FaStar } from "react-icons/fa";
import "./DetailsPage.css"

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        setDetails(response.data);
        // Fetching reviews from backend using the brewery id (id)
        const reviewsResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${id}`
        );
        console.log(reviewsResponse);
        setReviews(reviewsResponse.data.reviews);
        setOverallRating(reviewsResponse.data.overallRating);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id,newReview]);

  const handleReviewSubmit = async () => {
    setReviews([...reviews, newReview]);
    const token = `bearer ${localStorage.getItem("token")}`;
    console.log(rating);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
        newReview,
        rating,
        id: details.id,
        token,
      })
      .then((res) => {
        console.log("success on review");
      })
      .catch((err) => {
        console.log("error in HandleReviewSubmit");
      });
    setNewReview("");
  };
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };
  return (
    <div
      className="details-container"
    >
      <div className="details-left">
        <h2>{details.name}</h2>
        <p>
          <span style={{ fontWeight: "600" }}>Current Rating: </span>
          {overallRating}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Brewery Address: </span>
          {details.address_1}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Brewery Type: </span>
          {details.brewery_type}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Phone No: </span>
          {details.phone}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>City: </span>
          {details.city}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>State Province: </span>
          {details.state_province}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>State: </span>
          {details.state}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Postal Code: </span>
          {details.postal_code}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Country: </span>
          {details.country}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Website: </span>
          {details.website_url}
        </p>
      </div>
      <div className="details-right">
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
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Add your review..."
          style={{ width: "100%", height: "60px" }}
        />
        <button onClick={handleReviewSubmit} style={{ float: 'right', width: '150px' }}>Submit Review</button>

      </div>
    </div>
  );
};

export default DetailsPage;
