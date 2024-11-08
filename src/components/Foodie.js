"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import foodieBanner from '../../public/foodie-banner.png';
import cafe from '../../public/cafe.png'



const Foodie = () => {

    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {
        // Fetching food types from the API
        const fetchFoodTypes = async () => {
            try {
                const response = await axios.get('http://38.108.127.253:3000/api/food-type');
                // Check if response.data is an array, if not set an empty array
                const data = Array.isArray(response.data.data) ? response.data.data : [];
                setFoodTypes(data);
            } catch (error) {
                console.error("Error fetching food types:", error);
            }
        };

        fetchFoodTypes();
    }, []);

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
                    <p className="lead">Explore the best local eateries, hidden gems, and must-visit dining destinations. Use
                        the search bar to find exactly what you're craving and uncover amazing food experiences near you!
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
            <ul className="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
                        {foodTypes.map((foodType) => (
                            <li key={foodType.id} className="nav-item" role="presentation">
                                <a className="nav-link" data-bs-toggle="tab" href={`#tab${foodType.id}`} role="tab">
                                    {/* <img src={foodType.image_url} alt="" /> */}
                                    <img src={foodType.image_url || cafe.src} alt={foodType.title} />
                                    {foodType.title}
                                </a>
                            </li>
                        ))}
                    </ul>

                {/* 238- <div class="tab-content" id="myTabContent"> */}


                
                    </div>           
                </div>
        </div>
    );
};

export default Foodie
