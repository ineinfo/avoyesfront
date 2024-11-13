"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // Importing the Slider component from React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./Carousal.css";
import Link from "next/link";

import defaultBImg from "../../public/blogdefault-img.png";
import { fetchBlogs } from "@/utils/api/BlogApi";
import { fetchTopBanner } from "@/utils/api/BannerApi";
import LoadingSpinner from "./Loading";

const CustomCarousel = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const result = await fetchBlogs();
      if (result.status) {
        setBlogs(result.data);
        console.error(result.message);
      }
    };

    getBlogs();
  }, []);





  const blogsettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div
      id="myCarousel "
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      <Slider {...blogsettings}>
        {blogs.map((blog) => (
          <div className="carousel-item" key={blog.id}>
            <div className="container">
              <div className="row align-items-center py-5">
                <div className="col-md-5 d-flex align-items-center justify-content-center">
                  <img
                    // src={blog.image_url || defaultBImg.src}
                    src={blog.image_url ? blog.image_url : defaultBImg.src}

                    className="d-block custom-carousel-img"
                    alt="Banner Image"
                    style={{ width: '80%', height: '670px', objectFit: 'cover' }}
                  />

                </div>
                <div className="col-md-7">
                  <div className="admin">
                    <p>{blog.author}</p>
                  </div>
                  <div className="banner-2-head">
                    <h1>{blog.title}</h1>
                  </div>
                  <div className="banner-2-para">
                    <p>{blog.short_description}</p>
                  </div>
                  <div className="shop-now-banner-btn">
                    <Link href={`/${blog.id}/blog-details`}>
                      <button className="btn btn-primary custom-btn">
                        READ MORE
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};



const MyCarousel = () => {
  const [bannerData, setBannerData] = useState([]);


  useEffect(() => {
    const getBannerData = async () => {
      const result = await fetchTopBanner();
      if (result.status) {
        setBannerData(result.data);
      } else {
        console.error(result.message);
      }
    };
    getBannerData();
  }, []);

  return (
    <section>
      <div
        id="myCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        style={{
          width: "100%",
          height: "700px",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <div className="carousel-inner" style={{ width: "100%", height: "100%", marginTop: "60px" }}>
          {bannerData.length > 0 ? (
            bannerData.map((banner, index) => (
              <div
                key={banner.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{ width: "100%", height: "100%" }}
              >
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-6 banner-text-padding">
                      <h6 className="sale-title">{banner.sub_title}</h6>
                      <h1 className="banner-head">{banner.title}</h1>
                      <div className="shop-now-banner-btn">
                        <Link href="/marketplace">
                          <button className="btn btn-primary custom-btn">SHOP NOW</button>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6 col-6">
                      <img
                        src={banner.image_url ? banner.image_url : '/banner-img.png'}
                        className="d-block w-100 banner-img"
                        alt="Banner Image"
                        style={{ width: "100%", height: "750px", marginTop: "0px ", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

const products = [
  {
    id: 1,
    image: "/market-place-5.png",
    label: "NEW",
    name: "Mesh Shirt",
    rating: 4.2,
    reviews: 120,
    price: "€45.00",
    oldPrice: "€50",
    discount: "-18%",
  },
  {
    id: 2,
    image: "/market-place-8.png",
    label: "SELL",
    name: "Mesh Shirt",
    rating: 4.2,
    reviews: 120,
    price: "€45.00",
    oldPrice: "€50",
    discount: "-18%",
  },
  {
    id: 3,
    image: "/market-place-7.png",
    name: "Mesh Shirt",
    rating: 4.2,
    reviews: 120,
    price: "€45.00",
    oldPrice: "€50",
    discount: "-18%",
  },
  {
    id: 4,
    image: "/market-place-6.png",
    name: "Mesh Shirt",
    rating: 4.2,
    reviews: 120,
    price: "€45.00",
    oldPrice: "€50",
    discount: "-18%",
  },
  {
    id: 5,
    image: "/market-place-8.png",
    label: "NEW",
    name: "Mesh Shirt",
    rating: 4.2,
    reviews: 120,
    price: "€45.00",
    oldPrice: "€50",
    discount: "-18%",
  },
];

const CustomCarouselFour = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow: <button className="slick-prev ">Prev</button>,
    nextArrow: <button className="slick-next">Next</button>,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="related-main py-5">
        <div className="container">
          <div className="head d-flex justify-content-between align-items-center">
            <div className="heading">
              <h1>
                <span>RELATED </span> Product
              </h1>
            </div>
          </div>
          <Slider {...settings} className="pt-4 related-product">
            {products.map((product) => (
              <div key={product.id} className="col-xl-3 market-slide">
                <div className="market-place-product">
                  <div className="img-wrapper">
                    <div className="img position-relative">
                      <img src={product.image} alt={product.name} />
                      {product.label && (
                        <div className="label position-absolute top-0 start-0 m-2 bg-white ">
                          <p
                            style={{
                              backgroundColor:
                                product.label == "NEW" ? "blue" : "black",
                              color: "white",
                              borderRadius: "5px",
                            }}
                            className="m-0 px-2 py-1"
                          >
                            {product.label}
                          </p>
                        </div>
                      )}
                      <div className="buttons">
                        <Link href="#" className="text-decoration-none">
                          QUICK VIEW{" "}
                          <i className="bi bi-eye ms-1 quick-icons"></i>
                        </Link>
                        <div className="border-line"></div>
                        <Link href="/cart" className="text-decoration-none">
                          QUICK SHOP
                          <i className="bi bi-handbag ms-1 quick-icons"></i>
                        </Link>
                      </div>
                      <div className="heart-icon">
                        <Link
                          href="/wishlist"
                          className="text-decoration-none text-dark"
                        >
                          <i className="fa-regular fa-heart"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="info d-flex justify-content-between align-items-center">
                    <div className="item">
                      <Link href="#" className="text-decoration-none">
                        <p className="m-0">{product.name}</p>
                      </Link>
                    </div>
                    <div className="rating d-flex align-items-center">
                      <div className="rate d-flex align-items-center">
                        <p className="m-0">{product.rating}</p>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="people">
                        <p className="m-0">{product.reviews}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pricing d-flex align-items-center">
                    <div className="price">
                      <p className="m-0">{product.price}</p>
                    </div>
                    <div className="checked-price px-3">
                      <span className="price-old">{product.oldPrice}</span>
                    </div>
                    <div className="offer-price">
                      <p className="m-0">{product.discount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export { CustomCarousel, MyCarousel, CustomCarouselFour };
