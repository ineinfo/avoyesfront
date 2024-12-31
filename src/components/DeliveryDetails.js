import React from "react";
import Link from "next/link";
import "../assets/css/style.css"
import "../assets/css/responsive.css"

const DeliveryDetails = () => {
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
                </Link>{" "}
                <Link href="Market-Place" className="text-decoration-none me-1">
                  /DeliveryDetails
                </Link>{" "}
              </div>
              <h1>Delivery Details</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="faqs-main py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="accordion" id="faqaccordion">
                <div className="accordion-item-2">
                  <h2 className="accordion-header mb-3" id="headingOne">
                    <button
                      className="accordion-button faq-acrdn-btn justify-content-between"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <p className="mb-0">How do I place an order?</p>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqaccordion"
                  >
                    <div className="accordion-body acrdn-bdy-2">
                      To place an order, browse through our products, select the
                      items you want, and add them to your cart. Once you&apos;re
                      ready, proceed to checkout, where you can review your
                      order, provide shipping details, and complete payment.
                      After confirmation, you&apos;ll receive an order summary via
                      email.
                    </div>
                  </div>
                </div>
                <div className="accordion-item-2">
                  <h2 className="accordion-header mb-3" id="headingTwo">
                    <button
                      className="accordion-button collapsed faq-acrdn-btn justify-content-between"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <p className="mb-0">What payment methods do you accept?</p>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqaccordion"
                  >
                    <div className="accordion-body acrdn-bdy-2">
                      We accept various payment methods including credit/debit
                      cards, PayPal, and online bank transfers.
                    </div>
                  </div>
                </div>
                <div className="accordion-item-2">
                  <h2 className="accordion-header mb-3" id="headingThree">
                    <button
                      className="accordion-button collapsed faq-acrdn-btn justify-content-between"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <p className="mb-0">
                        How long will it take to receive my order?
                      </p>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#faqaccordion"
                  >
                    <div className="accordion-body acrdn-bdy-2">
                      Delivery times vary based on your location and shipping
                      method. You can expect your order to arrive within 3-7
                      business days.
                    </div>
                  </div>
                </div>
                <div className="accordion-item-2">
                  <h2 className="accordion-header mb-3" id="headingFour">
                    <button
                      className="accordion-button collapsed faq-acrdn-btn justify-content-between"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      <p className="mb-0">Can I track my order?</p>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#faqaccordion"
                  >
                    <div className="accordion-body acrdn-bdy-2">
                      Yes, once your order is shipped, you will receive a
                      tracking number via email to monitor your delivery.
                    </div>
                  </div>
                </div>
                <div className="accordion-item-2">
                  <h2 className="accordion-header mb-3" id="headingFive">
                    <button
                      className="accordion-button collapsed faq-acrdn-btn justify-content-between"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      <p className="mb-0">
                        What is your return and exchange policy?
                      </p>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#faqaccordion"
                  >
                    <div className="accordion-body acrdn-bdy-2">
                      We offer a 30-day return and exchange policy for unused
                      items in their original packaging. Contact customer
                      service for further assistance.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 ">
              <div className="faq-img">
                <img src="/faq-img.png" alt="" />
              </div>
              <div className="any-que">
                <h3>Any Question?</h3>
                <p>You can ask anything</p>
              </div>
              <div className="faq-input text-center">
                <input type="text" className="empty-input" placeholder="" />
              </div>
              <div className="sent-faq-btn text-center">
                <Link href="#">
                  <button type="button">SENT</button>
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryDetails;
