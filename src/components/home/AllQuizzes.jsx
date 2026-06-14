import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Col, Row, Button, Card, CardBody, CardTitle, CardSubtitle, Alert } from 'reactstrap';
import { getLimitedQuizzes, getQuizzes } from '@/redux/slices/quizzesSlice';
import { useSelector, useDispatch } from 'react-redux';

import SearchInput from '@/utils/SearchInput';
import QBLoadingSM from '@/utils/rLoading/QBLoadingSM';
import ResponsiveAd from '@/components/adsenses/ResponsiveAd';
import isAdEnabled from '@/utils/isAdEnabled';
import SquareAd from '@/components/adsenses/SquareAd';

const QuizItem = lazy(() => import('./QuizItem'));

// Constants
const ITEMS_PER_PAGE = 20;
const MIN_QUESTIONS = 5;

// Hero Section Component
const HeroSection = () => (
    <div className="d-flex justify-content-center px-3 px-md-4 mb-4">
        <div
            className="jbtron rounded px-3 px-sm-4 py-4 py-sm-5 text-center border border-info shadow-sm"
            style={{
                maxWidth: '1080px',
                width: '100%',
                background: 'linear-gradient(120deg, rgba(21,122,110,0.98) 0%, rgba(31,127,110,0.95) 100%)',
                color: '#fff'
            }}
        >
            <h1 className="display-5 fw-bolder mb-3 text-white">
                Quiz library
            </h1>
            <p className="lead mb-0 text-white-75">
                Ready for a quick challenge? Browse concise quizzes across topics.
            </p>
        </div>
    </div>
);

// Search Section Component
const SearchSection = ({ setSearchKey, isLoading }) => {
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center mb-4">
                <div className="p-3 d-flex justify-content-center align-items-center">
                    <QBLoadingSM />
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center mb-4">
            <div className="w-100" style={{ maxWidth: '640px' }}>
                <SearchInput
                    setSearchKey={setSearchKey}
                    placeholder="Search quizzes here..."
                    aria-label="Search quizzes"
                />
            </div>
        </div>
    );
};

