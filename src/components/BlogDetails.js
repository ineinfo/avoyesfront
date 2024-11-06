"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import parse from 'html-react-parser';



import { fetchBlogs, fetchBlogCategory, fetchBlogTags, fetchBlogComments ,fetchBlogById ,submitBlogComment } from "@/utils/api/BlogApi"; 

const BlogDetails = () => {
    const { id } = useParams(); 
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState([]);
    const [blogCategories, setBlogCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [blogDetails, setBlogDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRelatedVisible, setIsRelatedVisible] = useState(false); 
    const [searchQuery, setSearchQuery] = useState('');
 


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleCommentSubmit = async () => {
        if (!commentText.trim()) {
            alert("Comment can't be empty");
            return;
        }
   
        try {
            // Submit the comment and get the newly added comment
            const newComment = await submitBlogComment(id, commentText);
   
            // Update both the local comments array and blogDetails.comments
            setComments((prevComments) => [...prevComments, newComment]);
            setBlogDetails((prevDetails) => ({
                ...prevDetails,
                comments: [...prevDetails.comments, newComment],
            }));
   
            // Clear the comment input field
            setCommentText('');
        } catch (error) {
            console.error("Error submitting comment:", error);
            alert("Failed to submit comment. Please try again.");
        }
   
        closeModal();
    };
   
    
    useEffect(() => {
        const loadComments = async () => {
            const fetchedComments = await fetchBlogComments();
            if (fetchedComments.status !== false) {
                setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
            }
        };
   
        loadComments();
    }, []);
   
    
    // const handleCommentSubmit = async () => {
    //     if (!commentText.trim()) {
    //         alert("Comment can't be empty");
    //         return;
    //     }

    //     try {
    //         const newComment = await submitBlogComment(id, commentText);
            
    //         setComments((prevComments) => [...prevComments, newComment]);
    //         setCommentText(''); 
    //     } catch (error) {
    //         console.error("Error submitting comment:", error);
    //         alert("Failed to submit comment. Please try again.");
    //     }

    //     closeModal();
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogsResponse, categoriesResponse, tagsResponse, commentsResponse] = await Promise.all([
                    fetchBlogs(),
                    fetchBlogCategory(),
                    fetchBlogTags(),
                    // fetchBlogComments()
                ]);

                setBlogs(Array.isArray(blogsResponse.data) ? blogsResponse.data : []);
                setBlogCategories(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
                setTags(Array.isArray(tagsResponse.data) ? tagsResponse.data : []);
                setComments(Array.isArray(commentsResponse.data) ? commentsResponse.data : []);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter blogs by selected category or tag
    const filteredBlogs = blogs.filter(blog => {
        const categoryMatch = selectedCategory ? blog.category_id === selectedCategory : true;
        const tagMatch = selectedTag ? blog.tags && blog.tags.includes(selectedTag) : true;
        const searchMatch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && tagMatch && searchMatch;
    });

 
  


    useEffect(() => {
        const loadBlogDetails = async () => {
            if (id) {
                try {
                    const response = await fetchBlogById(id);
                    setBlogDetails(response.data.data); 
                    setComments(response.data.data.comments || []); 
                } catch (error) {
                    console.error("Error fetching blog details:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        loadBlogDetails();
    }, [id]); 


      useEffect(() => {
        setIsRelatedVisible(selectedCategory !== null || selectedTag !== null || searchQuery !== '')
    }, [selectedCategory, selectedTag , searchQuery]);

    if (loading) {
        return <p>Loading...</p>; 
    }

    if (!blogDetails) {
        return <p>Blog not found.</p>; 
    }
    const extractQuote = (htmlString) => {
        const quoteRegex = /<blockquote>(.*?)<\/blockquote>/;
        const match = htmlString.match(quoteRegex);
        return match ? match[1] : '';
    };
    
  
    const getDescriptionAndParagraphsAfterQuote = (htmlString) => {

        const quoteRegex = /<blockquote>.*?<\/blockquote>/;
        const paragraphsAfterQuote = htmlString.split(quoteRegex);
    
    
        const descriptionWithoutQuote = paragraphsAfterQuote[0].trim();

        const followingParagraphs = paragraphsAfterQuote.slice(1).join('');
    
        return { descriptionWithoutQuote, followingParagraphs };
    };
    
    // Use the functions
    const { descriptionWithoutQuote, followingParagraphs } = getDescriptionAndParagraphsAfterQuote(blogDetails.description);
    const quote = extractQuote(blogDetails.description);


    const commentsCount = blogDetails.comments ? blogDetails.comments.length : 0;

    

    return (
        <>
        
            <div className="breadcrumb-marketplace py-5">
                <div className="img">

                    <div className="container">
                        <div className="bread-head text-end">
                            <div className="link d-flex align-items-center justify-content-end">
                                <Link href="/" className="text-decoration-none me-1">HOME</Link>
                                <Link href="/blog" className="text-decoration-none">/ BLOG /</Link>
                                <p className="m-0 ps-1">{blogDetails.title}</p>
                            </div>
                            <h1>Blog</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="blog-main blog-details-page-main py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4">
                                <div className="blog-search-top">
                                    <div className="input-group blog-search-bar">
                                        <input type="text" className="form-control" placeholder="Search..."
                                        value={searchQuery}
                                         onChange={(e) => setSearchQuery(e.target.value)}
                                        />
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
                                        {blogCategories.map((category) => (
                                            <React.Fragment key={category.id}>
                                                <div 
                                                    className="cat-li-1" 
                                                    onClick={() => setSelectedCategory(category.id)}
                                                    style={{cursor: 'pointer'}} 
                                                >
                                                    {category.title}
                                                </div>
                                                <div className="cat-border"></div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>


                                <div className="recent-post">
                                    <div className="head">
                                        <h3>RECENT POSTS</h3>
                                    </div>
                                    <div className="bg-line">
                                        <div className="moving-line"></div>
                                    </div>
                                    {blogs.slice(0, 5).map((blog) => (
                                        <div key={blog.id} className="posts post-mt">
                                            <div className="row align-items-center">
                                                <div className="col-md-4 col-3">
                                                    <div className="post-img">
                                                    <Link href={`/${blog.id}/blog-details`} className="text-decoration-none">
                                                        <img src={blog.image_url && !blog?.image_url?.includes('localhost') ? blog.image_url : `http://38.108.127.253:3000/uploads/blogs/1730093974333-15225507.png`} />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-9">
                                                    <div className="post-head-line">
                                                        <Link href={`/${blog.id}/blog-details`} className="text-decoration-none">
                                                            <h3>{blog.title}</h3>
                                                        </Link>
                                                    </div>
                                                    <div className="post-date">
                                                        <p>
                                                            {new Date(blog.blog_date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-border"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="blog-tags">
                                    <div className="head">
                                        <h3>TAGS</h3>
                                    </div>
                                    <div className="bg-line">
                                        <div className="moving-line"></div>
                                    </div>
                                    <div className="tags">
                                    {tags.map(tag => (
                                            <span 
                                                key={tag.id} 
                                                className={`tag ${selectedTag === tag.title ? 'active' : ''}`}
                                                onClick={() => {
                                                    setSelectedTag(tag.title);
                                                    setSelectedCategory(null); // reset category
                                                }}
                                            >
                                                {tag.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="left-blog-img">
                                    {/* <img src="/left-blog-img.png" alt="Blog decoration" /> */}
                                </div>
                            </div>

                            
                            
                            {/* right data */}
                            <div className="col-xl-9 col-lg-8">
    {isRelatedVisible ? (
        <div className="related-blogs">
            <h3> </h3>
            {filteredBlogs.length > 0 ? (
                filteredBlogs.map(blog => (
                    <div key={blog.id} className="related-blog">
                        <div className="blog-listing">
                            <div className="row align-items-center">
                                <div className="col-xl-5">
                                    <div className="blg-img-list">
                                        <Link href={`/${blog.id}/blog-details`}>
                                            <img src={blog.image_url} alt={blog.title} style={{ borderRadius: "15px" }} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-7">
                                    <div className="blog-list-head">
                                        <div className="head">
                                            <Link href={`/${blog.id}/blog-details`} className="text-decoration-none">
                                                <h1>{blog.title}</h1>
                                            </Link>
                                        </div>
                                        <div className="blg-by-and-comments d-flex align-items-center">
                                            <div className="blog-by">
                                                <p className="m-0">
                                                    By <span>{blog.author || 'Admin'}</span> On {new Date(blog.blog_date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="border-left-blog"></div>
                                            {comments.filter(comment => comment.blog_id === blog.id).length > 0 && (
                                                <div className="comment-blog-listing d-flex align-items-center">
                                                    <i className="fa-regular fa-comment"></i>
                                                    <p className="m-0 ps-2">
                                                        {comments.filter(comment => comment.blog_id === blog.id).length} Comments
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="blog-para">
                                            <p>{blog.short_description}</p>
                                        </div>
                                        <div className="blog-read-more">
                                            <Link href={`/${blog.id}/blog-details`} className="text-decoration-none custom-underline">
                                                READ MORE<i className="fa-solid fa-arrow-right-long ms-1"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="centered-message">
                No Blogs Found Of This Search.
              </div>
            )}
        </div>
    ) : (
        <>
            <div className="blog-details-main">
                    <div className="blog-dtl-img">
                        <img src={blogDetails.image_url} alt="Blog Detail" />
                    </div>
                </div>

                <div className="blog-dtl-comments d-flex align-items-center">
                    <div className="blog-by">
                        <p className="m-0">By <span>{blogDetails.author || 'Admin'}</span> On {new Date(blogDetails.blog_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}</p>
                    </div>

                    {commentsCount > 0 && (
                        <div className="comment-blog-listing d-flex align-items-center">
                            <i className="fa-regular fa-comment"></i>
                            <p className="m-0 ps-2">{commentsCount} Comments</p>
                        </div>
                    )}
                </div>

                <div className="blog-dtl-head">
                    <h1>{blogDetails.title}</h1>
                </div>

                <div className="blog-dtl-para">
                    <div>{parse(descriptionWithoutQuote)}</div>

                    {/* Conditionally render the quote section */}
                    {quote && (
                        <div className="slogan-box">
                            <div className="icon">
                                <i className="fa-solid fa-quote-right"></i>
                            </div>
                            <div>
                                <div className="italic-quote">
                                    <p>{quote}</p>
                                </div>
                                <div className="slogan-by ms-4">
                                    <p> - {blogDetails.author}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conditionally render following paragraphs */}
                    {followingParagraphs && (
                        <div dangerouslySetInnerHTML={{ __html: followingParagraphs }} />
                    )}

                    <p>Tags: {Array.isArray(blogDetails.tags) ? blogDetails.tags.join(', ') : 'No tags available'}</p>
                </div>

            <div className="blog-end-dtl d-flex justify-content-between align-items-center">
                <div className="text">
                <a style={{ textTransform: 'uppercase' }}>
                    {blogDetails.blog_category_title}
                </a>

                </div>
                <div className="blg-social d-flex align-items-center">
                    <p className="m-0">SHARE:</p>
                    <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram mx-3"></i></a>
                    <a href="https://www.tiktok.com/foryou?lang=en"><i className="fa-brands fa-tiktok"></i></a>
                </div>
            </div>

            <div className="blg-dtl-comment-main">
                <div className="blg-dtl-all-comments d-flex align-items-center justify-content-between">
                    {commentsCount > 0 && (
                        <div className="head">
                            <h3 className="m-0">{`(${commentsCount}) Comments `} For This Post</h3>
                        </div>
                    )}

                    <div className="text-decoration-none text-dark" onClick={openModal} style={{ cursor: 'pointer' }}>
                        <div className="write-recomment d-flex align-items-center">
                            <i className="fa-solid fa-pen me-2"></i>
                         
                            <p className="m-0">Write Your Comment!</p>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal fade show" style={{ display: 'block'  }} onClick={closeModal}>
                        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content" 
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '550px',
                                height: '400px',                           
                                boxShadow: '0 5px 15px rgba(0,0,0,0.3)', 
                                overflow: 'auto', 
                              }}    
    >
                                <div className="modal-header">
                                    <h5 className="modal-title w-100 text-center write-review-head">
                                    <div class="border-left-head"></div>
                                        Write a Comment</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="main-review-popup-section">
                                        <div className="mb-3 review-input">
                                            <label htmlFor="reviewText" className="form-label">Comment</label>
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                id="reviewText"
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                               
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="border-0 close-btn" onClick={closeModal}>
                                        Close
                                    </button>
                                    <button type="button" className="border-0 submit-btn" onClick={handleCommentSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                {blogDetails.comments && blogDetails.comments.length > 0 && blogDetails.comments.map((comment, index) => (
    comment ? (
        <div key={comment.id || index} className="blg-dtl-comment-1"> {/* Use index as fallback key */}
            <div className="row align-items-center blog-review-margin">
                <div className="col-lg-2">
                    <div className="cmt-img-blg">
                        <img 
                            src={comment?.user_avatar || '/default-avatar.jpg'} // Use optional chaining
                            alt={`${comment?.user_first_name || 'Anonymous'} ${comment?.user_last_name || ''}`} 
                        />
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className="mobile-rating">
                        <div className="date">
                            <p>{new Date(comment?.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className="name">
                        <h3>{comment?.user_first_name || 'Anonymous'} {comment?.user_last_name || ''}</h3>
                    </div>
                    <div className="para">
                        <p>{comment?.comment || 'No comment available.'}</p>
                    </div>
                </div>
            </div>
        </div>
    ) : null
))}


            </div>
        </>
    )}
</div>

                           
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogDetails;
