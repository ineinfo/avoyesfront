import Link from "next/link";
import React from "react";

const CartModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
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
                          src="/Thumb-1.png"
                          className="img-fluid thumbnail w-75"
                          onClick="changeImage('/Thumb-1.png', 'mainImage2')"
                        />
                        <img
                          src="/Thumb-2.png"
                          className="img-fluid thumbnail w-75"
                          onClick="changeImage('/Thumb-2.png', 'mainImage2')"
                        />
                        <img
                          src="/Thumb-4.png"
                          className="img-fluid thumbnail w-75"
                          onClick="changeImage('/Thumb-4.png', 'mainImage2')"
                        />
                        <img
                          src="/Thumb-3.png"
                          className="img-fluid thumbnail w-75"
                          onClick="changeImage('/Thumb-3.png', 'mainImage2')"
                        />
                      </div>
                      <div className="col-9">
                        <img
                          id="mainImage2"
                          src="/main-thumb.png"
                          className="img-fluid w-100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="product-info">
                      <p className="sequin-skirt mb-2">Sequin Skirt</p>
                      <div className="product-head d-flex align-items-center justify-content-between">
                        <h1>Women’s Sequin Skirt</h1>
                        <Link href="#" className="text-decoration-none">
                          <i className="fa-regular fa-heart"></i>
                          <i className="fa-solid fa-heart blue-heart"></i>
                        </Link>{" "}
                      </div>
                      <div className="prd-dtl-price d-flex align-items-center">
                        <div className="price-1">
                          <h6>€370.00</h6>
                        </div>
                        <div className="checked-price text-decoration-line-through text-muted">
                          <h6>€400.00</h6>
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
                          <p className="m-0">(124 Ratings)</p>
                        </div>
                      </div>
                      <div className="para">
                        <p>
                          Ut enim ad minima veniam, quis nostrum exercitationem
                          ullam corporis suscipit laboriosam, nisi ut aliquid ex
                          ea d minima veniam, quis nostrum
                        </p>
                      </div>
                      <div className="choose-color">
                        <div className="head">
                          <h3>Color</h3>
                        </div>
                        <div className="choose-color-boxes d-flex align-items-center">
                          <Link href="#">
                            <div className="color-box-1"></div>
                          </Link>{" "}
                          <Link href="#">
                            <div className="color-box-2 selected-color"></div>
                          </Link>{" "}
                          <Link href="#">
                            <div className="color-box-3"></div>
                          </Link>{" "}
                          <Link href="#">
                            <div className="color-box-4"></div>
                          </Link>{" "}
                          <Link href="#">
                            <div className="color-box-5"></div>
                          </Link>{" "}
                        </div>
                      </div>
                      <div className="choose-size">
                        <h3>Size</h3>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Size selection"
                        >
                          <button
                            type="button"
                            className="btn size-btn"
                            onClick="setActive(this)"
                          >
                            S
                          </button>
                          <button
                            type="button"
                            className="btn size-btn active"
                            onClick="setActive(this)"
                          >
                            M
                          </button>
                          <button
                            type="button"
                            className="btn size-btn"
                            onClick="setActive(this)"
                          >
                            L
                          </button>
                          <button
                            type="button"
                            className="btn size-btn"
                            onClick="setActive(this)"
                          >
                            XL
                          </button>
                        </div>
                      </div>
                      <div className="prd-dtl-checkout-btn">
                        <Link href="/cart">
                          <button className="btn-checkout border-0">
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
    </>
  );
};

export default CartModal;
