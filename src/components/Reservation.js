"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Reservation = ({ id }) => {
  const [reservationData, setReservationData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [occasion, setOccasion] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmail, setIsEmail] = useState(false); // To track if the user toggles to email
  const [checkedValues, setCheckedValues] = useState({
    diningOffersOpenTable: false,
    diningOffersRestaurant: false,
    textUpdates: false
  });
  const [isAgreeChecked, setIsAgreeChecked] = useState(false); // For the terms and conditions checkbox

  useEffect(() => {
    const fetchAllData = async (ID) => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/reservation/${ID}`);
        const R_id = response.data.data.food_place_id;
        const response2 = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/food-place/${R_id}`);
        setReservationData(response.data.data);
        setRestaurantData(response2.data.data);
        console.log("response1", response.data.data);
        console.log("response2", response2.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllData(id);
  }, [id]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckedValues((prev) => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleAgreeChange = (e) => {
    setIsAgreeChecked(e.target.checked); // Update the state for terms agreement
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect data to be displayed
    const collectedData = {
      occasion,
      specialRequest,
      phoneNumber,
      isEmail,
      checkedValues
    };
    alert(JSON.stringify(collectedData, null, 2)); // Display the collected data in an alert (or handle it accordingly)
  };

  return (
    <div className="event-page">
      <div id="home">
        <section>
          <div className="map-res-main my-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="map-head-res d-flex" style={{ paddingTop: "15px" }}>
                    <div className="img" style={{}}>
                      <img
                        src={restaurantData?.image_url || "/defaultImg.jpg"}
                        alt=""
                        style={{ objectFit: "cover", height: "80px", width: "80px", borderRadius: "10px" }}
                      />
                    </div>
                    <div className="head">
                      <h3>{restaurantData?.title}</h3>
                      <div className="date-time d-flex align-items-center">
                        <div className="dt d-flex align-items-center">
                          <i className="fa-regular fa-calendar"></i>
                          <p className="m-0">
                            {new Date(reservationData?.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="dt d-flex align-items-center mx-3">
                          <i className="fa-regular fa-user"></i>
                          <p className="m-0">{reservationData?.people} People</p>
                        </div>
                        <div className="dt d-flex align-items-center">
                          <i className="fa-regular fa-clock"></i>
                          <p className="m-0">{reservationData?.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dinner Form */}
                  <div className="phone-country">
                    <div className="head">
                      <h3>Dinner Details</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group call-cntry">
                        <div className="input-container">
                          <input
                            type="text"
                            id="mobile_code"
                            className="form-control phone-input"
                            placeholder={isEmail ? "Email" : "Phone Number"}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            name="phoneNumber"
                          />
                          <div className="iti__selected-flag"></div>
                        </div>
                        <p>
                          You will receive a text message to verify your account. Message & data rates may apply.
                        </p>
                        <div className="use-mail">
                          <a href="#" id="toggle-input" onClick={() => setIsEmail(!isEmail)}>
                            {isEmail ? "Use Phone Number Instead" : "Use Email Instead"}
                          </a>
                        </div>
                      </div>

                      {/* Reservation Details */}
                      <div className="res-details">
                        <div className="head">
                          <h3>Reservation Details</h3>
                        </div>
                        <div className="opt-drp d-flex justify-content-between">
                          <div className="dropdown ocation">
                            <button
                              className="btn btn-secondary dropdown-toggle select-city ocation-drp d-flex justify-content-between align-items-center"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              id="countryDropdown"
                              style={{
                                backgroundColor: "#fff", // Remove default color
                                border: "1px solid #ccc", // Set your custom border
                                color: "#000", // Set text color
                              }}
                            >
                              {occasion || "Select an occasion (Optional)"}
                              {/* <i className="fa fa-chevron-down ms-2 text-dark font-small"></i> */}
                            </button>
                            <ul className="dropdown-menu city-menu">
                              <li>
                                <a className="dropdown-item" href="#" onClick={() => setOccasion("Birthday")}>
                                  Birthday
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#" onClick={() => setOccasion("Party")}>
                                  Party
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#" onClick={() => setOccasion("Other Occasion")}>
                                  Other Occasion
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown request">
                            <button
                              className="btn btn-secondary dropdown-toggle select-city request-drp d-flex justify-content-between align-items-center"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              id="countryDropdown"
                              style={{
                                backgroundColor: "#fff", // Remove default color
                                border: "1px solid #ccc", // Set your custom border
                                color: "#000", // Set text color
                              }}
                            >
                              {specialRequest || "Add a special request (Optional)"}
                              {/* <i className="fa fa-chevron-down ms-2 text-dark font-small"></i> */}
                            </button>
                            <ul className="dropdown-menu city-menu">
                              <li>
                                <a className="dropdown-item" href="#" onClick={() => setSpecialRequest("Birthday")}>
                                  Birthday
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#" onClick={() => setSpecialRequest("Party")}>
                                  Party
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#" onClick={() => setSpecialRequest("Other Occasion")}>
                                  Other Occasion
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="checks">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="diningOffersOpenTable"
                              checked={checkedValues.diningOffersOpenTable}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="diningOffersOpenTable">
                              Sign me up to receive dining offers and news from OpenTable by email.
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="diningOffersRestaurant"
                              checked={checkedValues.diningOffersRestaurant}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="diningOffersRestaurant">
                              Sign me up to receive dining offers and news from this restaurant by email.
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="textUpdates"
                              checked={checkedValues.textUpdates}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="textUpdates">
                              Yes, I want to get text updates and reminders about my reservations.
                            </label>
                          </div>
                        </div>

                        {/* Terms and Conditions Checkbox */}

                        <div style={{ margin: "20px 0", fontSize: "18px" }}>Required</div>
                        <div className="form-check" style={{ marginBottom: "20px" }}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="agreeToTerms"
                            checked={isAgreeChecked}
                            onChange={handleAgreeChange}
                          />
                          <label className="form-check-label" htmlFor="agreeToTerms">
                            I agree to the restaurant’s <a href="#">terms and conditions</a>
                          </label>
                        </div>
                      </div>

                      {/* Complete Reservation Button */}
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={!isAgreeChecked} // Disable button if terms not agreed
                        style={{ backgroundColor: isAgreeChecked ? "#000" : "#ccc", border: 'none' }} // Black background when enabled, gray when disabled
                      >
                        Complete Reservation
                      </button>
                    </form>
                  </div>
                </div>


                <div class="col-lg-6" style={{ paddingTop: "20px", paddingLeft: "50px" }}>
                  <div class="what-to-know">
                    <h3>What to know before you go</h3>
                    <h6>Restaurants terms & conditions</h6>
                    <p>
                      I have read and understand the cook house’s terms and
                      conditions before making a reservation.
                    </p>
                  </div>
                  <div class="what-to-know">
                    <h6>Important dining information</h6>
                    <p>
                      We have a 10 minute grace period. Please call us if you are
                      running later than 10 minutes after your reservation time.We
                      may contact you about this reservation, so please ensure
                      your email and phone number are up to date.Your table will
                      be reserved for 1 hour 30 minutes for parties of up to 6;
                      and 1 hour 45 minutes for parties of 7+.
                    </p>
                  </div>
                  <div class="what-to-know">
                    <h6>take a note from restaurant</h6>
                    <p>
                      When reserving a table, kindly include the number of adults
                      and children in your party.
                    </p>
                    <p>
                      Should your plans change, please let us know 6 hours before
                      your reservation time.
                    </p>
                    <p>
                      Please, be informed that we're serving breakfast from Open
                      until 2:00 PM
                    </p>
                    <p>
                      A service charge of 15% will be applied to tables
                      accommodating 6 or more guests.
                    </p>
                    <p>
                      Bringing your own cake? A service fee of 3 per person
                      (children under 5 excluded) includes cake serving, cutlery,
                      tableware, firework candle, and your choice of music.
                    </p>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reservation;
