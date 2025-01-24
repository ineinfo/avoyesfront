"use client";

import { useEffect, useState } from "react";
import $ from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultImg from "../../public/home-decor.png";
import defaultPImg from "../../public/defaultImg.jpg";
import fetchProducts from "@/utils/api/ProductApi";
import { fetchBanner } from "@/utils/api/BannerApi";



import "../assets/css/responsive.css";
import "../assets/css/responsive.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchEventsFeatured } from "@/utils/api/EventApi";

import "bootstrap/dist/css/bootstrap.min.css";
import { CustomCarousel, MyCarousel } from "@/components/Carousel";
import Link from "next/link";
import axios from "axios";
import { Grid } from "antd";

const { useBreakpoint } = Grid

export default function CustomComponent() {

    const [events, setEvents] = useState([]);
    const [products, setProducts] = useState([]);
    const [bannerData, setBannerData] = useState(null);


    const screens = useBreakpoint()



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

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEventsFeatured();
                if (data?.status && Array.isArray(data?.data)) {
                    setEvents(data.data);
                } else {
                    console.error("No valid events data found");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        loadEvents();
    }, []);

    useEffect(() => {
        const getBanner = async () => {
            try {
                const result = await fetchBanner()
                console.log('RESULT', result);

                if (result) {
                    setBannerData(result); // Set the fetched banner data
                } else {
                    console.error("No data found");
                }
            } catch (error) {
                console.error("Error fetching banner data:", error.message);
            }
        };

        getBanner();
    }, []);


    // Optional: Show a loading state or fallback UI if bannerData is null
    // if (!bannerData) {
    //   return <div>Loading...</div>; // You can customize this loading state
    // }
    const eventsliderSettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 3000, // Slide change interval
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const productsettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,


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
        <div id="home">

            {/* <section>
                <div className="top-menu-main py-3">
                    <div className="container py-4">
                        <div className="homecontainer" style={{ display: "flex", justifyContent: screens.sm ? "center" : 'left' }}>

                            <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%' }}>
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

                            <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%' }}>
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
                            <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%' }}>
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
                            <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%' }}>
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
                            <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%' }}>
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
                            <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%' }}>
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
                      
                        </div>
                    </div>
                </div>
            </section> */}

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
                                <Link href="/event" className="text-decoration-none">
                                    View All{" "}
                                    <i className="fa-solid fa-arrow-right view-more-arrow"></i>
                                </Link>
                            </div>
                        </div>
                        <Slider {...eventsliderSettings}>
                            {events.length > 0 ? (
                                events.map((event, index) => {
                                    const startDate = new Date(event.start_date);
                                    const dateValid = !isNaN(startDate);

                                    return (
                                        <div
                                            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2"
                                            key={index}
                                        >
                                            <div className="trend-1 pt-4">
                                                <div className="img">
                                                    {/* <img
                            src={event.image_url}
                            alt={event.title}
                            className="img-fluid"
                          /> */}
                                                    <img src={event.image_url || defaultImg.src} alt={event.title} height={'300px'} />
                                                    <div className="icon">
                                                        <Link href="#">
                                                            {/* <i className="fa-regular fa-heart"></i> */}
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="trand-text-box">
                                                    <div className="date-box" style={{ zIndex: "1" }}>
                                                        {dateValid ? (
                                                            <>
                                                                <div className="date">
                                                                    <h3>{startDate.getDate()}</h3>
                                                                </div>
                                                                <div className="year">
                                                                    <p>
                                                                        {startDate.toLocaleString("default", {
                                                                            month: "short",
                                                                        })}{" "}
                                                                        {startDate.getFullYear()}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <p>Invalid Date</p>
                                                        )}
                                                    </div>
                                                    <div className="trand-head">
                                                        <Link href="/event" className="text-decoration-none">
                                                            <h6>{event.title}</h6>
                                                        </Link>
                                                    </div>
                                                    <div className="trand-para d-flex justify-content-between align-items-center" style={{ minHeight: '60px' }}>
                                                        <div className="para">
                                                            <p className="m-0">
                                                                {event.short_description}
                                                            </p>
                                                        </div>
                                                        <div className="icon">
                                                            <Link
                                                                href="/event"
                                                                className="text-decoration-none"
                                                            >
                                                                <i className="fa-solid fa-arrow-right trand-arrow"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Loading events...</p>
                            )}
                        </Slider>
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
                                    View All <i className="fa-solid fa-arrow-right view-more-arrow"></i>
                                </Link>
                            </div>
                        </div>
                        <Slider {...productsettings} style={{ padding: '0 25px' }} className="product-slider pt-4">

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
                                            <Link href={`${product.id}/productdetails`} className="text-decoration-none">
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

            {bannerData && <section>
                <div className="products-banner py-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3 col-md-3 p-0">
                                <div className="product-bg-img-1">
                                    <img
                                        src={bannerData[2]?.image_url || "/shirt.png"}
                                        alt="Left Banner"
                                    />
                                    <div className="text">
                                        <h3>{bannerData[2]?.title || "Default Left Text"}</h3>
                                        <div className="view-more-btn">
                                            <Link href={bannerData[2]?.view_url || "/marketplace"} className="text-decoration-none">
                                                VIEW MORE
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-6 p-0">
                                <div className="product-bg-img-2">
                                    <img
                                        src={bannerData[1]?.image_url || "/bagpack.png"}
                                        alt="Center Banner"
                                    />
                                    <div className="text">
                                        <h3>{bannerData[1]?.title || "Default Center Text"}</h3>
                                        <div className="view-more-btn">
                                            <Link href={bannerData[1]?.view_url || "/marketplace"} className="text-decoration-none">
                                                VIEW MORE
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-3 p-0">
                                <div className="product-bg-img-3">
                                    <img
                                        src={bannerData[0]?.image_url || "/gogals.png"}
                                        alt="Right Banner"
                                    />
                                    <div className="text">
                                        <h3>{bannerData[0]?.title || "Default Right Text"}</h3>
                                        <div className="view-more-btn">
                                            <Link href={bannerData[0]?.view_url || "/default-url"} className="text-decoration-none">
                                                VIEW MORE
                                            </Link>
                                            {/* <Link href="/marketplace" className="text-decoration-none">
                        VIEW MORE
                      </Link> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}



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
                                <Link href="/blog" className="text-decoration-none">
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