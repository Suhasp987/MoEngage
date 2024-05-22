import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarReview = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (selectedRating) => {
    setRating(selectedRating);
    if (onRate) {
      onRate(selectedRating);
    }
  };

  return (
    <StarContainer>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            size={24}
            color={starValue <= rating ? '#FFD700' : '#C0C0C0'}
            onClick={() => handleClick(starValue)}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StarReview;
