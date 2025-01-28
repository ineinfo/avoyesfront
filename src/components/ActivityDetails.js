"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchActivityDetails } from "@/utils/api/ActivityApi";
import LoadingSpinner from "./Loading";
import Image from "next/image";

const ActivityDetails = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const adultsOptions = Array.from({ length: 10 }, (_, i) => i + 1);


    useEffect(() => {

        const getActivityDetails = async () => {
            try {
                const activityData = await fetchActivityDetails(id);
                setActivity(activityData);
                setMainImage(activityData.files[0].file);
            } catch (error) {
                console.error("Error fetching activity details:", error);
            }
        };

        getActivityDetails();
    }, [id]);



    const startDate = activity ? new Date(activity.start_datetime) : null;
    const endDate = activity ? new Date(activity.end_datetime) : null;

    const formattedDate = startDate
        ? startDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    const startTime = startDate
        ? startDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })
        : "";

    const endTime = endDate
        ? endDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })
        : "";

    const displayImage = (imageUrl) => {
        setMainImage(imageUrl);
    };

    if (!activity) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div id="home">
                {/* header */}
                <div className="breadcrumb-marketplace py-5">
                    <div className="img">
                   
                        <div className="container">
                            <div className="bread-head text-end">
                                <div className="link d-flex align-items-center justify-content-end">
                                    <a href="/" className="text-decoration-none me-1">HOME</a>
                                    <a href="/activity" className="text-decoration-none">/ activity </a>
                                    <p className="m-0 ps-1"></p>
                                </div>
                                {activity && activity.title && <h1>{activity.title}</h1>} {/* Only render h1 if activity.title exists */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional details about the activity */}
                <div className="activity-detail-page">
                    <div className="container ">
                        <div className="row">
                            <h2>{activity.title}</h2>
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12 custom-layout activity-detail-content">
                                <div className="row">
                                    <div className="review-section">
                                        {/* <!-- Star Rating --> */}
                                        <div className="star-rating-host mb-3">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star-half-alt"></i>

                                            <span>   207 Reviews</span>
                                            <span className="separator">|</span>
                                            {/* <!-- Location --> */}
                                            <a href="#">
                                                <span>
                                                    <i className="fa fa-map-marker-alt"></i> {activity.location}
                                                </span>
                                            </a>

                                            <span className="separator">|</span>
                                            {/* <!-- Share Icon --> */}
                                            <a href="">
                                                <span>
                                                    <i className="fa fa-share"></i> Share
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Image Thumbnails */}
                                    <div className="col-3 thumb-margin-custom text-center">
                                        {activity.files.map((file) => (
                                            <img
                                                key={file.iid}
                                                src={file.file}
                                                className="custom-thumbnail w-75"
                                                alt={`Thumbnail ${file.iid}`}
                                                onClick={() => displayImage(file.file)}
                                            />
                                        ))}
                                    </div>

                                    {/* Main Image */}
                                    <div className="col-9 custom-img-box text-center">
                                        <img
                                            id="mainImageCustom"
                                            src={mainImage}
                                            className="main-custom-img w-100"
                                            alt="Main activity image"
                                        />
                                    </div>

                                </div>

                                {/* <!-- Custom Image Modal --> */}
                                <div className="custom-modal" id="imageModalCustom" style={{ display: 'none' }}>
                                    <div className="custom-modal-content">
                                        <span className="close-custom">&times;</span>
                                        <img id="modalImageCustom" src="" className="modal-custom-img"/>
                                    </div>
                                </div>

                                {/* description */}

                                <div className="activities-detail-content mb-5">
                                    {/* <p>{activity.description}</p> */}
                                    <p dangerouslySetInnerHTML={{ __html: activity?.description || "" }}></p>
                                    <h3>Key highlights include:</h3>
                                    <ul>
                                        <li>static</li>
                                    </ul>
                                    <h3>About the Activity::</h3>
                                    <ul>
                                        <li>  <p dangerouslySetInnerHTML={{ __html: activity?.description || "" }}></p>   </li>
                                        <li>  <p dangerouslySetInnerHTML={{ __html: activity?.description || "" }}></p>   </li>


                                    </ul>
                                    <h3> Event Details:</h3>
                                    <h5>
                                        <li> Date </li>
                                    </h5>

                                    <p className="ms-3">{formattedDate}</p>
                                    <h5>
                                        <li>
                                            Time
                                        </li>
                                    </h5>
                                    <p className="ms-3">{startTime} - {endTime}</p>
                                    <h5>
                                        <li>
                                            Location </li>
                                    </h5>

                                    <p className="ms-3">{activity.location}</p>

                                    <h3> Refund Policy</h3>
                                    <p>We do not entertain any refund or cancellation request.</p>
                                </div>


                                {/* rating div - 365- <div className="activities-detail-content mb-5"></div> */}

                                <div className="activities-detail-content mb-5">
                                    <div className="container my-5">
                                        <div className="row">
                                            {/* <!-- Rating Section --> */}
                                            <div className="col-lg-4 col-md-6 col-sm-12 text-left">
                                                <h4>Reviews</h4>
                                                <div className="d-flex justify-content-start align-items-center ">
                                                    <span className="rating-score display-4">4.5</span>
                                                    <div className="stars ml-2">
                                                        {/* <!-- Stars display using FontAwesome icons --> */}
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                    </div>
                                                </div>
                                                <p className="total-reviews">2234 Reviews</p>
                                            </div>

                                            {/* <!-- Progress Bars Section --> */}
                                            <div className="col-lg-8 col-md-6 col-sm-12">
                                                <div className="rating-bar-wrapper">
                                                    {/* <!-- Rating 5 Stars --> */}
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <span>5 Stars</span>
                                                        <div className="progress" style={{ width: '70%' }}>
                                                            <div
                                                                className="progress-bar bg-dark"
                                                                role="progressbar"
                                                                data-target="1234"
                                                                style={{ width: '80%' }}
                                                            ></div>
                                                        </div>
                                                        <span className="rating-count">1234</span>
                                                    </div>
                                                    {/* <!-- Rating 4 Stars --> */}
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <span>4 Stars</span>
                                                        <div className="progress" style={{ width: '70%' }}>
                                                            <div
                                                                className="progress-bar bg-dark"
                                                                role="progressbar"
                                                                data-target="123"
                                                                style={{ width: '10%' }}
                                                            ></div>
                                                        </div>
                                                        <span className="rating-count">123</span>
                                                    </div>
                                                    {/* <!-- Rating 3 Stars --> */}
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <span>3 Stars</span>
                                                        <div className="progress" style={{ width: '70%' }}>
                                                            <div
                                                                className="progress-bar bg-dark"
                                                                role="progressbar"
                                                                data-target="56"
                                                                style={{ width: '5%' }}
                                                            ></div>
                                                        </div>
                                                        <span className="rating-count">56</span>
                                                    </div>
                                                    {/* <!-- Rating 2 Stars --> */}
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <span>2 Stars</span>
                                                        <div className="progress" style={{ width: '70%' }}>
                                                            <div
                                                                className="progress-bar bg-dark"
                                                                role="progressbar"
                                                                data-target="43"
                                                                style={{ width: '3%' }}
                                                            ></div>
                                                        </div>
                                                        <span className="rating-count">43</span>
                                                    </div>
                                                    {/* <!-- Rating 1 Star --> */}
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <span>1 Star</span>
                                                        <div className="progress" style={{ width: '70%' }}>
                                                            <div
                                                                className="progress-bar bg-dark"
                                                                role="progressbar"
                                                                data-target="2"
                                                                style={{ width: '1%' }}
                                                            ></div>
                                                        </div>
                                                        <span className="rating-count">2</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* revies -440-   <div className="activities-detail-content mb-5"></div> */}

                                <div className="activities-detail-content mb-5">
                                    <div className="container mt-5">
                                        <h2 className="text-left mb-4">(2356) Reviews</h2>

                                        <div className="review-item">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img className="circular-image" src="/circle.jpg" alt="Art Workshop 1" />
                                                </div>
                                                <div>
                                                    <div className="star-rating">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                    </div>
                                                    <h5 className="mb-1">Mercelina Deo</h5>
                                                </div>
                                            </div>
                                            <p className="mt-2">Immerse yourself in the vibrant world of modern art! This
                                                workshop
                                                offers a
                                                deep
                                                .</p>

                                        </div>

                                        <div className="review-item">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img src="/circle.jpg" alt="Art Workshop 1" />
                                                </div>
                                                <div>
                                                    <div className="star-rating">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                    </div>
                                                    <h5 className="mb-1">Mercelina Deo</h5>
                                                </div>
                                            </div>
                                            <p className="mt-2">Immerse yourself in the vibrant world of modern art! This
                                                workshop
                                                offers a
                                                deep
                                            </p>

                                        </div>


                                    </div>
                                </div>



                            </div>

                            {/* <!-- Right Side (4 columns) with Form, Button, and Map --> */}
                            <div className="col-lg-4 sticky-container ">
                                <div className="sticky-content">
                                    <div className="activities-detail-content mb-2">
                                        <h2>Select Date</h2>
                                        <form>
                                            <div className="mb-3">

                                                <div className="input-group">
                                                    {/* <!-- Left-side calendar icon -->

                                            <!-- Date input --> */}
                                                    <input type="date" className="form-control" id="date"
                                                        aria-describedby="calendar-icon" />
                                                </div>
                                            </div>

                                            <button type="button" className="activities-register-btn" data-bs-toggle="modal"
                                                data-bs-target="#registerModal">Register</button>
                                        </form>
                                    </div>
                                    {/* <!-- Sticky Map --> */}
                                    <div className="sticky-map mt-3 sticky-map mb-2">
                                        <div className="activities-detail-content mb-2">
                                            <p className="mb-2"> <i className="fa-solid fa-location-dot"> </i>        {activity.location}
                                            </p>
                                            <iframe
                                                src={activity.map_url || "https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"}
                                                width="100%"
                                                height="250"
                                                // frameBorder="0"
                                                allowFullScreen
                                            ></iframe>

                                        </div>
                                    </div>
                                    {/* <!-- Sticky Host --> */}
                                    <div className="activities-detail-content mb-2 sticky-host mt-2">
                                        <h2 className="mb-3">hosted by</h2>
                                        <div className="host-item d-flex  align-items-center">
                                            <img src="/hosted-activity.png" alt="Art Workshop 3" className="" />
                                            <div>
                                                <div className="star-rating-host ms-3">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star-half-alt"></i>

                                                    <h5 className="mb-1">{activity.hosted_by}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>




                        {/* <!-- Modal for Registration --> */}
                        <div className="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content" style={{ minHeight: "410px" }}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="registerModalLabel">Attend Details</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* <!-- Popup Content with Registration Form and Image --> */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6> {activity.title}</h6>
                                                <select className="form-select mb-3">
                                                    {adultsOptions.map((num) => (
                                                        <option key={num} value={num}>
                                                            {num} Adult{num > 1 ? 's' : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input type="text" className="form-control mb-3" placeholder="First Name" />
                                                <input type="text" className="form-control mb-3" placeholder="Last Name" />
                                                <input type="tel" className="form-control mb-3" placeholder="Phone Number" />
                                                <button className="btn btn-dark w-100">Proceed to Pay</button>
                                            </div>
                                            <div className="col-md-6">
                                                <img className="rounded-image"
                                                    src={mainImage} alt="Selected Image in Popup" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </>
    );
}

export default ActivityDetails;
