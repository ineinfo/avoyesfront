"use client";

import React, { useState, useEffect } from "react";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Filter from "./Filter";
import Link from "next/link";
import Cookies from 'js-cookie';
import WishlistApi from "@/utils/api/WishlistApi";
import { addToCart } from "@/utils/api/CartApi";
import defaultImg from '../../public/defaultImg.jpg';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchBestFor, fetchCategories, fetchRatings, fetchTypes } from "@/utils/api/FilterApi";


const MarketPlace = () => {
  const [showingCount, setShowingCount] = useState(12);
  const [selectedOption, setSelectedOption] = useState(" Plus récentsevents");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const searchParams = useSearchParams(); // Get the search parameters
  const data = searchParams.get('data'); // Access the 'data' parameter
  const search = searchParams.get('search'); // Access the 'data' parameter
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      try {
        const RealData = JSON.parse(decodeURIComponent(data));
        console.log("RealData", RealData, data);


        const params = [];

        if (RealData.category && RealData.category.length > 0) {
          params.push(`category=${RealData.category.join(',')}`);
        }

        if (RealData.ratings && RealData.ratings.length > 0) {
          params.push(`ratings=${RealData.ratings.join(',')}`);
        }

        if (RealData.price && RealData.price.length > 0) {
          let minValues = [];
          let maxValues = [];

          RealData.price.forEach(range => {
            if (range === "200+") {
              minValues.push('0');
              maxValues.push("200+");
            } else {
              const [min, max] = range.split('-').map(Number); // Split and convert to numbers
              minValues.push(min); // Add to minValues array
              maxValues.push(max); // Add to maxValues array
            }
          });

          const overallMin = Math.min(...minValues);

          const overallMax = maxValues.includes("200+") ? "20000000000000000000" : Math.max(...maxValues);

          params.push(`price=${overallMin}-${overallMax}`);
        }


        if (RealData.availability && RealData.availability.length > 0) {
          params.push(`availability=${RealData.availability.join(',')}`);
        }

        if (RealData.type && RealData.type.length > 0) {
          params.push(`type=${RealData.type.join(',')}`);
        }

        if (RealData.bestFor && RealData.bestFor.length > 0) {
          params.push(`best_for=${RealData.bestFor.join(',')}`);
        }

        const queryString = params.join('&');
        console.log("======>1d", queryString);

        setQueryParams(queryString);  // <--- Save the constructed queryParams in state

      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [data]);





  const getColorIdByTitle = (colorTitle) => {
    const colorIds = selectedProduct.color_ids || "";
    const colorTitles = selectedProduct.colors || "";

    const titlesArray = colorTitles.split(',');
    const idsArray = colorIds.split(',');

    const index = titlesArray.findIndex(title => title.trim() === colorTitle);
    return index !== -1 ? parseInt(idsArray[index], 10) : null;
  };

  const getSizeIdByTitle = (sizeTitle) => {
    const sizeIds = selectedProduct.size_ids || "";
    const sizeTitles = selectedProduct.sizes || "";

    const titlesArray = sizeTitles.split(',');
    const idsArray = sizeIds.split(',');

    const index = titlesArray.findIndex(title => title.trim() === sizeTitle);
    return index !== -1 ? parseInt(idsArray[index], 10) : null;
  };

  const handleAddToCart = () => {
    const token = Cookies.get('accessToken');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).data.id : null;

    if (userId) {
      const colorId = getColorIdByTitle(activeColor);
      const sizeId = getSizeIdByTitle(activeSize);

      const productDetails = {
        user_id: userId,
        product_id: selectedProduct.id,
        image_url: selectedProduct.image_url1,
        amount: selectedProduct.amount,
        discount_amount: selectedProduct.discount_amount,
        title: selectedProduct.title,
        color_id: colorId,
        size_id: sizeId,
        quantity: 1,
      };

      addToCart(token, productDetails);
    } else {
      console.log("No user ID found.");
    }
  };

  const changeImage = (newImageUrl) => {
    setMainImage(newImageUrl);
  };

  const handleOptionClick = (e) => {
    setSelectedOption(e.target.innerText);
  };

  const handleCountClick = async (value) => {

    setShowingCount(value);
  };

  const fetchProducts = async (id, name) => {
    setLoading(true);
    console.log("Name", name);
    let sortName = ''
    if (name === 'Price: High To Low') {
      sortName = 'h2l'
    } else if (name === 'Price: Low To High') {
      sortName = 'l2h'
    } else {
      sortName = 'latest'
    }

    if (queryParams) {
      console.log("params", queryParams);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/products?limit=${id}&sort=${sortName}&${queryParams}`);
        if (!response.ok) {
          throw new Error("Error fetching products");

        }
        const result = await response.json();
        setProducts(Array.isArray(result.data) ? result.data : []);
        return

      } catch (error) {
        setError(error.message);
        setProducts([])
      } finally {
        setLoading(false);  // <--- Stop loading after fetch completes
      }
    }

    if (!queryParams) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/products?limit=${id}&sort=${sortName}`);
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const result = await response.json();
        setProducts(Array.isArray(result.data) ? result.data : []);


      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);  // <--- Stop loading after fetch completes
      }

    }
  };

  useEffect(() => {
    if (pathname === '/marketplace') {
      console.log("path", pathname);

      fetchProducts(showingCount, selectedOption); // Fetch products when on marketplace page
    }
  }, [pathname, showingCount, selectedOption]); // Only runs when pathname changes

  useEffect(() => {
    // Fetch products whenever queryParams change
    if (queryParams) {
      fetchProducts(showingCount, selectedOption); // Fetch products when queryParams change
    }
  }, [queryParams, showingCount, selectedOption]); // Runs when queryParams changes


  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const result = await response.json();
      console.log(result);
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        setSelectedProduct(result.data[0]);
      } else {
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image_url5 || ""); // Default to an empty string
      // Set default active color to the second color
      const colors = selectedProduct.colors ? selectedProduct.colors.split(",") : [];
      if (colors.length > 1) {
        setActiveColor(colors[1].trim()); // Set the second color as active
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    fetchProducts(showingCount, selectedOption);
    // const fetchsearch = async () => {
    //   const category = await fetchCategories()
    //   setAllcategory(category)
    //   const bestFor = await fetchBestFor()
    //   setAllbestFor(bestFor)
    //   const types = await fetchTypes()
    //   setAlltypes(types)
    // }
    // fetchsearch()
  }, []);

  //Search 
  useEffect(() => {
    if (search) {
      // Define an async function inside the useEffect
      const extractIdsAndPrices = async (text) => {
        // Initialize result object with empty arrays
        const category = await fetchCategories();
        const bestFor = await fetchBestFor();
        const types = await fetchTypes();
        const result = { category: [], bestfor: [], type: [], price: [] };

        // Function to find and push matching titles' ids to the specified key
        function findMatchingIds(arr, key) {
          arr.forEach(item => {
            // Convert both text and item.title to lowercase for case-insensitive matching
            if (text.toLowerCase().includes(item.title.toLowerCase())) {
              result[key].push(item.id);
            }
          });
        }

        // Find matching ids for each array
        findMatchingIds(category, 'category');
        findMatchingIds(bestFor, 'bestFor');
        findMatchingIds(types, 'type');

        // Extract numbers from text and push them to price array
        const priceMatches = text.match(/\d+/g);
        if (priceMatches) {
          priceMatches.forEach(price => {
            result.price.push(0);  // Push 0 before each price
            result.price.push(Number(price));
          });
        }

        return result;
      };

      // Call the async function inside useEffect and handle the result
      const fetchData = async () => {
        const searchedValue = await extractIdsAndPrices(search);
        console.log('searchedValue1', searchedValue);

        try {
          const RealData = searchedValue
          console.log("RealData", RealData, data);


          const params = [];

          if (RealData.category && RealData.category.length > 0) {
            params.push(`category=${RealData.category.join(',')}`);
          }

          if (RealData.ratings && RealData.ratings.length > 0) {
            params.push(`ratings=${RealData.ratings.join(',')}`);
          }

          if (RealData.price && RealData.price.length > 0) {
            let minValues = [];
            let maxValues = [];

            RealData.price.forEach(range => {
              if (range === "200+") {
                minValues.push('0');
                maxValues.push("200+");
              } else {
                const [min, max] = range.split('-').map(Number); // Split and convert to numbers
                minValues.push(min); // Add to minValues array
                maxValues.push(max); // Add to maxValues array
              }
            });

            const overallMin = Math.min(...minValues);

            const overallMax = maxValues.includes("200+") ? "20000000000000000000" : Math.max(...maxValues);

            params.push(`price=${overallMin}-${overallMax}`);
          }


          if (RealData.availability && RealData.availability.length > 0) {
            params.push(`availability=${RealData.availability.join(',')}`);
          }

          if (RealData.type && RealData.type.length > 0) {
            params.push(`type=${RealData.type.join(',')}`);
          }

          if (RealData.bestFor && RealData.bestFor.length > 0) {
            params.push(`best_for=${RealData.bestFor.join(',')}`);
          }

          const queryString = params.join('&');
          console.log("======>1d", queryString);

          setQueryParams(queryString);  // <--- Save the constructed queryParams in state

        } catch (error) {
          console.error("Error parsing data:", error);
        }
      };

      fetchData(); // Execute the async function
    }
  }, [search]);

  //wishlist
  useEffect(() => {
    const storedWishlistStatus = localStorage.getItem('wishlistStatus');
    if (storedWishlistStatus) {
      setWishlistStatus(JSON.parse(storedWishlistStatus));
    }

    const token = Cookies.get('accessToken');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).data.id : null;

    if (userId && products.length > 0) {
      const checkWishlistStatus = async () => {
        try {
          const res = await WishlistApi({ user_id: userId }, token);
          const wishlistProducts = res.data;

          const initialStatus = {};
          products.forEach((product) => {
            const isInWishlist = wishlistProducts.some(
              (wishlistProduct) => wishlistProduct.product_id === product.id
            );
            initialStatus[product.id] = isInWishlist;
          });

          setWishlistStatus(initialStatus);
          localStorage.setItem('wishlistStatus', JSON.stringify(initialStatus));
        } catch (error) {
          console.log("Error fetching wishlist status:", error);
        }
      };

      checkWishlistStatus();
    }
  }, [products]);

  const toggleHeart = async (id) => {
    const token = Cookies.get('accessToken');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).data.id : null;

    if (userId) {
      const requestData = {
        user_id: userId,
        product_id: id,
      };

      setWishlistStatus((prev) => {
        const newStatus = {
          ...prev,
          [id]: !prev[id],
        };
        localStorage.setItem('wishlistStatus', JSON.stringify(newStatus));
        return newStatus;
      });

      try {
        const res = await WishlistApi(requestData, token);
        if (!res.status) {
          setWishlistStatus((prev) => {
            const newStatus = {
              ...prev,
              [id]: !prev[id],
            };
            localStorage.setItem('wishlistStatus', JSON.stringify(newStatus));
            return newStatus;
          });
        }
      } catch (error) {
        setWishlistStatus((prev) => {
          const newStatus = {
            ...prev,
            [id]: !prev[id],
          };
          localStorage.setItem('wishlistStatus', JSON.stringify(newStatus));
          return newStatus;
        });
      }
    } else {
      setShowModal(true); // Show modal if no user ID found
    }
  };

  const colors = selectedProduct?.colors ? selectedProduct.colors.split(",") : [];
  const sizes = selectedProduct?.sizes ? selectedProduct.sizes.split(",") : [];


  const handleSizeClick = (size) => {
    const trimmedSize = size.trim();
    setActiveSize(trimmedSize);
  };

  useEffect(() => {
    setActiveSize("");
  }, [selectedProduct]);

  const handleColorClick = (color) => {
    setActiveColor(color);
  };

  function handleCloseModal() {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal?.hide();
    }
  }


  return (
    <>
      {/* <div className="breadcrumb-marketplace py-5">
        <div className="img">
          <img src="" alt="" />
          <div className="container">
            <div className="bread-head text-end">
              <div className="link d-flex align-items-center justify-content-end">
                <Link href="/" className="text-decoration-none me-1">
                  HOME
                </Link>
                <p className="m-0">/ MARKET PLACE</p>
              </div>
              <h1>Market Place</h1>
            </div>
          </div>
        </div>
      </div> */}

      <section>
        <div className="market-main py-5">
          <div className="container">
            <div className="market-top-filters d-flex justify-content-between align-items-center mb-5">
              <Filter />

              <div className="other-top-menu d-flex align-items-center justify-content-between w-75">
                <div className="left-side d-flex align-items-center">
                  <ul className="nav nav-tabs" id="viewTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <Link
                        className="nav-link active"
                        id="grid-view-tab"
                        data-bs-toggle="tab"
                        href="#grid-view"
                        role="tab"
                        aria-controls="grid-view"
                        aria-selected="true"
                      >
                        <div className="grid-view ms-3">
                          <i className="bi bi-grid-3x3-gap-fill" style={{ color: "blue" }}></i>
                        </div>
                      </Link>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <Link
                        className="nav-link"
                        id="list-view-tab"
                        data-bs-toggle="tab"
                        href="#list-view"
                        role="tab"
                        aria-controls="list-view"
                        aria-selected="false"
                      >
                        <div className="list-view">
                          <i className="fa-solid fa-list"></i>
                        </div>
                      </Link>
                    </li> */}
                  </ul>
                </div>
                <div className="right-side d-flex me-3">



                  <div className="showing">
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle-no-style"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ outline: "none" }}
                      >
                        Affichage: <span id="showingOption">{showingCount === 1000000000000000 ? 'All' : showingCount}</span>

                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-custom border-none"

                        aria-labelledby="dropdownMenuButton"
                      >
                        {[12, 24, 36, 1000000000000000].map((value) => (
                          <li key={value}>
                            <button
                              className="dropdown-item drp-showing-option drp-showing"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCountClick(value);
                              }}
                              role="option"
                              aria-selected={showingCount === value}
                            >
                              {value === 1000000000000000 ? 'All' : value}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>



                  <div className="sort-border-left "></div>
                  <div className="default-shorting">
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle-no-style"
                        type="button"
                        id="dropdownMenuButton-2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Trier par :{" "}
                        <span id="sortingOption">{selectedOption}</span>
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-custom drp-2 border-0"
                        aria-labelledby="dropdownMenuButton-2"
                      >
                        <li>
                          <Link
                            className="dropdown-item drp-sorting-option drp-showing"
                            href="#"
                            data-value="3"
                            onClick={handleOptionClick}
                          >
                             Plus récents
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item drp-sorting-option drp-showing"
                            href="#"
                            data-value="4"
                            onClick={handleOptionClick}
                          >
                            Price: Low To High
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item drp-sorting-option drp-showing"
                            href="#"
                            data-value="5"
                            onClick={handleOptionClick}
                          >
                            Price: High To Low
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-content" id="viewTabsContent">
              {viewMode === "grid" ? (
                <div
                  className="tab-pane fade show active"
                  id="grid-view"
                  role="tabpanel"
                  aria-labelledby="grid-view-tab"
                >
                  <div className="row pt-4 pb-4 pb-md-0">
                    {products?.map((product) => (
                      <div
                        className="col-xl-3 col-md-6 col-lg-3 mb-md-5"
                        key={product.id}
                      >
                        <div className="market-place-product market-place-page-product">
                          <div className="img-wrapper-market">
                            <div className="img">
                              <img
                                style={{ objectFit: "cover", height: "350px" }}
                                src={product.image_url1}
                                // src={defaultImg.src}

                                alt={product.title}
                              />
                              {product?.product_label === "new" ? (
                                <div className="lable">
                                  <p>{product.product_label.toUpperCase()}</p>
                                </div>
                              ) : (
                                <div className="lable dark-lbl">
                                  <p>{product.product_label.toUpperCase()}</p>
                                </div>
                              )}

                              <div className="buttons">
                                {/* <div
                                  className="text-decoration-none p-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#productModal"
                                  onClick={() =>
                                    fetchProductDetails(product.id)
                                  } // Fetch product details
                                  style={{ cursor: "pointer" }}
                                >
                                  QUICK VIEW
                                  <i className="bi bi-eye ms-1 quick-icons"></i>
                                </div> */}

                                {/* direct cart */}
                                {/* <div className="border-line"></div>
                                <Link
                                  href="cart"
                                  className="text-decoration-none"
                                >
                                  QUICK SHOP
                                  <i className="bi bi-handbag ms-1 quick-icons"></i>
                                </Link> */}
                              </div>
                              <div className="heart-icon" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>


                                <button
                                  type="button"
                                  className="text-decoration-none"
                                  onClick={() => toggleHeart(product.id)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                  {wishlistStatus[product.id] ? (
                                    <i className="fa-solid fa-heart blue-heart"></i>
                                  ) : (
                                    <i className="fa-regular fa-heart"></i>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  className="text-decoration-none"
                                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                  onClick={() => window.location.href = `/${product.id}/productdetails`}
                                >
                                  <i className="bi bi-handbag ms-1 quick-icons"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="info d-flex justify-content-between align-items-center">

                            <div className="item">
                              <Link href={`/${product.id}/productdetails`} className="text-decoration-none">
                                <p className="m-0">{product.title}</p>
                              </Link>
                            </div>

                            {product.ratings && (
                              <div className="rating d-flex align-items-center">
                                <div className="rate d-flex align-items-center">
                                  <p className="m-0"></p>
                                  <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="people">
                                  <p className="m-0">{product.ratings}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="pricing d-flex align-items-center">
                            <div className="price">
                              <p className="m-0">€{product.amount}</p>
                            </div>
                            <div className="checked-price px-3">
                              <span className="price-old">
                                €{product.discount_amount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="tab-pane fade show active"
                  id="list-view"
                  role="tabpanel"
                  aria-labelledby="list-view-tab"
                >
                  <div className="row pt-4">
                    {products.map((product) => (
                      <div className="col-xl-12" key={product.id}>
                        <div className="row">
                          <div className="col-md-3 col-6">
                            <div className="market-place-product">
                              <div className="img-wrapper-market">
                                <div className="img">
                                  <img
                                    src={product.image_url1}
                                    alt={product.title}
                                  />
                                  <div className="lable">
                                    <p>NEW</p>
                                  </div>
                                  <div className="buttons mobile-btn">
                                    {/* <Link
                                      href="#"
                                      className="text-decoration-none"
                                    >
                                      QUICK VIEW
                                      <i className="bi bi-eye ms-1 quick-icons"></i>
                                    </Link> */}
                                    <div className="border-line"></div>
                                    <Link
                                      href="#"
                                      className="text-decoration-none"
                                    >
                                      QUICK SHOP
                                      <i className="bi bi-handbag ms-1 quick-icons"></i>
                                    </Link>
                                  </div>
                                  <div className="heart-icon mobile-btn">
                                    <i className="fa-regular fa-heart"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-9 col-6">
                            <div className="info">
                              <Link
                                href="/productdetails"
                                className="text-decoration-none"
                              >
                                <p className="m-0">{product.title}</p>
                              </Link>
                              <div className="pricing d-flex align-items-center">
                                <div className="price">
                                  <p className="m-0">€{product.amount}</p>
                                </div>
                                <div className="checked-price px-3">
                                  <span className="price-old">€50</span>
                                </div>
                              </div>
                              <div className="rating d-flex align-items-center">
                                <div className="rate d-flex align-items-center">
                                  <p className="m-0">{product.ratings}</p>
                                  <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="people">
                                  <p className="m-0">120</p>
                                </div>
                              </div>
                              <p className="description mt-2">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal to show selected product details */}
      {/* Modal to show selected product details */}


      {selectedProduct && (
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
          onHide={handleCloseModal}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content py-2">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body pt-0">
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-3 thumb-margin text-center">
                          <img
                            src={selectedProduct?.image_url1}
                            className="img-fluid thumbnail w-75"
                            onClick={() =>
                              changeImage(selectedProduct?.image_url1)
                            }
                            alt="Thumbnail 1"
                            onError={(e) => e.target.src = defaultImg}
                          />
                          <img
                            src={selectedProduct?.image_url2}
                            className="img-fluid thumbnail w-75"
                            onClick={() =>
                              changeImage(selectedProduct?.image_url2)
                            }
                            alt="Thumbnail 2"
                            onError={(e) => e.target.src = defaultImg}
                          />
                          <img
                            src={selectedProduct?.image_url3}
                            className="img-fluid thumbnail w-75"
                            onClick={() =>
                              changeImage(selectedProduct?.image_url3)
                            }
                            alt="Thumbnail 3"
                            onError={(e) => e.target.src = defaultImg}
                          />
                          <img
                            src={selectedProduct?.image_url4}
                            className="img-fluid thumbnail w-75"
                            onClick={() =>
                              changeImage(selectedProduct?.image_url4)
                            }
                            alt="Thumbnail 4"
                            onError={(e) => e.target.src = defaultImg}
                          />
                        </div>
                        <div className="col-9">
                          <img
                            id="mainImage2"
                            src={mainImage || selectedProduct?.image_url5}
                            className="img-fluid w-100"
                            alt="Main Product"
                            onError={(e) => e.target.src = defaultImg}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="product-info">
                        <p className="sequin-skirt mb-2">
                          {selectedProduct?.category_title}
                        </p>
                        <div className="product-head d-flex align-items-center justify-content-between">
                          <h1>{selectedProduct?.title}</h1>
                          <button
                            type="button"
                            className="text-decoration-none"
                            onClick={() => toggleHeart(selectedProduct.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            {wishlistStatus[selectedProduct.id] ? (
                              <i className="fa-solid fa-heart blue-heart"></i>
                            ) : (
                              <i className="fa-regular fa-heart"></i>
                            )}
                          </button>
                        </div>
                        <div className="prd-dtl-price d-flex align-items-center">
                          <div className="price-1">
                            <h6>€{selectedProduct?.discount_amount}</h6>
                          </div>
                          <div className="checked-price text-decoration-line-through text-muted">
                            <h6>€{selectedProduct?.amount}</h6>
                          </div>
                        </div>
                        <div className="rating-prd-dtl d-flex align-items-center">
                          <div className="stars d-flex align-items-center">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </div>
                          <div className="rating-count">
                            <p className="m-0">
                              {selectedProduct?.ratings}ratings
                            </p>
                          </div>
                        </div>
                        <div className="para">
                          <p dangerouslySetInnerHTML={{ __html: selectedProduct?.description || "" }}></p>
                        </div>
                        <div className="choose-color">
                          <div className="head">
                            <h3>Color</h3>
                          </div>


                          <div className="choose-color-boxes d-flex align-items-center">
                            {colors.map((color) => (
                              <Link key={color} href="#" onClick={(e) => { e.preventDefault(); handleColorClick(color); }}>
                                <div
                                  style={{
                                    backgroundColor: color.toLowerCase(),
                                    height: "22px",
                                    width: "22px",
                                    borderRadius: "2px",
                                    marginRight: "16px",
                                    border: activeColor === color ? "3px solid black" : "none",
                                    padding: selectedColor === color ? "5px" : "8px",
                                    transition: "all 0.3s ease",
                                    cursor: 'pointer',
                                  }}
                                ></div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="choose-size">
                          <h3>Size</h3>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Size selection"
                          >
                            {sizes.map((size, index) => (
                              <button
                                key={index}
                                type="button"
                                className={`btn size-btn ${activeSize === size.trim() ? "active" : ""}`} // Add active class based on activeSize
                                onClick={() => handleSizeClick(size)} // Change size on button click
                              >
                                {size.trim()} {/* Display the trimmed size */}
                              </button>
                            ))}

                          </div>
                        </div>
                        <div className="prd-dtl-checkout-btn">
                          <Link href="cart">
                            <button className="btn-checkout border-0" onClick={handleAddToCart} data-bs-dismiss="modal">
                              ADD TO CART
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          onClick={closeModal} // Closes the modal when clicking outside the content box
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the content box
            style={{
              position: 'relative',
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#F5F4F9',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              color: '#000000',
              width: '90%',
              maxWidth: '400px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: 0,
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: '#000000',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>

            <h1 style={{ fontSize: '2rem' }}>Please Log In</h1>
            <p style={{ fontSize: '1.3rem' }}>Please log in to add this product to your cart!</p>
            <button
              onClick={() => {
                closeModal();
                router.push('/login');
              }}
              style={{
                marginTop: '1.5rem',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#F5F4F9',
                color: '#000000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Log In
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default MarketPlace;
