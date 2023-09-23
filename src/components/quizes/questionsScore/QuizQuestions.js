import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Container } from 'reactstrap'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { createScore } from '../../../redux/scores/scores.actions'
import { v4 as uuidv4 } from 'uuid'
import QuestionsView from './QuestionsView'
import LoadingQuestions from '../../rLoading/LoadingQuestions'
import NoQuestions from './NoQuestions'
import Unavailable from './Unavailable'

const QuizQuestions = ({ createScore, uId }) => {

    // Access route parameters & get the quiz
    const { quizSlug } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    // ACCESS Link Tag State
    const quizState = location.state

    // Get the quiz
    const [newScoreId, setNewScoreId] = useState();

    // Question setup
    const thisQuiz = quizState && quizState.oneQuiz
    const qnsLength = thisQuiz && thisQuiz.questions && thisQuiz.questions.length
    const [curQnIndex, setCurQnIndex] = useState(0)
    const currentQn = thisQuiz && thisQuiz.questions[curQnIndex]
    const curQnOpts = currentQn && currentQn.answerOptions

    // Dealing with answers
    const trueAnsNbr = curQnOpts && curQnOpts.filter(aOpt => aOpt.isCorrect === true).length

    // Checked and User choices
    const [selected, setSelected] = useState('')
    const [checkedState, setCheckedState] = useState([])
    useEffect(() => { curQnOpts && setCheckedState(new Array(curQnOpts.length).fill(false)) }, [curQnOpts])

    const [choices, setChoices] = useState(0)
    const [curQnUsrTrueChoices, setCurQnUsrTrueChoices] = useState(0)
    useEffect(() => { selected && setChoices(selected.filter(value => value).length) }, [selected])
    useEffect(() => { selected && setCurQnUsrTrueChoices(selected.filter(value => (value === 'true')).length) }, [selected])

    // Scores & Review
    const [score, setScore] = useState(0)
    const [quizToReview, setQuizToReview] = useState({})
    const passMark = thisQuiz.category && thisQuiz.category._id === '60e9a2ba82f7830015c317f1' ? 80 : 50

    // Function to change selected answer
    const handleOnChange = (event, position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item)

        setCheckedState(updatedCheckedState)

        const selectedAnswer = updatedCheckedState.map(

            (curSelState, index) => {
                var ansArr = ''
                if (curSelState === true) {
                    return ansArr + curQnOpts[index].isCorrect
                }
                return ansArr
            })

        setSelected(selectedAnswer)

        // Review answers
        curQnOpts
            .forEach(opt => {
                if (event && event.target.value === opt.answerText) {
                    if (opt.choosen === undefined) {
                        opt.choosen = true
                    }
                    else if (opt.choosen === true) {
                        opt.choosen = false
                    }
                    else if (opt.choosen === false) {
                        opt.choosen = true
                    }
                }
                else {
                    if (opt.choosen === undefined) {
                        opt.choosen = false
                    }
                }
            })

        // Preparing the review
        setQuizToReview({
            ...quizToReview,
            id: uuidv4(),
            title: thisQuiz.title,
            description: thisQuiz.description,
            questions: thisQuiz.questions
        })
        setNewScoreId(uuidv4())
    }


    const [saveScoreLoading, setSaveScoreLoading] = useState(false)
    // Save score to database function
    const scoreToSave = useMemo(() => ({
        id: newScoreId,
        marks: score,
        out_of: qnsLength,
        category: thisQuiz && thisQuiz.category && thisQuiz.category._id,
        quiz: thisQuiz && thisQuiz._id,
        review: quizToReview,
        taken_by: uId
    }), [newScoreId, score, qnsLength, thisQuiz, quizToReview, uId])

    const saveScore = useCallback(async () => {

        // SET LOADING
        setSaveScoreLoading(true)

        // ATTEMPT TO SAVE SCORE
        try {
            console.log(scoreToSave)
            const scoreSaving = await createScore(scoreToSave)

            if (scoreSaving) {
                setSaveScoreLoading(false)
            }
            else {
                setSaveScoreLoading(false)
            }

        } catch (err) {
            console.log(err)
        }

    }, [createScore, scoreToSave])

    // Going to next question
    const goToNextQuestion = useCallback((currentIndex, QuestionsLength) => {
        // REVIEW ANSWERS
        const reviewDetails = { review: quizToReview && quizToReview }

        // NAVIGATE TO NEXT QUESTION
        if (currentIndex + 1 < QuestionsLength) {
            setCurQnIndex(currentIndex + 1)
        }
        else {
            // SAVE SCORE
            saveScore()

            // NAVIGATE TO QUIZ RESULTS
            const quizResults = {
                score: score,
                qnsLength: QuestionsLength,
                passMark: passMark,
                thisQuiz: thisQuiz,
                quizToReview: reviewDetails.review,
                newScoreId: newScoreId,
                review: quizToReview,
            }

            // NAVIGATE TO QUIZ RESULTS PAGE
            navigate(`/quiz-results/${quizSlug}`, { state: quizResults })
        }
    }, [quizToReview, score, passMark, thisQuiz, navigate, quizSlug, newScoreId, saveScore])


    useEffect(() => {
        if (trueAnsNbr === choices) {
            if (trueAnsNbr === curQnUsrTrueChoices) {
                setScore(score + 1)
            }
            goToNextQuestion(curQnIndex, qnsLength)
            setCheckedState([])
            setSelected('')
            setChoices(0)
            setCurQnUsrTrueChoices(0)
        }

        // clean up the saving score
        return () => {
            setSaveScoreLoading(false)
        }

    }, [trueAnsNbr, choices, curQnUsrTrueChoices, curQnIndex, qnsLength, score, goToNextQuestion])

    if (!quizState.isOneQuizLoading) {

        return (

            thisQuiz ?

                qnsLength > 0 ?

                    <div key={Math.floor(Math.random() * 1000)} className="py-3 d-flex justify-content-center align-items-center flex-column">
                        <Container className="main mx-0 d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80">
                            <QuestionsView
                                qnsLength={qnsLength}
                                curQnIndex={curQnIndex}
                                currentQn={currentQn}
                                curQnOpts={curQnOpts}
                                checkedState={checkedState}
                                selected={selected}
                                score={score}
                                handleOnChange={handleOnChange}
                                goToNextQuestion={goToNextQuestion}
                                setCurQnIndex={setCurQnIndex} />
                        </Container>
                    </div> :

                    <NoQuestions /> :

                <Unavailable title='Quiz' link='/allposts' more='quizes' />
        )
    }

    else if (saveScoreLoading) {
        return (<LoadingQuestions />)
    }

    else {
        return (<LoadingQuestions />)
    }
}

export default connect(null, { createScore })(QuizQuestions)