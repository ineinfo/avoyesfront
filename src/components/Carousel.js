"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // Importing the Slider component from React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../assets/css/responsive.css";
// import "../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./Carousal.css";
import Link from "next/link";

import defaultBImg from "../../public/blogdefault-img.png";
import { fetchBlogs } from "@/utils/api/BlogApi";
import { fetchTopBanner } from "@/utils/api/BannerApi";
import LoadingSpinner from "./Loading";
import fetchProducts from "@/utils/api/ProductApi";
import defaultImg from "../../public/defaultImg.jpg";
import { Grid } from "antd";

const { useBreakpoint } = Grid;


const CustomCarousel = () => {
  const [blogs, setBlogs] = useState([]);
  const screens = useBreakpoint();
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
                    src={blog.image_url ? blog.image_url : defaultBImg.src}
                    // src={defaultImg.src}


                    className="d-block custom-carousel-img"
                    alt="Banner Image"
                    style={{ width: '80%', height: screens.sm ? '670px' : "500px", objectFit: 'cover' }}
                  />

                </div>
                <div className="col-md-7">
                  <div className="admin">
                    <p>{blog.author}</p>
                  </div>
                  <div className="banner-2-head">
                    <h1 style={screens.sm ? {} : { fontSize: "30px", padding: "0" }}>{blog.title}</h1>
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



const MyCarouseld = () => {
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

  const carouselStyles = {
    width: "98%",
    height: window.innerWidth < 480 ? "250px" : window.innerWidth < 576 ? "350px" : window.innerWidth < 768 ? "500px" : "600px",
    overflow: "hidden",
    margin: "0 auto",
  };

  return (
    <section>
      <div
        id="myCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        style={carouselStyles}
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
                    {/* Text on left and image on right for small devices */}
                    <div className="col-md-6 col-6 banner-text-padding" style={{ marginTop: "-100px" }}>
                      <h6 className="sale-title">{banner.sub_title}</h6>
                      <h3 className="banner-head">{banner.title}</h3>
                      <div className="shop-now-banner-btn">
                        <Link href="/marketplace">
                          <button className="btn btn-primary custom-btn">SHOP NOW</button>
                        </Link>
                      </div>
                    </div>

                    {/* Image on right */}
                    <div className="col-md-6 col-6">
                      <img
                        src={banner.image_url ? banner.image_url : '/banner-img.png'}

                        className="d-block w-98 banner-img"
                        alt="Banner Image"
                        style={{ width: "85%", height: "550px", marginTop: "0px", objectFit: "cover" }}
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

const MyCarousel = () => {
  const screens = useBreakpoint();
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
      // style={{
      //   width: "100%",
      //   height: "700px",
      //   overflow: "hidden",
      //   margin: "0 auto",
      // }}
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
                    <div className="col-md-6 col-6 banner-text-padding" style={screens.sm ? {} : { paddingLeft: "0" }}>
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
                        // src={'/banner-img.png'}

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


  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      const result = await fetchProducts();
      if (result.status) {
        setProducts(result.data); // Ensure the response structure fits here
      } else {
        console.error(result.message);
      }
    };
    fetchProductData();
  }, []);
  const productsettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    prevArrow: <button className="slick-prev ">Prev</button>,
    nextArrow: <button className="slick-next">Next</button>,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <section>
      <div className="market-main py-5">
        <div className="container">
          <div className="head d-flex justify-content-between align-items-center">
            <div className="heading">
              <h1 style={
                screens.sm
                  ? {}
                  : {
                    display: "flex",
                    justifyContent: "left",
                    flexDirection: "column",
                  }
              }>
                <span>RELATED  </span> Product
              </h1>
            </div>
            {/* <div className="view-more-head">
            <Link href="/marketplace" className="text-decoration-none">
              View All <i className="fa-solid fa-arrow-right view-more-arrow"></i>
            </Link>
          </div> */}
          </div>
          <Slider {...productsettings} style={{ padding: '0 25px' }} className="pt-4">

            {products.map((product) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2 market-place-product"
                key={product.id}
                style={{
                  margin: '0 2px',
                  height: "500px",
                  display: "flex",
                  flexDirection: "column",
                  width: 'calc(15% - 100px)',

                }}
              >
                <div className="img-wrapper-market-slide" style={{ flex: 1 }}>
                  <div className="img">
                    <img

                      src={product.image_url || product.image_url1} alt={product.title}
                      // src={defaultImg.src} alt={product.title}

                      style={{ width: "100%", height: "350px", objectFit: "cover" }}
                    />
                    {product.label && (
                      <div
                        className="label"
                        style={{
                          position: "absolute",
                          top: "25px",
                          left: "30px",
                          backgroundColor: "blue",
                          color: "white",
                          padding: "5px 15px",
                          borderRadius: "5px",
                        }}
                      >
                        <p style={{ margin: 0 }}>{product.product_label}</p>
                      </div>
                    )}
                    <div className="heart-icon">
                      <a href="/wishlist" className="text-decoration-none text-dark" style={{ marginBottom: '20px' }}>
                        <i className="fa-regular fa-heart"></i>
                      </a>
                      <a href="/cart" className="text-decoration-none text-dark">
                        <i className="bi bi-handbag ms-1 quick-icons"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="info d-flex justify-content-between align-items-center">
                  <div className="item">
                    <Link href={`/${product.id}/productdetails`} className="text-decoration-none">


                      <p className="m-0">{product.title}</p>
                    </Link>
                  </div>
                  <div className="rating d-flex align-items-center">
                    <div className="rate d-flex align-items-center">
                      <p className="m-0">{product.ratings}</p>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <div className="people">
                      <p className="m-0">{product.reviews}</p>
                    </div>
                  </div>
                </div>
                <div className="pricing d-flex align-items-center">
                  <div className="price">
                    <p className="m-0">€{product.discount_amount}</p>
                  </div>
                  <div className="checked-price px-3">
                    <span className="price-old">€{product.amount}</span>
                  </div>
                  <div className="offer-price">
                    <p className="m-0">{product.discount_amount}</p>
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
