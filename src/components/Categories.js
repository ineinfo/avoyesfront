import React from "react";
import Link from "next/link";

const Categories = () => {
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
                <p className="m-0">/ CATEGORIES</p>
              </div>
              <h1>Categories</h1>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="top-menu-main py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3">
                <Link
                  href="/marketplace"
                  className="text-decoration-none text-dark "
                >
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/dress.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Market Place</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/map" className="text-decoration-none text-dark">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/location.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Map</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/event" className="text-decoration-none text-dark">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/calendar.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Event</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/activity" className="text-decoration-none text-dark">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/puzzle.png" alt="Dress" />
                    </div>
                    <div className="text pt-3">
                      <p>Activity</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="row pt-5">
                <div className="col-md-3">
                  <Link href="/foodie" className="text-decoration-none text-dark">
                    <div className="menu-1">
                      <div className="img pt-3">
                        <img src="/fork.png" alt="Dress" />
                      </div>
                      <div className="text pt-3">
                        <p>Foodie</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link
                    href="/challanges"
                    className="text-decoration-none text-dark"
                  >
                    <div className="menu-1">
                      <div className="img pt-3">
                        <img src="/goal.png" alt="Dress" />
                      </div>
                      <div className="text pt-3">
                        <p>Challanges</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link
                    href="/community"
                    className="text-decoration-none text-dark"
                  >
                    <div className="menu-1">
                      <div className="img pt-3">
                        <img src="/community-engagement.png" alt="Dress" />
                      </div>
                      <div className="text pt-3">
                        <p>Community</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
