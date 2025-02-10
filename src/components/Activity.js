"use client";
import React, { useEffect, useState } from "react";
import {
  fetchActivities,
  fetchCountries,
  fetchActivityCategories,
} from "@/utils/api/ActivityApi";
import Slider from "react-slick";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "jquery";

import dynamic from "next/dynamic";
import defaultImg from "../../public/event-breadcrumb.png";
import LoadingSpinner from "./Loading";
import { Grid } from "antd";
import Image from "next/image";

const { useBreakpoint } = Grid;

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);

  const screens = useBreakpoint();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [placeholderText, setPlaceholderText] = useState(
    "Search activities, categories, locations..."
  );

  useEffect(() => {
    const handleResize = () => {
      setPlaceholderText(
        window.innerWidth >= 640
          // ? "Search activities, categories, locations..."
          // : "Search..."
             ? "Recherche..."
          : "Recherche..."
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // This will run only on the client-side
    if (typeof document !== "undefined") {
      // Your code that accesses `document` goes here
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(startDate));
    const end = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(endDate));
    return `${start} - ${end}`;
  };

  const formatTime = (time) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(time));
  };

  const filterActivities = (activities, filter, selectedCountry) => {
    const now = new Date();
    const startOfWeek = new Date();
    const endOfWeek = new Date();
    const startOfNextWeek = new Date();
    const endOfNextWeek = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    startOfWeek.setDate(now.getDate() - now.getDay()); // Start of this week
    endOfWeek.setDate(now.getDate() + (6 - now.getDay())); // End of this week
    startOfNextWeek.setDate(startOfWeek.getDate() + 7); // Start of next week
    endOfNextWeek.setDate(endOfWeek.getDate() + 7); // End of next week

    let filtered = activities.filter((activity) => {
      const activityDate = new Date(activity.start_datetime);
      switch (filter) {
        case "today":
          return activityDate.toDateString() === now.toDateString();
        case "tomorrow":
          const tomorrow = new Date();
          tomorrow.setDate(now.getDate() + 1);
          return activityDate.toDateString() === tomorrow.toDateString();
        case "this-week":
          return activityDate >= startOfWeek && activityDate <= endOfWeek;
        case "this-weekend":
          return activityDate.getDay() === 6 || activityDate.getDay() === 0; // Saturday or Sunday
        case "next-week":
          return (
            activityDate >= startOfNextWeek && activityDate <= endOfNextWeek
          );
        case "next-weekend":
          const nextSaturday = new Date(startOfNextWeek);
          nextSaturday.setDate(
            startOfNextWeek.getDate() + (6 - startOfNextWeek.getDay())
          );
          const nextSunday = new Date(nextSaturday);
          nextSunday.setDate(nextSaturday.getDate() + 1);
          return activityDate >= nextSaturday && activityDate <= nextSunday;
        case "this-month":
          return (
            activityDate >= startOfMonth &&
            activityDate <
            new Date(
              startOfMonth.getFullYear(),
              startOfMonth.getMonth() + 1,
              1
            )
          );
        default:
          return true; // No filter applied
      }
    });

    if (selectedCountry) {
      filtered = filtered.filter(
        (activity) =>
          activity.country_id.toString() === selectedCountry.toString()
      );
    }

    return filtered;
  };

  useEffect(() => {
    const getActivities = async () => {
      try {
        const data = await fetchActivities();
        if (data.status === true) {
          setActivities(data.data);
        } else {
          setError("Failed to fetch activities");
        }
      } catch (err) {
        setError("Error fetching activities");
      } finally {
        setLoading(false);
      }
    };

    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        console.log(data);
        setCountries(data.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Error fetching countries, please log in and try again.");
      }
    };

    const getActivityCategories = async () => {
      try {
        const data = await fetchActivityCategories();
        if (data.status === true) {
          setCategories(data.data);
        } else {
          setError("Failed to fetch activity categories");
        }
      } catch (err) {
        console.error("Error fetching activity categories:", err);
        setError("Error fetching activity categories, please try again later.");
      }
    };

    getActivities();
    getCountries();
    getActivityCategories();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredActivities = filterActivities(
    activities,
    filter,
    selectedCountry
  ).filter((activity) =>
    Object.values(activity).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const categorySliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: screens.sm ? 5 : 4,

    // slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,

    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          objectFit: "cover",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="activity-page" style={{ marginTop: "1rem" }}>
        <div className="activity-hero">
          {/* Activity hero section */}
          <section
            className="hero-section"
            style={{ height: screens.sm ? "" : "75vh" }}
          >
            <div className="hero-overlay"></div>
            <div className="container">
              <div className="hero-content">
                <h1>Trouvez des actvités selon vos envies....</h1>
                <p>Discover the Most Happening Events Around You</p>
                <div className="search-bar">
                  <div className="input-group">
                    {/* Search input */}
                    <span className="input-group-text">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control width-more"
                      // placeholder="Search activities, categories, locations..."
                      placeholder={placeholderText}
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <span className="input-group-text">
                      <i className="fa-solid fa-location-dot"></i>
                    </span>

                    <select
                      className="form-select dropdown-select"
                      value={selectedCountry} // Ensure the selected country is correctly reflected in the dropdown
                      onChange={handleCountryChange}
                    >
                      <option value="" selected>
                        Country
                      </option>
                      {Array.isArray(countries) &&
                        countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* slider */}

        <div
          className="activity-categories"
          style={{ marginTop: "60px", marginBottom: "100px", margin: "20px" }}
        >
          <Slider {...categorySliderSettings}>
            {categories.map((category) => (
              <div className="item" key={category.id}>
                <a href="" style={{ textDecoration: "none" }}>
                  <img
                    src={category.image_url || defaultImg.src}
                    // src={defaultImg.src}

                    alt={category.title}
                    style={{ marginBottom: "30px" }}
                  />
                  <div
                    className="item-content"
                    style={{ textDecoration: "none" }}
                  >
                    <p>{category.title}</p>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Featured activities section */}
      <div className="activity-tab-content">
        <div className="heading-area text-center">
          <h2 style={{ fontSize: screens.sm ? "" : "20px" }}>
            Activités à la une
          </h2>
        </div>
        <div className="container mt-5">
          <ul
            className="nav nav-tabs"
            id="myTab"
            role="tablist"
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              whiteSpace: "nowrap",
              overflowY: "hidden",
            }}
          >
            {[
              "all",
              "today",
              "tomorrow",
              "this-week",
              "this-weekend",
              "next-week",
              "next-weekend",
              "this-month",
            ].map((tab) => (
              <li className="nav-item" role="presentation" key={tab}>
                <a
                  className={`nav-link ${filter === tab ? "active" : ""}`}
                  onClick={() => setFilter(tab)} // Update filter on click
                >
                  {tab.charAt(0).toUpperCase() +
                    tab.slice(1).replace(/-/g, " ")}
                </a>
              </li>
            ))}
          </ul>
          <div className="row mt-5">
            {filteredActivities.map((activity) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 mb-3"
                key={activity.id}
              >
                <div
                  className="content-box"
                  style={screens.sm ? { width: "335px", height: "450px" } : {width: "80%" ,height:"100%", marginRight:"45px"}}
                >
                  <div className="img-zoom">
                    <img
                      src={
                        activity.image_url ? activity.image_url : defaultImg.src
                      }
                      // src={
                      //    defaultImg.src
                      // }
                      alt={activity.title}
                      className="img-fluid mb-2"
                      style={{
                        width: "500px",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div className="box" style={screens.sm ? { padding: "15px 5px" } : {marginLeft: "-80px"}}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5
                      // style={screens.sm ? { width: "70%" } : {}}
                      >
                        <a href={`/activitydetail/${activity.id}`} style={screens.sm ? { } : {textDecoration: "none"}}>
                          {activity.title}
                        </a>
                      </h5>
                      {/* <div className="rate">
                        <p className="m-0">
                          4.2<i className="fa-solid fa-star"></i>
                        </p>
                      </div> */}
                    </div>
                    <h6>hosted by {activity.hosted_by}</h6>
                    <div className="date-time-section d-flex justify-content-between " style={{ flexDirection: "column", marginTop: "15px" }}>
                      <div className="date">
                        <i className="fas fa-calendar-alt" style={{ marginRight: "2px" }}></i>{" "}
                        {formatDateRange(
                          activity.start_datetime,
                          activity.end_datetime
                        )}
                      </div>
                      {/* <div className="separator">|</div> */}
                      <div className="time" style={{ marginTop: "5px" }}>
                        <i
                          className="fas fa-clock"
                          style={{ marginRight: "-2px" }}
                        ></i>
                        <span>
                          {formatTime(activity.start_datetime)} -
                          {formatTime(activity.end_datetime)}
                        </span>
                      </div>
                      <div className="location-section">
                        <div className="location d-flex align-items-center">
                          <i className="fas fa-map-marker-alt"></i>
                          <span className="location-name">
                            {activity.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="heart-icon">
                    <a href="">{/* <i className="far fa-heart"></i> */}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center my-4">
            <a href="/activitylist">
              <button className="btn-all-activities">
                Tout voir
                {/* <i className="fas fa-arrow-right"></i> */}
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="upcoming-activities mt-5">
        <div className="heading-area text-center">
          <h2 style={{ fontSize: screens.sm ? "" : "20px" }}>
          NOS RECOMMANDATIONS
          </h2>
        </div>
        <div className="container mt-5">
          <Slider
            {...{
              infinite: true,
              speed: 500,
              slidesToShow:4,
              slidesToScroll: 1,
              arrows: false,
              autoplay: true,
              autoplaySpeed: 2000,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                  },
                },
              ],
            }}
          >
            {activities.map((activity) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2 item mx-2"
                key={activity.id}
              >
                <div className="upcoming-content-box">
                  <div className="img-zoom">
                    <img
                      src={
                        activity.image_url ? activity.image_url : defaultImg.src
                      }
                      // src={defaultImg.src}

                      alt={activity.title}
                      className="img-fluid"
                    // style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="upcoming-content">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 style={{ marginBottom: "-38px" }}>
                        <a
                          style={{ color: "black" , textDecoration: "none"}}
                          href={`/activitydetail/${activity.id}`}
                        >
                          {activity.title}
                        </a>
                      </h5>
                      <div className="rate">
                        <p className="m-0">
                          {activity.rating}
                          {/* <i className="fa-solid fa-star"></i> */}
                        </p>
                      </div>
                    </div>
                    <h6 style={{ marginBottom: "-40px" }}>
                      hosted by {activity.hosted_by}
                    </h6>
                    <div
                      className="date-time-section d-flex justify-content-between"
                      style={{
                        flexDirection: screens.sm ? "column" : "column",
                        alignItems: screens.sm ? "flex-start" : "flex-start",
                      }}
                    >
                      <div className="date">
                        <i className="fas fa-calendar-alt"></i>
                        <span>
                          {" "}
                          {formatDateRange(
                            activity.start_datetime,
                            activity.end_datetime
                          )}
                        </span>
                      </div>

                      <div className="time">
                        <i className="fas fa-clock" ></i>{" "}
                        <span>
                          {formatTime(activity.start_datetime)} -{" "}
                          {formatTime(activity.end_datetime)}
                        </span>
                      </div>
                      <div >
                        <i className="fas fa-map-marker-alt" style={{ marginRight: "5px" }}></i>
                        <span className="location-name">
                          {activity.location}
                        </span>
                      </div>
                    </div>
                    {/* <div className="location-section">
                      <div className="location d-flex align-items-center">
                        <i className="fas fa-map-marker-alt"></i>
                        <span className="location-name">
                          {activity.location}
                        </span>
                      </div>

                    </div> */}
                    {/* <div className="heart-icon">
                <a href="#">
                  <i className="far fa-heart"></i>
                </a>
              </div> */}
                    {/* <a href="#" className="btn">Join Now</a> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* <!-- activity service --> */}
      <div className="activity-services" style={{ marginTop: "100px" }}>
        <div className="heading-area text-center mb-5">
          <h2
            style={{
              fontSize: screens.sm ? "32px" : "17px",
              textAlign: screens.sm ? "" : "left",
              padding: screens.sm ? "" : "25px",
            }}
          >
            Pourquoi réserver avec Avöyes
          </h2>
        </div>
        <div className="container mt-5">
          <div className="row text-center activity-support">
            <div className="col-md-3 feature">
              <i className="fas fa-headset feature-icon"></i>
              <h5>Assistance client 24h/24 et 7j/7</h5>
              <p>
                Où que vous soyez, notre équipe est disponible à tout moment
                pour vous assister.
              </p>
            </div>
            <div className="col-md-3 feature">
              <i className="fas fa-trophy feature-icon"></i>
              <h5>Gagnez des récompenses</h5>
              <p>
                Cumulez des points et profitez d&apos;avantages exclusifs à
                chaque réservation.
              </p>
            </div>
            <div className="col-md-3 feature">
              <i className="fas fa-star feature-icon"></i>
              <h5>Des millions d&apos;avis</h5>
              <p>
                Consultez les retours honnêtes de notre communauté pour faire
                les meilleurs choix.
              </p>
            </div>
            <div className="col-md-3 feature">
              <i className="fas fa-calendar-alt feature-icon"></i>
              <h5>Planifiez votre chemin</h5>
              <p>
                Créez un itinéraire sur-mesure, adapté à vos besoins et vos
                rêves meilleurs choix..
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
