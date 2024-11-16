"use client";
import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Link from "next/link";
import cafe from "../../public/cafe.png";
import { fetchFoodTypes, fetchFoodPlaces } from "@/utils/api/FoodieApi";

const Map = () => {
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const defaultUrl = `http://38.108.127.253:3000/uploads/food-place/1731303887667-814340589.png`;
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    const getFoodPlaces = async () => {
      const places = await fetchFoodPlaces();
      setFoodPlaces(places);
      setFilteredPlaces(places);
    };

    getFoodPlaces();
  }, []);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  useEffect(() => {
    const results = foodPlaces.filter((place) =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlaces(results);
  }, [searchTerm, foodPlaces]);

  useEffect(() => {
    const loadFoodTypes = async () => {
      const data = await fetchFoodTypes();
      setFoodTypes(data);
    };
    loadFoodTypes();
  }, []);

  return (
    <>
      <div className="map-page-main py-4">
        <div className="container-fluid pb-5 pt-2">
          <div className="row">
            <div className="col-xl-4 col-md-5 p-0 col-lg-4">
              <div className="main-map-box-rounded">
                <div className="map-listing-box ps-4">
                  <div className="input-bookmark-icon py-3 d-flex align-items-center">
                    <div className="icon">
                      <Link href="#" className="text-decoration-none text-dark">
                        <i className="fa-regular fa-bookmark"></i>
                      </Link>
                    </div>
                    <div className="input-container-2">
                      <i className="fa fa-search"></i>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place, index) => (
                      <div
                        key={index}
                        className="row align-items-center row-pad-map"
                        onClick={() => handlePlaceClick(place)}
                      >
                        <div className="col-xl-5 col-lg-12">
                          <img
                            src={
                              place.image_url &&
                                !place.image_url.includes("localhost")
                                ? place.image_url
                                : defaultUrl
                            }
                            alt={place.title || "Food Place"}
                            style={{
                              width: "100%",
                              height: "170px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-xl-7 col-lg-12">
                          <div className="map-list-dtl">
                            <div
                              className="map-head"
                              data-bs-toggle="modal"
                              data-bs-target="#mapmodal"
                            >
                              <Link href="#" className="text-decoration-none">
                                <h3>{place.title}</h3>
                              </Link>
                            </div>
                            <div className="stars d-flex align-items-center">
                              <div className="strs-map">
                                {[...Array(place.rating)].map((_, i) => (
                                  <i key={i} className="fa-solid fa-star"></i>
                                ))}
                                {[...Array(5 - place.rating)].map((_, i) => (
                                  <i
                                    key={i}
                                    className="fa-regular fa-star-half-stroke"
                                  ></i>
                                ))}
                              </div>
                              <p className="m-0 ps-2">
                                ({place.reviews} Reviews) <span>. Open</span>
                              </p>
                            </div>
                            <div className="map-location d-flex">
                              <i className="bi bi-geo-alt"></i>
                              <p>{place.location}</p>
                            </div>
                          </div>
                        </div>
                        <div className="border-btm-map-li"></div>
                      </div>
                    ))
                  ) : (
                    <div className="centered-message  mt-4">
                      No places available for this Search.
                    </div>
                  )}

                  <div
                    className="modal fade"
                    id="mapmodal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      style={{
                        maxWidth: "600px",
                        width: "100%",
                        height: "600px",
                      }}
                    >
                      <div className="modal-content modal-border-radius">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Details
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div
                          className="modal-body modal-pad-map"
                          style={{
                            padding: "20px",
                            height: "calc(100% - 100px)", // Adjust height to leave space for header and footer
                            overflow: "auto", // Prevent scrolling in the body
                          }}
                        >
                          <button
                            type="button"
                            className="map-modal-close-btn text-white border-0"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            {/* <i className="fa-solid fa-xmark"></i> */}
                          </button>
                          <div
                            id="carouselExampleControls"
                            className="carousel slide"
                          >
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img
                                  src={
                                    selectedPlace?.image_url &&
                                      !selectedPlace?.image_url.includes(
                                        "localhost"
                                      ) &&
                                      selectedPlace?.image_url !== ""
                                      ? selectedPlace?.image_url
                                      : defaultUrl
                                  }
                                  style={{
                                    width: "300px",
                                    height: "320px",
                                    objectFit: "cover",
                                  }}
                                  className="d-block w-100 modal-border-radius"
                                  alt="Slide 1"
                                />
                              </div>
                              <div className="carousel-item">
                                <img
                                  src={
                                    selectedPlace?.image_url2 &&
                                      !selectedPlace?.image_url2.includes(
                                        "localhost"
                                      ) &&
                                      selectedPlace?.image_url2 !== ""
                                      ? selectedPlace?.image_url2
                                      : defaultUrl
                                  }
                                  style={{
                                    width: "300px",
                                    height: "320px",
                                    objectFit: "cover",
                                  }}
                                  className="d-block w-100 modal-border-radius"
                                  alt="Slide 2"
                                />
                              </div>
                              <div className="carousel-item">
                                <img
                                  src={
                                    selectedPlace?.image_url3 &&
                                      !selectedPlace?.image_url3.includes(
                                        "localhost"
                                      ) &&
                                      selectedPlace?.image_url3 !== ""
                                      ? selectedPlace?.image_url3
                                      : defaultUrl
                                  }
                                  style={{
                                    width: "300px",
                                    height: "320px",
                                    objectFit: "cover",
                                  }}
                                  className="d-block w-100 modal-border-radius"
                                  alt="Slide 3"
                                />
                              </div>
                            </div>

                            <button
                              className="carousel-control-prev modal-btn-prev"
                              type="button"
                              data-bs-target="#carouselExampleControls"
                              data-bs-slide="prev"
                            >
                              <span
                                className="fas fa-chevron-left"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next modal-btn-next"
                              type="button"
                              data-bs-target="#carouselExampleControls"
                              data-bs-slide="next"
                            >
                              <span
                                className="fas fa-chevron-right"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                          <div className="map-modal-border">
                            <div className="map-modal-content">
                              <div className="head d-flex justify-content-between align-items-center">
                                <Link
                                  href={'#'}
                                >
                                  <h3>
                                    {selectedPlace
                                      ? selectedPlace.title
                                      : "Not Mentioned "}
                                  </h3>
                                </Link>
                                <Link href="#">
                                  {" "}
                                  <i className="fa-regular fa-bookmark"></i>
                                </Link>
                              </div>
                              <div className="modal-stars d-flex justify-content-between align-items-center">
                                <div className="stars d-flex align-items-center">
                                  <div className="strs-map">
                                    {[...Array(selectedPlace?.rating || 0)].map(
                                      (_, i) => (
                                        <i
                                          key={i}
                                          className="fa-solid fa-star"
                                        ></i>
                                      )
                                    )}
                                    {[
                                      ...Array(
                                        5 - (selectedPlace?.rating || 0)
                                      ),
                                    ].map((_, i) => (
                                      <i
                                        key={i}
                                        className="fa-regular fa-star-half-stroke"
                                      ></i>
                                    ))}
                                  </div>
                                  <p className="m-0 ps-2">
                                    ({selectedPlace?.reviews || 0} Reviews){" "}
                                    <span>. Open</span>
                                  </p>
                                </div>
                                <div className="write-review-map mt-2">
                                  <Link
                                    href="#"
                                    className="text-decoration-none"
                                    data-bs-toggle="modal"
                                    data-bs-target="#reviewModal"
                                  >
                                    <i className="fa-solid fa-pen me-2"></i>
                                    Write Your Review!
                                  </Link>
                                </div>
                              </div>
                              <div className="restro-name">
                                <p>
                                  {" "}
                                  {selectedPlace?.location || "Loading..."}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="map-modal-timing">
                            <div className="row">
                              <div className="col-lg-6 border-right-modal">
                                <div className="timings">
                                  <p>Mon - Sun</p>
                                </div>
                                <div className="morning">
                                  <p>
                                    MORNING:{" "}
                                    <span>
                                      <i className="fa-regular fa-clock px-1"></i>{" "}
                                      7:00 Am- 3:00 Pm
                                    </span>
                                  </p>
                                </div>
                                <div className="evening">
                                  <p>
                                    EVENING:{" "}
                                    <span>
                                      <i className="fa-regular fa-clock px-1"></i>{" "}
                                      6:00 Pm- 311:00 Pm
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="modal-map-info">
                                  <div className="location d-flex">
                                    <i className="bi bi-geo-alt"></i>
                                    <p className="m-0">
                                      {selectedPlace?.location || "Loading..."}
                                    </p>
                                  </div>
                                  <div className="contact d-flex align-items-center py-1">
                                    <i className="bi bi-telephone"></i>
                                    <p className="m-0">1234567890</p>
                                  </div>
                                  <div className="website d-flex align-items-center">
                                    <i className="bi bi-globe"></i>
                                    <p className="m-0">Website</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer" data-bs-dismiss="modal">
                          <Link href={`/fooddetails/${selectedPlace?.id}`} className="w-100">
                            <button
                              type="button"
                              className="map-join-table m-auto"
                            >
                              JOIN THE TABLE
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* d */}
                </div>
              </div>

              {/* review */}
              <div
                className="modal fade"
                id="reviewModal"
                tabIndex="-1"
                aria-labelledby="reviewModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content ">
                    <div className="modal-header">
                      <h5 className="modal-title" id="reviewModalLabel">
                        Write Your Review
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="main-review-popup-section mt-3">
                            <div className="quality d-flex align-items-center">
                              <div className="title">
                                <h6 className="m-0">Quality</h6>
                              </div>
                              <div className="star-rating ms-2">
                                <span
                                  className="fa fa-star-o str-clr"
                                  data-rating="1"
                                ></span>
                                <span
                                  className="fa fa-star-o str-clr"
                                  data-rating="2"
                                ></span>
                                <span
                                  className="fa fa-star-o str-clr"
                                  data-rating="3"
                                ></span>
                                <span
                                  className="fa fa-star-o str-clr"
                                  data-rating="4"
                                ></span>
                                <span
                                  className="fa fa-star-o str-clr"
                                  data-rating="5"
                                ></span>
                                <input
                                  type="hidden"
                                  name="whatever1"
                                  className="rating-value"
                                  value="2.56"
                                />
                              </div>
                            </div>
                            <div className="mb-3 review-input">
                              <label for="reviewName" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="reviewName"
                              />
                            </div>
                            <div className="mb-3 review-input">
                              <label for="reviewTitle" className="form-label">
                                Title
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="reviewTitle"
                              />
                            </div>
                            <div className="mb-3 review-input">
                              <label for="reviewText" className="form-label">
                                Message
                              </label>
                              <textarea
                                className="form-control"
                                id="reviewText"
                                rows="5"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="border-0 close-btn"
                        data-bs-dismiss="modal"
                      >
                        CLOSE
                      </button>
                      <button type="button" className="border-0 submit-btn">
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8  col-md-7 col-lg-8">
              <div className="map-menu-top">
                <div className="menus d-flex justify-content-evenly custom-row">
                  {foodTypes.map((food, index) => (
                    <Link
                      href="/foodie"
                      key={index}
                      className="text-decoration-none custom-col"
                    >
                      <div className="menu-1 d-flex align-items-center justify-content-between">
                        <img src={food.image_url || cafe.src} />

                        <p className="m-0">{food.title}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="dropdown custom-col margin-md-mt">
                    <Link
                      href="#"
                      className="text-decoration-none dropdown-toggle"
                      id="dropdownMenuLink-map"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="menu-1 more-drpdwn d-flex align-items-center justify-content-between">
                        <p className="m-0">More...</p>
                      </div>
                    </Link>

                    <ul
                      className="dropdown-menu map-page-dropdown"
                      aria-labelledby="dropdownMenuLink-map"
                    >
                      {foodTypes.map((foodType) => (
                        <li key={foodType.id}>
                          <Link
                            className="dropdown-item d-flex align-items-center"
                            href="/foodie"
                          >
                            <img
                              src={foodType.image_url || cafe.src}
                              className="me-2"
                            />
                            {foodType.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="map-main-section">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21022.776116673373!2d2.0985952249338164!3d48.80389838067096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67db475f420bd%3A0x869e00ad0d844aba!2s78000%20Versailles%2C%20France!5e0!3m2!1sen!2sin!4v1723466121545!5m2!1sen!2sin"
                    width="100%"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
