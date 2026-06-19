import { useEffect, lazy, Suspense, useState, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toast, Container } from 'reactstrap';
import ReactGA from 'react-ga4';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logRegContext } from '@/contexts/appContexts';
import { getCategories, getCourseCategories, getLandingDisplayNotes, loadUser } from '@/redux/slices';
import { useSelector, useDispatch } from 'react-redux';
import QBLoading from '@/utils/rLoading/QBLoadingSM';

// Layout (small, always needed)
const Header = lazy(() => import('@/components/header/Header'));
const LoginModal = lazy(() => import('@/components/users/LoginModal'));
const RegisterModal = lazy(() => import('@/components/users/RegisterModal'));
const Footer = lazy(() => import('@/components/footer/Footer'));

// Routes: ALL lazy
const LandingQuizzes = lazy(() => import('@/components/home/LandingQuizzes'));
const AllQuizzes = lazy(() => import('@/components/home/AllQuizzes'));
const SingleCategory = lazy(() => import('@/components/home/categories/SingleCategory'));
const AllCategories = lazy(() => import('@/components/home/categories/AllCategories'));
const ViewNotePaper = lazy(() => import('@/components/home/notes/ViewNotePaper'));

const GetReady = lazy(() => import('@/components/quizzes/GetReady'));
const QuizQuestions = lazy(() => import('@/components/quizzes/QuizQuestions'));
const QuizResults = lazy(() => import('@/components/quizzes/questionsScore/QuizResults'));
const ReviewQuiz = lazy(() => import('@/components/quizzes/review/ReviewQuiz'));
const QuizRanking = lazy(() => import('@/components/quizzes/QuizRanking'));

const Dashboard = lazy(() => import('@/components/dashboard/Dashboard'));
const Statistics = lazy(() => import('@/components/dashboard/statistics/Statistics'));
const UsersStats = lazy(() => import('@/components/dashboard/statistics/content/users/UsersStats'));
const BlogStats = lazy(() => import('@/components/dashboard/statistics/content/blogposts/BlogStats'));
const CreateQuestions = lazy(() => import('@/components/dashboard/quizzing/questions/CreateQuestions'));
const SingleQuestion = lazy(() => import('@/components/dashboard/quizzing/questions/SingleQuestion'));
const EditQuestion = lazy(() => import('@/components/dashboard/quizzing/questions/EditQuestion'));
const Subscribers = lazy(() => import('@/components/dashboard/users/Subscribers'));
const ContactsArchive = lazy(() => import('@/components/dashboard/contacts/archived/ContactsArchive'));
const ChatWrapper = lazy(() => import('@/components/dashboard/contacts/chat/ChatWrapper'));
const Broadcasts = lazy(() => import('@/components/dashboard/contacts/broadcasts/Broadcasts'));
const Feedbacks = lazy(() => import('@/components/dashboard/scores/Feedbacks'));
const AddBlogPost = lazy(() => import('@/components/dashboard/posts/blog/AddBlogPost'));
const EditBlogPost = lazy(() => import('@/components/dashboard/posts/blog/EditBlogPost'));
const Index = lazy(() => import('@/components/dashboard/courses/Index'));

const AllBlogPosts = lazy(() => import('@/components/blog/AllBlogPosts'));
const ViewBlogPost = lazy(() => import('@/components/blog/ViewBlogPost'));
const ByCategory = lazy(() => import('@/components/blog/ByCategory'));

const ViewCourse = lazy(() => import('@/components/notes/ViewCourse'));

const ForgotPassword = lazy(() => import('@/components/users/ForgotPassword'));
const ResetPassword = lazy(() => import('@/components/users/ResetPassword'));
const Unsubscribe = lazy(() => import('@/components/users/Unsubscribe'));
const EditProfile = lazy(() => import('@/components/users/EditProfile'));
const Verify = lazy(() => import('@/components/users/Verify'));

const Contact = lazy(() => import('@/components/contacts/Contact'));
const FaqCollapse = lazy(() => import('@/components/faqs/FaqCollapse'));
const About = lazy(() => import('@/components/about/About'));
const Privacy = lazy(() => import('@/components/misc/Privacy'));
const ItsindirePrivacy = lazy(() => import('@/components/misc/ItsindirePrivacy'));
const Disclaimer = lazy(() => import('@/components/misc/Disclaimer'));
const NotFound404 = lazy(() => import('@/components/misc/NotFound404'));

