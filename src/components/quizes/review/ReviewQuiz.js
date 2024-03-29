import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import { useParams, useLocation } from 'react-router-dom'
import CyclonLoading from '../../rLoading/CyclonLoading'
import SpinningBubbles from '../../rLoading/SpinningBubbles'
import { connect } from 'react-redux'
import { getOneScore, createScore } from '../../../redux/scores/scores.actions'
import ReviewView from './ReviewView'
import QuestionComments from './questionComments/QuestionComments'
import OnLastAnswer from './OnLastAnswer'
import TitleRow from './TitleRow'
import NotAuthenticated from '../../auth/NotAuthenticated'
import ResponsiveAd from '../../adsenses/ResponsiveAd'
import SquareAd from '../../adsenses/SquareAd'
import { authContext, currentUserContext } from '../../../appContexts'

const ReviewQuiz = ({ sC, getOneScore, createScore }) => {

    const auth = useContext(authContext)
    const currentUser = useContext(currentUserContext)

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [lastAnswer, setLastAnswer] = useState(false)

    const qnsAll = sC.oneScore && sC.oneScore.review && sC.oneScore.review.questions
    const curRevQn = qnsAll && qnsAll[currentQuestion]

    // Access route parameters
    const { reviewId } = useParams()
    const location = useLocation();
    const newScoreToSave = location.state

    // Load the image
    const [imgLoaded, setImgLoaded] = useState(false)
    const onLoad = useCallback(() => { setImgLoaded(true) }, [])
    useEffect(() => { onLoad() }, [onLoad])

    // Lifecycle methods
    useEffect(() => {
        getOneScore(reviewId)
    }, [getOneScore, reviewId])

    return (

        <Container>

            {auth.isAuthenticated ?

                !sC.isLoading ?
                    <>
                        <Row className='w-100'>
                            <Col sm="6" className='w-100'>
                                <div className='w-100'>
                                    <ResponsiveAd />
                                </div>
                            </Col>
                        </Row>
                        {
                            sC.oneScore ?

                                qnsAll.length > 0 ?

                                    <>
                                        <Row className="main mx-auto d-flex flex-column justify-content-center rounded border border-primary my-lg-5 py-lg-4 w-80" key={Math.floor(Math.random() * 1000)}>

                                            {lastAnswer ?

                                                <OnLastAnswer
                                                    isAuthenticated={auth.isAuthenticated}
                                                    thisQuiz={sC.oneScore.quiz} /> :

                                                imgLoaded ?
                                                    <div className="question-view p-2">
                                                        <TitleRow
                                                            thisQuiz={sC.oneScore.quiz}
                                                            thisReview={sC.oneScore.review}
                                                            score={sC.oneScore.marks}
                                                            qnsAll={qnsAll}
                                                            curRevQn={curRevQn}
                                                            currentQuestion={currentQuestion}
                                                            uRole={currentUser.role} />

                                                        {/* Image */}
                                                        {curRevQn && curRevQn.question_image ?
                                                            <Row>
                                                                <Col>
                                                                    <div className="my-3 mx-sm-5 px-sm-5 d-flex justify-content-center align-items-center">
                                                                        <img className="mt-2 mt-lg-0 mx-sm-5 px-sm-5 w-100" src={curRevQn && curRevQn.question_image} onLoad={onLoad} alt="Question Illustration" />
                                                                    </div>
                                                                </Col>
                                                            </Row> : null}

                                                        <ReviewView
                                                            qnsAll={qnsAll}
                                                            curRevQn={curRevQn}
                                                            currentQuestion={currentQuestion}
                                                            lastAnswer={lastAnswer}
                                                            setLastAnswer={setLastAnswer}
                                                            setCurrentQuestion={setCurrentQuestion} />

                                                        <QuestionComments questionID={curRevQn && curRevQn._id} quizID={sC.oneScore.quiz && sC.oneScore.quiz._id} currentUser={auth && currentUser} />
                                                    </div>
                                                    : <SpinningBubbles title='question' />}

                                        </Row>
                                    </> :

                                    <Row className="main mx-auto d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80 text-center">
                                        <h1 className="text-danger font-weight-bolder">404</h1>
                                        <h4>Quiz's questions unavailable! Refresh!</h4>
                                        <Button color="info" style={{ width: "120px" }} className="mx-auto mt-4"><a href="/webmaster" className="text-white">Back</a></Button>
                                    </Row> :

                                <Row className="main mx-auto d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80 text-center">
                                    <h1 className="text-danger font-weight-bolder">404</h1>
                                    <h4>Your score in not saved!</h4>
                                    <Button color="info"
                                        className="mx-auto mt-4"
                                        onClick={
                                            async () => {
                                                const scoreCreation = createScore(newScoreToSave)
                                                if (scoreCreation) {
                                                    // reload after 3 seconds
                                                    setTimeout(() => {
                                                        window.location.reload()
                                                    }, 3000)
                                                }
                                                else {
                                                    alert('Error saving score!')
                                                }
                                            }
                                        }>
                                        Save your score first!
                                    </Button>
                                    <Button color="info" style={{ width: "120px" }} className="mx-auto mt-4"><a href="/webmaster" className="text-white">Back</a></Button>
                                </Row>}

                        <Row>
                            <Col sm="6">
                                <Row className='w-100'>
                                    <Col sm="12" className='w-100'>
                                        <div className='w-100'>
                                            <SquareAd />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row></> :

                    <CyclonLoading /> :

                <NotAuthenticated auth={auth} />
            }
        </Container>)
}

const mapStateToProps = state => ({
    sC: state.scoresReducer
})

export default connect(mapStateToProps, { getOneScore, createScore })(ReviewQuiz)