import './miscPages.css';

const ItsindirePrivacy = () => {
    return (
        <div className="misc-section">
            <section className="misc-hero">
                <span className="eyebrow">Privacy policy</span>
                <h1>Itsindire RW Privacy Policy</h1>
                <p>
                    Learn how Itsindire RW collects, uses, and protects your personal information. Our goal is to keep your data safe while delivering a seamless app experience.
                </p>
                <a className="misc-link" href="mailto:itsindire.rw@gmail.com">
                    itsindire.rw@gmail.com
                </a>
            </section>

            <div className="misc-content">
                <section className="misc-card">
                    <h2>Introduction</h2>
                    <p>
                        Welcome to the Itsindire RW App. We are committed to protecting your personal information and your right to privacy. If you have any questions, please contact us at{' '}
                        <a className="misc-link" href="mailto:itsindire.rw@gmail.com">
                            itsindire.rw@gmail.com
                        </a>.
                    </p>
                </section>

                <section className="misc-card">
                    <h2>Information We Collect</h2>
                    <p>
                        We collect personal information that you voluntarily provide when registering an account, showing interest in our services, participating in app activities, or contacting us.
                    </p>
                    <p>The information collected may include:</p>
                    <ul>
                        <li><strong>Name & Contact Data:</strong> First/last name, phone number, email address, and other contact information.</li>
                        <li><strong>Credentials:</strong> Passwords, hints, and security authentication information.</li>
                        <li><strong>Payment Data:</strong> Mobile money details or other payment information used for purchases.</li>
                    </ul>
                </section>

                <section className="misc-card">
                    <h2>How We Use Your Information</h2>
                    <p>
                        We process your information to operate, improve, and protect the Itsindire RW App. This includes:
                    </p>
                    <ul>
                        <li>Facilitating account creation and login.</li>
                        <li>Sending important administrative updates.</li>
                        <li>Managing and fulfilling orders.</li>
                        <li>Requesting user feedback.</li>
                        <li>Protecting the app and preventing fraud.</li>
                        <li>Enforcing terms and policies.</li>
                        <li>Responding to legal requests.</li>
                        <li>Managing user accounts.</li>
                        <li>Providing and improving the service.</li>
                        <li>Offering customer support.</li>
                    </ul>
                </section>

                <section className="misc-card">
                    <h2>Sharing Your Information</h2>
                    <p>We only share your information under specific circumstances, such as:</p>
                    <ul>
                        <li><strong>Compliance with Laws:</strong> Meeting legal obligations or responding to government requests.</li>
                        <li><strong>Vital Interests & Legal Rights:</strong> Preventing harm, investigating fraud, or enforcing policies.</li>
                        <li><strong>Service Providers:</strong> Trusted third parties for hosting, payments, analytics, or app support.</li>
                    </ul>
                </section>

                <section className="misc-card">
                    <h2>Security of Your Information</h2>
                    <p>
                        We apply administrative, technical, and physical safeguards to protect your information. However, no method of online transmission or storage is completely secure.
                    </p>
                </section>

                <section className="misc-card">
                    <h2>Your Privacy Rights</h2>
                    <p>
                        Depending on your region, you may have rights such as access, correction, deletion, restriction, data portability, or objection to processing. Contact us to exercise these rights.
                    </p>
                </section>

                <section className="misc-card">
                    <h2>Contact Us</h2>
                    <p>
                        If you have questions or comments about this policy, reach out at{' '}
                        <a className="misc-link" href="mailto:itsindire.rw@gmail.com">
                            itsindire.rw@gmail.com
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ItsindirePrivacy;
