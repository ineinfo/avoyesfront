"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import defaultImg from "../../public/event-breadcrumb.png";
import { fetchEvents, fetchCategories } from "@/utils/api/EventApi";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      if (data.status) {
        setEvents(data.data);
      } else {
        setError(data.message);
      }
      setLoading(false);
    };

    const fetchCategoriesData = async () => {
      const categoriesData = await fetchCategories();
      if (categoriesData.status) {
        setCategories(categoriesData.data);
      } else {
        setError(categoriesData.message);
      }
    };

    getEvents();
    fetchCategoriesData();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleTabClick = (event, categoryId) => {
    event.preventDefault(); 
    setSelectedCategoryId(categoryId); 
  };

  const filteredEvents = selectedCategoryId 
    ? events.filter(event => event.event_category_id === selectedCategoryId) 
    : events;

  return (
    <>
   
 
    <div className="event-page"  style={{ marginTop: '40px' }}>
        <div id="home">
        <div className="breadcrumb-marketplace py-5">
            <div className="img">
              <img src="" alt="" />
              <div className="container">
                <div className="bread-head text-end">
                  <div className="link d-flex align-items-center justify-content-end">
                    <a href="/" className="text-decoration-none me-1">HOME</a>
                    <a href="/event" className="text-decoration-none">/ events </a>
                    {/* <p className="m-0 ps-1">{eventDetails.title}</p> */}
                  </div>
                  <h1>All Events</h1>
                </div>
              </div>
            </div>
          </div>
    <section >
      <div className="event-cat-main">
        <div className="container">
          <div className="tab-container">
            <div className="tab-head-event d-flex justify-content-between align-items-center">
              <ul className="nav nav-tabs event-tab d-flex flex-nowrap" id="myTab" role="tablist" style={{ overflowX: 'auto',marginTop: '60px' }}>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${selectedCategoryId === null ? 'active' : ''}`} 
                    id="profile-tab-event"
                    type="button"
                    onClick={(event) => handleTabClick(event, null)} 
                  >
                    <img src="/event-tab.png" alt="" />
                  </button>
                </li>
                <div className="tab-brdr d-flex">
                  {categories.map((category) => (
                    <li className="nav-item" role="presentation" key={category.id}>
                      <a
                        className={`nav-link ${selectedCategoryId === category.id ? 'active' : ''}`}
                        onClick={(event) => handleTabClick(event, category.id)} 
                        href="#"
                      >
                        {category.title}
                      </a>
                    </li>
                  ))}
                </div>
              </ul>
            </div>

            <div className="tab-content evt-tab-content" id="myTabContent">
              <div className="tab-pane fade show active" role="tabpanel">
                <div className="row">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <div className="col-xl-4 col-lg-4" key={event.id}>
                        <div className="trend-1 pt-4">
                          <div className="img">
                            <img src={event.image_url || defaultImg.src} alt={event.title} />
                            <div className="icon">
                              <a href="#">
                                {/* heart-icon */}
                              </a>
                            </div>
                          </div>
                          <div className="trand-text-box">
                            <div className="date-box">
                              <div className="date">
                                <h3>{new Date(event.start_date).getDate()}</h3>
                              </div>
                              <div className="year">
                                <p>{new Date(event.start_date).toLocaleString("default", { month: "long" })} {new Date(event.start_date).getFullYear()}</p>
                              </div>
                            </div>
                            <div className="trand-head">
                              <Link href={`/${event.id}/eventdetails`} className="text-decoration-none">
                                <h6>{event.title}</h6>
                              </Link>
                            </div>
                            <div className="trand-para d-flex justify-content-between align-items-center">
                              <div className="para">
                                <p className="m-0">{event.short_description}</p>
                              </div>
                              <div className="icon">
                                <Link href={`/${event.id}/eventdetails`} className="text-decoration-none">
                                  <i className="fa-solid fa-arrow-right trand-arrow"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No events match your selected category.</p>
                  )}
                </div>
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

export default EventList;
