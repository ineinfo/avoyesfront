"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick"; // Importing the Slider component from React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./Carousal.css"; // Assuming your CSS is in Carousel.css
import Link from "next/link";
import foodieBanner from "../../public/foodie-banner.png";
import { fetchFoodTypes } from "@/utils/api/FoodieApi";
import { Grid } from "antd";

const CustomCarousel = () => {
  return (
    <div
      id="myCarousel "
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container">
            <div className="row align-items-center py-5">
              <div className="col-md-5 d-flex align-items-center justify-content-center">
                <img
                  src="/blog-img.png"
                  className="d-block custom-carousel-img"
                  alt="Banner Image"
                />
              </div>
              <div className="col-md-7">
                <div className="admin">
                  <p>By Admin</p>
                </div>
                <div className="banner-2-head">
                  <h1>
                    ELASTICIZED DRASTRING WAIDTBAND. SIDE POCKET WITH ZIP.
                  </h1>
                </div>
                <div className="banner-2-para">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry...
                  </p>
                </div>
                <div className="shop-now-banner-btn">
                  <Link href="blog-details">
                    <button className="btn btn-primary custom-btn">
                      READ MORE
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="container">
            <div className="row align-items-center py-5">
              <div className="col-md-5 d-flex align-items-center justify-content-center">
                <img
                  src="/blog-img.png"
                  className="d-block custom-carousel-img"
                  alt="Banner Image"
                />
              </div>
              <div className="col-md-7">
                <div className="admin">
                  <p>By Admin</p>
                </div>
                <div className="banner-2-head">
                  <h1>
                    ELASTICIZED DRASTRING WAIDTBAND. SIDE POCKET WITH ZIP.
                  </h1>
                </div>
                <div className="banner-2-para">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry...
                  </p>
                </div>
                <div className="shop-now-banner-btn">
                  <Link href="blog-details">
                    <button className="btn btn-primary custom-btn">
                      READ MORE
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="container">
            <div className="row align-items-center py-5">
              <div className="col-md-5 d-flex align-items-center justify-content-center">
                <img
                  src="/blog-img.png"
                  className="d-block custom-carousel-img"
                  alt="Banner Image"
                />
              </div>
              <div className="col-md-7">
                <div className="admin">
                  <p>By Admin</p>
                </div>
                <div className="banner-2-head">
                  <h1>
                    ELASTICIZED DRASTRING WAIDTBAND. SIDE POCKET WITH ZIP.
                  </h1>
                </div>
                <div className="banner-2-para">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry...
                  </p>
                </div>
                <div className="shop-now-banner-btn">
                  <Link href="blog-details">
                    <button className="btn btn-primary custom-btn">
                      READ MORE
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const MyCarousel = () => {
//   return (
//     <section>
//       <div
//         id="myCarousel"
//         className="carousel slide"
//         data-bs-ride="carousel"
//         data-bs-interval="2000"
//       >
//         <div className="carousel-inner">
//           {/* First carousel item */}
//           <div className="carousel-item active">
//             <div className="container">
//               <div className="row align-items-center">
//                 <div className="col-md-6 col-6 banner-text-padding">
//                   <h6 className="sale-title">SALE UP TO 50% OFF</h6>
//                   <h1 className="banner-head">Fashion For Every Occasion</h1>
//                   <div className="shop-now-banner-btn">
//                     <Link href="/marketplace">
//                       <button className="btn btn-primary custom-btn">
//                         SHOP NOW
//                       </button>
//                     </Link>{" "}
//                   </div>
//                 </div>
//                 <div className="col-md-6 col-6">
//                   <img
//                     src="banner-img.png"
//                     className="d-block w-100 banner-img"
//                     alt="Image 1"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Repeat similar structure for other carousel items */}
//           <div className="carousel-item">
//             <div className="container">
//               <div className="row align-items-center">
//                 <div className="col-md-6 col-6 banner-text-padding">
//                   <h6 className="sale-title">SALE UP TO 50% OFF</h6>
//                   <h1 className="banner-head">Fashion For Every Occasion</h1>
//                   <div className="shop-now-banner-btn">
//                     <Link href="/marketplace">
//                       <button className="btn btn-primary custom-btn">
//                         SHOP NOW
//                       </button>
//                     </Link>{" "}
//                   </div>
//                 </div>
//                 <div className="col-md-6 col-6">
//                   <img
//                     src="banner-img.png"
//                     className="d-block w-100 banner-img"
//                     alt="Image 2"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <div className="container">
//               <div className="row align-items-center">
//                 <div className="col-md-6 col-6 banner-text-padding">
//                   <h6 className="sale-title">SALE UP TO 50% OFF</h6>
//                   <h1 className="banner-head">Fashion For Every Occasion</h1>
//                   <div className="shop-now-banner-btn">
//                     <Link href="/marketplace">
//                       {/* <button style={{
//                                                 background: 'linear-gradient(to right, blue 50%, black 50%)',
//                                                 backgroundSize: '200% 100%',
//                                                 backgroundPosition: 'right bottom',
//                                                 color: 'white',
//                                                 padding: '10px 20px',
//                                                 border: 'none',
//                                                 cursor: 'pointer',
//                                                 transition: 'background-position 0.5s ease',
//                                                 fontSize: '16px',
//                                                 borderRadius: '5px',
//                                             }}
//                                                 onMouseEnter={(e) => (e.target.style.backgroundPosition = 'left bottom')}
//                                                 onMouseLeave={(e) => (e.target.style.backgroundPosition = 'right bottom')}>SHOP NOW</button> */}
//                       <button className="btn btn-primary custom-btn">
//                         SHOP NOW
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="col-md-6 col-6">
//                   <img
//                     src="banner-img.png"
//                     className="d-block w-100 banner-img"
//                     alt="Image 3"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#myCarousel"
//           data-bs-slide="prev"
//         >
//           <i className="fa fa-chevron-left" aria-hidden="true"></i>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#myCarousel"
//           data-bs-slide="next"
//         >
//           <i className="fa fa-chevron-right" aria-hidden="true"></i>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </section>
//   );
// };

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

const { useBreakpoint } = Grid;

const CustomCarouselSix = () => {
  const screens = useBreakpoint();


  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const getFoodTypes = async () => {
      const data = await fetchFoodTypes();
      setFoodItems(data);
    };
    getFoodTypes();
  }, []);


  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
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
          slidesToScroll: 1,  // Make sure you scroll 1 slide at a time
          centerMode: true,    // To center slides and avoid excessive spacing
          centerPadding: "0",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="related-main py-5">
        <div className="container">
          <div className="head d-flex justify-content-between align-items-center"></div>
          <Slider
            {...settings}
            className="pt-4 related-product"
          // style={{ minWidth: "99vw", marginLeft: "-295px" }}
          >
            {foodItems.map((item) => (
              <div key={item.id} className="col-xl-3 market-slide item">
                <div className="market-place-product">
                  <div className="img-wrapper" style={{ marginLeft: screens.sm ? "" : "280px" }}>
                    <div className="img position-relative">
                      <img
                        // src={
                        //   item.image_url ||
                        //   "http://38.108.127.253:3000/uploads/food-place/1731303887667-814340589.png"
                        // }
                        src={foodieBanner.src}
                        alt={item.title}
                        style={{ width: "450px", height: "380px", objectFit: "cover" }}
                      />

                      <div className="hover-effect">
                        <h3
                          className={`hover-effect-${Math.floor(Math.random() * 7) + 1
                            }`}
                        >
                          {item.title}
                        </h3>
                      </div>

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

export { CustomCarousel, CustomCarouselFour, CustomCarouselSix };
