"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getOrder } from "@/utils/api/CheckoutApi";
import { Button } from "bootstrap";
import LoadingSpinner from "../Loading";

const MyOrder = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([])
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const fetchorder = async () => {
      try {
        const res = await getOrder()

        setOrders(res)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchorder()
  }, [])
  console.log("dayta", orders);

  if (!orders) {
    return <LoadingSpinner />;
  }

  const handleSeeAll = () => {
    setShowAll(!showAll); // Toggle the state
  };

  const displayedOrders = showAll ? orders : orders.slice(0, 3);

  const handleDetail = (id) => {
    router.push(`/dashboard/orders/order-details?id=${id}`);
  };


  return (
    <>
      <>
        <div className="my-order-head">
          <h2>
            <span>MY </span>Orders({orders.length})
          </h2>
        </div>
        {/* <div className="order-box-color">
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
        </div> */}




        <div className="order-box-color-2">

          <div>
            {displayedOrders.map(order => (
              <div key={order.order_id} style={{ marginBottom: "50px" }}>
                <div className="arriving-main d-flex align-items-center">
                  <div className="icon">
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div className="descr ms-3">
                      <h5 className="m-0">{order.order_status === 1 || order.order_status === 2 ? 'In Progress' : 'Delivered'}</h5>
                      <p className="m-0">{new Date(order.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}</p>
                    </div>
                    <div
                      onClick={() => (handleDetail(order.id))}
                      className="arrow-icon"
                      style={{ padding: "0px 20px", cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
                <div className="border-btm-profile-2"></div>
                {order.order_items.map(item => (
                  <div key={item.order_item_id} className="product-order d-flex align-items-center justify-content-between" style={{ marginBottom: "10px" }}>
                    <div className="prd-main d-flex align-items-center">
                      <img src={item.image_url ? item.image_url : "/sidebar-img-2.png"} alt={item.item_name} />
                      <div className="dtl ms-3">
                        <Link href="/marketplace" className="text-decoration-none">
                          <h5 className="m-0">{item.item_name}</h5>
                        </Link>
                        <p className="m-0">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <button onClick={handleSeeAll} style={{
              padding: "8px 15px",
              backgroundColor: "blue",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              gap: "10px",
              border: 0,
              width: "100%"
            }}>
              {showAll ? 'See Less' : 'See All'}
            </button>
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
