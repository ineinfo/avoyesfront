"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';


import { fetchPlaceDetails, fetchPopularDish, getUserData, fetchTimes, fetchFoodTypes, makeReservation } from '@/utils/api/FoodieApi';
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Cookies from 'js-cookie';

const FoodDetails = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [sliderData, setSliderData] = useState([]);
  const sliderRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [times, setTimes] = useState([]);
  const defaultUrl = '/foodie-banner.png';
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [foodTypes, setFoodTypes] = useState([]);
  const router = useRouter();
  const [selectedPeople, setSelectedPeople] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [errormsg, setErrormsg] = useState();
  const [selectedTimeId, setSelectedTimeId] = useState(null);


  const imageUrls = [
    placeData?.image_url,
    placeData?.image_url2 || defaultUrl,
    placeData?.image_url3 || defaultUrl,
    placeData?.image_url4 || defaultUrl,
    placeData?.image_url5 || defaultUrl,
  ];


  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };


  useEffect(() => {
    const getTimes = async () => {
      const fetchedTimes = await fetchTimes();
      setTimes(fetchedTimes);
    };

    getTimes();
  }, []);




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData({
          fullName: `${user.first_name} ${user.last_name}`,
          avatar: user.avatar || '',
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (id) {
      const getPlaceDetails = async () => {
        const data = await fetchPlaceDetails(id);
        console.log("555555", data);
        setPlaceData(data);

      };

      getPlaceDetails();
    }
  }, [id]);

  const handleReservationClick = async () => {
    const token = Cookies.get('accessToken');

    if (token) {

      if (!selectedTimeId || !selectedPeople || !selectedDate) {
        console.log("Please select all field (date, people, and time)");
        setErrormsg("Please select all field (people, date, and time)")
        return;
      }

      try {
        // Create the reservation and get the response with the reservation id
        const reservationResponse = await makeReservation({
          time_id: selectedTimeId,
          food_place_id: id, // Assuming you have a food place id in your state or props
          people: selectedPeople,
          date: selectedDate,
        });
        setErrormsg('')
        // Get the reservation id from the response
        const reservationId = reservationResponse.data[0].id;
        console.log("ID", reservationResponse.data[0].id);

        if (reservationId) {
          // Navigate to the reservation page with the dynamic id
          router.push(`/reservation/${reservationId}`);
        } else {
          console.log("Failed to create reservation. No ID returned.");
        }

      } catch (error) {
        console.log("Failed to make reservation. Please try again.");
      }
    } else {
      setErrormsg("Log In First For Making a Reservation ")
    }
  };



  useEffect(() => {
    // Fetch food types
    const loadFoodTypes = async () => {
      const data = await fetchFoodTypes();
      setFoodTypes(data);
    };

    loadFoodTypes();
  }, []);
  const foodTypeTitle = foodTypes.find(
    (type) => type.id === placeData?.food_type_id
  )?.title || 'Food Of Your Choice';



  useEffect(() => {
    const loadSliderData = async () => {
      try {
        const data = await fetchPopularDish(id);
        setSliderData(data);
      } catch (error) {
        console.error('Failed to load slider data:', error);
      }
    };

    loadSliderData();


    const interval = setInterval(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const slide = slider.querySelector('.map-slide');


        if (slide) {
          const slideWidth = slide.offsetWidth;
          const maxScroll = slider.scrollWidth - slider.offsetWidth;


          if (slider.scrollLeft + slideWidth >= maxScroll) {

            slider.scrollLeft = 0;
          } else {
            slider.scrollLeft += slideWidth;
          }
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [id]);





  const hoursData = [
    { day: 'Mon', hours: '12:00 PM - 11:00 PM' },
    { day: 'Tue', hours: '12:00 PM - 11:00 PM' },
    { day: 'Wed', hours: '12:00 PM - 11:00 PM' },
    { day: 'Thu', hours: '12:00 PM - 11:00 PM' },
    { day: 'Fri', hours: '12:00 PM - 11:00 PM' },
    { day: 'Sat', hours: '12:00 PM - 11:00 PM' },
    { day: 'Sun', hours: '12:00 PM - 11:00 PM' }
  ];


  return (
    <div className="event-page">
      <div id="home">
        <div className="breadcrumb-marketplace py-5">
          <div className="img">
            {/* <img src={placeData?.data?.image_url || ''} alt={placeData?.data?.title || 'Place Image'} /> */}
            <div className="container">
              <div className="bread-head text-end">
                <div className="link d-flex align-items-center justify-content-end">
                  <a href="/" className="text-decoration-none me-1">
                    HOME
                  </a>
                  <a href="/foodie" className="text-decoration-none">
                    / Food /
                  </a>
                  {/* <p className="m-0 ps-1">The Cookhouse</p> */}
                  <p className="m-0 ps-1">{foodTypeTitle}</p>
                </div>
                {/* Display the title directly */}
                {placeData && placeData.title && <h1>{placeData.title}</h1>}
              </div>
            </div>
          </div>
        </div>

        {/* title-reviews */}
        <section>
          <div className="map-dtl-main">
            <div className="container">
              <div className="cook-house">
                {placeData?.title && <h1>{placeData.title}</h1>}

                {placeData?.rating && (
                  <div className="stars d-flex align-items-center">
                    <div className="strs-map">
                      {[...Array(Math.floor(placeData.rating))].map(
                        (_, i) => (
                          <i key={i} className="fa-solid fa-star"></i>
                        )
                      )}
                      {placeData.rating % 1 !== 0 && (
                        <i className="fa-regular fa-star-half-stroke"></i>
                      )}
                    </div>
                    {placeData?.reviews && (
                      <p className="m-0 ps-2">
                        ({placeData.reviews.split(" ").length} Reviews)
                      </p>
                    )}
                  </div>
                )}

                {placeData?.location && (
                  <div className="map-cntc-dtl d-flex align-items-center">
                    <div className="map-location d-flex align-items-center map-dtl-page">
                      <i className="bi bi-geo-alt"></i>
                      <p className="m-0">{placeData.location}</p>
                    </div>

                    <div className="phone map-location d-flex align-items-center">
                      <i className="bi bi-telephone"></i>
                      <a href={`tel:${placeData.phone || "1234567890"}`}>
                        {" "}
                        {placeData.phone || "1234567890"}
                      </a>
                    </div>

                    <div className="map-top-site map-location d-flex align-items-center">
                      <i className="bi bi-globe"></i>
                      <a
                        href={placeData.website || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* -img section - */}

        <section>
          <div className="map-dtl-gallary">
            <div className="container">
              <div className="gallery-container">
                <div className="tz-gallery">
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <a
                        className="lightbox"
                        onClick={() => openLightbox(0)}
                        href="#"
                      >
                        <img
                          src={imageUrls[0]}
                          alt="Food Image 1"
                          className="map-dtl-1"
                        />
                      </a>
                    </div>

                    <div className="col-md-4 col-4">
                      <div className="col-12">
                        <a
                          className="lightbox"
                          onClick={() => openLightbox(1)}
                          href="#"
                        >
                          <img
                            src={imageUrls[1]}
                            alt="Food Image 2"
                            className="map-dtl-2"
                          />
                        </a>
                      </div>
                      <div className="col-12">
                        <a
                          className="lightbox"
                          onClick={() => openLightbox(2)}
                          href="#"
                        >
                          <img
                            src={imageUrls[2]}
                            alt="Food Image 3"
                            className="map-dtl-3"
                          />
                        </a>
                      </div>
                    </div>

                    <div className="col-md-3 col-3">
                      <div className="col-12">
                        <a
                          className="lightbox"
                          onClick={() => openLightbox(3)}
                          href="#"
                        >
                          <img
                            src={imageUrls[3]}
                            alt="Food Image 4"
                            className="map-dtl-4"
                          />
                        </a>
                      </div>
                      <div className="col-12">
                        <a
                          className="lightbox"
                          onClick={() => openLightbox(4)}
                          href="#"
                        >
                          <img
                            src={imageUrls[4]}
                            alt="Food Image 5"
                            className="map-dtl-5"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lightbox Modal */}
          {isLightboxOpen && (
            <div
              id="lightbox-modal"
              className="lightbox-modal"
              onClick={closeLightbox}
            >
              <div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="arrow-button prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  &#10094;
                </button>
                <img
                  src={imageUrls[currentImageIndex]}
                  alt="Lightbox"
                  className="gal-large-img"
                  style={{
                    width: "800px",
                    height: "500px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <button
                  className="arrow-button next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  &#10095;
                </button>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="map-dtl-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="map-dtl-left">
                    <div className="map-top-btns d-flex align-items-center">
                      <div className="map-review-btn">
                        <a href="#">
                          <button type="button">
                            <i className="fa-regular fa-star"></i>write a
                            review
                          </button>
                        </a>
                      </div>
                      <div className="share-btn">
                        <div className="variants">
                          <div className="file file--upload">
                            <label for="input-file">
                              <i className="fa-solid fa-arrow-up-from-bracket"></i>
                              Upload
                            </label>
                            <input id="input-file" type="file" />
                          </div>
                        </div>
                      </div>
                      <div className="save-btn-map">
                        <a href="#">
                          <button className="buttons">
                            <i className="fa-regular fa-bookmark"></i>Save
                          </button>
                        </a>
                      </div>
                    </div>

                    <div className="location-hours">
                      <h1>Location & Hours</h1>
                      <div className="row">
                        <div className="col-md-7">
                          <div className="map-dtl-map">
                            <iframe
                              src={
                                placeData?.map_url ||
                                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7782458348!2d2.2646349990563044!3d48.85893843455474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sin!4v1727960219961!5m2!1sen!2sin"
                              }
                              width="100%"
                              height="220"
                              style={{ border: "0" }}
                              allowFullScreen=""
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </div>
                          <div className="map-dtl-add d-flex align-items-center justify-content-between">
                            <p>
                              {placeData?.location ||
                                "Location not available"}
                            </p>
                            <a href="#">
                              <button type="button">Get Directions</button>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="map-table map-dtl-map">
                            <table className="hours-table table bg-white">
                              <tbody>
                                {hoursData.map((day, index) => (
                                  <tr key={index}>
                                    <th>{day.day}</th>
                                    <td>{day.hours}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pop-map-head">
                      <h1>Popular Dishes</h1>
                    </div>

                    {/* dish slider */}
                    <div className="pop-dish-slider" ref={sliderRef}>
                      {/* slider-start */}
                      {sliderData.length > 0 ? (
                        sliderData.map((item, index) => (
                          <div key={item.id} className="map-slide">
                            <img src={item.image_url} alt={item.title} />
                            <div className="text">
                              <p>{item.title}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Not Mentioned </p>
                      )}
                      {/* slider ends */}
                    </div>

                    <div className="row">
                      <div className="col-md-7">
                        <div className="what-people-map">
                          <div className="head">
                            <h1>what 945 people are saying</h1>
                            <p className="overall-rate-map">
                              overall rating and reviews
                            </p>
                            <p className="review-map-dtl">
                              Reviews can only be made by dinners who have
                              eaten at this restaurant
                            </p>
                          </div>
                          <div className="map-dtl-star d-flex align-items-center">
                            <div className="strs-map">
                              {Array.from({ length: 5 }, (_, index) => {
                                const ratingValue = placeData?.rating || 0;
                                const fullStars = Math.floor(ratingValue);
                                const hasHalfStar = ratingValue % 1 !== 0;

                                if (index < fullStars) {
                                  return (
                                    <i
                                      key={index}
                                      className="fa-solid fa-star"
                                    ></i>
                                  );
                                } else if (
                                  index === fullStars &&
                                  hasHalfStar
                                ) {
                                  return (
                                    <i
                                      key={index}
                                      className="fa-solid fa-star-half-stroke"
                                    ></i>
                                  );
                                } else {
                                  return (
                                    <i
                                      key={index}
                                      className="fa-regular fa-star"
                                    ></i>
                                  );
                                }
                              })}
                            </div>
                            <div className="dtl-rate-map">
                              <p>
                                {placeData?.rating || "0"} Based on recent
                                ratings
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rate-num-map d-flex">
                          <div className="food-map text-center">
                            <h3>4.5</h3>
                            <p>Food</p>
                          </div>
                          <div className="ser-map text-center">
                            <h3>4.7</h3>
                            <p>Services</p>
                          </div>
                          <div className="amb-map text-center">
                            <h3>4.6</h3>
                            <p>Ambience</p>
                          </div>
                          <div className="val-map text-center">
                            <h3>4.2</h3>
                            <p>Value</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-5">
                        <div className="rate-progress">
                          <div className="cell">
                            <p style={{ width: "80%" }} data-value="80"></p>
                            <progress
                              max="100"
                              value="80"
                              className="custom-progress-bar html5"
                            >
                              <div className="progress-bar">
                                <span style={{ width: "80%" }}>80%</span>
                              </div>
                            </progress>
                          </div>
                          <div className="cell">
                            <p style={{ width: "20%" }} data-value="20"></p>
                            <progress
                              max="100"
                              value="20"
                              className="custom-progress-bar html5"
                            >
                              <div className="progress-bar">
                                <span style={{ width: "20%" }}>20%</span>
                              </div>
                            </progress>
                          </div>
                          <div className="cell">
                            <p style={{ width: "10%" }} data-value="10"></p>
                            <progress
                              max="100"
                              value="10"
                              className="custom-progress-bar html5"
                            >
                              <div className="progress-bar">
                                <span style={{ width: "10%" }}>10%</span>
                              </div>
                            </progress>
                          </div>
                          <div className="cell">
                            <p style={{ width: "50%" }} data-value="50"></p>
                            <progress
                              max="100"
                              value="50"
                              className="custom-progress-bar html5"
                            >
                              <div className="progress-bar">
                                <span style={{ width: "50%" }}>50%</span>
                              </div>
                            </progress>
                          </div>
                          <div className="cell">
                            <p style={{ width: "30%" }} data-value="30"></p>
                            <progress
                              max="100"
                              value="30"
                              className="custom-progress-bar html5"
                            >
                              <div className="progress-bar">
                                <span style={{ width: "30%" }}>30%</span>
                              </div>
                            </progress>
                          </div>
                        </div>
                      </div>

                      <div className="input-container-map">
                        <i className="fa fa-search"></i>
                        <input
                          type="text"
                          placeholder="search all reviews..."
                        />
                      </div>

                      <div className="dropdown rate-dropdwn">
                        <button
                          className="btn btn-secondary dropdown-toggle select-city rate-drp d-flex justify-content-between align-items-center"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          id="countryDropdown"
                        >
                          Filter By Rating
                          <i className="fa fa-chevron-down ms-2"></i>
                        </button>
                        <ul className="dropdown-menu city-menu rate-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="Newest"
                            >
                              Newest
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="Highest"
                            >
                              Highest
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="Lowest"
                            >
                              Lowest
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* reviews */}
                    <div className="map-dtl-rate">
                      <div className="rate-1-dtl d-flex align-items-center">
                        <div className="prfl-rate text-center">
                          <img
                            src={userData.avatar}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                          {placeData?.rating ? (
                            <div className="strs-map">
                              {[...Array(Math.floor(placeData.rating))].map(
                                (_, i) => (
                                  <i key={i} className="fa-solid fa-star"></i>
                                )
                              )}

                              {placeData.rating % 1 !== 0 && (
                                <i className="fa-regular fa-star-half-stroke"></i>
                              )}

                              {[
                                ...Array(5 - Math.ceil(placeData.rating)),
                              ].map((_, i) => (
                                <i
                                  key={`empty-${i}`}
                                  className="fa-regular fa-star"
                                ></i>
                              ))}
                            </div>
                          ) : (
                            <p>No ratings on this place... Be the first!</p>
                          )}
                        </div>

                        {placeData?.rating && (
                          <div className="prfl-name">
                            <h3>{userData.fullName || "User Name"}</h3>
                            <p>{placeData.location}</p>
                          </div>
                        )}
                      </div>

                      {/* Render reviews only if ratings exist */}
                      {placeData?.rating && (
                        <div className="map-rate-para">
                          {placeData.reviews ? (
                            <p>{placeData.reviews}</p>
                          ) : (
                            <p>No reviews yet.</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="map-dtl-brdr"></div>
                  </div>
                </div>

                {/* right side */}

                <div className="col-lg-5 sticky-container-mapdtl">
                  <div className="make-res-map-box">
                    <div className="make-head-res">
                      <h3>make a reservation</h3>
                    </div>
                    <button className="d-flex justify-content-between align-items-center res-people">
                      <i className="fa-regular fa-user me-2 user-color"></i>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedPeople}
                        onChange={(e) =>
                          setSelectedPeople(parseInt(e.target.value))
                        }
                      >
                        <option selected>Select People</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </button>

                    <div className="date-time-drps d-flex justify-content-between">
                      {/* <!-- Date Picker --> */}
                      <div className="d-flex justify-content-between align-items-center res-date">
                        <input
                          type="date"
                          className="form-control"
                          id="datePicker"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="select-time">
                      <div className="head">
                        <h3>Select Time</h3>
                      </div>
                      <div className="time-btns">
                        <div className="row">
                          {Array.isArray(times) && times.length > 0 ? (
                            times.map((time) => (
                              <div
                                className="col-lg-3 col-md-3"
                                key={time.id}
                              >
                                <div className="time-btn-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedTimeId(time.id);
                                      handleReservationClick();
                                    }}
                                    className={selectedTimeId === time.id ? "active" : ""}
                                  >
                                    {time.time}
                                  </button>

                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No available times for this place.</p>
                          )}
                          {/* <div className="time-btn-1" >
                              <button
                                type="button"
                                onClick={handleReservationClick}
                              >
                                Reserve Now
                              </button>
                            </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {errormsg ? <span style={{ color: 'red' }}>{errormsg}</span> : ""}
                </div>



              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodDetails;
