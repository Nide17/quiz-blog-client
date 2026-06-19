import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getFeedbacks } from '@/redux/slices/feedbacksSlice';

import Pagination from '@/components/dashboard/utils/Pagination';
import PageOf from '@/components/dashboard/utils/PageOf';
import FeedbacksTable from './FeedbacksTable';
import QBLoadingSM from '@/utils/rLoading/QBLoadingSM';
import NotAuthenticated from '@/components/users/NotAuthenticated';
import Dashboard from '@/components/dashboard/Dashboard';
import Jumbotron from '@/utils/Jumbotron';

const Feedbacks = () => {
    const dispatch = useDispatch();
    const { allFeedbacks, totalPages, isLoading } = useSelector(state => state.feedbacks);
    const { user, isAuthenticated } = useSelector(state => state.users);

    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        dispatch(getFeedbacks(pageNo));
    }, [dispatch, pageNo]);

    if (!isAuthenticated) return <NotAuthenticated />;
    if (user?.role === 'Visitor') return <Dashboard />;

    return (
        <div className="px-3 px-sm-4 py-3 py-sm-5 d-flex flex-column align-items-center">
            <Jumbotron
                h1="Users Feedback"
                p="These are comments and ratings submitted by quiz takers."
            />

            {isLoading ? (
                <QBLoadingSM title='feedbacks' />
            ) : (
                <Row className="w-100 mt-4">
                    <Col sm="12">

                        {/* Empty State */}
                        {(!allFeedbacks || allFeedbacks.length === 0) ? (
                            <div className="text-center py-5 text-muted">
                                <h5>No feedbacks found.</h5>
                                <p className="small">User feedback will appear here when available.</p>
                            </div>
                        ) : (
                            <>
                                <PageOf pageNo={pageNo} numberOfPages={totalPages} />

                                <FeedbacksTable
                                    feedbacksToUse={allFeedbacks}
                                    pageNo={pageNo}
                                />

                                <Pagination
                                    pageNo={pageNo}
                                    setPageNo={setPageNo}
                                    numberOfPages={totalPages}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Feedbacks;
