import Link from 'next/link'
import React from 'react'

const BlogDetails = () => {
    return (
        <>
            <div class="breadcrumb-marketplace py-5">
                <div class="img">
                    <img src="" alt="" />
                    <div class="container">
                        <div class="bread-head text-end">
                            <div class="link d-flex align-items-center justify-content-end">
                                <Link href="/" class="text-decoration-none me-1">HOME</Link>
                                <Link href="/blog" class="text-decoration-none">/ BLOG /</Link>
                                <p class="m-0 ps-1">ELASTICIZED DRAWSTRING WAISTBAND</p>
                            </div>
                            <h1>Blog</h1>
                        </div>
                    </div>

                </div>
            </div>

            <section>
                <div class="blog-main blog-details-page-main py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-3 col-lg-4">
                                <div class="blog-search-top">
                                    <div class="input-group  blog-search-bar">
                                        <input type="text" class="form-control" placeholder="Search..." />
                                        <span class="input-group-text search-icon">
                                            <i class="bi bi-search"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="blog-categories">
                                    <div class="head">
                                        <h3>CATEGORIES</h3>
                                    </div>
                                    <div class="bg-line">
                                        <div class="moving-line"></div>
                                    </div>
                                    <div class="cat-listing">
                                        <div class="cat-li-1"><Link href="/blog" class="text-decoration-none">Fashion</Link></div>
                                        <div class="cat-border"></div>
                                        <div class="cat-li-1"><Link href="/blog" class="text-decoration-none">Life Style</Link></div>
                                        <div class="cat-border"></div>
                                        <div class="cat-li-1"><Link href="/blog" class="text-decoration-none">Foodie</Link></div>
                                        <div class="cat-border"></div>
                                        <div class="cat-li-1"><Link href="/blog" class="text-decoration-none">Events</Link></div>
                                        <div class="cat-border"></div>
                                        <div class="cat-li-1"><Link href="/blog" class="text-decoration-none">Out Door</Link></div>
                                        <div class="cat-border"></div>
                                        <div class="cat-li-1"><Link href="/blog" class="text-decoration-none">Street Style</Link>
                                        </div>
                                        <div class="cat-border"></div>
                                    </div>
                                </div>
                                <div class="recent-post">
                                    <div class="head">
                                        <h3>RECENT POSTS</h3>
                                    </div>
                                    <div class="bg-line">
                                        <div class="moving-line"></div>
                                    </div>
                                    <div class="posts post-mt">
                                        <div class="row align-items-center">
                                            <div class="col-md-4">
                                                <div class="post-img">
                                                    <img src="/recent-post-1.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-md-8">

                                                <div class="post-head-line">
                                                    <Link href="/blog/1/blog-details" class="text-decoration-none"><h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div class="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="post-border"></div>
                                    <div class="posts">
                                        <div class="row align-items-center">
                                            <div class="col-md-4">
                                                <div class="post-img">
                                                    <img src="/recent-post-2.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-md-8">

                                                <div class="post-head-line">
                                                    <Link href="/blog/1/blog-details" class="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div class="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="post-border"></div>
                                    <div class="posts">
                                        <div class="row align-items-center">
                                            <div class="col-md-4">
                                                <div class="post-img">
                                                    <img src="/recent-post-3.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-md-8">

                                                <div class="post-head-line">
                                                    <Link href="/blog/1/blog-details" class="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div class="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="post-border"></div>
                                    <div class="posts">
                                        <div class="row align-items-center">
                                            <div class="col-md-4">
                                                <div class="post-img">
                                                    <img src="/recent-post-2.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-md-8">

                                                <div class="post-head-line">
                                                    <Link href="/blog/1/blog-details" class="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div class="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="post-border"></div>
                                    <div class="posts">
                                        <div class="row align-items-center">
                                            <div class="col-md-4">
                                                <div class="post-img">
                                                    <img src="/recent-post-3.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-md-8">

                                                <div class="post-head-line">
                                                    <Link href="/blog/1/blog-details" class="text-decoration-none"> <h3>Fashion News Missed This Week </h3></Link>
                                                </div>
                                                <div class="post-date">
                                                    <p>Sep 24, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="blog-tags">
                                    <div class="head">
                                        <h3>TAGS</h3>
                                    </div>
                                    <div class="bg-line">
                                        <div class="moving-line"></div>
                                    </div>
                                    <div class="tags">
                                        <Link href="/blog/1/blog-details" class="text-decoration-none text-dark">
                                            <div class="tag">Clothing</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Fashion</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Foodie</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Products</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Store</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Events</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Activity</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Clothing</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Fashion</div>
                                        </Link>
                                        <Link href="/blog" class="text-decoration-none text-dark">
                                            <div class="tag">Foodie</div>
                                        </Link>
                                    </div>
                                </div>
                                <div class="left-blog-img">
                                    <img src="/left-blog-img.png" alt="" />
                                </div>
                            </div>
                            <div class="col-xl-9 col-lg-8">
                                <div class="blog-details-main">
                                    <div class="blog-dtl-img">
                                        <img src="/blog-dtl-img.png" alt="" />
                                    </div>
                                </div>
                                <div class="blog-dtl-comments d-flex align-items-center">
                                    <div class="blog-by">
                                        <p class="m-0">By <span>Diego Lopez </span> On January 08, 2019
                                        </p>
                                    </div>
                                    <div class="comment-blog-listing d-flex align-items-center">
                                        <i class="fa-regular fa-comment"></i>
                                        <p class="m-0 ps-2">0 Comments</p>
                                    </div>
                                </div>
                                <div class="blog-dtl-head">
                                    <h1>Elasticized Drawstring Waistband. Side Pockets With Zip.</h1>
                                </div>
                                <div class="blog-dtl-para">
                                    <p class="m-0">Esigner and textile artist Sarah Wertzberger plays upon unexpected
                                        patterns and color
                                        combinations in beautiful, surprising ways. A graduate of RISD, Sarah maintains a
                                        multidisciplinary studio practice, but her work at the loom celebrates the freedom
                                        that comes with weaving by hand. Rather than planning a project and executing it to
                                        a tee, she lets her designs shift and fluctuate intuitively — the end result is a
                                        unique blend of artistic and functional objects, spanning handwoven blankets,
                                        pillows, and hanging artworks.</p>
                                    <p>We spoke with Sarah about some of the things that inspire, motivate, and inform her
                                        design process, from brightly lit New York bodegas to vernacular architecture from
                                        all over the world.</p>
                                    <div class="slogan-box">
                                        <div class="icon">
                                            <i class="fa-solid fa-quote-right"></i>
                                        </div>
                                        <div class="italic-quote">
                                            <p>You can have anything you want in life if you dress for it</p>
                                        </div>
                                        <div class="slogan-by ms-4">
                                            <p>- Jenny John</p>
                                        </div>
                                    </div>
                                    <p class="m-0">
                                        When you sit down to make, what guides your design perspective? I enjoy designing
                                        against the parameters that are inherently set in place depending on the type of
                                        loom I am using and what type of object I am making, functional or not functional.
                                        What materials do you use? I mostly use cotton and wool for functional pieces, for
                                        practical reasons. Cotton is strong and available in many colors, and wool is soft
                                        and give the pieces more weight. How do you choose and incorporate varying yarn
                                        textures? In weaving varying yarns, weights are surprisingly important to get the
                                        effects you want, so sometimes I alternate and thin cotton yarn with a heavier wool
                                        yarn to create a graphic effect. I also think about the end-use and function of the
                                        pieces to inform those decisions. What informs your color choices? I choose colors
                                        that excite me and make me feel a sense of playfulness and joy. That usually means
                                        saturated, bright colors, but I do also use neutrals to complement and play around
                                        with unexpected color combinations.</p>
                                    <p class="m-0">What drew you to weaving and textiles in the first place? I think the
                                        idea that
                                        textiles can be both functional as well as art, like all the crafts, drew me to it.
                                        I also enjoy that weaving is an applied craft that feels like a kind of underground,
                                        mostly female dominant tradition — at least from a US perspective, however there are
                                        lots of awesome male weavers out there. It felt like a safe place to me to start
                                        making from.</p>
                                    <p class="m-0">What inspires you? People, places, things, or even processes? I used to
                                        live in New York for five years and I loved Chinatown, dollar stores, and bodegas
                                        for inspiring and unexpected color and material combinations. I’m inspired by folk
                                        arts, DIY, crafts and vernacular architecture from all over the world. I look at
                                        lots of contemporary artists, designers, weavers.</p>
                                    <p class="">When you're not weaving, what are you doing? Teaching weaving, trying to
                                        soak up sun (living in Portland necessitates this), drinking Italian and Oregon
                                        wine, cycling, and hiking. This summer I am going to take a trip to Scotland, and I
                                        am excited to check out some weaving mills there!
                                        Tags: Design, Art, Textiles</p>
                                </div>
                                <div class="blog-end-dtl d-flex justify-content-between align-items-center">
                                    <div class="text">
                                        <Link href="">CASUAL,</Link>
                                        <Link href="">COLLECTION,</Link>
                                        <Link href="">CREATIVE</Link>

                                    </div>
                                    <div class="blg-social d-flex align-items-center">
                                        <p class="m-0">SHARE:</p>
                                        <Link href=""><i class="fa-brands fa-facebook-f"></i></Link>
                                        <Link href=""><i class="fa-brands fa-instagram mx-3"></i></Link>
                                        <Link href=""><i class="fa-brands fa-tiktok"></i></Link>
                                    </div>
                                </div>
                                {/* <div class="border-btm-blog-dtl"></div> */}

                                <div class="blg-dtl-comment-main">
                                    <div class="blg-dtl-all-comments d-flex align-items-center justify-content-between">
                                        <div class="head">
                                            <h3 class="m-0">(3) Comment For This Post</h3>
                                        </div>
                                        <Link href="#" class="text-decoration-none text-dark" data-bs-toggle="modal" data-bs-target="#writeCommentModal">
                                            <div class="write-recomment d-flex align-items-center" >
                                                <i class="fa-solid fa-pen me-2"></i>
                                                <p class="m-0">Write Your Comment!</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="modal fade" id="writeCommentModal" tabindex="-1" aria-labelledby="writeCommentModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title w-100 text-center write-review-head" id="reviewModalLabel">
                                                        <div class="border-left-head"></div>Write Comment
                                                    </h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="main-review-popup-section">
                                                        <div class="mb-3 review-input">
                                                            <label for="reviewText" class="form-label">Comment</label>
                                                            <textarea class="form-control" id="reviewText" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="border-0 close-btn" data-bs-dismiss="modal">CLOSE</button>
                                                    <button type="button" class="border-0 submit-btn">SUBMIT</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="blg-dtl-comment-1">
                                        <div class="row align-items-center blog-review-margin">
                                            <div class="col-lg-2">
                                                <div class="cmt-img-blg">
                                                    <img src="/blg-cmt-3.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-10">
                                                <div class="mobile-rating">
                                                    {/* <div class="stars">
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-regular fa-star-half-stroke"></i>
                                                    </div>  */}
                                                    <div class="date">
                                                        <p>June 4 2024</p>
                                                    </div>
                                                </div>
                                                <div class="name">
                                                    <h3>IMANI MILL</h3>
                                                </div>
                                                <div class="para">
                                                    <p>Condimentum lacinia quis vel eros. Auctor neque vitae tempus quam
                                                        pellentesque. Et pharetra pharetra massa massa. Dignissim sodales ut
                                                        eu
                                                        sem integer. Condimentum lacinia quis vel eros. Auctor neque vitae
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row justify-content-end align-items-center blog-review-margin">
                                            <div class="col-lg-2">
                                                <div class="cmt-img-blg">
                                                    <img src="/blg-cmt-2.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="mobile-rating">
                                                    {/* <div class="stars">
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-regular fa-star-half-stroke"></i>
                                                    </div>  */}
                                                    <div class="date">
                                                        <p>June 4 2024</p>
                                                    </div>
                                                </div>
                                                <div class="name">
                                                    <h3>JOHN DIO</h3>
                                                </div>
                                                <div class="para">
                                                    <p>Condimentum lacinia quis vel eros. Auctor neque vitae tempus quam
                                                        pellentesque. Et pharetra pharetra massa massa. Dignissim sodales ut
                                                        eu
                                                        sem integer. Condimentum lacinia quis vel eros. Auctor neque vitae
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row align-items-center blog-review-margin">
                                            <div class="col-lg-2">
                                                <div class="cmt-img-blg">
                                                    <img src="/blg-cmt-1.png" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-10">
                                                <div class="mobile-rating">
                                                    {/* <div class="stars">
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-solid fa-star"></i>
                                                        <i class="fa-regular fa-star-half-stroke"></i>
                                                    </div> */}
                                                    <div class="date">
                                                        <p>June 4 2024</p>
                                                    </div>
                                                </div>
                                                <div class="name">
                                                    <h3>KYLE GENTRE</h3>
                                                </div>
                                                <div class="para">
                                                    <p>Condimentum lacinia quis vel eros. Auctor neque vitae tempus quam
                                                        pellentesque. Et pharetra pharetra massa massa. Dignissim sodales ut
                                                        eu
                                                        sem integer. Condimentum lacinia quis vel eros. Auctor neque vitae
                                                    </p>
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

export default BlogDetails
