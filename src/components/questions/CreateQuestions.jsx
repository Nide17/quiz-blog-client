import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Button, Col, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap'
import Dashboard from '../dashboard/Dashboard'
import { addQuestion, getQuestions } from '../../redux/slices/questionsSlice'
import { getOneQuiz, notifying } from '../../redux/slices/quizesSlice'
import { clearErrors } from '../../redux/slices/errorSlice'
import { clearSuccess } from '../../redux/slices/successSlice'
import { useDispatch, useSelector } from 'react-redux'
import QBLoadingSM from '../rLoading/QBLoadingSM'
import { authContext, logRegContext } from '../../appContexts'
import Notification from '../../utils/Notification'

const CreateQuestions = () => {

    // Redux
    const oneQuiz = useSelector(state => state.quizes.oneQuiz)
    const dispatch = useDispatch()

    const auth = useContext(authContext)
    const { toggleL } = useContext(logRegContext)

    // Access route parameters
    const { quizSlug } = useParams()

    const [progress, setProgress] = useState();

    // Alert
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    const [questionText, setQuestionText] = useState({
        questionText: '',
    })

    const [question_image, setQuestion_image] = useState('')

    const [durationState, setDurationState] = useState({
        duration: 24
    })

    const [answerOptions, setAnswerOptions] = useState([
        { id: uuidv4(), answerText: '', explanations: '', isCorrect: false },
    ])

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    // Lifecycle methods
    useEffect(() => {
        dispatch(getOneQuiz(quizSlug))
        dispatch(getQuestions(quizSlug))
    }, [dispatch, quizSlug])

    const onQuestionChangeHandler = e => {
        setErrorsState([])
        dispatch(clearErrors())
        dispatch(clearSuccess())

        const { name, value } = e.target
        setQuestionText(state => ({ ...state, [name]: value }))
    }

    const onFileHandler = (e) => {
        setErrorsState([])
        dispatch(clearErrors())
        dispatch(clearSuccess())
        setQuestion_image(e.target.files[0])
    }

    const onDurationChangeHandler = e => {
        setErrorsState([])
        dispatch(clearErrors())
        dispatch(clearSuccess())

        const { name, value } = e.target
        setDurationState(durationState => ({ ...durationState, [name]: value }))
    }

    const handleAnswerChangeInput = (id, event) => {
        setErrorsState([])
        dispatch(clearErrors())
        dispatch(clearSuccess())

        const newAnswerOptions = answerOptions.map(i => {
            if (id === i.id) {
                event.target.type === "checkbox" ?
                    i[event.target.name] = event.target.checked :
                    i[event.target.name] = event.target.value
            }
            return i
        })

        setAnswerOptions(newAnswerOptions)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        const trueAnswer = answerOptions.find(ansop => ansop.isCorrect === true ? ansop : null)

        // VALIDATE
        if (!questionText.questionText && !question_image) {
            setErrorsState(['Please give the title or upload question image!'])
            return
        }
        else if (questionText.questionText.length < 4) {
            setErrorsState(['Insufficient info!'])
            return
        }
        else if (questionText.questionText.length > 700) {
            setErrorsState(['Question is too long!'])
            return
        }

        else if (answerOptions.length <= 1) {
            setErrorsState(['Answers are not sufficient!'])
            return
        }

        else if (!trueAnswer) {
            setErrorsState(['Please provide a true answer!'])
            return
        }

        // Create new qn object
        formData.append('question_image', question_image)
        formData.append('questionText', questionText.questionText)
        answerOptions.forEach(aOptn => {
            formData.append('answerOptions', JSON.stringify(aOptn))
        })
        formData.append('category', oneQuiz.category && oneQuiz.category._id)
        formData.append('quiz', oneQuiz && oneQuiz._id)
        formData.append('created_by', auth.isLoading === false ? auth.user._id : null)
        formData.append('duration', durationState.duration)

        // Attempt to create
        dispatch(addQuestion(formData))

        // Reset form fields
        setQuestionText({ questionText: '' })
        setQuestion_image('')
        setDurationState({ duration: 24 })
        setAnswerOptions([{ id: uuidv4(), answerText: '', explanations: '', isCorrect: false }])
    }

    const handleAddFields = () => {
        setAnswerOptions([...answerOptions, { id: uuidv4(), answerText: '', explanations: '', isCorrect: false }])
    }

    const handleRemoveFields = id => {
        const values = [...answerOptions]
        values.splice(values.findIndex(value => value.id === id), 1)
        setAnswerOptions(values)
    }

    const SendNotification = (quiz_Id, title, category, created_by) => {

        const newQuizInfo = {
            quiz_Id,
            title,
            category,
            created_by
        }

        // Attempt to notify
        dispatch(notifying(newQuizInfo))
    }

    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <Form className="my-3 mt-lg-5 mx-3 mx-lg-5 create-question" onSubmit={handleSubmit}>

                    <div key={oneQuiz._id} className="mb-0 mb-lg-3 mx-0">
                        <Breadcrumb key={oneQuiz._id}>
                            <BreadcrumbItem><Link to="/dashboard">{oneQuiz.category && oneQuiz.category.title}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={`/category/${oneQuiz.category && oneQuiz.category._id}`}>{oneQuiz.title}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Create Question</BreadcrumbItem>
                        </Breadcrumb>

                        <Button
                            size="sm"
                            color="danger"
                            style={{ display: "block", marginLeft: "auto", border: "3px solid black" }}
                            onClick={() => SendNotification(oneQuiz._id, oneQuiz.title, oneQuiz.category && oneQuiz.category.title, oneQuiz.created_by && oneQuiz.created_by.name)}>
                            Finish & Notify
                        </Button>
                    </div>

                    <Notification errorsState={errorsState} progress={progress} initFn="addQuestion" />

                    <FormGroup row className="mx-0">
                        <Label sm={2}>Question</Label>
                        <Col sm={10}>
                            <Input type="text" name="questionText" value={questionText.questionText || ""} placeholder="Question here ..." onChange={onQuestionChangeHandler} required />
                        </Col>
                    </FormGroup>

                    <FormGroup row className="mx-0">
                        <Label sm={2} for="question_image">
                            <strong>Upload</strong>&nbsp;
                            <small className="text-info">.jpg, .png, .jpeg, .svg</small>
                        </Label>
                        <Col sm={10}>
                            <Input bsSize="sm" type="file" accept=".jpg, .png, .jpeg, .svg" name="question_image" onChange={onFileHandler} label="Pick an image ..." id="question_image_pick" required />
                        </Col>
                    </FormGroup>

                    <FormGroup row className="mx-0">
                        <Label sm={2}>Question Duration</Label>
                        <Col sm={3}>
                            <Input type="number" name="duration" value={durationState.duration || 0} placeholder="Time in seconds ..." onChange={onDurationChangeHandler} required />
                        </Col>
                    </FormGroup>

                    {answerOptions.map(answerOption => (

                        <div key={answerOption.id}>

                            <FormGroup row className="mx-0">
                                <Label sm={2}>Answer</Label>

                                <Col sm={10} xl={7}>
                                    <Input type="text" name="answerText" value={answerOption.answerText}
                                        onChange={event => handleAnswerChangeInput(answerOption.id, event)} id="exampleanswer" placeholder="Answer here ..." required />
                                </Col>

                                <Col sm={6} xl={2} className="my-3 my-sm-2 d-sm-flex justify-content-around">
                                    <Input type="checkbox" name="isCorrect" value={answerOption.isCorrect}
                                        onChange={event => handleAnswerChangeInput(answerOption.id, event)} id={answerOption.id} label="Is Correct?" required />
                                </Col>

                                <Col sm={6} xl={1} className="my-3 my-sm-2">
                                    <Button className="px-2 py-1" disabled={answerOptions.length === 1} color="danger" onClick={() => handleRemoveFields(answerOption.id)}> - </Button>{' '}
                                    <Button className="px-2 py-1" color="danger" onClick={handleAddFields}> + </Button>{' '}
                                </Col>

                                <Label sm={2}>Rationale</Label>

                                <Col sm={10} xl={7}>
                                    <Input type="textarea" name="explanations" placeholder="Rationales or explanations ..." minLength="5" maxLength="1000" onChange={event => handleAnswerChangeInput(answerOption.id, event)} value={answerOption.explanations} />
                                </Col>

                            </FormGroup>

                        </div>

                    ))}

                    <FormGroup check row className="mx-0 pl-3">
                        <Col sm={{ size: 10, offset: 2 }} className="pl-0">
                            <Button className="btn btn-info btn-sm" type="submit" onClick={handleSubmit}>Add New</Button>
                        </Col>
                    </FormGroup>

                </Form> :
                <Dashboard /> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <QBLoadingSM /> :
                        <Button color="link" className="fw-bolder my-5 border rounded" onClick={toggleL} style={{ backgroundColor: "#ffc107", color: "#157A6E", fontSize: "1.5vw", boxShadow: "-2px 2px 1px 2px #157A6E", border: "2px solid #157A6E" }}>
                            Login first
                        </Button>
                }
            </div>
    )
}

export default CreateQuestions