ReactGA.initialize('G-GXLLDMB41B', {
    debug: true,
    gaOptions: { siteSpeedSampleRate: 100 }
});

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isOpenL, setIsOpenL] = useState(false);
    const [isOpenR, setIsOpenR] = useState(false);
    const [modal, setModal] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const toggleL = useCallback(() => {
        setIsOpenR(false);
        setIsOpenL(prev => !prev);
    }, []);

    const toggleR = useCallback(() => {
        setIsOpenL(false);
        setIsOpenR(prev => !prev);
    }, []);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search, title: location.pathname + location.search });
    }, [location]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) dispatch(loadUser());
        dispatch(getCategories());
        dispatch(getCourseCategories());
        dispatch(getLandingDisplayNotes());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (token) dispatch(loadUser());
        }, 3600000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const { user } = useSelector(state => state.users);

    useEffect(() => {
        if (user) {
            const NonEmptyFields = Object.keys(user).filter(key => user[key]).length;
            const percent = (NonEmptyFields - 2) * 10;
            if (percent > 0 && percent < 100) {
                setPercentage(percent);
                setModal(true);
            }
        }
    }, [user]);

    return (
        <logRegContext.Provider value={{ isOpenL, toggleL, isOpenR, toggleR }}>
            <Suspense fallback={<QBLoading />}>
                <Toast isOpen={modal} className="w-100 popup-toast" fade={false}>
                    <div className="bg-warning py-2 px-3 d-flex justify-content-between align-items-center">
                        <p className="text-danger text-center fw-bolder d-block mb-0">
                            &nbsp;&nbsp;Your profile is {`${percentage}`}% up to date!&nbsp;&nbsp;
                            <Link to={`/edit-profile/${user?._id}`}>
                                <strong className="px-1" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
                                    Updating your picture + details...
                                </strong>
                            </Link>
                        </p>
                        <button onClick={toggle} className="btn btn-sm btn-danger ms-2">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                </Toast>

                <Header />
                <LoginModal />
                <RegisterModal />

                <Container className="main">
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/itsindire-privacy" element={<ItsindirePrivacy />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                        <Route path="/unsubscribe" element={<Unsubscribe />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faqs" element={<FaqCollapse />} />
                        <Route path="/all-categories" element={<AllCategories />} />
                        <Route path="/all-quizzes" element={<AllQuizzes />} />
                        <Route path="/blog" element={<AllBlogPosts />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/feedbacks" element={<Feedbacks />} />
                        <Route path="/subscribers" element={<Subscribers />} />
                        <Route path="/broadcasts" element={<Broadcasts />} />
                        <Route path="/contacts-archive" element={<ContactsArchive />} />
                        <Route path="/chat" element={<ChatWrapper />} />
                        <Route path="/course-notes" element={<Index />} />

                        <Route path="/category/:categoryId" element={<SingleCategory />} />
                        <Route path="/edit-profile/:userId" element={<EditProfile />} />
                        <Route path="/view-quiz/:quizSlug" element={<GetReady />} />
                        <Route path="/attempt-quiz/:quizSlug" element={<QuizQuestions />} />
                        <Route path="/quiz-results/:quizSlug" element={<QuizResults />} />
                        <Route path="/view-question/:questionID" element={<SingleQuestion />} />
                        <Route path="/edit-question/:questionID" element={<EditQuestion />} />
                        <Route path="/review-quiz/:reviewId" element={<ReviewQuiz />} />
                        <Route path="/quiz-ranking/:quizID" element={<QuizRanking />} />
                        <Route path="/questions-create/:quizSlug" element={<CreateQuestions />} />
                        <Route path="/view-course/:courseId" element={<ViewCourse />} />
                        <Route path="/blog/:bPCatID" element={<ByCategory />} />
                        <Route path="/create-bpost/:bPCatID" element={<AddBlogPost />} />
                        <Route path="/edit-bpost/:bPSlug" element={<EditBlogPost />} />
                        <Route path="/view-blog-post/:bPSlug" element={<ViewBlogPost />} />
                        <Route path="/view-note-paper/:noteSlug" element={<ViewNotePaper />} />

                        <Route path="/statistics" element={<Statistics />}>
                            <Route path="new-50-users" element={<UsersStats />} />
                            <Route path="with-image" element={<UsersStats />} />
                            <Route path="with-school" element={<UsersStats />} />
                            <Route path="with-level" element={<UsersStats />} />
                            <Route path="with-faculty" element={<UsersStats />} />
                            <Route path="with-interests" element={<UsersStats />} />
                            <Route path="with-about" element={<UsersStats />} />
                            <Route path="all-users" element={<UsersStats />} />
                            <Route path="top-10-quizzing-users" element={<UsersStats />} />
                            <Route path="top-10-downloaders" element={<UsersStats />} />
                            <Route path="top-10-quizzes" element={<UsersStats />} />
                            <Route path="quizzes-stats" element={<UsersStats />} />
                            <Route path="top-10-notes" element={<UsersStats />} />
                            <Route path="notes-stats" element={<UsersStats />} />
                            <Route path="quiz-categories-stats" element={<UsersStats />} />
                            <Route path="notes-categories-stats" element={<UsersStats />} />
                            <Route path="recent-ten-views" element={<BlogStats />} />
                            <Route path="all-posts-views" element={<BlogStats />} />
                        </Route>

                        <Route path="/ads.txt" element={<div>google.com, pub-8918850949540829, DIRECT, f08c47fec0942fa0</div>} />
                        <Route path="/" element={<LandingQuizzes toggleR={toggleR} />} />
                        <Route path="/*" element={<NotFound404 />} />
                    </Routes>
                </Container>

                <Footer />
                <ToastContainer limit={2} style={{ fontSize: '0.8rem', textAlign: 'left' }} />
            </Suspense>
        </logRegContext.Provider>
    );
};

export default App;
