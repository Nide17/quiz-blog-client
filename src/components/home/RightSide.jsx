import { lazy, Suspense } from 'react';
import { Col, Row } from 'reactstrap';
import QBLoadingSM from '@/utils/rLoading/QBLoadingSM';
import ResponsiveAd from '@/components/adsenses/ResponsiveAd';
import isAdEnabled from '@/utils/isAdEnabled';
import Subscribe from './Subscribe';

const ViewCategories = lazy(() => import('./categories/ViewCategories'));
const SquareAd = lazy(() => import('@/components/adsenses/SquareAd'));

const RightSide = ({ categories }) => {

    return (
        <Col sm="4" className="d-flex flex-column justify-content-around">
            {/* Top Square Ad */}
            {isAdEnabled() && <Row className="w-100 mb-4">
                <Col sm="12" className="d-flex justify-content-center">
                    <SquareAd />
                </Col>
            </Row>}

            {/* Categories (Desktop Only) */}
            <Row className="mb-4 d-none d-lg-flex side-category">
                <Suspense fallback={<QBLoadingSM />}>
                    <ViewCategories categories={categories} />
                </Suspense>
            </Row>

            {/* Responsive Ad */}
            {isAdEnabled() && <Row className="w-100 mb-4 d-flex justify-content-center">
                <Col sm="12" className="d-flex justify-content-center">
                    <ResponsiveAd />
                </Col>
            </Row>}

            {/* Subscribe Form */}
            <Subscribe />

            {/* Bottom Square Ad */}
            {isAdEnabled() && <Row className="w-100 mb-4">
                <Col sm="12" className="d-flex justify-content-center">
                    <SquareAd />
                </Col>
            </Row>}
        </Col>
    );
};

export default RightSide;
