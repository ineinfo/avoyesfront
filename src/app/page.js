"use client";
import { useEffect } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/responsive.css";
import "../assets/css/responsive.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Ensure Bootstrap and other libraries are available
import "bootstrap/dist/css/bootstrap.min.css";
import { CustomCarousel, MyCarousel } from "@/components/Carousel";
import Link from "next/link";

export default function CustomComponent() {
  useEffect(() => {
    // Search input functionality
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          const query = this.value.trim();
          if (query) {
            window.location.href = `/marketplace?query=${encodeURIComponent(
              query
            )}`;
          }
        }
      });
    }

    // Header search icon popup
    const searchIcon = document.getElementById("search-icon");
    const searchPopup = document.getElementById("search-popup");
    const closePopup = document.getElementById("close-popup");

    if (searchIcon && searchPopup && closePopup) {
      searchIcon.addEventListener("click", function (event) {
        event.preventDefault();
        searchPopup.style.display = "block";
      });

      closePopup.addEventListener("click", function () {
        searchPopup.style.display = "none";
      });

      window.addEventListener("click", function (event) {
        if (event.target === searchPopup) {
          searchPopup.style.display = "none";
        }
      });
    }

    // Dropdown sorting
    document
      .querySelectorAll(".drp-showing-option")
      .forEach(function (element) {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const selectedValue = this.getAttribute("data-value");
          document.getElementById("showingOption").innerText = selectedValue;
        });
      });

    document
      .querySelectorAll(".drp-sorting-option")
      .forEach(function (element) {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const selectedText = this.innerText;
          document.getElementById("sortingOption").innerText = selectedText;
        });
      });

    // Product image change functionality
    const mainImage = document.getElementById("mainImage");
    if (mainImage) {
      mainImage.addEventListener("mousemove", function (event) {
        const zoomBox = document.getElementById("zoomBox");
        const zoomLevel = 2.5;
        const rect = mainImage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const backgroundPosX = (x / mainImage.offsetWidth) * 100;
        const backgroundPosY = (y / mainImage.offsetHeight) * 100;

        if (zoomBox) {
          zoomBox.style.backgroundImage = `url(${mainImage.src})`;
          zoomBox.style.backgroundPosition = `${backgroundPosX}% ${backgroundPosY}%`;
          zoomBox.style.display = "block";
        }
      });

      mainImage.addEventListener("mouseleave", function () {
        const zoomBox = document.getElementById("zoomBox");
        if (zoomBox) {
          zoomBox.style.display = "none";
        }
      });
    }

    // Quantity increment/decrement buttons
    $(".qty-btn-plus").click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      $n.val(Number($n.val()) + 1);
    });

    $(".qty-btn-minus").click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      var amount = Number($n.val());
      if (amount > 0) {
        $n.val(amount - 1);
      }
    });

    // Choose color box effect
    document.querySelectorAll(".choose-color-boxes a").forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll(".choose-color-boxes div").forEach((box) => {
          box.classNameList.remove("selected-color");
        });
        this.querySelector("div").classNameList.add("selected-color");
      });
    });

    // Star rating functionality
    const starRating = document.querySelectorAll(".star-rating .fa");
    const setRatingStar = function () {
      starRating.forEach(function (star) {
        const ratingValue =
          star.parentElement.querySelector("input.rating-value").value;
        const rating = parseInt(star.getAttribute("data-rating"));
        if (parseInt(ratingValue) >= rating) {
          star.classNameList.remove("fa-star-o");
          star.classNameList.add("fa-star");
        } else {
          star.classNameList.remove("fa-star");
          star.classNameList.add("fa-star-o");
        }
      });
    };
    starRating.forEach(function (star) {
      star.addEventListener("click", function () {
        const ratingValue =
          star.parentElement.querySelector("input.rating-value");
        ratingValue.value = star.getAttribute("data-rating");
        setRatingStar();
      });
    });
    setRatingStar();
  }, []); // Empty dependency array ensures this runs once on component mount

  const products = [
    {
      id: 1,
      imgSrc: "/market-place-4.png",
      label: "NEW",
      title: "Mesh Shirt",
      rating: 4.2,
      reviews: 120,
      price: "€45.00",
      oldPrice: "€50",
      discount: "-18%",
      href: "/productdetails",
    },
    {
      id: 2,
      imgSrc: "/market-place-3.png",
      label: "SELL",
      title: "Mesh Shirt",
      rating: 4.2,
      reviews: 120,
      price: "€45.00",
      oldPrice: "€50",
      discount: "-18%",
      href: "/productdetails",
    },
    {
      id: 3,
      imgSrc: "/market-place-2.png",
      title: "Mesh Shirt",
      rating: 4.2,
      reviews: 120,
      price: "€45.00",
      oldPrice: "€50",
      discount: "-18%",
      href: "/productdetails",
    },
    {
      id: 4,
      imgSrc: "/market-place-1.png",
      title: "Mesh Shirt",
      rating: 4.2,
      reviews: 120,
      price: "€45.00",
      oldPrice: "€50",
      discount: "-18%",
      href: "/productdetails",
    },
    // {
    //   id: 5,
    //   imgSrc: "/market-place-3.png",
    //   label: "NEW",
    //   title: "Mesh Shirt",
    //   rating: 4.2,
    //   reviews: 120,
    //   price: "€45.00",
    //   oldPrice: "€50",
    //   discount: "-18%",
    //   href: "Product-details"
    // },
  ];

  const communities = [
    {
      name: "Fashionistas Unite",
      followers: "12,300 Followers",
      img: "/top-community-1.png",
    },
    {
      name: "Chic Collective",
      followers: "12,300 Followers",
      img: "/top-community-2.png",
    },
    {
      name: "Fashionistas Unite",
      followers: "12,300 Followers",
      img: "/top-community-3.png",
    },
    {
      name: "Style Seekers",
      followers: "12,300 Followers",
      img: "/top-community-4.png",
    },
    {
      name: "Glam Squad",
      followers: "12,300 Followers",
      img: "/top-community-5.png",
    },
    {
      name: "Trendsetters",
      followers: "12,300 Followers",
      img: "/top-community-6.png",
    },
    {
      name: "Couture Clique",
      followers: "12,300 Followers",
      img: "/top-community-7.png",
    },
  ];

  return (
    <div id="home">

      <section>
        <div className="top-menu-main py-3">
          <div className="container py-4">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="col-custom">
                <Link href="/marketplace" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/dress.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Market Place</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom">
                <Link href="/map" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/location.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Map</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom">
                <Link href="/event" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/calendar.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Event</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom">
                <Link href="/activity" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/puzzle.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Activity</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom">
                <Link href="/foodie" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/fork.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Foodie</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom">
                <Link href="/challanges" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/goal.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Challanges</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom">
                <Link href="/community" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/community-engagement.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Community</p>
                    </div>
                  </div>
                </Link>
              </div>
              {/* <div className="col-custom">
                <Link href="/categories" className="text-decoration-none pt-1">
                  <div className="menu-1 pt-2">
                    <div className="icon  pt-3">
                      <i
                        className="fa-solid fa-arrow-right view-more-arrow"></i>
                    </div>
                    <div className="text pt-3">
                      <p>View More</p>
                    </div>
                  </div>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <MyCarousel />
      <section>
        <div className="tranding-section">
          <div className="container">
            <div className="head d-flex justify-content-between align-items-center">
              <div className="heading">
                <h1>
                  <span>Trending </span> Events
                </h1>
              </div>
              <div className="view-more-head">
                <Link href="/event-list" className="text-decoration-none">
                  View All{" "}
                  <i className="fa-solid fa-arrow-right view-more-arrow"></i>
                </Link>
              </div>
            </div>
            <div className="d-flex overflow-auto">
              {" "}
              {/* Flex container for horizontal layout */}
              {[1, 2, 3].map((event, index) => (
                <div
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2"
                  key={index}
                >
                  {" "}
                  {/* Padding for spacing */}
                  <div className="trend-1 pt-4">
                    <div className="img">
                      <img
                        src={`/trend-img-${event}.png`}
                        alt={`Event ${event}`}
                        className="img-fluid"
                      />{" "}
                      {/* Ensure responsiveness */}
                      <div className="icon">
                        <Link href="#">
                          <i className="fa-regular fa-heart"></i>
                        </Link>{" "}
                      </div>
                    </div>
                    <div className="trand-text-box">
                      <div className="date-box" style={{ zIndex: "1" }}>
                        <div className="date">
                          <h3>28</h3>
                        </div>
                        <div className="year">
                          <p>June 2024</p>
                        </div>
                      </div>
                      <div className="trand-head">
                        <Link href="#" className="text-decoration-none">
                          <h6>Indonesia - Korea conference</h6>
                        </Link>{" "}
                      </div>
                      <div className="trand-para d-flex justify-content-between align-items-center">
                        <div className="para">
                          <p className="m-0">
                            Long established fact that a reader will be
                            distracted by the readable content.
                          </p>
                        </div>
                        <div className="icon">
                          <Link href="#" className="text-decoration-none">
                            <i className="fa-solid fa-arrow-right trand-arrow"></i>
                          </Link>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="main-community">
          <div className="container pb-5">
            <div className="head d-flex justify-content-between align-items-center">
              <div className="heading">
                <h1>
                  <span>TOP </span> Communities
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-9 col-lg-9">
                <div className="video-box pt-5">
                  <div className="video-container">
                    <video controls>
                      <source src="/video-1.mp4" type="video/mp4" />
                    </video>
                    <div className="overlay"></div>
                    <div className="img">
                      <img src="/play.png" alt="Play" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 pt-5">
                <div className="top-community-member">
                  <div className="head">
                    <h3>Top Communities</h3>
                  </div>
                  {communities.map((community, index) => (
                    <Link href="#" className="text-decoration-none" key={index}>
                      <div className="community-member-1 d-flex align-items-center pb-3">
                        <div className="img">
                          <img src={community.img} alt={community.name} />
                        </div>
                        <div className="info">
                          <h5 className="m-0">{community.name}</h5>
                          <p className="m-0">{community.followers}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="see-more-link">
                    <Link href="#" className="text-decoration-none">See More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <div className="market-main py-5">
          <div className="container">
            <div className="head d-flex justify-content-between align-items-center">
              <div className="heading">
                <h1>
                  <span>MARKET </span> Place
                </h1>
              </div>
              <div className="view-more-head">
                <Link href="/marketplace" className="text-decoration-none">
                  View All{" "}
                  <i className="fa-solid fa-arrow-right view-more-arrow"></i>
                </Link>
              </div>
            </div>
            <div className="row pt-4 market-place d-flex flex-nowrap overflow-auto">
              {products.map((product) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4"
                  key={product.id}
                  style={{ height: "500px" }} // Adjust height as needed
                >
                  <div
                    className="market-place-product"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }} // Ensure it takes full height
                  >
                    <div className="img-wrapper" style={{ flex: 1 }}>
                      <div className="img">
                        <img
                          src={product.imgSrc}
                          alt={product.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }} // Maintain aspect ratio
                        />
                        {product.label && (
                          <div
                            className="label"
                            style={{
                              position: "absolute",
                              zIndex: 20,
                              top: "25px",
                              left: "30px",
                              backgroundColor: "blue",
                              margin: "auto",
                              color: "white",
                              padding: "5px 15px",
                              borderRadius: "5px",
                            }}
                          >
                            <p style={{ margin: 0 }}>{product.label}</p>
                          </div>
                        )}
                        {/* <div className="buttons">
                          <Link href="#" className="text-decoration-none">QUICK VIEW <i className="bi bi-eye ms-1 quick-icons"></i></Link>                          <div className="border-line"></div>
                          <Link href="cart" className="text-decoration-none">QUICK SHOP <i className="bi bi-handbag ms-1 quick-icons"></i></Link>                        </div> */}
                        <div className="heart-icon">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            {" "}
                            <Link
                              href="/wishlist"
                              className="text-decoration-none text-dark"
                            >
                              <i className="fa-regular fa-heart"></i>
                            </Link>{" "}
                            <i className="bi bi-handbag ms-1 quick-icons"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="info d-flex justify-content-between align-items-center">
                      <div className="item">
                        <Link
                          href={product.href}
                          className="text-decoration-none"
                        >
                          <p className="m-0">{product.title}</p>
                        </Link>{" "}
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
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="products-banner py-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-md-3 p-0">
                <div className="product-bg-img-1">
                  <img src="/bagpack.png" alt="" />
                  <div className="text">
                    <h3>LATEST BACK PACK</h3>
                    <div className="view-more-btn">
                      <Link href="/marketplace" className="text-decoration-none">
                        VIEW MORE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 p-0">
                <div className="product-bg-img-2">
                  <img src="/shirt.png" alt="" />
                  <div className="text">
                    <h3>
                      WOMEN'S <br /> BLACK DOTTED TISHIRT
                    </h3>
                    <div className="view-more-btn">
                      <Link href="/marketplace" className="text-decoration-none">
                        VIEW MORE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-3 p-0">
                <div className="product-bg-img-3">
                  <img src="/gogals.png" alt="" />
                  <div className="text">
                    <h3>LATEST SUNGLASS</h3>
                    <div className="view-more-btn">
                      <Link href="/marketplace" className="text-decoration-none">
                        VIEW MORE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="main-blog py-5">
          <div className="container">
            <div className="head d-flex justify-content-between align-items-center">
              <div className="heading">
                <h1>
                  <span>LATEST </span> Blog
                </h1>
              </div>
              <div className="view-more-head">
                <Link href="/srcblog" className="text-decoration-none">
                  View All{" "}
                  <i className="fa-solid fa-arrow-right view-more-arrow"></i>
                </Link>
              </div>
            </div>
            <CustomCarousel />
          </div>
        </div>
      </section>


    </div>
  );
}
