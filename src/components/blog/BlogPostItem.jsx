import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import altImage from '@/images/dashboard.svg';

const BlogPostItem = ({ blogPost }) => {

    const { slug, title, postCategory, post_image, brand, creator, createdAt } = blogPost;

    return (
        <Card className="bg-light py-3 px-1 px-sm-3 my-2 my-sm-3 border post-card">
            <Link to={`/view-blog-post/${slug}`} className="text-decoration-none text-reset">
                <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                    <div className="post-thumb flex-shrink-0">
                        <img src={post_image || altImage} alt={brand || title} />
                    </div>

                    <CardBody className="p-0">
                        <CardTitle tag="h5" className="mb-2 text-primary text-uppercase fw-bolder post-title">
                            {title}
                        </CardTitle>

                        <div className="small-text text-muted mb-2">
                            <small>
                                {moment(new Date(createdAt)).format('DD MMM YYYY, HH:mm')}
                                {' • '}
                                {postCategory && postCategory.title}
                                {creator && creator.name ? ` • ${creator.name}` : ''}
                            </small>
                        </div>

                        {/* optional excerpt if available */}
                        {blogPost.excerpt && (
                            <p className="mb-0 text-truncate text-dark">{blogPost.excerpt}</p>
                        )}
                    </CardBody>
                </div>
            </Link>
        </Card>
    );
};

export default BlogPostItem;