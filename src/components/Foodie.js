"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import foodieBanner from "../../public/foodie-banner.png";
import cafe from "../../public/cafe.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {
    fetchFoodTypes,
    fetchFoodPlaces,
    fetchFoodBlogs,
} from "@/utils/api/FoodieApi";

import { CustomCarouselSix } from "./Carousel.nikhil";
import { Grid } from "antd";
import Link from "next/link";
const { useBreakpoint } = Grid
const Foodie = () => {
    const [foodTypes, setFoodTypes] = useState([]);
    const [foodPlaces, setFoodPlaces] = useState([]);
    const [selectedFoodType, setSelectedFoodType] = useState(null);
    const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
    const [isHighestRated, setIsHighestRated] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [foodBlogs, setFoodBlogs] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const screens = useBreakpoint()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownItemClick = (ratingType) => {
        handleRatingFilter(ratingType);
        setIsDropdownOpen(false);
    };

    const handleRatingFilter = (ratingType) => {
        setIsHighestRated(ratingType === 'highest');
    };


    useEffect(() => {
        const getFoodTypes = async () => {
            const data = await fetchFoodTypes();
            setFoodTypes(data);
            if (data.length > 0) {
                setSelectedFoodType(null);
            }
        };
        getFoodTypes();
    }, []);

    const getFoodTypeTitle = (foodTypeId) => {
        const foodType = foodTypes.find(type => type.id === foodTypeId);
        return foodType ? foodType.title : 'Not Mentioned';
    };

    useEffect(() => {
        const getFoodPlaces = async () => {
            const data = await fetchFoodPlaces();
            setFoodPlaces(data);
        };
        getFoodPlaces();
    }, []);

    console.log("FoodBlogs");
    useEffect(() => {
        console.log("useEffect is running");
        const getFoodBlogs = async () => {
            try {
                const data = await fetchFoodBlogs();
                if (data && data.data) {
                    const foodData = data.data.filter(
                        (blog) => blog.blog_category_title === "food"
                    );
                    console.log("Fetched food blog data:", foodData);
                    setFoodBlogs(foodData);
                } else {
                    console.error("No data found.");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        getFoodBlogs();
    }, []);

    const handleCategoryChange = (foodTypeId) => {
        setSelectedFoodTypes((prevSelectedFoodTypes) => {
            if (prevSelectedFoodTypes.includes(foodTypeId)) {
                return prevSelectedFoodTypes.filter(id => id !== foodTypeId); // Unselect
            } else {
                return [...prevSelectedFoodTypes, foodTypeId]; // Select
            }
        });
    };

    const handleAllCategories = () => {
        if (selectedFoodTypes.length === foodTypes.length) {

            setSelectedFoodTypes([]);
        } else {

            setSelectedFoodTypes(foodTypes.map((foodType) => foodType.id));
        }
    };

    const filteredPlacesByCategory = foodPlaces.filter(place => {
        const categoryMatches = selectedFoodTypes.length === 0 || selectedFoodTypes.includes(place.food_type_id);


        const ratingMatches = !isHighestRated || place.rating === 5;

        const searchMatches =
            place.title.toLowerCase().includes(searchQuery) ||
            place.description?.toLowerCase().includes(searchQuery) ||
            place.location?.toLowerCase().includes(searchQuery);

        return categoryMatches && ratingMatches && searchMatches;
    });

    const filteredFoodPlaces = selectedFoodType
        ? foodPlaces.filter((place) => place.food_type_id === selectedFoodType)
        : foodPlaces;

    const uniqueFoodBlogs = [...new Map(foodBlogs.map(blog => [blog.id, blog])).values()];
    const foodsliderSettings = {
        dots: false,
        infinite: true,
        autoplay: false,
        arrows: false,
        slidesToShow: Math.min(uniqueFoodBlogs.length, 4), // Fix slidesToShow
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(uniqueFoodBlogs.length, 3),
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
        ],
    };




    const [isOpen, setIsOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check for screen size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleCategories = () => {
        setIsOpen(!isOpen);
    };





    return (
        <div id="home">
            <section
                className="foodie-hero"
                style={{
                    backgroundImage: `url(${foodieBanner.src})`,
                }}
            >
                <div className="container">
                    <h1 className="display-4">Discover Your Next Favorite Spot</h1>
                    <p className="lead">
                        Explore the best local eateries, hidden gems, and must-visit dining
                        destinations. Use the search bar to find exactly what you&apos;re craving
                        and uncover amazing food experiences near you!
                    </p>
                </div>
            </section>

            {/* <!-- must visit place --> */}
            <div className="must-visit-places">
                <div className="must-visit-places-section text-center">
                    <div className="heading-area">
                        <h2>doit visiter des endroits</h2>
                        <p className="mt-3">des cafés à la nourriture saine</p>
                    </div>
                </div>
                <div className="container mt-4">
                    <ul
                        className="nav nav-tabs d-flex justify-content-center custom-nav-tabs"
                        id="myTab"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${selectedFoodType === null ? "active" : ""}`}
                                data-bs-toggle="tab"
                                href="#all"
                                role="tab"
                                onClick={() => setSelectedFoodType(null)}
                            >
                                <img
                                    src="/cafe.png"
                                    alt="All"
                                    style={{ verticalAlign: "top" }}
                                />
                                All
                            </a>
                        </li>

                        {foodTypes.map((foodType) => (
                            <li key={foodType.id} className="nav-item" role="presentation">
                                <a
                                    className={`nav-link ${selectedFoodType === foodType.id ? "active" : ""
                                        }`}
                                    data-bs-toggle="tab"
                                    href={`#tab${foodType.id}`}
                                    role="tab"
                                    onClick={() => setSelectedFoodType(foodType.id)}
                                >
                                    <img
                                        src={foodType.image_url || cafe.src}
                                        alt={foodType.title}
                                        style={{ verticalAlign: "top" }}
                                    />
                                    {foodType.title}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* 238- <div className="tab-content" id="myTabContent"> */}
                    <div className="tab-content must-visit-places responsive-tab-content" id="myTabContent">
                        {filteredFoodPlaces.length > 0 ? (
                            <div className="tab-pane fade show active">
                                <div className="row mt-4">
                                    {filteredFoodPlaces.map((place) => (
                                        <div key={place.id} className="col-md-3 box mb-4">
                                            <div className="heart-icon">
                                                {/* <i className="far fa-heart"></i> */}
                                            </div>
                                            <div className="img-box">
                                                <img
                                                    src={
                                                        place.image_url &&
                                                            !place?.image_url?.includes("localhost")
                                                            ? place.image_url
                                                            : `http://38.108.127.253:3000/uploads/food-place/1731303887667-814340589.png`
                                                    }
                                                    // src={foodieBanner.src} 
                                                    alt={place.title}
                                                    className="img-fluid responsive-img"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <h5 className="mt-3">
                                                <a href={`/fooddetails/${place.id}`} style={{ textDecoration: "none" }}>
                                                    {place.title}
                                                </a>
                                            </h5>
                                            {place.rating && place.reviews && (
                                                <div className="d-flex align-items-center responsive-text-center mt-2">
                                                    <div>
                                                        {[...Array(Math.floor(place.rating))].map((_, i) => (
                                                            <i key={i} className="fas fa-star"></i>
                                                        ))}
                                                        {place.rating % 1 !== 0 && (
                                                            <i className="fas fa-star-half-alt"></i>
                                                        )}
                                                    </div>
                                                    <div className="ml-2">
                                                        <h6>{place.rating} reviews</h6>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mt-2">
                                                <i className="fas fa-map-marker-alt"></i> {place.location}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="centered-message mt-4">
                                No places available for this category.
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* slider */}
            <div className="foodie-cat-slider mt-4">
                <CustomCarouselSix />
            </div>

            {/* food blog slider */}

            <div className="food-blog">
                <div className="heading-area text-center">
                    <h2>dernier blog</h2>
                    <p className="mt-3">des cafés à la nourriture saine</p>
                </div>
                <div className="container mt-5">
                    <Slider {...foodsliderSettings}>
                        {foodBlogs && foodBlogs.length > 0 ? (
                            foodBlogs.map((blog) => (
                                <div key={blog.id} className="custom-slider-box-food">
                                    <img
                                        src={blog.image_url}
                                        alt="Blog Image"
                                        className="custom-image-slider-food-blog"
                                        style={{ borderRadius: '10px', width: screens.sm ? '' : '100%' }}
                                    />
                                    <p className="custom-date">
                                        <i className="fa-solid fa-calendar-days"></i>{" "}
                                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <h5 className="custom-title">
                                        <a
                                            href={`/${blog.id}/blog-details`}
                                            className="custom-link"
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            {blog.title}
                                        </a>
                                    </h5>
                                    <p
                                        className="custom-description"
                                        dangerouslySetInnerHTML={{ __html: blog.short_description }}
                                    ></p>
                                    <a
                                        href={`/${blog.id}/blog-details`}
                                        className="custom-read-more"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                        onMouseEnter={(e) => {
                                            e.target.style.textDecoration = "underline";
                                            e.target.style.textDecorationColor = "black";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.textDecoration = "none";
                                            e.target.style.textDecorationColor = "transparent";
                                        }}
                                    >
                                        Read More <i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div>No blog data available.</div>
                        )}
                    </Slider>
                </div>
            </div>

            {/* other all in this div */}
            <div className="listing-map-detail">
                <div className="search-container-foodie d-flex justify-content-center" style={{ margin: screens.sm ? '' : '1px 0' }}>
                    <input
                        type="text"
                        id="search-bar"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                        placeholder="Recherchez des restaurants, cafés ou bars près de chez vous..."
                    />
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                </div>
                {/* <!-- food listing map  --> */}
                <div className="filter-sidebar-foodie">
                    <div className="container">
                        <div className="row" style={{ display: "flex" }}>
                            {/* sidebar */}
                            <div
                                className="col-xl-2 col-lg-3 filter-sidebar-section"
                            >
                                {/* <h3>Suggéré</h3>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" />Ouvrir maintenant
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Bon pour le déjeuner
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Bon pour le dîner
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Réservations
                                    </label>
                                </div> */}




                                {/* <div style={{ display: "flex", flexDirection: "column", border: "1px solid #ccc", padding: "15px", borderRadius: "5px", width: "60%" }}>
                                <h3>Catégories</h3>
                                <div className="categories">
                                    <div key="all" className="category-item">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedFoodTypes.length === foodTypes.length}
                                                onChange={() => handleAllCategories()}
                                            />
                                            All
                                        </label>
                                    </div>

                                    {foodTypes.length > 0 &&
                                        foodTypes.map((foodType) => (
                                            <div key={foodType.id} className="category-item">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFoodTypes.includes(foodType.id)}
                                                        onChange={() => handleCategoryChange(foodType.id)}
                                                    />
                                                    {foodType.title}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                                </div> */}

                                <div
                                    // style={{
                                    //     display: "flex",
                                    //     flexDirection: "column",
                                    //     border: "1px solid #ccc",
                                    //     padding: "15px",
                                    //     borderRadius: "5px",
                                    //     width: isSmallScreen ? "100%" : "60%",
                                    //     position: "relative",
                                    // }}
                                >
                                    {/* <h3>Catégories</h3> */}

                                    {/* Button to open categories on small screens */}
                                    {/* {isSmallScreen && (
                                        <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
                                            <div className="filter-btn" style={{ width: "100%", display: "inline-block" }}>
                                                <button
                                                    onClick={toggleCategories}
                                                    style={{
                                                        padding: "8px 10px",
                                                        backgroundColor: "blue",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "5px",
                                                        cursor: "pointer",
                                                        width: "100%",
                                                    }}
                                                >
                                                    Filter
                                                </button>
                                            </div>
                                        </div>
                                    )} */}

                                    {/* Categories section - only visible when `isOpen` is true or on larger screens */}
                                    {(isOpen || !isSmallScreen) && (
                                        <div className="categories" style={{ marginTop: "10px" }}>
                                            <div key="all" className="category-item" style={{ marginBottom: "8px" }}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFoodTypes.length === foodTypes.length}
                                                        onChange={() => handleAllCategories()}
                                                    />
                                                    All
                                                </label>
                                            </div>

                                            {foodTypes.length > 0 &&
                                                foodTypes.map((foodType) => (
                                                    <div key={foodType.id} className="category-item" style={{ marginBottom: "8px" }}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedFoodTypes.includes(foodType.id)}
                                                                onChange={() => handleCategoryChange(foodType.id)}
                                                            />
                                                            {foodType.title}
                                                        </label>
                                                    </div>
                                                ))}
                                            {isSmallScreen && (
                                                <div className="custom-dropdown" style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                                                    <button
                                                        className="custom-dropdown-toggle"
                                                        type="button"
                                                        onClick={toggleDropdown}
                                                        style={{
                                                            border: '1px solid #ccc',
                                                            backgroundColor: 'white',
                                                            color: '#000',
                                                            padding: '10px',
                                                            cursor: 'pointer',
                                                            width: '100%',
                                                            textAlign: 'left',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        recommandée
                                                        <span style={{ marginLeft: '10px', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                                            ▼
                                                        </span>
                                                    </button>
                                                    {isDropdownOpen && (
                                                        <ul className="custom-dropdown-menu" style={{ listStyle: 'none', padding: '0', margin: '0', border: '1px solid #ccc', backgroundColor: 'white', position: 'absolute', top: '100%', left: '0', width: '100%', zIndex: '1000', borderRadius: '5px' }}>
                                                            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleDropdownItemClick('all')}>
                                                                recommandée
                                                            </li>
                                                            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleDropdownItemClick('highest')}>
                                                                le mieux noté
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>


                                {/* <h3>Distance</h3>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="distance" value="1km" /> 1 km
                                    </label>
                                    <br />
                                    <label>
                                        <input type="radio" name="distance" value="5km" /> 5 km
                                    </label>
                                    <br />
                                    <label>
                                        <input type="radio" name="distance" value="10km" /> 10 km
                                    </label>
                                    <br />
                                    <label>
                                        <input type="radio" name="distance" value="20km" /> 20 km
                                    </label>
                                </div>

                                <h3>Tags</h3> */}
                                <div></div>
                            </div>

                            {/* center */}
                            {/* <!-- Second Column: Empty for now --> */}
                            <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="restaurants">
                                    {isSmallScreen && (
                                        <div style={{ display: "flex", width: "100%", marginBottom: "10px" , gap: '10px'}}>
                                            <div className="filter-btn" style={{ width: "100%", display: "inline-block" }}>
                                                <button
                                                    onClick={toggleCategories}
                                                    style={{
                                                        padding: "10px 10px",
                                                        backgroundColor: "blue",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "5px",
                                                        cursor: "pointer",
                                                        width: "100%",
                                                    }}
                                                >
                                                    Filter
                                                </button>
                                            </div>
                                            <div className="mb-3" style={{ width: "50%", display: "inline-block" }}>
                                                <div className="custom-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                                                    <button
                                                        className="custom-dropdown-toggle"
                                                        type="button"
                                                        onClick={toggleDropdown}
                                                        style={{
                                                            border: '1px solid #ccc',
                                                            backgroundColor: 'white',
                                                            color: '#000',
                                                            padding: '10px',
                                                            cursor: 'pointer',
                                                            width: '100%',
                                                            textAlign: 'left',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        recommandée
                                                        <span style={{ marginLeft: '10px', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                                            ▼
                                                        </span>
                                                    </button>
                                                    {isDropdownOpen && (
                                                        <ul className="custom-dropdown-menu" style={{ listStyle: 'none', padding: '0', margin: '0', border: '1px solid #ccc', backgroundColor: 'white', position: 'absolute', top: '100%', left: '0', width: '100%', zIndex: '1000', borderRadius: '5px' }}>
                                                            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleDropdownItemClick('all')}>
                                                                recommandée
                                                            </li>
                                                            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleDropdownItemClick('highest')}>
                                                                le mieux noté
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-between responsive-column">
                                        {!isSmallScreen && <h2>Top 3 des meilleurs fast-foods près de chez vous</h2>}
                                        {/* <!-- Sort Dropdown --> */}
                                        {!isSmallScreen && (
                                            <div className="mb-3">
                                                <div className="custom-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                                                    <button
                                                        className="custom-dropdown-toggle"
                                                        type="button"
                                                        onClick={toggleDropdown}
                                                        style={{
                                                            border: '1px solid #ccc',
                                                            backgroundColor: 'white',
                                                            color: '#000',
                                                            padding: '10px',
                                                            cursor: 'pointer',
                                                            width: '100%',
                                                            textAlign: 'left',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        recommandée
                                                        <span style={{ marginLeft: '10px', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                                            ▼
                                                        </span>
                                                    </button>
                                                    {isDropdownOpen && (
                                                        <ul className="custom-dropdown-menu" style={{ listStyle: 'none', padding: '0', margin: '0', border: '1px solid #ccc', backgroundColor: 'white', position: 'absolute', top: '100%', left: '0', width: '100%', zIndex: '1000', borderRadius: '5px' }}>
                                                            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleDropdownItemClick('all')}>
                                                                recommandée
                                                            </li>
                                                            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleDropdownItemClick('highest')}>
                                                                le mieux noté
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* <!-- Restaurant List --> */}
                                    <div className="restaurant-list">
                                        {filteredPlacesByCategory.length > 0 ? (
                                            filteredPlacesByCategory.slice(0, 3).map((place) => (
                                                <div key={place.id} className="restaurant-item border-bottom mb-4 pb-4">
                                                    <div className="d-flex align-items-start">
                                                        <img
                                                            src={
                                                                place.image_url &&
                                                                    !place?.image_url?.includes("localhost")
                                                                    ? place.image_url
                                                                    : `http://38.108.127.253:3000/uploads/food-place/1731303887667-814340589.png`
                                                            }
                                                            // src={foodieBanner.src} 
                                                            alt={place.title}
                                                            className="img-fluid me-3"
                                                            style={{ width: screens.sm ? '' : '170px', objectFit: 'cover', borderRadius: '5px' }}
                                                        />
                                                        <div>
                                                            <h5>
                                                                <a href={`/fooddetails/${place.id}`} className="text-dark" style={{ textDecoration: 'none' }}>
                                                                    {place.title}
                                                                </a>
                                                            </h5>
                                                            {place.rating && place.reviews && (
                                                                <div className="small text-muted">
                                                                    {/* Generate stars dynamically based on rating */}
                                                                    {[...Array(Math.floor(place.rating))].map((_, i) => (
                                                                        <i key={i} className="fas fa-star"> </i>
                                                                    ))}
                                                                    {place.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}  ({place.reviews} reviews)
                                                                </div>
                                                            )}
                                                            <span className="badge bg-danger">{getFoodTypeTitle(place.food_type_id)}</span>
                                                            {/* <span className="text-danger ms-2">{place.status}</span> */}
                                                            <p className="two-line-text">{place.description}</p>
                                                            <div className="small">
                                                                <i className="fa-solid fa-location-dot"></i> {place.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="centered-message mt-4">
                                                No places available for this Search.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center mt-4">
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                                    <li className="page-item"><a className="page-link" href="#">6</a></li>
                                    <li className="page-item"><a className="page-link" href="#">7</a></li>
                                    <li className="page-item"><a className="page-link" href="#">8</a></li>
                                    <li className="page-item"><a className="page-link" href="#">9</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav> */}
                            </div>


                            {/* <!-- Third Column: Map --> */}
                            <div

                                style={{ display: 'flex', flexDirection: screens.sm ? 'row' : "column", width: '100%', height: '300px', gap: '10px' }}
                            >


                                <div className="product-bg-img-3" style={{ width: screens.sm ? '50%' : '100%', height: screens.sm ? '50%' : "100%" }}>
                                    <img
                                        src={"/gogals.png"}
                                        alt="Right Banner"
                                        style={{ height: screens.sm ? 300 : 200 }}
                                    />
                                    <div className="text" style={screens.sm ? { marginTop: "-40px", marginLeft: "82px" } : { marginTop: "-10px", marginLeft: "20px" }}>
                                        <h3 style={{ fontSize: screens.sm ? "" : "20px" }}>{"Default Right Text"}</h3>
                                        <div className="view-more-btn" style={{ fontSize: screens.sm ? "" : "15px" }}>
                                            <Link
                                                href={"/default-url"}
                                                className="text-decoration-none"
                                            >
                                                En savoir plus
                                            </Link>

                                        </div>
                                    </div>
                                    <div className="ad-btn" style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "black", color: "white", padding: "5px 10px", borderRadius: "5px" }}>
                                        AD
                                    </div>
                                </div>

                                <div>
                                    <iframe
                                        id="map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.901142067501!2d2.3522216156741363!3d48.85661417928756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fefef7a5d7d%3A0x4f183df2d9e5f3af!2sEiffel%20Tower!5e0!3m2!1sen!2sau!4v1634846356248!5m2!1sen!2sau"
                                        style={{ border: '0', width: screens.sm ? '30vw' : '100%', height: '100%' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foodie;
