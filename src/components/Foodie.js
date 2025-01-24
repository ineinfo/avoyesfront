"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Slider from "react-slick";

import foodieBanner from "../../public/foodie-banner.png";
import cafe from "../../public/cafe.png";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {
    fetchFoodTypes,
    fetchFoodPlaces,
    fetchFoodBlogs,
} from "@/utils/api/FoodieApi";

import { CustomCarouselSix } from "./Carousel.nikhil";
import { Grid } from "antd";
const {useBreakpoint} = Grid
const Foodie = () => {
    const [foodTypes, setFoodTypes] = useState([]);
    const [foodPlaces, setFoodPlaces] = useState([]);
    const [selectedFoodType, setSelectedFoodType] = useState(null);
    const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
    const [isHighestRated, setIsHighestRated] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [foodBlogs, setFoodBlogs] = useState([]);

    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const screens = useBreakpoint()



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

    const foodsliderSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
                },
            },
        ],
        style: { width: '100vw' },
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
                        <h2>must visit places</h2>
                        <p className="mt-3">from cafes to healthy food</p>
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
                                    style={{verticalAlign: "top"}}
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
                                        style={{verticalAlign: "top"}}
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
                                style={{objectFit: "cover"}}
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
                    <h2>latest blog</h2>
                    <p className="mt-3"> from cafes to healthy food</p>
                </div>
                <div className="container mt-5">
                    <Slider {...foodsliderSettings} >
                        {foodBlogs.length > 0 ? (
                            foodBlogs.map((blog) => (
                                <div key={blog.id} className="custom-slider-box-food" >
                                    <img
                                        src={blog.image_url}
                                        // src={foodieBanner.src}

                                        alt="Blog Image"
                                        className="custom-image-slider-food-blog"
                                    />
                                    <p className="custom-date">
                                        <i className="fa-solid fa-calendar-days"></i>
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
                                            style={{ textDecoration: 'none', color: 'inherit' }}
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
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                        onMouseEnter={(e) => {
                                            e.target.style.textDecoration = 'underline';
                                            e.target.style.textDecorationColor = 'black';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.textDecoration = 'none';
                                            e.target.style.textDecorationColor = 'transparent';
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
                <div className="search-container-foodie d-flex justify-content-center">
                    <input
                        type="text"
                        id="search-bar"
                        className="search-input" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                        placeholder="Search for restaurants, cafes, or bars near you..."
                    />
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                </div>
                {/* <!-- food listing map  --> */}
                <div className="filter-sidebar-foodie">
                    <div className="container">
                        <div className="row" style={{ display: "flex" }}>
                            {/* sidebar */}
                            <div
                                className="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-12 filter-sidebar-section"
                                style={{ display: "flex", flexDirection: "column", }}
                            >
                                <h3>Suggested</h3>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" /> Open Now
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Good for Lunch
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Good for Dinner
                                    </label>
                                    <br />
                                    <label>
                                        <input type="checkbox" /> Reservations
                                    </label>
                                </div>

                                <h3>Categories</h3>
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


                                <h3>Distance</h3>
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

                                <h3>Tags</h3>
                                <div></div>
                            </div>

                            {/* center */}
                            {/* <!-- Second Column: Empty for now --> */}
                            <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="restaurants">
                                    <div className="d-flex justify-content-between responsive-column">
                                        <h2>Top 10 Best Fast Food Near Your Location</h2>

                                        {/* <!-- Sort Dropdown --> */}
                                        <div className="mb-3">
                                            <div className="dropdown speaker-dropdwn">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle select-city speaker-drp d-flex justify-content-between align-items-center"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    onClick={() => handleRatingFilter('all')}
                                                    id="categoryDropdown"
                                                    style={{
                                                        border: '1px solid #ccc',
                                                        backgroundColor: 'white',
                                                        color: '#000',
                                                        transition: 'none',
                                                    }}
                                                >
                                                    Recommended
                                                    {/* <i className="fa fa-chevron-down ms-2"></i> */}
                                                </button>
                                                <ul className="dropdown-menu city-menu">
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            data-value="     Recommended"
                                                        >
                                                            Recommended
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            data-value="    highest rated"
                                                            onClick={() => handleRatingFilter('highest')}
                                                        >
                                                            highest rated
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Restaurant List --> */}
                                    <div className="restaurant-list">
                                        {filteredPlacesByCategory.length > 0 ? (
                                            filteredPlacesByCategory.slice(0, 5).map((place) => (
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
                                                        />
                                                        <div>
                                                            <h5>
                                                                <a href={`/fooddetails/${place.id}`} className="text-dark" style={{ textDecoration: 'none' }}>
                                                                    {place.title}
                                                                </a>
                                                            </h5>
                                                            <div className="small text-muted">
                                                                {/* Generate stars dynamically based on rating */}
                                                                {[...Array(Math.floor(place.rating))].map((_, i) => (
                                                                    <i key={i} className="fas fa-star"> </i>
                                                                ))}
                                                                {place.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}  ({place.reviews} reviews)
                                                               
                                                            </div>



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
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"
                                style={{ display: 'flex', flexDirection: 'column' , width: '100%', height: '300px' }}
                            >
                                <iframe
                                    id="map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.901142067501!2d2.3522216156741363!3d48.85661417928756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fefef7a5d7d%3A0x4f183df2d9e5f3af!2sEiffel%20Tower!5e0!3m2!1sen!2sau!4v1634846356248!5m2!1sen!2sau"
                                    style={{ border: '0', width: '100%', height: '100%' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foodie;
