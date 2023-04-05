import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Hotel } from '../interfaces/Interfaces';
import HotelCard from '../components/HotelCard';
import { Slider, Pagination } from 'antd';
import styles from '../styles/Home.module.css';
import { fetchCities, fetchHotels } from '../services/hotelService';

const Home: React.FC = () => {
  const [guests, setGuests] = useState(1);
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    loadCities();
  }, []);

  async function loadCities() {
    const cities = await fetchCities();
    setCities(cities);
  }

  async function loadHotels() {
    setIsLoading(true);
    const hotels = await fetchHotels({ numGuests: guests, city, minPrice, maxPrice });
    setHotels(hotels);
    setIsLoading(false);
    setSearched(true);
    setCurrentPage(1);
  }

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  const displayHotels = hotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hotel Search</title>
        <meta name="description" content="Search for hotels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hotel Search</h1>

        <div className={styles.searchInputs}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="city">City:</label>
            <select
              className={styles.input}
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}>
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="guests">Number of guests:</label>
            <input
              className={styles.input}
              type="number"
              id="guests"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="priceRange">Price range:</label>
            <Slider
              id="priceRange"
              range
              defaultValue={[minPrice, maxPrice]}
              min={0}
              max={500}
              onChange={(values: [number, number]) => {
                setMinPrice(values[0]);
                setMaxPrice(values[1]);
              }}
            />
          </div>
        </div>

        <button className={styles.button} onClick={() => loadHotels()}>
          Search
        </button>

        {isLoading && <p>Loading hotels...</p>}

        {!isLoading && hotels.length === 0 && searched && (
          <p>No suitable rooms found.</p>
        )}

        {hotels.length > 0 && (
          <div className={styles.hotelList}>
            {displayHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}

        {hotels.length > 0 && (
          <Pagination
            className={styles.pagination}
            current={currentPage}
            pageSize={itemsPerPage}
            total={hotels.length}
            onChange={onPageChange}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