// Search Results Component
const SearchResults = ({ searchKey, filteredQuizzes }) => {
    if (!searchKey) return null;

    return (
        <Card className="border-0 shadow-sm mb-3">
            <CardBody className="p-3">
                <h5 className="mb-3 text-center">
                    Results {filteredQuizzes.length > 0 && (
                        <span className="badge bg-primary ms-2">{filteredQuizzes.length}</span>
                    )}
                </h5>
                <div role="region" aria-live="polite" aria-atomic="true">
                    {filteredQuizzes.length > 0 ? (
                        filteredQuizzes.map(quiz => (
                            <QuizItem key={quiz._id} quiz={quiz} fromSearch />
                        ))
                    ) : (
                        <p className="text-center text-muted my-4">
                            No quizzes found for &quot;{searchKey}&quot;
                        </p>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

// Pagination Controls Component
const PaginationControls = ({ skip, limit, itemCount, onPrevious, onNext }) => (
    <Card className="border-0 shadow-sm mt-3 mb-5">
        <CardBody className="py-2 py-md-3 d-grid gap-2 gap-md-0 d-md-flex justify-content-between align-items-center">
            <Button
                onClick={onPrevious}
                className={`btn-sm ${skip < 1 ? 'invisible' : ''}`}
                color="success"
                disabled={skip < 1}
                aria-label="Previous page"
            >
                <i className="bi bi-chevron-left"></i> Prev
            </Button>

            <div className="text-muted text-center">
                Showing <span className="badge bg-secondary">{itemCount}</span>
            </div>

            <Button
                onClick={onNext}
                className={`btn-sm ${itemCount < limit ? 'invisible' : ''}`}
                color="success"
                disabled={itemCount < limit}
                aria-label="Next page"
            >
                Next <i className="bi bi-chevron-right"></i>
            </Button>
        </CardBody>
    </Card>
);

// Quiz List Component
const QuizList = ({ quizzes, isLoading }) => {
    if (isLoading) {
        return (
            <Card className="border-0 shadow-sm mt-4">
                <CardBody className="py-5 d-flex justify-content-center align-items-center">
                    <QBLoadingSM />
                </CardBody>
            </Card>
        );
    }

    if (!quizzes || quizzes.length === 0) {
        return (
            <Card className="border-0 shadow-sm mb-3">
                <CardBody className="p-3 text-center text-muted">
                    <p className="my-4">No quizzes available at the moment.</p>
                </CardBody>
            </Card>
        );
    }

    return (
        <div className="row row-cols-1 g-3">
            {quizzes.map(quiz => (
                <div key={quiz._id} className="col">
                    <QuizItem quiz={quiz} />
                </div>
            ))}
        </div>
    );
};

// Main Component
const AllQuizzes = () => {
    const dispatch = useDispatch();
    const { isLoading, loadingLimited, quizzes, limitedQuizzes } = useSelector(
        state => state.quizzes
    );

    const [limit] = useState(ITEMS_PER_PAGE);
    const [skip, setSkip] = useState(0);
    const [searchKey, setSearchKey] = useState('');

    // Memoized filtered quizzes for search
    const filteredQuizzes = useMemo(() => {
        if (!searchKey || !quizzes) return [];
        const lowerSearchKey = searchKey.toLowerCase();
        return quizzes.filter(q =>
            q?.title?.toLowerCase().includes(lowerSearchKey)
        );
    }, [quizzes, searchKey]);

    // Memoized valid quizzes (with minimum question count)
    const validLimitedQuizzes = useMemo(() => {
        if (!limitedQuizzes) return [];
        return limitedQuizzes.filter(q => q?.questions?.length > MIN_QUESTIONS);
    }, [limitedQuizzes]);

    // Pagination handlers
    const nextPage = () => setSkip(skip + limit);
    const previousPage = () => setSkip(Math.max(skip - limit, 0));

    // Reset pagination when searching
    useEffect(() => {
        if (searchKey) {
            setSkip(0);
        }
    }, [searchKey]);

    // Fetch limited quizzes based on pagination
    useEffect(() => {
        dispatch(getLimitedQuizzes({ limit, skip }));
    }, [dispatch, limit, skip]);

    // Fetch all quizzes for search
    useEffect(() => {
        dispatch(getQuizzes());
    }, [dispatch]);

    return (
        <div className="posts mt-4">
            <HeroSection />

            {/* Main Content */}
            <Row className="mt-3">
                {/* Left Ad */}
                {isAdEnabled() && (
                    <Col
                        xs="12"
                        md="2"
                        className="order-2 order-md-1 mt-3 mt-md-2 d-flex justify-content-center align-items-start"
                    >
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <ResponsiveAd />
                        </div>
                    </Col>
                )}

                {/* Quiz List Section */}
                <Col xs="12" md={isAdEnabled() ? "8" : "12"} className="order-1 order-md-2 mt-3 mt-md-2">
                    <div className="mx-auto" style={{ maxWidth: '1080px' }}>
                        <Suspense fallback={<QBLoadingSM />}>
                            {/* Search Input */}
                            <SearchSection
                                setSearchKey={setSearchKey}
                                isLoading={isLoading}
                            />

                            {/* Search Results */}
                            <SearchResults
                                searchKey={searchKey}
                                filteredQuizzes={filteredQuizzes}
                            />

                            {/* Quiz Items with Pagination */}
                            {!searchKey && (
                                <>
                                    <QuizList
                                        quizzes={validLimitedQuizzes}
                                        isLoading={loadingLimited}
                                    />

                                    {!loadingLimited && validLimitedQuizzes.length > 0 && (
                                        <PaginationControls
                                            skip={skip}
                                            limit={limit}
                                            itemCount={validLimitedQuizzes.length}
                                            onPrevious={previousPage}
                                            onNext={nextPage}
                                        />
                                    )}
                                </>
                            )}
                        </Suspense>
                    </div>
                </Col>

                {/* Right Ad */}
                {isAdEnabled() && (
                    <Col
                        xs="12"
                        md="2"
                        className="order-3 mt-3 mt-md-2 d-flex justify-content-center align-items-start"
                    >
                        <SquareAd />
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default AllQuizzes;