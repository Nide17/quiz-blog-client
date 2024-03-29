import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Container, Col, Row, Spinner, Button } from 'reactstrap'
import ReactLoading from "react-loading"

import { connect } from 'react-redux'
import { subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
import { setQuizes, setAllNoLimitQuizes } from '../../redux/quizes/quizes.actions'
import ResponsiveAd from '../adsenses/ResponsiveAd'
import SquareAd from '../adsenses/SquareAd'
import SearchInput from '../SearchInput'

const PostItem = lazy(() => import('./PostItem'))

const Posts = ({ setQuizes, quizes, allNoLimit, allNoLimitLoading, setAllNoLimitQuizes }) => {

    const mystyle = {
        color: "#B4654A",
        textAlign: "center",
        animationDuration: "2s",
        animationName: "slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    }

    const [limit] = useState(20)
    const [skip, setSkip] = useState(0)
    const [searchKey, setSearchKey] = useState('')

    const nextPage = () => {
        setSkip(skip + limit)
    }

    const previousPage = () => {
        setSkip(skip - limit)
    }

    // Lifecycle methods
    useEffect(() => {
        setQuizes(limit, skip)
        setAllNoLimitQuizes()
    }, [setQuizes, setAllNoLimitQuizes, limit, skip])

    return (
        <Container className="posts main mt-4">

            <blockquote className="blockquote text-center mt-3 mt-sm-5">
                <h1 className="mb-2 lead text-uppercase font-weight-bold">Knowledge matters, and so does the joy of quizzing!</h1>
                <small className="text-muted p-1 ml-lg-2">
                    &nbsp;~&nbsp; Welcome! Explore and test your knowledge as you please! &nbsp;~&nbsp;
                </small>
            </blockquote>
            
            <Row className="mt-5 mx-0">
                <div style={mystyle} className="soon">
                    <h4 className='d-inline border border-success rounded p-lg-1'>
                        Get ready for exam success! Let's make it happen together!🍾🎉</h4>
                </div>
            </Row>

            <Row className="mt-lg-5">
                <Col sm="2" className="mt-md-2 w-100 d-flex justify-content-center align-items-center">
                    {/* Google responsive 1 ad */}
                    <div className='w-100 d-flex justify-content-center align-items-center'>
                        <ResponsiveAd />
                    </div>
                </Col>

                <Col sm="8" className="mt-md-2">
                    <Suspense
                        fallback={
                            <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                <Spinner style={{ width: '5rem', height: '5rem' }} />
                            </div>
                        }>
                        <h3 className="mb-3 text-center lead font-weight-bold">ALL QUIZZES</h3>

                        {quizes.isLoading ?
                            <div className="p-5 m-5 d-flex justify-content-center align-items-center">
                                <ReactLoading type="spokes" color="#33FFFC" />
                            </div> :

                            <>

                                {/* Search input*/}
                                {
                                    allNoLimitLoading ?
                                        <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                            <ReactLoading type="bubbles" color="#33FFFC" /> </div> :
                                        <SearchInput setSearchKey={setSearchKey} placeholder=" Search quizes here ...  " />
                                }

                                {searchKey === "" ? null :

                                    allNoLimit && allNoLimit
                                        .map(quiz => (

                                            quiz.title.toLowerCase().includes(searchKey.toLowerCase()) ?
                                                <PostItem key={quiz._id} quiz={quiz} fromSearch={true} /> : null
                                        ))}

                                {quizes && quizes.allQuizes.map(quiz => (
                                    quiz.questions.length > 5 ?
                                    <PostItem key={quiz._id} quiz={quiz} />:
                                    null
                                ))}

                                <div className="w-100 d-flex justify-content-around mx-auto my-3 overflow-auto pb-2">
                                    <Button color="info" onClick={previousPage} className={skip < 1 ? `invisible` : `visible`}>
                                        Previous
                                    </Button>
                                    <Button color="info" onClick={nextPage} className={quizes.allQuizes.length < limit ? `invisible` : `visible`}>
                                        Next
                                    </Button>
                                </div>
                            </>}
                    </Suspense>
                </Col>

                <Col sm="2" className="mt-md-2 w-100 d-flex justify-content-center align-items-center">
                    {/* Google square ad */}
                    <Row className='w-100 d-flex justify-content-center align-items-center'>
                        <Col sm="12" className='w-100 d-flex justify-content-center align-items-center'>
                            <div className='w-100 d-flex justify-content-center align-items-center'>
                                <SquareAd />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    quizes: state.quizesReducer,
    allNoLimit: state.quizesReducer.allQuizesNoLimit,
    allNoLimitLoading: state.quizesReducer.isNoLimitLoading,
})

export default connect(mapStateToProps, { subscribeToNewsLetter, setQuizes, setAllNoLimitQuizes })(Posts)