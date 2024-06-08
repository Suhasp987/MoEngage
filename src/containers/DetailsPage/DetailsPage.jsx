import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewSection from "./ReviewSection";
import "./DetailsPage.css"

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData1 = async () => {
      try {
        const reviewsResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${id}`
        );
       
        setOverallRating(reviewsResponse.data.overallRating);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData();
    fetchData1();
  }, [id]);

  return (
    <div className="details-container">
      <div className="details-left">
        <h2>{details.name}</h2>
        <h3>Overall Rating {overallRating}</h3>
        <p><span style={{ fontWeight: "600" }}>Brewery Address: </span>{details.address_1}</p>
        <p><span style={{ fontWeight: "600" }}>Brewery Type: </span>{details.brewery_type}</p>
        <p><span style={{ fontWeight: "600" }}>Phone No: </span>{details.phone}</p>
        <p><span style={{ fontWeight: "600" }}>City: </span>{details.city}</p>
        <p><span style={{ fontWeight: "600" }}>State Province: </span>{details.state_province}</p>
        <p><span style={{ fontWeight: "600" }}>State: </span>{details.state}</p>
        <p><span style={{ fontWeight: "600" }}>Postal Code: </span>{details.postal_code}</p>
        <p><span style={{ fontWeight: "600" }}>Country: </span>{details.country}</p>
        <p><span style={{ fontWeight: "600" }}>Website: </span>{details.website_url}</p>
      </div>
      <div className="details-right">
        <ReviewSection id={id} />
      </div>
    </div>
  );
};

export default DetailsPage;
