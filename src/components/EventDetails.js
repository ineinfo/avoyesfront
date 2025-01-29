"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchEventDetails, fetchEventsVideo, fetchCategories } from "@/utils/api/EventApi";
import axios from 'axios';
import LoadingSpinner from './Loading';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const EventDetails = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [categories, setCategories] = useState([]);
  const [eventCategory, setEventCategory] = useState('');
  const screens = useBreakpoint();

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      console.log("daharaa2", fetchedCategories);

      if (Array.isArray(fetchedCategories.data)) {
        setCategories(fetchedCategories.data);

        // Assuming you want to set eventCategory to the first category
        if (fetchedCategories.data.length > 0) {
          setEventCategory(fetchedCategories.data[0].title); // Adjust this based on your data structure
        }
      }
    };

    getCategories();
  }, []); // Make sure to include dependencies if needed


  useEffect(() => {
    console.log("daharaa1", eventDetails)

    if (eventDetails) {
      const category = categories.find((cat) => cat.id === eventDetails.event_category_id);
      console.log("daharaa", category)
      const title = category?.title
      setEventCategory(title);
    }
  }, [categories, eventDetails]);


  useEffect(() => {
    if (id) {
      const getEventDetails = async () => {
        try {
          const data = await fetchEventDetails(id);
          setEventDetails(data);
        } catch (error) {
          console.error('Error fetching event details:', error);
        } finally {
          setLoading(false);
        }
      };

      const getEventVideo = async () => {
        try {
          const videoData = await fetchEventsVideo();
          if (videoData && videoData.data.length > 0) {
            setVideoUrl(videoData.data[0].video_url);
          }
        } catch (error) {
          console.error('Error fetching event video:', error);
        } finally {
          setLoadingVideo(false);
        }
      };

      getEventDetails();
      getEventVideo();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleTimeString('en-US', options);
  };


  if (loading || loadingVideo) {
    return <div> <LoadingSpinner /></div>;
  }


  if (!eventDetails) {
    return <div>No event details available</div>;
  }

  return (
    <>
      <div className="event-page">
        <div id="home">
          {/* <div className="breadcrumb-marketplace py-5">
            <div className="img">
              <img src="" alt="" />
              <div className="container">
                <div className="bread-head text-end">
                  <div className="link d-flex align-items-center justify-content-end">
                    <a href="/" className="text-decoration-none me-1">HOME</a>
                    <a href="/event" className="text-decoration-none">/ events /</a>
                    <p className="m-0 ps-1">{eventDetails.title}</p>
                  </div>
                  <h1>{eventDetails.title}</h1>
                </div>
              </div>
            </div>
          </div> */}

          {/* Event Video Section */}
          <section>
            <div className="video-sec-evnt" style={screens.sm ? {} : { marginTop: "0" }}>
              <div className="container">
                <div className="video-container" style={screens.sm ? {} : { height: "250px" }}>
                  <iframe
                    width="100%"
                    height={screens.sm ? "700" : "250"}
                    src={`${videoUrl}?controls=0`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Event Video"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          {/* Event Details Section */}
          <section>
            <div className="event-dtl-info-main">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className={`indo-head d-flex justify-content-between ${screens.sm ? "align-items-center" : ""}`}>
                      <h1 style={screens.sm ? {} : { width: "60%", fontSize: "18px", lineHeight: "0" }}>{eventDetails.title}</h1>
                      <p style={screens.sm ? {} : { fontSize: "12px", lineHeight: "0" }}>
                        {new Date(eventDetails.start_date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="evt-dtl-box" style={screens.sm ? {} : { padding: "0" }}>
                      <div className="row">
                        {/* Details Section */}
                        <div className="col-md-6 details-section">
                          <div className="icon-text" style={screens.sm ? {} : { marginBottom: "10px", marginTop: "10px" }} >
                            <i className="bi bi-calendar3 me-2"></i>
                            <span className="evt-dtl-head-lg">Details</span>
                          </div>
                          {/* <p className="evt-dtl-p"><strong className="evt-dtl-head">Start:</strong> {formatDate(eventDetails.start_date)} -  8:00 am</p>
                          <p className="evt-dtl-p"><strong className="evt-dtl-head">End:</strong> {formatDate(eventDetails.end_date)} -  8:00 am</p> */}

                          <p className="evt-dtl-p" style={screens.sm ? {} : { marginBottom: "2px" }} >
                            <strong className="evt-dtl-head">Start:</strong> {formatDate(eventDetails.start_date)} - {formatTime(eventDetails.start_date)}
                          </p>
                          <p className="evt-dtl-p" style={screens.sm ? {} : { marginBottom: "2px" }} >
                            <strong className="evt-dtl-head">End:</strong> {formatDate(eventDetails.end_date)} - {formatTime(eventDetails.end_date)}
                          </p>



                          <p className="evt-dtl-p" style={screens.sm ? {} : { marginBottom: "2px" }} ><strong className="evt-dtl-head">Cost :  </strong> € {eventDetails.cost || "Not mentioned"} /-</p>
                          {/* <p className="evt-dtl-p"><strong className="evt-dtl-head">Event Categories:</strong> {eventDetails.event_category_id}</p> */}
                          <p className="evt-dtl-p" style={screens.sm ? {} : { marginBottom: "2px" }} ><strong className="evt-dtl-head">Event Categories :  </strong> {eventCategory || "Not mentioned"}</p>
                          {/* <p><strong className="evt-dtl-head">Category :</strong> {eventCategory || "Not mentioned"}</p> */}

                        </div>

                        {/* Organizers Section */}
                        <div className="col-md-6 details-section">
                          <div className="icon-text">
                            <i className="bi bi-people me-2"></i>
                            <span className="evt-dtl-head-lg">Organizers</span>
                          </div>
                          {/* <p className="evt-dtl-p"><strong className="evt-dtl-head">{eventDetails.organizer}Avoyes Team</strong></p>
                          <p className="evt-dtl-p"><strong className="evt-dtl-head">Phone:</strong> {eventDetails.organizer_contact}</p> */}
                          <p className="evt-dtl-p" style={screens.sm ? {} : { marginBottom: "2px" }} >
                            <strong className="evt-dtl-head">
                              {eventDetails.organizer || "Not mentioned"}
                            </strong>
                          </p>
                          <p className="evt-dtl-p" style={screens.sm ? {} : { marginBottom: "2px" }} >
                            <strong className="evt-dtl-head">Phone :  </strong>
                            {eventDetails.organizer_contact || "Not mentioned"}
                          </p>



                        </div>
                      </div>
                      <hr className="border-evt" />
                      {/* Venue Section */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="icon-text section-title">
                            <i className="bi bi-geo-alt me-2"></i>
                            <span className="evt-dtl-head-lg">Venue</span>
                          </div>
                          <p><strong className="evt-dtl-p">{eventDetails.location || "Not mentioned"}</strong></p>
                          {/* <p className="evt-dtl-p">{eventDetails.venue_address  || "Not mentioned"}</p>
                          <p className="evt-dtl-p">{eventDetails.venue_city  || "Not mentioned"}, {eventDetails.venue_country  || "Not mentioned"}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="abt-evt-desc">
                      <div className="head">
                        <h1>About this event</h1>
                      </div>
                      <div className="para">
                        {/* <p>{eventDetails.description}</p> */}
                        <p dangerouslySetInnerHTML={{ __html: eventDetails?.description || "" }}></p>
                      </div>
                      <div className="blog-end-dtl d-flex justify-content-between align-items-center">
                        <div className="text">
                          {Array.isArray(eventDetails.tags) && eventDetails.tags.length > 0 ? (
                            eventDetails.tags.map(tag => (
                              <a href="#" key={tag}>{tag.toUpperCase()},</a>
                            ))
                          ) : (
                            <span>No tags available</span> // Optional: Display a message when there are no tags
                          )}
                        </div>
                        <div className="blg-social social-evt-dtl d-flex align-items-center">
                          <p className="m-0">SHARE:</p>
                          <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
                          <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram mx-3"></i></a>
                          <a href="https://www.google.co.in/"><i className="fa-brands fa-tiktok"></i></a>
                        </div>
                      </div>
                    </div>

                    {/* event-multiple div*/}

                  </div>
                  <div className="col-lg-4 evt-sticky-box">
                    <div className="evt-side-box">
                      <div className="evt-loc d-flex">
                        <i className="bi bi-geo-alt"></i>
                        <p>{eventDetails.location}</p>
                      </div>
                      <div className="evt-dtl-map">
                        {/* <iframe
                          src={eventDetails.map_url}                        
                          width="100%" height="330" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                        <iframe
                          src={eventDetails.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7782458348!2d2.2646349990563044!3d48.85893843455474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sin!4v1727960219961!5m2!1sen!2sin"}
                          width="100%"
                          height="330"
                          style={{ border: 0 }}  // Updated to use an object
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />


                      </div>
                    </div>
                    <div className="evt-ticket-btn">
                      <button type="button"><i className="fa-solid fa-ticket"></i> Ticket</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
