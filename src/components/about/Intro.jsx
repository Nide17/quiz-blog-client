import { Row, Col } from 'reactstrap';
import reading from '@/images/reading.svg';
import Jumbotron from '@/utils/Jumbotron';

const Intro = () => {
    return (
        <div className="introduct pt-2 pt-lg-5">
            <h1 className="display-4 fw-bolder text-center my-4 mb-lg-4" style={{ color: 'var(--brand)' }}>
                Get To Know <span>Quiz-Blog</span>
            </h1>

            {/* Intro Section */}
            <Row className="pt-lg-4 px-3 px-lg-5 align-items-center">
                <Col sm="6" className="mb-4 mb-sm-0 text-center">
                    <img src={reading} alt="Learning Illustration" className="img-fluid" />
                </Col>

                <Col sm="6" className="intro-text d-flex flex-column justify-content-center">
                    <h2 className="fw-bolder text-center mb-4" style={{ color: 'var(--brand)' }}>
                        Empowering Learners
                    </h2>

                    <p className="lead mb-3 text-center">
                        Quiz-Blog provides quizzes and study resources that help students build their skills and succeed in exams. Our blog covers different subjects and shares useful insights to make learning simpler and more effective.
                    </p>
                    <hr className="my-2" style={{ borderColor: 'var(--brand)' }} />
                </Col>
            </Row>

            {/* Journey Section */}
            <Row className="px-3 px-lg-5 mt-5">
                <Jumbotron
                    h1="Our Journey"
                    p="Bruce started university in 2019 and struggled to find enough materials for self-study. To solve this, he worked with his brother, a software developer, to create Quiz-Blog, a platform that provides Multiple Choice Questions (MCQs) for students. What began with health sciences has grown to cover many subjects, helping students in Rwanda and around the world improve their learning."
                    small=""
                />
            </Row>

        </div>
    );
};

export default Intro;
