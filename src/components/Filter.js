"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRouter } from "next/navigation";
import { fetchBestFor, fetchCategories, fetchRatings, fetchTypes } from "@/utils/api/FilterApi";

const Filter = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const router = useRouter()
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [types, setTypes] = useState([]);
  const [bestFor, setBestFor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const getData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
        // const pricesData = await fetchPrices();
        const ratingsData = await fetchRatings();
        setRatings(ratingsData)
        const typesData = await fetchTypes();
        setTypes(typesData)
        const bestForData = await fetchBestFor();
        setBestFor(bestForData)

      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);


  console.log("categories", categories, ratings, types, bestFor);

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

  const applyFilter = () => {
    const filterData = {
      category: [],
      ratings: [],
      price: [],
      bestFor: [],
      availability: [],
      type: []
    };

    // Iterate over checkedItems to populate filterData
    for (const key in checkedItems) {
      if (checkedItems[key]) {
        // Remove the prefix 'category' or any other prefix from the key
        let value = key;

        if (key.startsWith("category")) {
          value = key.slice(8).toLowerCase(); // Remove 'category' (8 characters)
        } else if (key.startsWith("rate")) {
          value = key.slice(4); // Remove 'rate' (4 characters)
        } else if (key.startsWith("price")) {
          value = key.slice(5); // Remove 'price' (5 characters)
        } else if (key.startsWith("bestFor")) {
          value = key.slice(7); // Remove 'bestFor' (7 characters)
        } else if (key.startsWith("type")) {
          value = key.slice(4); // Remove 'type' (4 characters)
        }

        // Now push the cleaned value to the appropriate filterData array
        if (key.startsWith("category")) {
          filterData.category.push(value);
        } else if (key.startsWith("rate")) {
          filterData.ratings.push(value);
        } else if (key.startsWith("price")) {
          filterData.price.push(value);
        } else if (key.startsWith("bestFor")) {
          filterData.bestFor.push(value);
        } else if (key === "out_of_stock" || key === "in_stock") {
          filterData.availability.push(key);
        } else if (key.startsWith("type")) {
          filterData.type.push(value);
        }
      }
    }

    console.log("Filtered Data:", filterData);
    const encodedData = encodeURIComponent(JSON.stringify(filterData));
    router.push(`/marketplace?data=${encodedData}`);
  };

  const handleClear = () => {
    setCheckedItems({});
    router.push('/marketplace');
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
        data-bs-backdrop="true"
        data-bs-keyboard="true"
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
                  {/* Category checkboxes */}
                  {categories.map(({ id, title }) => (
                    <div className="form-check" key={id} style={checkboxStyle}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`category${id}`}
                        checked={checkedItems[`category${id}`] || false} // Set checked state
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor={`category${id}`}>
                        {title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 2 && (
                <div id="tab-2" className="tab-content custom-tab active">
                  <p className="cat-head">Rating</p>
                  {/* Create a Set to filter out duplicate ratings */}
                  {Array.from(new Set(ratings.map(option => option.ratings))).map((rating) => (
                    <div className="form-check" key={rating} style={checkboxStyle}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={rating}
                        id={`rate${rating}`}
                        checked={checkedItems[`rate${rating}`] || false} // Set checked state
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label rate-check" htmlFor={`rate${rating}`}>
                        {/* Render stars based on the rating */}
                        {[...Array(rating)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star str-color"></i>
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <i key={i} className="fa-regular fa-star str-color"></i>
                        ))}{" "}
                        {rating} & above
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 3 && (
                <div id="tab-3" className="tab-content custom-tab active">
                  <p className="cat-head">Price</p>
                  {/* Price checkboxes */}
                  {[
                    { id: "price0-50", label: "0 - 50" },
                    { id: "price50-100", label: "50 - 100" },
                    { id: "price100-150", label: "100 - 150" },
                    { id: "price150-200", label: "150 - 200" },
                    { id: "price200+", label: "200+" },
                  ].map(({ id, label }) => (
                    <div className="form-check" key={id} style={checkboxStyle}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={id}
                        checked={checkedItems[id] || false} // Set checked state
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor={id}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 4 && (
                <div id="tab-4" className="tab-content custom-tab active">
                  <p className="cat-head">Best For</p>
                  {bestFor.map((item) => (
                    <div key={`bestFor${item.id}`} className="form-check" style={checkboxStyle}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`bestFor${item.id}`}
                        checked={checkedItems[`bestFor${item.id}`] || false}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor={`bestFor${item.id}`}>
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}


              {activeTab === 5 && (
                <div id="tab-5" className="tab-content custom-tab active">
                  <p className="cat-head">Availability</p>
                  <div className="form-check cat-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="out_of_stock"
                      id="out_of_stock"
                      checked={checkedItems["out_of_stock"] || false} // Bind checked state
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="out_of_stock">
                      Out of Stock
                    </label>
                  </div>
                  <div className="form-check cat-check" style={checkboxStyle}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="in_stock"
                      id="in_stock"
                      checked={checkedItems["in_stock"] || false} // Bind checked state
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="in_stock">
                      Available
                    </label>
                  </div>
                </div>
              )}


              {activeTab === 6 && (
                <div id="tab-6" className="tab-content custom-tab active">
                  <p className="cat-head">Type</p>
                  {/* Dynamically render checkboxes for types */}
                  {types.map((type) => (
                    <div key={`type${type.id}`} className="form-check" style={checkboxStyle}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={`type${type.id}`}
                        id={`type${type.id}`}
                        checked={checkedItems[`type${type.id}`] || false} // Bind checked state
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor={`type${type.id}`}>
                        {type.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}

            </div>
            <div className="sidebar-btns d-flex justify-content-around align-items-center">
              <div style={{ cursor: "pointer" }} onClick={handleClear} aria-label="Close" data-bs-dismiss="offcanvas" className="text-decoration-none clear-all">
                Clear All
              </div>{" "}
              <div className="border-left-sidebar"></div>
              <div
                style={{ cursor: "pointer" }}
                className="text-decoration-none apply-filter"
                onClick={applyFilter} // Apply filter on click
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Apply Filter
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
