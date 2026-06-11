import React, { useState, useEffect } from "react";
import "./carousel.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  const fetchImages = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=5`);
    const json = await res.json();
    setImages(json?.products || []);
    setCurrent(0); // start from first image
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (images.length === 0) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="inner-container">
        <button onClick={prevSlide} className="left-btn">
          Left
        </button>

        <img
          src={images[current].thumbnail}
          alt={images[current].title}
        />

        <button onClick={nextSlide} className="right-btn">
          Right
        </button>
      </div>
    </div>
  );
}
