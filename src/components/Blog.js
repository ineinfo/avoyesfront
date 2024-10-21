import Link from 'next/link'
import React from 'react'
import "../assets/css/style.css"
import "../assets/css/responsive.css"


const Blog = () => {
    return (
        <>
            <div className="breadcrumb-marketplace py-5">
                <div className="img">
                    <img src="" alt="" />
                    <div className="container">
                        <div className="bread-head text-end">
                            <div className="link d-flex align-items-center justify-content-end">
                                <Link href="/" className="text-decoration-none me-1">HOME</Link>
                                <p className="m-0">/ BLOG</p>
                            </div>
                            <h1>Blog</h1>
                        </div>
                    </div>

                </div>
            </div>

            <section>
                <div className="blog-main py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4">
                                <div className="blog-search-top">
                                    <div className="input-group  blog-search-bar">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="input-group-text search-icon">
                                            <i className="bi bi-search"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="blog-categories">
                                    <div className="head">
                                        <h3>CATEGORIES</h3>
                                    </div>
                                    <div className="bg-line">
                                        <div className="moving-line"></div>
                                    </div>
                                    <div className="cat-listing">
                                        <div className="cat-li-1"><Link href="#" className="text-decoration-none">Fashion</Link></div>
                                        <div className="cat-border"></div>
                                        <div className="cat-li-1"><Link href="#" className="text-decoration-none">Life Style</Link></div>
                                        <div className="cat-border"></div>
                                        <div className="cat-li-1"><Link href="#" className="text-decoration-none">Foodie</Link></div>
                                        <div className="cat-border"></div>
                                        <div className="cat-li-1"><Link href="#" className="text-decoration-none">Events</Link></div>
                                        <div className="cat-border"></div>
                                        <div className="cat-li-1"><Link href="#" className="text-decoration-none">Out Door</Link></div>
                                        <div className="cat-border"></div>
                                        <div className="cat-li-1"><Link href="#" className="text-decoration-none">Street Style</Link>
                                        </div>
                                        <div className="cat-border"></div>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="head">
                                        <h3>RECENT POSTS</h3>
                                    </div>
                                    <div className="bg-line">
                                        <div className="moving-line"></div>
                                    </div>
                                    <div className="posts post-mt">
                                        <div className="row align-items-center">
                                            <div className="col-md-4 col-3">
                                                <div className="post-img">
                                                    <img src="/recent-post-1.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-9">

                                                <div className="post-head-line">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div className="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-border"></div>
                                    <div className="posts">
                                        <div className="row align-items-center">
                                            <div className="col-md-4 col-3">
                                                <div className="post-img">
                                                    <img src="/recent-post-2.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-9">

                                                <div className="post-head-line">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div className="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-border"></div>
                                    <div className="posts">
                                        <div className="row align-items-center">
                                            <div className="col-md-4 col-3">
                                                <div className="post-img">
                                                    <img src="/recent-post-3.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-9">

                                                <div className="post-head-line">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div className="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-border"></div>
                                    <div className="posts">
                                        <div className="row align-items-center">
                                            <div className="col-md-4 col-3">
                                                <div className="post-img">
                                                    <img src="/recent-post-2.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-9">

                                                <div className="post-head-line">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div className="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-border"></div>
                                    <div className="posts">
                                        <div className="row align-items-center">
                                            <div className="col-md-4 col-3">
                                                <div className="post-img">
                                                    <img src="/recent-post-3.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-9">

                                                <div className="post-head-line">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div className="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-tags">
                                    <div className="head">
                                        <h3>TAGS</h3>
                                    </div>
                                    <div className="bg-line">
                                        <div className="moving-line"></div>
                                    </div>
                                    <div className="tags">
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Clothing</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Fashion</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Foodie</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Products</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Store</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Events</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Activity</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Clothing</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Fashion</div>
                                        </Link>
                                        <Link href="#" className="text-decoration-none text-dark">
                                            <div className="tag">Foodie</div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="left-blog-img">
                                    <img src="/left-blog-img.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8">

                                <div className="blog-listing">
                                    <div className="row align-items-center">
                                        <div className="col-xl-5">
                                            <div className="blg-img-list">
                                                <Link href="/blog/1/blog-details">
                                                    <img src="/blog-img-1.png" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <div className="blog-list-head">
                                                <div className="head">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none">
                                                        <h1>Elasticized Drawstring Waistband. Side Pockets With Zip.</h1></Link>
                                                </div>
                                                <div className="blg-by-and-comments d-flex align-items-center">
                                                    <div className="blog-by">
                                                        <p className="m-0">By <span>Diego Lopez </span> On January 08, 2019
                                                        </p>
                                                    </div>
                                                    <div className="border-left-blog"></div>
                                                    <div className="comment-blog-listing d-flex align-items-center">
                                                        <i className="fa-regular fa-comment"></i>
                                                        <p className="m-0 ps-2">0 Comments</p>
                                                    </div>
                                                </div>
                                                <div className="blog-para">
                                                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                                                        ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="blog-read-more">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none custom-underline">READ MORE
                                                        <i className="fa-solid fa-arrow-right-long ms-1"></i></Link>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="blog-listing">
                                    <div className="row align-items-center">
                                        <div className="col-xl-5">
                                            <div className="blg-img-list">
                                                <Link href="/blog/1/blog-details">
                                                    <img src="/blog-img-2.png" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <div className="blog-list-head">
                                                <div className="head">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none">
                                                        <h1>Elasticized Drawstring Waistband. Side Pockets With Zip.</h1></Link>
                                                </div>
                                                <div className="blg-by-and-comments d-flex align-items-center">
                                                    <div className="blog-by">
                                                        <p className="m-0">By <span>Diego Lopez </span> On January 08, 2019
                                                        </p>
                                                    </div>
                                                    <div className="border-left-blog"></div>
                                                    <div className="comment-blog-listing d-flex align-items-center">
                                                        <i className="fa-regular fa-comment"></i>
                                                        <p className="m-0 ps-2">0 Comments</p>
                                                    </div>
                                                </div>
                                                <div className="blog-para">
                                                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                                                        ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="blog-read-more">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none custom-underline">READ MORE
                                                        <i className="fa-solid fa-arrow-right-long ms-1"></i></Link>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="blog-listing">
                                    <div className="row align-items-center">
                                        <div className="col-xl-5">
                                            <div className="blg-img-list">
                                                <Link href="/blog/1/blog-details">
                                                    <img src="/blog-img-3.png" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <div className="blog-list-head">
                                                <div className="head">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none">
                                                        <h1>Elasticized Drawstring Waistband. Side Pockets With Zip.</h1></Link>
                                                </div>
                                                <div className="blg-by-and-comments d-flex align-items-center">
                                                    <div className="blog-by">
                                                        <p className="m-0">By <span>Diego Lopez </span> On January 08, 2019
                                                        </p>
                                                    </div>
                                                    <div className="border-left-blog"></div>
                                                    <div className="comment-blog-listing d-flex align-items-center">
                                                        <i className="fa-regular fa-comment"></i>
                                                        <p className="m-0 ps-2">0 Comments</p>
                                                    </div>
                                                </div>
                                                <div className="blog-para">
                                                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                                                        ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="blog-read-more">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none custom-underline">READ MORE
                                                        <i className="fa-solid fa-arrow-right-long ms-1"></i></Link>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="blog-listing">
                                    <div className="row align-items-center">
                                        <div className="col-xl-5">
                                            <div className="blg-img-list">
                                                <Link href="/blog/1/blog-details">
                                                    <img src="/blog-img-4.png" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <div className="blog-list-head">
                                                <div className="head">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none">
                                                        <h1>Elasticized Drawstring Waistband. Side Pockets With Zip.</h1></Link>
                                                </div>
                                                <div className="blg-by-and-comments d-flex align-items-center">
                                                    <div className="blog-by">
                                                        <p className="m-0">By <span>Diego Lopez </span> On January 08, 2019
                                                        </p>
                                                    </div>
                                                    <div className="border-left-blog"></div>
                                                    <div className="comment-blog-listing d-flex align-items-center">
                                                        <i className="fa-regular fa-comment"></i>
                                                        <p className="m-0 ps-2">0 Comments</p>
                                                    </div>
                                                </div>
                                                <div className="blog-para">
                                                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                                                        ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="blog-read-more">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none custom-underline">READ MORE
                                                        <i className="fa-solid fa-arrow-right-long ms-1"></i></Link>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="blog-listing">
                                    <div className="row align-items-center">
                                        <div className="col-xl-5">
                                            <div className="blg-img-list">
                                                <Link href="/blog/1/blog-details">
                                                    <img src="/blog-img-5.png" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <div className="blog-list-head">
                                                <div className="head">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none">
                                                        <h1>Elasticized Drawstring Waistband. Side Pockets With Zip.</h1></Link>
                                                </div>
                                                <div className="blg-by-and-comments d-flex align-items-center">
                                                    <div className="blog-by">
                                                        <p className="m-0">By <span>Diego Lopez </span> On January 08, 2019
                                                        </p>
                                                    </div>
                                                    <div className="border-left-blog"></div>
                                                    <div className="comment-blog-listing d-flex align-items-center">
                                                        <i className="fa-regular fa-comment"></i>
                                                        <p className="m-0 ps-2">0 Comments</p>
                                                    </div>
                                                </div>
                                                <div className="blog-para">
                                                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                                                        ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="blog-read-more">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none custom-underline">READ MORE
                                                        <i className="fa-solid fa-arrow-right-long ms-1"></i></Link>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="blog-listing">
                                    <div className="row align-items-center">
                                        <div className="col-xl-5">
                                            <div className="blg-img-list">
                                                <Link href="/blog/1/blog-details">
                                                    <img src="/blog-img-6.png" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <div className="blog-list-head">
                                                <div className="head">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none">
                                                        <h1>Elasticized Drawstring Waistband. Side Pockets With Zip.</h1></Link>
                                                </div>
                                                <div className="blg-by-and-comments d-flex align-items-center">
                                                    <div className="blog-by">
                                                        <p className="m-0">By <span>Diego Lopez </span> On January 08, 2019
                                                        </p>
                                                    </div>
                                                    <div className="border-left-blog"></div>
                                                    <div className="comment-blog-listing d-flex align-items-center">
                                                        <i className="fa-regular fa-comment"></i>
                                                        <p className="m-0 ps-2">0 Comments</p>
                                                    </div>
                                                </div>
                                                <div className="blog-para">
                                                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                                                        ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                                                        eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="blog-read-more">
                                                    <Link href="/blog/1/blog-details" className="text-decoration-none custom-underline">READ MORE
                                                        <i className="fa-solid fa-arrow-right-long ms-1"></i></Link>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blog
