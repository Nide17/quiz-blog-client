import ResponsiveAd from '@/components/adsenses/ResponsiveAd';
import isAdEnabled from '@/utils/isAdEnabled';
import SquareAd from '@/components/adsenses/SquareAd';
import { formatDate } from '@/utils/dateFormat';
import './miscPages.css';

const Privacy = () => {
    const formattedDate = formatDate('2025-10-20');

    return (
        <div className="misc-section">
            <section className="misc-hero">
                <span className="eyebrow">Your data, our care</span>
                <h1>Privacy Policy</h1>
                <p>
                    Learn how Quiz-Blog collects, uses, and protects your information. We keep data handling simple, transparent, and focused on your trust.
                </p>
                <a className="misc-link" href="mailto:quizblog.rw@gmail.com">
                    quizblog.rw@gmail.com
                </a>
            </section>

            <div className="misc-content">
                <section className="misc-card">
                    <h2>Privacy at a Glance</h2>
                    <p>
                        We collect minimal data to operate, improve, and secure Quiz-Blog. We only use it where necessary and protect it with industry-standard practices.
                    </p>
                    <p>
                        Last updated: <strong>{formattedDate}</strong>
                    </p>
                </section>

                <section className="misc-card">
                    <h2>Interpretation & Definitions</h2>
                    <p>Capitalized terms have the meanings defined below.</p>
                    <ul>
                        <li><strong>Account:</strong> A unique profile created to access our Service.</li>
                        <li><strong>Company:</strong> Quiz-Blog (“We”, “Us”).</li>
                        <li><strong>Cookies:</strong> Files stored on your device to enhance browsing.</li>
                        <li><strong>Device:</strong> Any device used to access the Service.</li>
                        <li><strong>Personal Data:</strong> Information that identifies an individual.</li>
                        <li><strong>Service:</strong> The Quiz-Blog website.</li>
                        <li><strong>Usage Data:</strong> Automatically collected usage information.</li>
                        <li><strong>You:</strong> The person using the Service.</li>
                    </ul>
                </section>

                {isAdEnabled() && (
                    <section className="misc-card">
                        <ResponsiveAd />
                    </section>
                )}

                <section className="misc-card">
                    <h2>Collecting & Using Your Data</h2>
                    <p>We collect the following categories of data:</p>
                    <h3>Personal Data</h3>
                    <ul>
                        <li>Email address</li>
                        <li>First and last name</li>
                        <li>Usage data</li>
                    </ul>
                    <h3>Usage Data</h3>
                    <p>May include IP address, browser type, pages visited, time spent, and device identifiers.</p>
                    <h3>Cookies & Tracking Technologies</h3>
                    <p>We use cookies and similar tools to improve your experience while keeping tracking minimal.</p>
                </section>

                <section className="misc-card">
                    <h2>How We Use Your Data</h2>
                    <ul>
                        <li>Provide and maintain our Service</li>
                        <li>Manage user accounts and registration</li>
                        <li>Send important updates or offers</li>
                        <li>Analyze usage trends and improve the Service</li>
                        <li>Support legal compliance and business operations</li>
                    </ul>
                </section>

                <section className="misc-card">
                    <h2>Data Sharing</h2>
                    <p>We may share your data with:</p>
                    <ul>
                        <li>Analytics and support providers</li>
                        <li>Business partners and affiliates</li>
                        <li>Other users in shared/public areas</li>
                        <li>Authorities, as required by law</li>
                    </ul>
                </section>

                <section className="misc-card">
                    <h2>Retention & Security</h2>
                    <p>
                        We keep your data only as long as necessary and apply commercially reasonable security measures. No online method is completely secure, but we work to protect your information.
                    </p>
                </section>

                <section className="misc-card">
                    <h2>Children&apos;s Privacy</h2>
                    <p>
                        Our Service is not intended for children under 13, and we do not knowingly collect information from them.
                    </p>
                </section>

                <section className="misc-card">
                    <h2>External Links</h2>
                    <p>
                        Quiz-Blog is not responsible for content on third-party websites. Always review their privacy policies before interacting.
                    </p>
                </section>

                <section className="misc-card">
                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy. Changes will be posted here, and we may notify you through email or website announcements.
                    </p>
                </section>

                <section className="misc-card">
                    <h2>Contact Us</h2>
                    <p>
                        Email: <a className="misc-link" href="mailto:quizblog.rw@gmail.com">quizblog.rw@gmail.com</a>
                    </p>
                    <p>
                        Website: <a className="misc-link" href="https://www.quizblog.rw/contact">Contact Page</a>
                    </p>
                </section>

                {isAdEnabled() && (
                    <section className="misc-card">
                        <SquareAd />
                    </section>
                )}
            </div>
        </div>
    );
};

export default Privacy;
