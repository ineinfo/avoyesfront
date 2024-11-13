import React from "react";
import Link from "next/link";

const Map = () => {
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
                      <input type="text" placeholder="Search..." />
                    </div>
                  </div>
                  <div className="row align-items-center row-pad-map">
                    <div className="col-xl-5 col-lg-12">
                      <img src="/map-1.png" alt="" />
                    </div>
                    <div className="col-xl-7 col-lg-12">
                      <div className="map-list-dtl">
                        <div
                          className="map-head"
                          data-bs-toggle="modal"
                          data-bs-target="#mapmodal"
                        >
                          <Link href="#" className="text-decoration-none">
                            <h3>The Cookhouse</h3>
                          </Link>
                        </div>
                        <div className="stars d-flex align-items-center">
                          <div className="strs-map">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </div>
                          <p className="m-0 ps-2">
                            (124 Reviews) <span>. Open</span>
                          </p>
                        </div>
                        <div className="map-location d-flex ">
                          <i className="bi bi-geo-alt"></i>
                          <p>
                            Suite 629 695 Gutmann Lights, West Emeryside, CO
                            40675
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-btm-map-li"></div>
                  <div className="row align-items-center row-pad-map">
                    <div className="col-xl-5 col-lg-12">
                      <img src="/map-2.png" alt="" />
                    </div>
                    <div className="col-xl-7 col-lg-12">
                      <div className="map-list-dtl">
                        <div
                          className="map-head"
                          data-bs-toggle="modal"
                          data-bs-target="#mapmodal"
                        >
                          <Link href="#" className="text-decoration-none">
                            <h3>The Globule Kitchen</h3>
                          </Link>
                        </div>
                        <div className="stars d-flex align-items-center">
                          <div className="strs-map">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </div>
                          <p className="m-0 ps-2">
                            (124 Reviews) <span>. Open</span>
                          </p>
                        </div>

                        <div className="map-location d-flex ">
                          <i className="bi bi-geo-alt"></i>
                          <p>
                            Suite 629 695 Gutmann Lights, West Emeryside, CO
                            40675
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-btm-map-li"></div>
                  <div className="row align-items-center row-pad-map">
                    <div className="col-xl-5 col-lg-12">
                      <img src="/map-3.png" alt="" />
                    </div>
                    <div className="col-xl-7 col-lg-12">
                      <div className="map-list-dtl">
                        <div
                          className="map-head"
                          data-bs-toggle="modal"
                          data-bs-target="#mapmodal"
                        >
                          <Link href="#" className="text-decoration-none">
                            <h3>Tinnelo</h3>
                          </Link>
                        </div>
                        <div className="stars d-flex align-items-center">
                          <div className="strs-map">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </div>
                          <p className="m-0 ps-2">
                            (124 Reviews) <span>. Open</span>
                          </p>
                        </div>
                        <div className="map-location d-flex ">
                          <i className="bi bi-geo-alt"></i>
                          <p>
                            Suite 629 695 Gutmann Lights, West Emeryside, CO
                            40675
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-btm-map-li"></div>
                  <div className="row align-items-center row-pad-map">
                    <div className="col-xl-5 col-lg-12">
                      <img src="/map-4.png" alt="" />
                    </div>
                    <div className="col-xl-7 col-lg-12">
                      <div className="map-list-dtl">
                        <div
                          className="map-head"
                          data-bs-toggle="modal"
                          data-bs-target="#mapmodal"
                        >
                          <Link href="#" className="text-decoration-none">
                            <h3>Gardenia</h3>
                          </Link>
                        </div>
                        <div className="stars d-flex align-items-center">
                          <div className="strs-map">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </div>
                          <p className="m-0 ps-2">
                            (124 Reviews) <span>. Open</span>
                          </p>
                        </div>
                        <div className="map-location d-flex ">
                          <i className="bi bi-geo-alt"></i>
                          <p>
                            Suite 629 695 Gutmann Lights, West Emeryside, CO
                            40675
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-btm-map-li"></div>
                  <div className="row align-items-center row-pad-map">
                    <div className="col-xl-5 col-lg-12">
                      <img src="/map-5.png" alt="" />
                    </div>
                    <div className="col-xl-7 colo-lg-12">
                      <div className="map-list-dtl">
                        <div
                          className="map-head"
                          data-bs-toggle="modal"
                          data-bs-target="#mapmodal"
                        >
                          <Link href="#" className="text-decoration-none">
                            <h3>The Cookhouse</h3>
                          </Link>
                        </div>
                        <div className="stars d-flex align-items-center">
                          <div className="strs-map">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </div>
                          <p className="m-0 ps-2">
                            (124 Reviews) <span>. Open</span>
                          </p>
                        </div>
                        <div className="map-location d-flex ">
                          <i className="bi bi-geo-alt"></i>
                          <p>
                            Suite 629 695 Gutmann Lights, West Emeryside, CO
                            40675
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-btm-map-li"></div>
                  <div
                    className="modal fade"
                    id="mapmodal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered" style={{ minHeight: "60vh" }}>
                      <div className="modal-content modal-border-radius">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            More Information
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body modal-pad-map">
                          <button
                            type="button"
                            className="map-modal-close-btn text-white border-0"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                          <div
                            id="carouselExampleControls"
                            className="carousel slide"
                          >
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img
                                  src="/map-1.png"
                                  className="d-block w-100 modal-border-radius"
                                  alt="Slide 1"
                                />
                              </div>
                              <div className="carousel-item">
                                <img
                                  src="/map-2.png"
                                  className="d-block w-100 modal-border-radius"
                                  alt="Slide 2"
                                />
                              </div>
                              <div className="carousel-item">
                                <img
                                  src="/map-3.png"
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
                                <h3>The Cookhouse</h3>
                                <Link href="#">
                                  {" "}
                                  <i className="fa-regular fa-bookmark"></i>
                                </Link>
                              </div>
                              <div className="modal-stars d-flex justify-content-between align-items-center">
                                <div className="stars d-flex align-items-center">
                                  <div className="str d-flex">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star-half-stroke"></i>
                                  </div>
                                  <p className="m-0 ps-2">
                                    (124 Reviews) <span>. Open</span>
                                  </p>
                                </div>
                                <div className="write-review-map mt-2">
                                  <Link
                                    href="#"
                                    className="text-decoration-none"
                                    data-bs-toggle="modal"
                                    data-bs-target="#reviewModal"
                                  >
                                    <i className="fa-solid fa-pen me-2"></i>Write
                                    Your Review!
                                  </Link>
                                </div>
                              </div>
                              <div className="restro-name">
                                <p>Contemporary Louisiana Restaurant</p>
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
                                      Suite 629 695 Gutmann Lights, West
                                      Emeryside, CO 40675
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
                        <div className="modal-footer">
                          <Link href="#" className="w-100">
                            <button type="button" className="map-join-table m-auto">
                              JOIN THE TABLE
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                  <Link href="#" className="text-decoration-none custom-col">
                    <div className="menu-1  d-flex align-items-center justify-content-between">
                      <img src=" /cafe.png" alt="" />
                      <p className="m-0">Cafe</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="text-decoration-none custom-col lptp-lg-none"
                  >
                    <div className="menu-1 d-flex align-items-center justify-content-between">
                      <img src=" /gym.png" alt="" />
                      <p className="m-0">Gym</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="text-decoration-none custom-col phone-d-none"
                  >
                    <div className="menu-1 d-flex align-items-center justify-content-between">
                      <img src=" /hotels.png" alt="" />
                      <p className="m-0">Hotel</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="text-decoration-none custom-col d-col-none-lg"
                  >
                    <div className="menu-1 d-flex align-items-center justify-content-between">
                      <img src=" /saloon.png" alt="" />
                      <p className="m-0">salon</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="text-decoration-none custom-col margin-md-mt d-col-none-lg"
                  >
                    <div className="menu-1 d-flex align-items-center justify-content-between">
                      <img src=" /museums.png" alt="" />
                      <p className="m-0">Museums</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="text-decoration-none custom-col d-col-none-lg"
                  >
                    <div className="menu-1  d-flex align-items-center justify-content-between">
                      <img src=" /cafe.png" alt="" />
                      <p className="m-0">Cafe</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="text-decoration-none custom-col col-resto-md margin-md-mt d-col-none-lg lptp-lg-none"
                  >
                    <div className="menu-1 d-flex align-items-center justify-content-between">
                      <img src=" /restaurant.png" alt="" />
                      <p className="m-0">Restaurant</p>
                    </div>
                  </Link>
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
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <img src="/restaurant.png" alt="" className="me-2" />{" "}
                          Restaurant
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <img src="/shoes (2) 1.png" alt="" className="me-2" />{" "}
                          Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <img src="/accessories 2.png" alt="" className="me-2" />{" "}
                          Accessories
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <img src="/manicure 1.png" alt="" className="me-2" />{" "}
                          Manicure Bar
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <img
                            src="/shopping-bag (13) 1.png"
                            alt=""
                            className="me-2"
                          />{" "}
                          Cloth Shop
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <img src="/home-decor.png" alt="" className="me-2" /> Home
                          Decor Shop
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <img src="/shop 1.png" alt="" className="me-2" /> Craft
                          Shop
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center border-0"
                          href="#"
                        >
                          <img src="/gallery 1.png" alt="" className="me-2" /> Art
                          Gallery
                        </Link>
                      </li>
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
