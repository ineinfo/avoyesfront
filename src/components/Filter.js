"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Link from "next/link";

const Filter = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // Inline styles
  const checkboxStyle = {
    marginBottom: "15px", // Space between checkboxes
  };

  const checkedStyle = {
    backgroundColor: "blue", // Background color when checked
    borderColor: "blue", // Border color when checked
    color: "white", // Text color when checked
  };

  const uncheckedStyle = {
    backgroundColor: "white", // Background color when unchecked
    borderColor: "gray", // Border color when unchecked
  };
  return (
    <>
      <div className="side-bar-left">
        <div className="filter">
          <button
            className="filterBtn"
            id="filterBtn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <img src="/filter-icon.png" alt="Filter Button Icon" />
            Filter
            <i className="fa-solid fa-chevron-down ms-3"></i>
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            <img src="/filter-icon.png" alt="Filter Button Icon" /> Filter
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row">
            <div className="col-xl-5 left-tab-bg p-0">
              <div className="filter-list">
                {[1, 2, 3, 4, 5, 6].map((tab) => (
                  <div
                    key={tab}
                    className={`tab ${activeTab === tab ? "active" : ""}`}
                    onClick={() => handleTabClick(tab)}
                    data-tab={tab}
                  >
                    {tab === 1
                      ? "Category"
                      : tab === 2
                        ? "Rating"
                        : tab === 3
                          ? "Price"
                          : tab === 4
                            ? "Best For"
                            : tab === 5
                              ? "Availability"
                              : "Type"}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-7">
              {activeTab === 1 && (
                <div id="tab-1" className="tab-content custom-tab active">
                  <p className="cat-head">Categories</p>
                  {/* Category checkboxes go here */}
                  {[
                    { id: "cat1", label: "Vintage" },
                    { id: "category2", label: "Thrifted" },
                    { id: "category3", label: "OMG" },
                    { id: "category4", label: "Location" },
                    { id: "category5", label: "Eco Plus" },
                    { id: "category6", label: "Bags" },
                    { id: "category7", label: "Accessories" },
                  ].map(({ id, label }) => (
                    <div className="form-check" key={id} style={checkboxStyle}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={id}
                        onChange={handleCheckboxChange}
                      // style={checkedItems[id] ? checkedStyle : uncheckedStyle} // Apply dynamic style
                      />
                      <label className="form-check-label" htmlFor={id}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 2 && (
                <div id="tab-2" className="tab-content custom-tab active">
                  <p className="cat-head">Rating</p>
                  {/* Rating checkboxes */}
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="5"
                      id="rate5"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label rate-check"
                      htmlFor="rate5"
                    >
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star str-color"></i>
                      ))}
                      &Above
                    </label>
                  </div>

                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="4"
                      id="rate4"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label rate-check"
                      htmlFor="rate4"
                    >
                      {[...Array(4)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star str-color"></i>
                      ))}
                      <i className="fa-regular fa-star str-color"></i>
                      &Above
                    </label>
                  </div>

                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="3"
                      id="rate3"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label rate-check"
                      htmlFor="rate3"
                    >
                      {[...Array(3)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star str-color"></i>
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <i key={i} className="fa-regular fa-star str-color"></i>
                      ))}
                      &Above
                    </label>
                  </div>

                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="2"
                      id="rate2"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label rate-check"
                      htmlFor="rate2"
                    >
                      {[...Array(2)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star str-color"></i>
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <i key={i} className="fa-regular fa-star str-color"></i>
                      ))}
                      &Above
                    </label>
                  </div>

                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      id="rate1"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label rate-check"
                      htmlFor="rate1"
                    >
                      <i className="fa-solid fa-star str-color"></i>
                      {[...Array(4)].map((_, i) => (
                        <i key={i} className="fa-regular fa-star str-color"></i>
                      ))}
                      &Above
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div id="tab-3" className="tab-content custom-tab active">
                  <p className="cat-head">Price</p>
                  {/* Price checkboxes */}
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="0-50"
                      id="price1"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="price1">
                      $0 - $50
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="50-100"
                      id="price2"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="price2">
                      $50 - $100
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="100-150"
                      id="price3"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="price3">
                      $100 - $150
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="150-200"
                      id="price4"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="price4">
                      $150 - $200
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="200+"
                      id="price5"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="price5">
                      $200+
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div id="tab-4" className="tab-content custom-tab active">
                  <p className="cat-head">Best For</p>
                  {/* Best For checkboxes go here */}
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="bestFor1"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="bestFor1">
                      Beginners
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="bestFor2"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="bestFor2">
                      Intermediate
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="bestFor3"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="bestFor3">
                      Professionals
                    </label>
                  </div>
                </div>
              )}
              {activeTab === 5 && (
                <div id="tab-5" className="tab-content custom-tab active">
                  <p className="cat-head">Availability</p>
                  <div className="form-check cat-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="includeOutOfStock"
                      id="available1"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="available1">
                      Include Out of Stock
                    </label>
                  </div>
                  <div className="form-check cat-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="available"
                      id="available2"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="available2">
                      Available
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 6 && (
                <div id="tab-6" className="tab-content custom-tab active">
                  <p className="cat-head">Type</p>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="type1"
                      id="type1"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="type1">
                      Type 1
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="type2"
                      id="type2"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="type2">
                      Type 2
                    </label>
                  </div>
                  <div className="form-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="type3"
                      id="type3"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="type3">
                      Type 3
                    </label>
                  </div>
                </div>
              )}

            </div>
            <div className="sidebar-btns d-flex justify-content-around align-items-center">
              <Link href="#" className="text-decoration-none clear-all">
                Clear All
              </Link>{" "}
              <div className="border-left-sidebar"></div>
              <Link
                href="#"
                className="text-decoration-none apply-filter"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Apply Filter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
