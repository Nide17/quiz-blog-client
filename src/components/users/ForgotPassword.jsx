import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Form, Input } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import SquareAd from "@/components/adsenses/SquareAd";
import ResponsiveAd from "@/components/adsenses/ResponsiveAd";
import isAdEnabled from "@/utils/isAdEnabled";
import Jumbotron from "@/utils/Jumbotron";
import { sendResetLink } from "@/redux/slices/usersSlice";
import { notify } from "@/utils/notifyToast";

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useSelector((state) => state.users);

    const [email, setEmail] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isProcessing || isLoading) return;

        const emailTrimmed = email.trim();
        const emailRegex =
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!emailTrimmed) {
            notify("Please enter your email address.", "error");
            return;
        }

        if (!emailRegex.test(emailTrimmed)) {
            notify("That email doesn’t look correct. Please try again.", "error");
            return;
        }

        setIsProcessing(true);

        try {
            await dispatch(sendResetLink({ email: emailTrimmed }));
        } catch (err) {
            console.error(err);
            notify("Could not send reset link. Please try again.", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard", { replace: true });
    }, [isAuthenticated, navigate]);

    return (
        <div className="forgot-password mt-4">
            <Row
                className="mt-5 d-flex flex-column justify-content-center align-items-center"
                style={{ minHeight: "70vh" }}
            >
                {isAdEnabled() && (
                    <Row className="w-100 mb-4">
                        <Col sm="12">
                            <SquareAd />
                        </Col>
                    </Row>
                )}

                <Jumbotron
                    h1="Forgot Your Password?"
                    p="Enter the correct and operational email linked to your account and we’ll send you a reset link."
                    small="It only takes seconds."
                />

                <Form className="my-2 w-100" onSubmit={handleSubmit}>
                    <div className="input-group mx-auto text-center" style={{ maxWidth: "380px" }}>
                        <Input
                            type="email"
                            name="email"
                            className="form-control text-center"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        color="success"
                        size="md"
                        className="mt-4 d-block mx-auto text-white"
                        style={{ width: "160px" }}
                        disabled={isProcessing || isLoading}
                    >
                        {isProcessing || isLoading ? "Sending..." : "Send Link"}
                    </Button>
                </Form>

                {isAdEnabled() && (
                    <Row className="w-100 mt-4">
                        <Col sm="12">
                            <ResponsiveAd />
                        </Col>
                    </Row>
                )}
            </Row>
        </div>
    );
}
