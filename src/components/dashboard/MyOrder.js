"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MyOrder = () => {
  const router = useRouter();
  const handleDetail = () => {
    router.push("/dashboard/orders/order-details");
  };
  return (
    <>
      <>
        <div className="my-order-head">
          <h2>
            <span>MY </span>Orders(2)
          </h2>
        </div>
        <div className="order-box-color">
          <div className="arriving-main d-flex align-items-center">
            <div className="icon">
              <i className="bi bi-box-seam"></i>
            </div>
            <div className="descr ms-3">
              <h5 className="m-0">Arriving Tomorrow</h5>
              <p className="m-0">22 July 2024</p>
            </div>
          </div>
          <div className="border-btm-profile-2"></div>
          <div className="product-order d-flex align-items-center justify-content-between">
            <div className="prd-main d-flex align-items-center">
              <img src="/sidebar-img-1.png" alt="" />
              <div className="dtl ms-3">
                <Link href="/marketplace" className="text-decoration-none ">
                  {" "}
                  <h5 className="m-0">Women’s Sequin Skirt</h5>
                </Link>
                <p className="m-0">Size : L</p>
              </div>
            </div>
            <div
              onClick={handleDetail}
              className="arrow-icon"
              style={{ padding: "0px 20px", cursor: "pointer" }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <div className="order-box-color-2">
          <div className="arriving-main d-flex align-items-center">
            <div className="icon">
              <i className="bi bi-box-seam"></i>
            </div>
            <div className="descr ms-3">
              <h5 className="m-0">Delivered</h5>
              <p className="m-0">22 July 2024</p>
            </div>
          </div>
          <div className="border-btm-profile-2"></div>
          <div className="product-order d-flex align-items-center justify-content-between">
            <div className="prd-main d-flex align-items-center">
              <img src="/sidebar-img-2.png" alt="" />
              <div className="dtl ms-3">
                <Link href="/marketplace" className="text-decoration-none ">
                  {" "}
                  <h5 className="m-0">Women’s Sequin Skirt</h5>
                </Link>
                <p className="m-0">Size : L</p>
              </div>
            </div>
            <div
              onClick={handleDetail}
              className="arrow-icon "
              style={{ padding: "0px 20px", cursor: "pointer" }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <div className="border-btm-profile-2 mb-3"></div>
          <div className="dilivered-rating d-flex justify-content-between align-items-start">
            <div className="stars-and-dtl">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star-half-stroke"></i>
              </div>
              <div className="review-rate-prdct">
                <p className="m-0">
                  <span>Rate & Rview </span> To The Product
                </p>
              </div>
            </div>
            <div className="order-write-review">
              <Link
                href="#"
                className="text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#reviewModal"
              >
                Write Review
              </Link>
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
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title w-100 text-center write-review-head"
                  id="reviewModalLabel"
                >
                  <div className="border-left-head"></div>
                  Write Review
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
                          Ut enim ad minima veniam, quis nostrum exercitationem
                          ullam corporis suscipit
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
                        <div className="stars ms-2">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-regular fa-star-half-stroke"></i>
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
      </>
    </>
  );
};

export default MyOrder;
