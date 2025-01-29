"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Slider from "react-slick";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import defaultImg from "../../public/event-breadcrumb.png";
import defaultImg from "../../public/eventbanner.jpg";
import { Dropdown } from "bootstrap"; // Add this import

import {
  fetchEvents,
  fetchEventsFeatured,
  fetchEventsVideo,
  fetchSpeakers,
  fetchCategories,
} from "@/utils/api/EventApi";
import LoadingSpinner from "./Loading";
import { Carousel, Grid, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

const { useBreakpoint } = Grid;


const contentStyle = {
  margin: 0,
  height: '720px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',

};



const Event = () => {
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [galleryImages, setGalleryImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);
  const screens = useBreakpoint();
  const [timer, setTimer] = useState({ hours: 24, minutes: 59, seconds: 59 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);

  // Toggle dropdowns
  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleSpeakerDropdown = () => setIsSpeakerOpen(!isSpeakerOpen);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  // Go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setTimer((prevTimer) => {
        let newSeconds = prevTimer.seconds - 1;
        let newMinutes = prevTimer.minutes;
        let newHours = prevTimer.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          newHours = 0;
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      console.log("eventdata", data);
      if (data.status) {
        setEvents(data.data);
        const images = data.data
          .map((event) => event.image_url)
          .filter((url) => url);
        setGalleryImages(images);
      } else {
        setError(data.message);
      }
    };

    const getFeaturedEvents = async () => {
      const data = await fetchEventsFeatured();
      console.log("featured eventdata", data);
      if (data.status) {
        setFeaturedEvents(data.data);
      } else {
        setError(data.message);
      }
    };

    const fetchVideoData = async () => {
      const data = await fetchEventsVideo();
      console.log("Fetched video data:", data);
      if (data.status) {
        setVideoData(data.data[0]);
      } else {
        setError(data.message);
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const categoriesData = await fetchCategories();
        if (categoriesData.status) {
          console.log("Categories fetched:", categoriesData.data);
          setCategories(categoriesData.data);
        } else {
          setError(categoriesData.message);
        }

        const speakersData = await fetchSpeakers();
        if (speakersData.status) {
          setSpeakers(speakersData.data);
        } else {
          setError(speakersData.message);
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    // Call all functions and set loading state
    const fetchData = async () => {
      await getEvents();
      await getFeaturedEvents();
      await fetchVideoData();
      await fetchAdditionalData();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Initialize Bootstrap dropdowns
    const dropdownElements = document.querySelectorAll(".dropdown-toggle");
    dropdownElements.forEach((dropdown) => {
      new Dropdown(dropdown); // Update this line to use the imported Dropdown
    });
  }, []);

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredEvents =
    activeTab === "latest"
      ? [...events]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
      : events;

  const filteredSearchEvents = events.filter((event) => {
    const matchesSearchTerm =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.short_description &&
        event.short_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategoryId
      ? event.event_category_id === selectedCategoryId
      : true;
    const matchesSpeaker = selectedSpeakerId
      ? event.event_speaker_id === selectedSpeakerId
      : true;

    return matchesSearchTerm && matchesCategory && matchesSpeaker;
  });

  const handleTabClick = (event, categoryId) => {
    event.preventDefault();
    setSelectedCategoryId(categoryId);
  };

  const truncateCharacters = (text, charLimit) => {
    if (!text) return "";
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  // window.onload = function() {
  //   document.querySelector('#speakerDropdown').addEventListener('click', function() {
  //     var dropdownMenu = this.nextElementSibling;
  //     dropdownMenu.classList.toggle('show');
  //   });
  // };

  return (
    <>
      <div className="event-page">
        <div id="home">
          <section>
            <div className="event-list-breadcrumb">
              <img src={defaultImg.src} alt="Event Breadcrumb" />
              <div className="event-bread-text" style={screens.sm ? {} : { width: "100%" }}>
                <h1
                  style={{
                    fontSize: screens.sm ? "57px" : "45px",
                    fontWeight: screens.sm ? "800px" : "600px",
                  }}
                >
                  Discover Upcoming Events
                </h1>
                <p
                  style={{
                    fontSize: screens.sm ? "16px" : "12px",
                    lineHeight: screens.sm ? "25px" : "20px",
                  }}
                >
                  Explore a range of exciting events tailored to your interests!
                  From community gatherings and workshops to special occasions
                  and online meetups, find the perfect event to enhance your
                  experience and connect with others.
                </p>
              </div>
            </div>
            {/* <Carousel dots={false} arrows={false} infinite={true} autoplay>
              <div>
                <h3 style={contentStyle}><Layout >
                  <Layout>
                    <Sider style={{backgroundColor:"white"}} width={screens.sm?"50%":"100%"} height={screens.sm?"100%":"50%"}>
                      Sider
                    </Sider>
                    <Content style={contentStyle}>Content</Content>
                  </Layout>
                </Layout>
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}><img src={defaultImg.src} alt="Event Breadcrumb" /></h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel> */}
          </section>

          {/* <!-- what you want section --> */}
          <section>
            <div className="what-you-want-box custom-responsive">
              <div className="container">
                <div className="row">
                  <div className="icon-what-you-want d-flex align-items-center">
                    <div className="md-icon d-flex align-items-center rtext">
                      <div className="icon">
                        <img src="/cal-icon.png" alt="" />
                      </div>
                      <div className="what-text">
                        <h3>WHAT YOU WANT</h3>
                      </div>
                      <div className="find-best-text">
                        <p>find the best for you</p>
                      </div>
                    </div>

                    <div className="md-input d-flex align-items-center">
                      <div className="input-container-event">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <div className="drp-mob-sec d-flex align-items-center">
                        {/* Speaker Dropdown */}
                        <div className="dropdown speaker-dropdwn  me-3">
                          <button
                            className="btn dropdown-toggle select-city speaker-drp d-flex justify-content-between align-items-center"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="speakerDropdown"
                            style={{
                              border: "1px solid #ccc",
                              backgroundColor: "white",
                              color: "#000",
                              transition: "none",
                            }}
                          >
                            {selectedSpeaker || "Speaker"}
                            {/* <i className="fa fa-chevron-down ms-2"></i> */}
                          </button>

                          <ul className="dropdown-menu city-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                  setSelectedSpeaker("");
                                  setSelectedSpeakerId(null);
                                }}
                                style={{
                                  color: "#000",
                                  backgroundColor: "transparent",
                                }}
                              >
                                All Speakers
                              </a>
                            </li>
                            {speakers.map((speaker) => (
                              <li key={speaker.id}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    setSelectedSpeaker(speaker.title);
                                    setSelectedSpeakerId(speaker.id);
                                  }}
                                >
                                  {speaker.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Category Dropdown */}
                        <div className="dropdown speaker-dropdwn ">
                          <button
                            className="btn btn-light dropdown-toggle select-city speaker-drp d-flex justify-content-between align-items-center"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="categoryDropdown"
                            style={{
                              border: "1px solid #ccc",
                              backgroundColor: "white",
                              color: "#000",
                              transition: "none",
                            }}
                          >
                            {selectedCategory || "Category"}
                            {/* <i className="fa fa-chevron-down ms-2"></i> */}
                          </button>
                          <ul className="dropdown-menu city-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                  setSelectedCategory("");
                                  setSelectedCategoryId(null);
                                }}
                                style={{
                                  color: "#000",
                                  backgroundColor: "transparent",
                                }}
                              >
                                All Category
                              </a>
                            </li>
                            {categories.map((category) => (
                              <li key={category.id}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    setSelectedCategory(category.title);
                                    setSelectedCategoryId(category.id);
                                  }}
                                >
                                  {category.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* video section */}
          <section className="video-section">
            <div className="upcoming-events-main">
              <div className="container">
                <div className="head">
                  <h1>Upcoming Events</h1>
                  <p>
                    {videoData ? videoData.top_sub_heading : <LoadingSpinner />}
                  </p>
                </div>
                <div className="video-box">
                  <div className="video-container">
                    {videoData ? (
                      <>
                        <iframe
                          id="video"
                          width="100%"
                          height="900"
                          src={videoData.video_url.replace(
                            "watch?v=",
                            "embed/"
                          )}
                          title={videoData.video_title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          onPlay={handleVideoPlay}
                          onPause={handleVideoPause}
                        ></iframe>
                        <div className="overlay"></div>
                        <div className="img" id="playButton">
                          {/* <img src="/play-button.png" alt="Play" /> */}
                        </div>
                        {/* <div className="timer-counter d-flex">
                          <div className="hrs">
                            <h3>{String(timer.hours).padStart(2, "0")}</h3>
                            <p>Hours</p>
                          </div>
                          <div className="min">
                            <h3>{String(timer.minutes).padStart(2, "0")}</h3>
                            <p>Min</p>
                          </div>
                          <div className="sec">
                            <h3>{String(timer.seconds).padStart(2, "0")}</h3>
                            <p>Sec</p>
                          </div>
                        </div> */}
                        <div className="event-video-title">
                          <h1>{videoData.video_title}</h1>
                          <p>{videoData.video_sub_heading}</p>
                        </div>
                      </>
                    ) : (
                      <p>
                        <LoadingSpinner />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* all event text */}
          <section>
            <div className="event-cat-main">
              <div className="container">
                <div className="tab-container">
                  <div className="tab-head-event d-flex justify-content-between align-items-center">
                    {/* <ul className="nav nav-tabs event-tab" id="myTab" role="tablist"> */}
                    <ul
                      className="nav nav-tabs event-tab d-flex flex-nowrap"
                      id="myTab"
                      role="tablist"
                      style={{
                        overflowX: "scroll",
                        overflowY: "hidden",
                        paddingBottom: "10px",
                        scrollbarWidth: "thin",
                      }}
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${selectedCategoryId === null ? "active" : ""
                            }`}
                          id="profile-tab-event"
                          type="button"
                          onClick={(event) => handleTabClick(event, null)}
                          style={{
                            border: "1px solid #ccc",
                            backgroundColor:
                              selectedCategoryId === null ? "#e9f5ff" : "white",
                            color:
                              selectedCategoryId === null ? "#007bff" : "#000",
                            borderRadius: "5px",
                            padding: "7px 11px",
                            marginRight: "10px", // Add space between boxes
                            marginBottom: "8px", // Add space at the bottom
                            whiteSpace: "nowrap", // Prevent line breaks
                          }}
                        >
                          Categories
                        </button>
                      </li>
                      {categories.map((category) => (
                        <li
                          className="nav-item"
                          role="presentation"
                          key={category.id}
                        >
                          <button
                            className={`nav-link ${selectedCategoryId === category.id ? "active" : ""
                              }`}
                            onClick={(event) =>
                              handleTabClick(event, category.id)
                            }
                            style={{
                              border: "1px solid #ccc",
                              backgroundColor:
                                selectedCategoryId === category.id
                                  ? "#e9f5ff"
                                  : "white",
                              color:
                                selectedCategoryId === category.id
                                  ? "#007bff"
                                  : "#000",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              marginRight: "10px", // Add space between boxes
                              marginBottom: "10px", // Add space at the bottom
                              whiteSpace: "nowrap", // Prevent line breaks
                            }}
                          >
                            {category.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div
                      className="evt-head-btn"
                      style={screens.sm ? { marginLeft: "12px", marginTop: "-30px" } : { marginTop: "-25px" }}
                    >
                      <Link href="/eventlist">
                        <button type="button"> ALL </button>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="tab-content evt-tab-content"
                    id="myTabContent"
                  >
                    <div className="tab-pane fade show active" role="tabpanel">
                      <div className="row">
                        {filteredSearchEvents.length > 0 ? (
                          filteredSearchEvents.map((event) => (
                            <div
                              className={`col-xl-3 col-lg-3 ${screens.sm ? "" : "col-md-6 col-sm-12"
                                }`}
                              key={event.id}
                            >
                              <div className="trend-1 pt-4">
                                <div className="img">
                                  <img
                                    src={event.image_url || defaultImg.src}
                                    alt={event.title}
                                    style={{ objectFit: "cover" }}
                                  />
                                  <div className="icon">
                                    <a href="#">{/* heart-icon */}</a>
                                  </div>
                                </div>
                                <div className="trand-text-box">
                                  <div className="date-box">
                                    <div className="date">
                                      <h3>
                                        {new Date(event.start_date).getDate()}
                                      </h3>
                                    </div>
                                    <div className="year">
                                      <p>
                                        {new Date(event.start_date)
                                          .toLocaleString("default", {
                                            month: "short",
                                          })
                                          .toUpperCase()}{" "}
                                        {new Date(
                                          event.start_date
                                        ).getFullYear()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="trand-head">
                                    <Link
                                      href={`/${event.id}/eventdetails`}
                                      className="text-decoration-none"
                                    >
                                      <h6>{event.title}</h6>
                                    </Link>
                                  </div>
                                  <div
                                    className="trand-para d-flex justify-content-between align-items-center"
                                    style={{ minHeight: "60px" }}
                                  >
                                    <div className="para">
                                      <p
                                        className="m-0"
                                        style={{
                                          fontSize: "0.9rem",
                                          display: "-webkit-box",
                                          WebkitLineClamp: 2,
                                          WebkitBoxOrient: "vertical",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {event.short_description}
                                      </p>
                                    </div>

                                    <div className="icon">
                                      <Link
                                        href={`/${event.id}/eventdetails`}
                                        className="text-decoration-none"
                                      >
                                        {/* <i className="fa-solid fa-arrow-right trand-arrow"></i> */}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="centered-message">
                            No Events Found Of This Search.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Events Section */}
          <section>
            <div className="featured-events-main">
              <div className="container">
                <div className="head">
                  {/* <h1>Featured Events</h1> */}
                  <h1>Événements les plus tendance</h1>

                  <p>
                    {/* Exciting concerts, workshops, festivals & more - dive into a world of unforgettable experiences! */}
                    Des soirées animées, des festivals, des événements exclusifs
                    et bien plus encore - plongez dans un univers d expériences
                    inoubliables !
                  </p>
                </div>
                <div className="event-page-slide">
                  <Slider {...settings}>
                    {featuredEvents.map((event) => (
                      <div
                        className="col-xl-4 col-lg-4 event-1-box"
                        key={event.id}
                        style={{ margin: "30px", height: "400px" }} // Fixed height for consistency
                      >
                        <div
                          className="trend-1 pt-4"
                          style={{
                            margin: "10px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div className="img" style={{ flexGrow: 1 }}>
                            <img
                              className="event-image"
                              src={
                                event.image_url
                                  ? event.image_url
                                  : defaultImg.src
                              }
                              alt={event.title}
                              style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }} // Image styling
                            />
                            <div className="icon">
                              {/* <a href="#"><i className="fa-regular fa-heart"></i></a> */}
                            </div>
                          </div>
                          <div
                            className="trand-text-box"
                            style={{ padding: "20px" }}
                          >
                            <div
                              className="cal-date d-flex align-items-center"
                              style={{ fontSize: "0.9rem" }}
                            >
                              {" "}
                              {/* Adjust font size */}
                              <img
                                src="/cal-evnt.png"
                                alt="Calendar"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "5px",
                                }} // Smaller calendar image
                              />
                              {/* <p style={{ margin: 0 }}>{event.start_date}</p>  */}
                              <p style={{ margin: 0 }}>
                                {new Date(event.start_date).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            <div
                              className="trand-head"
                              style={{ marginTop: "20px" }}
                            >
                              <Link
                                href={`/${event.id}/eventdetails`}
                                className="text-decoration-none"
                              >
                                <h6 style={{ fontSize: "1rem" }}>
                                  {event.title}
                                </h6>{" "}
                                {/* Adjust title size if needed */}
                              </Link>
                            </div>
                            <div className="trand-para d-flex justify-content-between align-items-center">
                              {/* <div className="para">
                      <p className="m-0" style={{ fontSize: '0.9rem' }}>{event.short_description}</p> 
                    </div> */}
                              <div className="para">
                                <p
                                  className="m-0"
                                  style={{
                                    fontSize: "0.9rem",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    minHeight: "60px",
                                  }}
                                >
                                  {event.short_description}
                                </p>
                              </div>

                              <div className="icon">
                                <Link
                                  href={`/${event.id}/eventdetails`}
                                  className="text-decoration-none"
                                >
                                  {/* <i className="fa-solid fa-arrow-right trand-arrow"></i> */}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </section>

          {/*   <!-- popular & latest events --> */}
          {/* <div className="popular-latest-event my-5">
            <div className="container ">
              <div className="latest-events-tabs d-flex justify-content-between align-items-center">
                <ul className="nav nav-tabs" id="eventTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link "
                      id="more-tab"
                      data-bs-toggle="tab"
                      href="#more"
                      role="tab"
                      aria-controls="more"
                      aria-selected="false"
                    >
                      <img src="/event-tab.png" alt="" />
                    </a>
                  </li>
                  <div className="latest-tabs-border d-flex align-items-center" style={screens.sm ? {} : { padding: "5px" }}>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${activeTab === "upcoming" ? "active" : ""
                          }`}
                        id="upcoming-tab"
                        onClick={() => setActiveTab("upcoming")}
                        style={{
                          fontWeight:
                            activeTab === "upcoming" ? "bold" : "normal",
                          color: activeTab === "upcoming" ? "#007bff" : "#000",
                          backgroundColor:
                            activeTab === "upcoming"
                              ? "#e9f5ff"
                              : "transparent",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                        role="tab"
                        aria-controls="upcoming"
                        aria-selected={activeTab === "upcoming"}
                      >
                        {screens.sm ? "Upcoming Events" : "Upcoming"}
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${activeTab === "latest" ? "active" : ""
                          }`}
                        id="latest-tab"
                        onClick={() => setActiveTab("latest")}
                        style={{
                          fontWeight:
                            activeTab === "latest" ? "bold" : "normal",
                          color: activeTab === "latest" ? "#007bff" : "#000",
                          backgroundColor:
                            activeTab === "latest" ? "#e9f5ff" : "transparent",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                        role="tab"
                        aria-controls="latest"
                        aria-selected={activeTab === "latest"}
                      >
                        {screen.sm ? "Latest Events" : "Latest"}
                      </a>
                    </li>
                  </div>
                </ul>
                <div className="evt-head-btn" style={screens.sm ? {} : { marginTop: "0" }}>
                  <a href="/eventlist">
                    <button type="button">
                      {screens.sm ? (
                        <>
                          See All Events
                          <i className="fa-solid fa-arrow-right ms-2 text-white"></i>
                        </>
                      ) : (
                        "See All"
                      )}
                    </button>
                  </a>
                </div>
              </div>

              <div className="tab-content" id="eventTabsContent">
                <div
                  className="tab-pane fade show active"
                  id="upcoming"
                  role="tabpanel"
                  aria-labelledby="upcoming-tab"
                >
                  <div className="popular-events">
                    <div className="row">
                      {filteredEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`col-xl-6 col-lg-6 col-md-6`}
                        >
                          <div
                            className="event-tab-bg-box"
                            style={
                              screens.sm
                                ? {}
                                : { width: "auto", height: "525px" }
                            }
                          >
                            <div
                              className="row"
                              style={
                                screens.sm
                                  ? {}
                                  : { display: "flex", flexDirection: "column" }
                              }
                            >
                              <div
                                className={`col-xl-4 col-lg-5 `}
                                style={screens.sm ? {} : { width: "100%" }}
                              >
                                <img
                                  className="event-image"
                                  src={
                                    event.image_url
                                      ? event.image_url
                                      : defaultImg.src
                                  }
                                  alt={event.title}
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <div
                                className={`col-xl-8 col-lg-7`}
                                style={screens.sm ? {} : { width: "100%" }}
                              >
                                <div className="trand-text-box-3">
                                  <div className="trand-head">
                                    <Link
                                      href={`/${event.id}/eventdetails`}
                                      className="text-decoration-none"
                                    >
                                      <h6>{event.title}</h6>
                                    </Link>
                                  </div>
                                  <div className="cal-date d-flex align-items-center">
                                    <img src="/cal-evnt.png" alt="Calendar" />
                             

                                    <p>
                                      {(() => {
                                        const date = new Date(event.start_date);
                                        const options = {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        };
                                        const formattedDate = date
                                          .toLocaleDateString("en-GB", options)
                                          .split(" ");
                                        return `${formattedDate[0]} ${formattedDate[1]}, ${formattedDate[2]}`;
                                      })()}
                                    </p>
                                  </div>
                                  <div
                                    className="trand-para d-flex justify-content-between align-items-center"
                                    style={{ minHeight: "60px" }}
                                  >
                                    <div className="para">
                                      <div
                                        className="description-limit m-0"
                                        dangerouslySetInnerHTML={{
                                          __html: truncateCharacters(
                                            event.description,
                                            60
                                          ),
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="read-more-event-btn">
                                    <Link href={`/${event.id}/eventdetails`}>
                                      <button type="button">Voir plus</button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="date-circle">
                              <h3>{new Date(event.start_date).getDate()}</h3>
                              <p>
                                {new Date(event.start_date).toLocaleString(
                                  "default",
                                  { month: "short" }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* gallery */}
          {/* <section>
            <div className="img-gallary-main">
              <div className="container mt-4">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="images-tab"
                      data-bs-toggle="tab"
                      href="#images"
                      role="tab"
                      aria-controls="images"
                      aria-selected="true"
                    >
                      <img src="/event-tab.png" alt="" />
                    </a>
                  </li>
                  <div className="tab-brdr d-flex">
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="photos-tab"
                        data-bs-toggle="tab"
                        href="#photos"
                        role="tab"
                        aria-controls="photos"
                        aria-selected="false"
                      >
                        Photosdd
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="videos-tab"
                        data-bs-toggle="tab"
                        href="#videos"
                        role="tab"
                        aria-controls="videos"
                        aria-selected="false"
                      >
                        Videos
                      </a>
                    </li>
                  
                  </div>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="images"
                    role="tabpanel"
                    aria-labelledby="images-tab"
                  >
                    <div className="gallery-container">
                      <div className="tz-gallery">
                        <div className="row">
                          {galleryImages.map((imageUrl, index) => (
                            <div className="col-sm-12 col-md-4 col-4" key={index}>
                              <a className="lightbox" onClick={() => openLightbox(index)}>
                                <img
                                  src={imageUrl}

                                  alt={`Gallery Image ${index + 1}`}
                                  className="gal-img-height"
                                />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="photos"
                    role="tabpanel"
                    aria-labelledby="photos-tab"
                  >
                    <div className="gallery-container">
                      <div className="tz-gallery">
                        <div className="row">
                          {galleryImages.map((imageUrl, index) => (
                            <div className="col-sm-12 col-md-4 col-4" key={index}>
                              <a className="lightbox" onClick={() => openLightbox(index)}>
                                <img
                                  src={imageUrl}
                                  alt={`Gallery Image ${index + 1}`}
                                  className="gal-img-height"
                                />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="videos"
                    role="tabpanel"
                    aria-labelledby="videos-tab"
                  >
                    <div className="gallery-container">
                      <div className="tz-gallery">
                        <div>
                          <a className="lightbox" href={videoData.video_url}>
                            <iframe
                              id="video"
                              width="100%"
                              height="900"
                              src={videoData.video_url.replace("watch?v=", "embed/")}
                              title={videoData.video_title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              onPlay={handleVideoPlay}
                              onPause={handleVideoPause}
                            ></iframe>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div
                    className="tab-pane fade"
                    id="gallery"
                    role="tabpanel"
                    aria-labelledby="gallery-tab"
                  >
                    <div className="gallery-container">
                      <div className="tz-gallery">
                        <div className="row">
                          {galleryImages.map((imageUrl, index) => (
                            <div className="col-sm-12 col-md-4 col-4" key={index}>
                              <a className="lightbox" onClick={() => openLightbox(index)}>
                                <img
                                  src={imageUrl}
                                  alt={`Gallery Image ${index + 1}`}
                                  className="gal-img-height"
                                />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isLightboxOpen && (
              <div id="lightbox-modal" className="lightbox-modal" onClick={closeLightbox}>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                  <button className="arrow-button prev-event" onClick={prevImage}>&#10094;</button>
                  <img
                    id="lightbox-image"
                    src={galleryImages[currentImageIndex]}
                    alt="Lightbox"
                    className="gal-large-img"
                    style={{
                      width: '850px',
                      height: '400px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <button className="arrow-button next-event" onClick={nextImage}>&#10095;</button>
                </div>
              </div>
            )}



          </section> */}

          {/* newsfrom section */}
          {/* <section>
            <div className="newsroom-main">
                <div className="container">
                    <div className="head">
                        <h1>latest from newsroom </h1>
                        <p>Exciting concerts, workshops, festivals & more - dive into a world of unforgettable
                            experiences!</p>
                    </div>

                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="news-img news-img-1">
                                <img src="/news-img-1.png" alt=""/>
                                <div className="text-box">
                                    <div className="date d-flex align-items-center"><i className="fa-solid fa-clock pe-2"></i>
                                        <p className="m-0">January 2024</p>
                                    </div>
                                    <div className="news-head">
                                        <h3>Indonesia - Korea conference</h3>
                                    </div>
                                    <div className="news-para-icon d-flex justify-content-between">
                                        <p>long established fact that a reader will be distracted by....</p>
                                        <a href="event-details.html" className="text-decoration-none"><i
                                                className="fa-solid fa-arrow-right trand-arrow"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="news-img news-img-2">
                                <img src="/news-img-2.png" alt=""/>
                                <div className="text-box">
                                    <div className="date d-flex align-items-center"><i className="fa-solid fa-clock pe-2"></i>
                                        <p className="m-0">January 2024</p>
                                    </div>
                                    <div className="news-head">
                                        <h3>Indonesia - Korea conference</h3>
                                    </div>
                                    <div className="news-para-icon d-flex justify-content-between">
                                        <p>long established fact that a reader will be distracted by....</p>
                                        <a href="event-details.html" className="text-decoration-none"><i
                                                className="fa-solid fa-arrow-right trand-arrow"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 md-pad-news">
                            <div className="news-img news-img-3">
                                <img src="/news-img-3.png" alt=""/>
                                <div className="text-box">
                                    <div className="date d-flex align-items-center"><i className="fa-solid fa-clock pe-2"></i>
                                        <p className="m-0">January 2024</p>
                                    </div>
                                    <div className="news-head">
                                        <h3>Indonesia - Korea conference</h3>
                                    </div>
                                    <div className="news-para-icon d-flex justify-content-between">
                                        <p>long established fact that a reader will be distracted by....</p>
                                        <a href="event-details.html" className="text-decoration-none"><i
                                                className="fa-solid fa-arrow-right trand-arrow"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
        </div>
      </div>
    </>
  );
};

export default Event;
