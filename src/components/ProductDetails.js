"use client";
import React, { useEffect, useRef, useState } from "react";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import axios from 'axios'; // Import axios
import { CustomCarouselFour } from "./Carousel";
import Link from "next/link";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';
import WishlistApi from "@/utils/api/WishlistApi";
import { addToCart } from "@/utils/api/CartApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import defaultImg from '../../public/defaultImg.jpg';


const ProductDetails = () => {

  const { id } = useParams();
  console.log('pathName', id)

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("")
  const [isSolid, setIsSolid] = useState(false);

  const [selectedColor, setSelectedColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [counter, setCounter] = useState(1);

  const [colorMap, setColorMap] = useState({});
  const [sizeMap, setSizeMap] = useState({});

  const colors = product?.colors ? product.colors.split(",") : [];
  const sizes = product?.sizes ? product.sizes.split(",") : [];
  const tags = product?.tags ? product.tags.split(",") : [];

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const decrementCounter = () => {
    setCounter((prev) => (prev > 1 ? prev - 1 : 1));
  };


  const colorBoxes = [
    "color-box-1",
    "color-box-2",
    "color-box-3",
    "color-box-4",
    "color-box-5",
  ];

  const toggleHeart = async () => {
    const token = Cookies.get('accessToken');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).data.id : null;

    if (userId) {
      const requestData = {
        user_id: userId,
        product_id: id,
      };

      try {
        const res = await WishlistApi(requestData, token);
        if (res.status) {
          if (res.message.includes("added")) {
            setIsSolid(true);
          } else if (res.message.includes("removed")) {
            setIsSolid(false);
          }
        }
      } catch (error) {
        console.error("Error in toggleHeart:", error);
      }
    }
  };

  useEffect(() => {
    if (product?.image_url1) {
      setMainImage(product.image_url1);
    }
  }, [product]);


  const changeImage = (imageSrc) => {
    setMainImage(imageSrc);
  };


  const thumbnailImages = [
    product?.image_url1,
    product?.image_url2,
    product?.image_url3,
    product?.image_url4,
    product?.image_url5
  ].filter(Boolean);


  useEffect(() => {

    const fetchProductDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/products/${id}`);
          const productData = response.data.data[0];
          setProduct(productData);


          const colorIds = productData.color_ids.split(",").map(Number);
          const colors = productData.colors.split(",");
          const sizeIds = productData.size_ids.split(",").map(Number);
          const sizes = productData.sizes.split(",");
          setActiveSize(sizes[0])
          setSelectedColor(colors[0])
          const colorMapping = {};
          colors.forEach((color, index) => {
            colorMapping[color.trim()] = colorIds[index];
          });
          setColorMap(colorMapping);

          const sizeMapping = {};
          sizes.forEach((size, index) => {
            sizeMapping[size.trim()] = sizeIds[index];
          });
          setSizeMap(sizeMapping);

          if (productData.image_url1) {
            setMainImage(productData.image_url1);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };
    fetchProductDetails();
  }, [id]);

  console.log("Product", colors);


  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  const mainImageRef = useRef(null);
  const zoomBoxRef = useRef(null);

  useEffect(() => {
    const mainImage = mainImageRef.current;
    const zoomBox = zoomBoxRef.current;

    if (mainImage) {
      const zoomLevel = 2.5;

      const handleMouseMove = (event) => {
        const rect = mainImage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const backgroundPosX = (x / mainImage.offsetWidth) * 100;
        const backgroundPosY = (y / mainImage.offsetHeight) * 100;

        zoomBox.style.backgroundImage = `url(${mainImage.src})`;
        zoomBox.style.backgroundPosition = `${backgroundPosX}% ${backgroundPosY}%`;
        zoomBox.style.display = "block";
      };

      const handleMouseLeave = () => {
        zoomBox.style.display = "none";
      };

      mainImage.addEventListener("mousemove", handleMouseMove);
      mainImage.addEventListener("mouseleave", handleMouseLeave);


      return () => {
        mainImage.removeEventListener("mousemove", handleMouseMove);
        mainImage.removeEventListener("mouseleave", handleMouseLeave);
      };
    } else {
      console.error("Element with id 'mainImage' not found.");
    }
  }, []);

  //cart

  const handleAddToCart = async () => {
    const token = Cookies.get("accessToken");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).data.id : null;

    if (userId) {
      const colorId = colorMap[selectedColor];
      const sizeId = sizeMap[activeSize];

      if (!colorId || !sizeId) {
        console.error("Color ID or Size ID not found.");
        toast.error("Please select any Color or Size");
        return;
      }

      const productDetails = {
        user_id: userId,
        product_id: product.id,
        image_url: product.image_url1,
        amount: product.amount,
        discount_amount: product.discount_amount,
        title: product.title,
        color_id: colorId,
        size_id: sizeId,
        quantity: counter,
      };

      try {
        const response = await addToCart(token, productDetails);
        toast.success("Product Added to Cart successfully!");
        console.log("Add to Cart Response:", response, productDetails);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Can not add product to cart. Please try again later.");
      }
    }
  };




  return (
    <>

      <div className="breadcrumb-marketplace py-5">
        <div className="img">
          <img src="" alt="" />
          <div className="container">
            <div className="bread-head text-end">
              <div className="link d-flex align-items-center justify-content-end">
                <Link href="/" className="text-decoration-none me-1">
                  HOME
                </Link>
                <Link href="Market-Place" className="text-decoration-none me-1">
                  / MARKET PLACE
                </Link>
                <p className="m-0">/ WOMEN'S SEQUIN SKIRT</p>
              </div>
              <h1>Market Place</h1>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="product-info-main py-5">
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-3 mt-2 text-center">
                    {thumbnailImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        className="img-fluid thumbnail w-75 mb-2"
                        onClick={() => changeImage(src)}
                        style={{ cursor: "pointer" }}
                        alt={`Thumbnail ${index + 1}`}
                        onError={(e) => e.target.src = defaultImg}
                      />
                    ))}
                  </div>


                  <div
                    className="tab-pane fade show active description-content col-9"
                    style={{ position: "relative" }}
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <img
                      ref={mainImageRef}
                      src={mainImage}
                      alt="Product"
                      style={{ width: "100%", cursor: "zoom-in" }}
                    />
                  </div>

                  {/* Zoom box */}
                  <div
                    ref={zoomBoxRef}
                    style={{
                      position: "absolute",
                      display: "none",
                      width: "400px",
                      height: "400px",
                      backgroundSize: "100%",
                      pointerEvents: "none",
                      zIndex: 10,
                      overflow: "hidden",
                      right: "29vw",
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-info">
                  <p className="sequin-skirt mb-2">{product?.sub_category_title}</p>
                  <div className="product-head d-flex align-items-center justify-content-between">
                    <h1>{product?.title}</h1>
                    <button
                      type="button"
                      className="text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleHeart();
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {isSolid ? (
                        <i className="fa-solid fa-heart blue-heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
                      )}
                    </button>

                  </div>
                  <div className="prd-dtl-price d-flex align-items-center">
                    <div className="price-1">
                      <h6>€{product?.discount_amount}</h6>
                    </div>
                    <div className="checked-price text-decoration-line-through text-muted">
                      <h6>€{product?.amount}</h6>
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
                      <p className="m-0">( {product?.ratings} Ratings)</p>
                    </div>
                  </div>

                  <div className="para">
                    <p>
                      {product?.short_description}
                    </p>
                  </div>
                  <div className="choose-color">
                    <div className="head">
                      <h3>Color</h3>
                    </div>
                    <div className="choose-color-boxes d-flex align-items-center">
                      {colors.map((color) => (
                        <Link
                          key={color}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleColorClick(color);
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: color.toLowerCase(),
                              height: "22px",
                              width: "22px",
                              borderRadius: "2px",
                              marginRight: "16px",
                              border: selectedColor === color ? "3px solid #000" : "1px solid #ccc",
                              padding: selectedColor === color ? "2px" : "5px",
                              transition: "all 0.3s ease",
                              cursor: 'pointer',
                            }}
                          ></div>
                        </Link>
                      ))}
                    </div>

                  </div>
                </div>
                <div className="choose-size">
                  <h3>Size</h3>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Size selection"
                  >
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`btn size-btn ${activeSize === size ? "active" : ""}`}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="cart-add-counter d-flex align-items-center">
                  <div className="counter-btn-main d-flex align-items-center">
                    <button className="btn border-0" onClick={decrementCounter}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <div className="counter-display" id="counter">
                      {counter}
                    </div>
                    <button className="btn border-0" onClick={incrementCounter}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div className="add-to-cart-btn">
                    <Link href="/cart" className="text-decoration-none" onClick={handleAddToCart}>
                      ADD TO CART{" "}
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </Link>
                  </div>
                </div>
                <div className="stock-available">
                  <div className="p">
                    Available : &nbsp;
                    <span style={{ color: product?.stock_status === "in_stock" ? 'green' : 'red' }}>
                      {product?.stock_status === "in_stock" ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>


                </div>
                <div className="prd-dtl-checkout-btn">
                  <Link href="#" onClick={handleAddToCart}>
                    <button>
                      ADD TO CART
                    </button>
                  </Link>
                </div>
                <div className="cat-prd-dtl">
                  <p className="m-0">
                    Category : <span> {product?.category_title}</span>
                  </p>
                </div>
                <div className="tag-prd-dtl">
                  <p className="m-0">
                    Tag: <span> {tags.map((tag, index) => (
                      <React.Fragment key={tag}>
                        {tag}
                        {index < tags.length - 1 && ", "}
                      </React.Fragment>
                    ))}</span>
                  </p>
                </div>
                <div className="share-prd-dtl">
                  <p className="m-0">
                    Share :{" "}
                    <span>
                      <Link href="#" className="text-decoration-none text-dark">
                        {" "}
                        <i className="fa-brands fa-facebook-f ms-2 me-2"></i>
                      </Link>
                      <Link href="#" className="text-decoration-none text-dark">
                        <i className="fa-brands fa-instagram me-2"></i>
                      </Link>
                      <Link href="#" className="text-decoration-none text-dark">
                        <i className="fa-brands fa-x-twitter me-2"></i>
                      </Link>
                      <Link href="#" className="text-decoration-none text-dark">
                        <i className="fa-brands fa-tiktok me-2"></i>
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* cart */}

        </div>
      </section>

      <section>
        <div className="prd-desc-tabs-main">
          <div className="container mt-5">
            <ul
              className="nav nav-tabs unique-tabs justify-content-center"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active description-tab"
                  id="description-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#description"
                  type="button"
                  role="tab"
                  aria-controls="description"
                  aria-selected="true"
                >
                  Description
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link additional-info-tab"
                  id="additional-info-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#additional-info"
                  type="button"
                  role="tab"
                  aria-controls="additional-info"
                  aria-selected="false"
                >
                  Additional Information
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link reviews-tab"
                  id="reviews-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#reviews"
                  type="button"
                  role="tab"
                  aria-controls="reviews"
                  aria-selected="false"
                >
                  Reviews
                </button>
              </li>
            </ul>
            <div
              className="tab-content unique-tab-content mt-4"
              id="myTabContent"
            >
              <div
                className="tab-pane fade show active description-content"
                id="description"
                role="tabpanel"
                aria-labelledby="description-tab"
              >
                <p>
                  {product?.description}
                </p>
              </div>
              <div
                className="tab-pane fade additional-info-content w-75 m-auto"
                id="additional-info"
                role="tabpanel"
                aria-labelledby="additional-info-tab"
              >
                <div className="weight d-flex align-items-center justify-content-between">
                  <p className="m-0">Weight</p>
                  <p className="m-0"> {product?.weight} KG</p>
                </div>
                {/* <div className="diamantion d-flex align-items-center justify-content-between">
                  <p className="m-0">Diamantion</p>
                  <p className="m-0">75 x 78 x 70 Cm</p>
                </div> */}
                <div className="material d-flex align-items-center justify-content-between">
                  <p className="m-0">Material</p>
                  <p className="m-0"> {product?.material_title}</p>
                </div>
                <div className="diamantion d-flex align-items-center justify-content-between">
                  <p className="m-0">Product Id</p>
                  <p className="m-0">#PRO{product?.id}</p>
                </div>
              </div>

              {/*  reviews */}


            </div>
            <div
              className="modal fade"
              id="reviewModal"
              tabIndex="-1"
              aria-labelledby="reviewModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title w-100 text-center write-review-head"
                      id="reviewModalLabel"
                    >
                      <div className="border-left-head"></div>Write Review
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body mt-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <div className="img">
                          <img src="/main-thumb.png" alt="" />
                        </div>
                        <div className="women-modal-text">
                          <div className="head">
                            <h5>Women's Sequin Skirt</h5>
                          </div>
                          <div className="para">
                            <p>
                              Ut enim ad minima veniam, quis nostrum
                              exercitationem ullam corporis suscipit{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
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
        </div>
      </section>

      <CustomCarouselFour />

    </>
  );
};

export default ProductDetails;
