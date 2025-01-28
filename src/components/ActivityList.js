"use client"
import React, { useState, useEffect } from "react";
import defaultImg from "../../public/defaultImg.jpg";
import { fetchActivities } from "@/utils/api/ActivityApi";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safe to use document or window here
      console.log("Nikhil", document.getElementById("example"));
    } else {
      console.log("Nikhil We are on the server");
    }
  }, []);


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

    getActivities();
  }, []);

  // Format date range and time
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

  // Filter activities based on selected filter
  const filterActivities = (activities, filter) => {
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
          return activityDate >= startOfNextWeek && activityDate <= endOfNextWeek;
        case "next-weekend":
          const nextSaturday = new Date(startOfNextWeek);
          nextSaturday.setDate(startOfNextWeek.getDate() + (6 - startOfNextWeek.getDay()));
          const nextSunday = new Date(nextSaturday);
          nextSunday.setDate(nextSaturday.getDate() + 1);
          return activityDate >= nextSaturday && activityDate <= nextSunday;
        case "this-month":
          return activityDate >= startOfMonth && activityDate < new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 1);
        default:
          return true; // No filter applied
      }
    });

    return filtered;
  };

  const filteredActivities = filterActivities(activities, filter);

  return (
    <div className="activity-tab-content">
      <div className="heading-area text-center">
        <h2>Activités à la une</h2>
      </div>
      <div className="container mt-5">
        <ul className="activity-tab-content-nav nav nav-tabs" id="myTab" role="tablist">
          {["all", "today", "tomorrow", "this-week", "this-weekend", "next-week", "next-weekend", "this-month"].map((tab) => (
            <li className="nav-item" role="presentation" key={tab}>
              <a
                className={`nav-link ${filter === tab ? "active" : ""}`}
                onClick={() => setFilter(tab)} // Update filter on click
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/-/g, " ")}
              </a>
            </li>
          ))}
        </ul>
        <div className="row mt-5">
          {filteredActivities.map((activity) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={activity.id}>
              <div className="content-box">
                <div className="img-zoom">
                  <img
                    src={activity.image_url ? activity.image_url : defaultImg.src}
                    alt={activity.title}
                    className="img-fluid mb-2"
                    // style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  />
                </div>
                <div className="box">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>
                      <a href={`/activitydetail/${activity.id}`}>{activity.title}</a>
                    </h5>
                    {/* <div className="rate">
                      <p className="m-0">
                        4.2<i className="fa-solid fa-star"></i>
                      </p>
                    </div> */}
                  </div>
                  <h6>hosted by {activity.hosted_by}</h6>
                  <div className="date-time-section d-flex justify-content-between align-items-center">
                    <div className="date">
                      <i className="fas fa-calendar-alt"></i> {formatDateRange(activity.start_datetime, activity.end_datetime)}
                    </div>
                    <div className="separator">|</div>
                    <div className="time">
                      <i className="fas fa-clock" style={{ marginRight: "8px" }}></i>
                      <span>
                        {formatTime(activity.start_datetime)} - {formatTime(activity.end_datetime)}
                      </span>
                    </div>
                  </div>
                  <div className="location-section">
                    <div className="location d-flex align-items-center">
                      <i className="fas fa-map-marker-alt"></i>
                      <span className="location-name">{activity.location}</span>
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

      </div>
    </div>
  );
};

export default ActivityList;
