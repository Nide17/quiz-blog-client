import { useEffect, useState } from 'react';
import { Col, Row, Form, Input, Button } from 'reactstrap';
import subscribeImg from '@/images/undraw_subscribe.svg';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeToPosts } from '@/redux/slices/subscribersSlice';
import validators from '@/utils/validators';
import { notify } from '@/utils/notifyToast';

const Subscribe = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const [subscriber, setSubscriber] = useState({ name: '', email: '' });

    // Pre-fill for logged-in users
    useEffect(() => {
        if (user) {
            setSubscriber({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubscriber((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubscribe = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!validators.validateEmail(subscriber.email)) {
            return notify('Please enter a valid email address.', 'error');
        }
        if (!validators.validateName(subscriber.name)) {
            return notify('Please enter a valid name (only letters and spaces, 3-30 characters).', 'error');
        }

        // Attempt to subscribe
        dispatch(subscribeToPosts(subscriber));
        setSubscriber({ name: '', email: '' });
    };

    return (
        <Row className="mb-5">
            <Col xs="12" className="mx-auto">
                <Form onSubmit={handleSubscribe} className="subscribe-card text-center">
                    <img
                        src={subscribeImg}
                        alt="Subscribe illustration"
                        className="img-fluid subscribe-img"
                    />
                    <h5 className="fw-bold subscribe-header mb-2">
                        Never miss new content
                    </h5>
                    <p className="subscribe-copy mx-auto mb-4">
                        Get alerts for quizzes, posts, notes and more.
                    </p>
                    <div className="d-flex flex-column gap-3">
                        <Input
                            type="text"
                            name="name"
                            value={subscriber.name}
                            placeholder="Your name"
                            onChange={handleChange}
                            minLength={4}
                            maxLength={30}
                            required
                            aria-label="Full name"
                            className="subscribe-input"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={subscriber.email}
                            placeholder="Your email"
                            onChange={handleChange}
                            required
                            aria-label="Email address"
                            className="subscribe-input"
                        />
                        <Button type="submit" color="success" className="subscribe-btn">
                            Notify me
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default Subscribe
