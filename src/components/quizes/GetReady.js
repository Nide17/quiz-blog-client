import React, { useEffect, lazy, Suspense, useContext } from 'react'
import { Container, Col, Row, Card, Button, CardTitle, CardText, Spinner } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOneQuiz } from '../../redux/quizes/quizes.actions'
import EmbeddedVideos from './EmbeddedVideos'
import { currentUserContext } from '../../appContexts'

const ResponsiveHorizontal = lazy(() => import('../adsenses/ResponsiveHorizontal'))

const GetReady = ({ qZ, getOneQuiz }) => {

    // SHUFFLE QUESTIONS
    const shuffleQuestions = qZ.oneQuiz && qZ.oneQuiz.questions.sort(() => Math.random() - 0.5)
    qZ = {
        ...qZ,
        oneQuiz: {
            ...qZ.oneQuiz,
            questions: shuffleQuestions
        }
    }

    // context
    const currentUser = useContext(currentUserContext)

    // Access route parameters
    const { quizSlug } = useParams()

    useEffect(() => {
        getOneQuiz(quizSlug);
    }, [getOneQuiz, quizSlug]);

    if (!qZ.isOneQuizLoading) {

        return (

            qZ.oneQuiz && qZ.oneQuiz.questions.length > 0 ?

                <div className="py-3 d-flex justify-content-center align-items-center flex-column">
                    <Container className="main mx-auto d-flex flex-column justify-content-center rounded border border-primary my-3 my-lg-5 py-lg-4 w-80">

                        <div className="question-view p-2">

                            <Row>
                                <Col>
                                    <Card body className='question-section text-center my-2 mx-auto w-75 p-2 p-lg-5'>
                                        <CardTitle tag="h5" className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                            {qZ.oneQuiz.title}&nbsp;({qZ.oneQuiz.questions && qZ.oneQuiz.questions.length})
                                        </CardTitle>

                                        <CardText>
                                            {qZ.oneQuiz.description}
                                        </CardText>

                                        <small className={`font-weight-bolder text-${currentUser ? 'success' : 'danger'}`}>
                                            {currentUser ? `${currentUser.name}, are you ready to take the quiz?` :
                                                'Please Login or Register to be able to save and review your answers 😎'}
                                        </small>

                                        <div className='answer d-flex justify-content-center mx-auto mt-2 w-lg-50'>
                                            <Link to={`/attempt-quiz/${qZ.oneQuiz.slug}`} state={qZ}>
                                                <Button className="btn btn-outline-primary mt-3">
                                                    Attempt Quiz
                                                </Button>
                                            </Link>

                                            <Button color="success" className="mt-3 share-btn mx-1 mx-md-3">
                                                <i className="fa fa-whatsapp"></i>&nbsp;
                                                <a className="text-white" href={`https://api.whatsapp.com/send?phone=whatsappphonenumber&text=Attempt this ${qZ.oneQuiz.title} quiz on Quiz-Blog
                        \nhttps://www.quizblog.rw/view-quiz/${qZ.oneQuiz.slug}`}>Share</a>
                                            </Button>

                                            <Link to={'/'}>
                                                <Button className="btn btn-outline-primary mt-3">
                                                    ⬅ Back
                                                </Button>
                                            </Link>
                                        </div>

                                        <small className="mt-3 font-weight-bold">
                                            ~{qZ.oneQuiz.category && qZ.oneQuiz.category.title}~
                                        </small>
                                    </Card>

                                    <Suspense fallback={<div className="p-1 m-1 d-flex justify-content-center align-items-center w-100">
                                        <Spinner color="primary" />
                                    </div>}>
                                        <div className='w-100'>
                                            {/* Google responsive 1 ad */}
                                            <ResponsiveHorizontal />
                                        </div>
                                    </Suspense>

                                </Col>
                            </Row>
                            <EmbeddedVideos quiz={qZ} currentUser={currentUser} />
                        </div>

                    </Container>
                </div> :

                <div className="py-5 d-flex justify-content-center align-items-center">
                    <h4 className="py-lg-5 my-lg-5 text-danger">This quiz is not available yet! <a href="/allposts">click here for more quizes!</a></h4>
                </div>)
    }
    else {

        return (<>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <Spinner color="warning" style={{ width: '8rem', height: '8rem' }} />
            </div>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <h4 className="blink_load">Loading Quiz ...</h4>
            </div>
            <div className="my-5 d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="success" style={{ width: '8rem', height: '8rem' }} />
            </div>
        </>)
    }
}

const mapStateToProps = state => ({
    qZ: state.quizesReducer
});

export default connect(mapStateToProps, { getOneQuiz })(GetReady)