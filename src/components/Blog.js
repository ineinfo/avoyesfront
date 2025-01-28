"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { fetchBlogs, fetchBlogCategory, fetchBlogTags, fetchBlogComments } from "@/utils/api/BlogApi";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import defaultImg from "../../public/defaultImg.jpg";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogCategories, setBlogCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogsResponse, categoriesResponse, tagsResponse, commentsResponse] = await Promise.all([
                    fetchBlogs(),
                    fetchBlogCategory(),
                    fetchBlogTags(),
                    fetchBlogComments()
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

    // // Filter blogs by selected category or tag
    // const filteredBlogs = blogs.filter(blog => {
    //     const categoryMatch = selectedCategory ? blog.category_id === selectedCategory : true;
    //     const tagMatch = selectedTag ? blog.tags && blog.tags.includes(selectedTag) : true;
    //     return categoryMatch && tagMatch;
    // });

    const filteredBlogs = blogs.filter(blog => {
        const categoryMatch = selectedCategory ? blog.category_id === selectedCategory : true;
        const tagMatch = selectedTag ? blog.tags && blog.tags.includes(selectedTag) : true;
        const searchMatch =
            (blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (blog.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

        return categoryMatch && tagMatch && searchMatch;
    });

    // if (filteredBlogs.length === 0) {
    //     return <div>No blog found</div>;
    // }


    return (
        <>
            {/* <div className="breadcrumb-marketplace py-5">
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
            </div> */}

            <section>
                <div className="blog-main py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4">
                                <div className="blog-search-top">
                                    <div className="input-group blog-search-bar">
                                        {/* <input type="text" className="form-control" placeholder="Search..." /> */}
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            value={searchQuery} // Bind value to searchQuery state
                                            onChange={(e) => setSearchQuery(e.target.value)} // Step 3: Update state on change
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
                                                    style={{ cursor: 'pointer' }}
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
                                                        {/* <img src={blog.image_url} alt="" />  */}
                                                        {/* src={blog.image_url ? blog.image_url : defaultBImg.src} */}
                                                        <Link href={`/${blog.id}/blog-details`} className="text-decoration-none">
                                                            <img src={blog.image_url && !blog?.image_url?.includes('localhost') ? blog.image_url : `http://38.108.127.253:3000/uploads/blogs/1730093974333-15225507.png`} alt='' />



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
                                                onClick={() => setSelectedTag(tag.title)}
                                            >
                                                {tag.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="left-blog-img">
                                    {/* <img src="/left-blog-img.png" alt="" /> */}
                                </div>
                            </div>

                            <div className="col-xl-9 col-lg-8">
                                {filteredBlogs.length > 0 ? (
                                    filteredBlogs.map(blog => (
                                        <div key={blog.id} className="blog-listing">
                                            <div className="row align-items-center">
                                                <div className="col-xl-5">
                                                    <div className="blg-img-list">
                                                        <Link href={`/${blog.id}/blog-details`}>
                                                            <img src={blog.image_url} alt={blog.title}
                                                                style={{ borderRadius: "15px" }} />
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
                                    ))

                                ) : (
                                    <div className="centered-message">
                                        No Blog Found Of This Search.
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
