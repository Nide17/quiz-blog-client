import { useEffect, lazy, Suspense } from 'react';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogPostsByCategory, getPostCategories } from '@/redux/slices';
import ResponsiveAd from '@/components/adsenses/ResponsiveAd';
import isAdEnabled from '@/utils/isAdEnabled';
import QBLoadingSM from '@/utils/rLoading/QBLoadingSM';
import { Link, useLocation, useParams } from 'react-router-dom';
import './allBlogPosts.css';

const BlogPostItem = lazy(() => import('./BlogPostItem'));

const CategoryList = ({ categories, location }) => (
    <div className="category-list-wrapper">
        <div className="category-sidebar-card p-4 mb-4">
            <ListGroup className="cats-container">
                <Link to='/blog' className='category-link'>
                    <ListGroupItem action active={location.pathname === '/blog'}>
                        {'All Categories'.toUpperCase()}
                    </ListGroupItem>
                </Link>
                {categories.map(category => (
                    <Link
                        to={`/blog/${category._id}`}
                        key={category._id}
                        className='category-link'
                    >
                        <ListGroupItem action active={location.pathname === `/blog/${category._id}`}>
                            {category.title.toUpperCase()}
                        </ListGroupItem>
                    </Link>
                ))}
            </ListGroup>
        </div>
    </div>
);

const BlogPosts = ({ posts, isLoading, categoryName }) => {
    if (isLoading) {
        return <QBLoadingSM />;
    }

    if (!posts.length) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 text-warning">
                <div className="text-center p-4 rounded shadow-sm bg-white">
                    <p className="mb-2 fw-bold">No posts found</p>
                    <p className="mb-0 text-muted">This category has no posts yet. Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-3">
                <div>
                    <h2 className="mb-1 fw-bold">{categoryName || 'Category Posts'}</h2>
                    <p className="text-muted mb-0">Discover articles curated for this category.</p>
                </div>
                <span className="text-muted small">{posts.length} posts</span>
            </div>
            {posts.map(blogPost => (
                <BlogPostItem key={blogPost._id} blogPost={blogPost} />
            ))}
        </>
    );
};

const ByCategory = () => {
    const dispatch = useDispatch();
    const { blogPostsByCategory, isLoading } = useSelector(state => state.blogPosts);
    const bPcats = useSelector(state => state.postCategories);
    const location = useLocation();
    const { bPCatID } = useParams();

    const currentCategory = bPcats.allPostCategories?.find(category => category._id === bPCatID);

    // Load categories only once on component mount
    useEffect(() => {
        dispatch(getPostCategories());
    }, [dispatch]);

    // Load posts for the selected category
    useEffect(() => {
        if (bPCatID) {
            dispatch(getBlogPostsByCategory(bPCatID));
        }
    }, [dispatch, bPCatID]);

    return (
        <div className="posts blog-posts mt-4 py-lg-4">
            <Row className="gx-4">
                <Col sm="3" className="d-none d-sm-block">
                    {bPcats.isLoading ? (
                        <QBLoadingSM />
                    ) : (
                        <div className='sticky-top sticky-categories'>
                            <CategoryList categories={bPcats.allPostCategories || []} location={location} />
                        </div>
                    )}

                    {isAdEnabled() && (
                        <div className='mt-4'>
                            <ResponsiveAd />
                        </div>
                    )}
                </Col>

                <Col sm="8" xs="12">
                    <Suspense fallback={<QBLoadingSM />}>
                        <BlogPosts
                            posts={blogPostsByCategory || []}
                            isLoading={isLoading}
                            categoryName={currentCategory?.title}
                        />
                    </Suspense>
                </Col>
            </Row>
        </div>
    );
};

export default ByCategory;
