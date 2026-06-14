import { useContext } from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

import { logRegContext } from "@/contexts/appContexts";
import QBLoadingSM from "@/utils/rLoading/QBLoadingSM";
import "./NotAuthenticated.css";

export default function NotAuthenticated({
    message = "Log in first to continue",
    actionLabel = "Login",
    onAction,
}) {
    const { isLoading } = useSelector((state) => state.users);

    const { toggleL } = useContext(logRegContext) ?? {};
    const handleAction = onAction ?? toggleL;

    // Authentication state still resolving
    if (isLoading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <QBLoadingSM title="Checking authentication…" />
            </div>
        );
    }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div
                className="auth-wrapper p-4 p-md-5 rounded shadow-sm text-center bg-white"
                style={{ maxWidth: 350 }}
                role="alert"
                aria-live="assertive"
            >
                <small className="text-success mb-4 d-block">
                    {message}
                </small>

                <Button
                    color="warning"
                    onClick={handleAction}
                    className="fw-bold px-4 py-2 text-success"
                    disabled={!handleAction}
                >
                    <i className="fa fa-lock me-2 text-sm"></i>
                    {actionLabel}
                </Button>

                {!handleAction && (
                    <p className="mt-3 text-muted small">
                        Login action is currently unavailable.
                    </p>
                )}
            </div>
        </div>
    );
}
