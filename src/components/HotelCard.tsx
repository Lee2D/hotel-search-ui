import React from 'react';
import { Hotel } from '../interfaces/Interfaces';
import { Carousel } from 'antd';
import styles from '../styles/HotelCard.module.css';
import StarIcon from '@mui/icons-material/Star';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className={styles.hotelCard}>
      <h2>{hotel.name}</h2>
      <div className={styles.starRating}>
        {Array.from({ length: hotel.stars }, (_, i) => (
          <StarIcon key={i} className={styles.star} />
        ))}
      </div>
      <p>{hotel.city}</p>
      <p>{hotel.address}</p>

      <div className={styles.carouselWrapper}>
        <Carousel  autoplay autoplaySpeed={4000}>
          {(hotel.photos ?? []).map((photo, index) => (
            <div key={index}>
              <img className={styles.carouselImage} src={photo.url as string} alt={`Image ${index + 1} of ${hotel.name}`} />
            </div>
          ))}
        </Carousel>
      </div>

      <ul className={styles.roomCombinations}>
        {(hotel.combinations ?? []).map((combination, index) => (
          <li key={index}>
            {Object.entries(combination.roomTypeCounts).map(([roomType, count]) => (
              <span key={roomType}>{roomType}: {count}; </span>
            ))} - ${combination.totalPrice} total price
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelCard;
