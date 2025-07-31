import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { fetchFeaturedProducts, fetchTestimonials } from '../api,js';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const products = await fetchFeaturedProducts();
      setFeatured(products);
    };

    fetchFeatured();
  }, []);

  useEffect(() => {
    const getTestimonials = async () => {
      const data = await fetchTestimonials();
      setTestimonials(data);
    };

    getTestimonials();
  }, []);

  return (
    <div className="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center px-4">
      <h3 className="text-center mt-3">Welcome to Shaq's Tech Gadgets E-Commerce Site</h3>
      <h4 className="p-3">
        Tech Marvels Await You! Elevate Your Lifestyle With The Latest Gadgets And Gizmos
      </h4>

      {/* 🚀 Featured Carousel */}
      <div className="container mt-4 mb-4">
        <h3 className="mb-3 text-center">🔥 Featured Picks</h3>
       {featured.length > 0 ? (
        <Carousel indicators={false} controls={true} interval={3000}>
          {featured.map((product) => (
            <Carousel.Item key={product.id}>
           <Link to={`/productDetails/${product.id}`} className="text-decoration-none text-white">
           <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="d-block"
                  style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                />
                <h6 className="mt-3 fw-bold">{product.title}</h6>
                <p>${product.price}</p>
              </div>
            </Link>
            </Carousel.Item>
          ))}
        </Carousel>) : (
          <p className='text-center fw-bold mt-5'>Loading products... </p>)}
      </div>

      <h4 className="text-center fw-bold my-3">What Our Customers Say</h4>
      {/* Mobile Carousel */}
      <div className="d-lg-none">
        <div id="testmonialsCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {testimonials.length > 0 ? (
      testimonials.map((t, i) => (
      <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
        <div className="d-flex border p-3 rounded bg-light h-100 shadow-sm justify-content-center">
          <div className="">
            <img src={t.image} alt={t.name} className="rounded-circle me-3" width="50" height="50" />
            <h6 className="mb-0">{t.name}</h6>
          </div>
          <p className="text-muted fst-italic">"{t.quote}"</p>
        </div>
      </div>
      )) ) : (
      <p className='text-center fw-bold'>Loading testimonials... </p>)}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#testmonialsCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testmonialsCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="container my-5">
  <div className="d-none d-lg-flex row g-4">
    {testimonials.length > 0 ? (
      testimonials.map((t, i) => (
      <div key={i} className="col-md-4">
        <div className="border p-3 rounded bg-light h-100 shadow-sm">
          <div className="d-flex align-items-center mb-3">
            <img src={t.image} alt={t.name} className="rounded-circle me-3" width="50" height="50" />
            <h6 className="mb-0">{t.name}</h6>
          </div>
          <p className="text-muted fst-italic">"{t.quote}"</p>
        </div>
      </div>
    )) ) : (
      <p className='text-center fw-bold'>Loading testimonials... </p>)}
  </div>
</div>

<p className="p-3 fs-5">
        Dive into a world of smart solutions and futuristic finds. <br />
        Explore the latest in tech; curated, sleek, and ready to power your life.
        From smart gadgets to everyday essentials, we bring innovation to your fingertips.
      </p>
      <Link to="/productsList" className="cta btn btn-dark text-white fw-bold mx-3 mb-5">
        🚀 Shop Now
      </Link>
    </div>
  );
}